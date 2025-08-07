import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { INTERESTS, MONTHS, YEARS } from "@/lib/activities";
import { localStorageService, AppSettings } from "@/lib/storage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: "",
    birthMonth: "",
    birthYear: "",
    interests: [] as string[]
  });
  
  const [settings, setSettings] = useState<AppSettings>({
    notifications: false,
    quickMode: false
  });

  const { data: profile } = useQuery({
    queryKey: ['/api/profile']
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        birthMonth: profile.birthMonth,
        birthYear: profile.birthYear.toString(),
        interests: profile.interests || []
      });
    }
    
    const savedSettings = localStorageService.getSettings();
    setSettings(savedSettings);
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      if (!profile?.id) {
        throw new Error("No profile found");
      }
      const response = await apiRequest('PUT', `/api/profile/${profile.id}`, profileData);
      return response.json();
    },
    onSuccess: (updatedProfile) => {
      localStorageService.setKidProfile(updatedProfile);
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSettingToggle = (key: keyof AppSettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorageService.setSettings(newSettings);
  };

  const handleSave = () => {
    if (!formData.birthMonth || !formData.birthYear) {
      toast({
        title: "Missing Information",
        description: "Please select both birth month and year.",
        variant: "destructive"
      });
      return;
    }

    updateProfileMutation.mutate({
      name: formData.name || null,
      birthMonth: formData.birthMonth,
      birthYear: parseInt(formData.birthYear),
      interests: formData.interests
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-600 to-neutral-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold">Settings ⚙️</h2>
            <p className="text-neutral-200 text-sm">Edit profile & preferences</p>
          </div>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Child Profile</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-neutral-700 mb-2">Name</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter child's name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-neutral-700 mb-2">Birth Month</Label>
                <Select value={formData.birthMonth} onValueChange={(value) => setFormData(prev => ({ ...prev, birthMonth: value }))}>
                  <SelectTrigger className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-neutral-700 mb-2">Birth Year</Label>
                <Select value={formData.birthYear} onValueChange={(value) => setFormData(prev => ({ ...prev, birthYear: value }))}>
                  <SelectTrigger className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="block text-sm font-medium text-neutral-700 mb-3">Interests</Label>
              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map(interest => (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      formData.interests.includes(interest.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-neutral-200'
                    }`}
                  >
                    <i className={`${interest.icon} ${formData.interests.includes(interest.id) ? 'text-primary' : 'text-neutral-400'} mr-2`}></i>
                    <span className={`text-sm font-medium ${formData.interests.includes(interest.id) ? 'text-primary' : 'text-neutral-600'}`}>
                      {interest.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">App Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-neutral-900">Notifications</div>
                <div className="text-sm text-neutral-500">Get daily activity suggestions</div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={() => handleSettingToggle('notifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-neutral-900">Quick Mode</div>
                <div className="text-sm text-neutral-500">Skip filters and get instant ideas</div>
              </div>
              <Switch
                checked={settings.quickMode}
                onCheckedChange={() => handleSettingToggle('quickMode')}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">About</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-neutral-700">Version</span>
              <span className="text-neutral-500">1.0.0</span>
            </div>
            <div className="flex items-center justify-between cursor-pointer hover:bg-neutral-50 p-2 rounded-lg">
              <span className="text-neutral-700">Privacy Policy</span>
              <i className="fas fa-chevron-right text-neutral-400"></i>
            </div>
            <div className="flex items-center justify-between cursor-pointer hover:bg-neutral-50 p-2 rounded-lg">
              <span className="text-neutral-700">Terms of Service</span>
              <i className="fas fa-chevron-right text-neutral-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-6 bg-white border-t border-neutral-200">
        <Button
          onClick={handleSave}
          disabled={updateProfileMutation.isPending}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold"
        >
          {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
