import { useState } from "react";
import { useLocation } from "wouter";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INTERESTS, MONTHS, YEARS } from "@/lib/activities";
import { localStorageService } from "@/lib/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Onboarding() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: "",
    birthMonth: "",
    birthYear: "",
    interests: [] as string[]
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      console.log('Creating profile with data:', profileData);
      const response = await apiRequest('POST', '/api/profile', profileData);
      const result = await response.json();
      console.log('Profile creation response:', result);
      return result;
    },
    onSuccess: (profile) => {
      console.log('Profile creation success, setting localStorage and navigating');
      localStorageService.setKidProfile(profile);
      localStorageService.setOnboardingComplete(true);
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
      console.log('About to navigate to home page');
      // Force a page reload to ensure the App router sees the new onboarding state
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('Profile creation error:', error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
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

  const handleSubmit = () => {
    if (!formData.birthMonth || !formData.birthYear) {
      toast({
        title: "Missing Information",
        description: "Please select both birth month and year.",
        variant: "destructive"
      });
      return;
    }

    createProfileMutation.mutate({
      name: formData.name || null,
      birthMonth: formData.birthMonth,
      birthYear: parseInt(formData.birthYear),
      interests: formData.interests
    });
  };

  const handleSkip = () => {
    localStorageService.setOnboardingComplete(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-6 flex flex-col justify-center max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-32 h-32 rainbow-gradient rounded-full mx-auto mb-6 flex items-center justify-center bounce-gentle">
          <Star className="text-white sparkle" size={56} />
        </div>
        <h1 className="text-4xl font-bold text-purple-800 mb-4 wiggle">Welcome to PlaySpark! ✨</h1>
        <p className="text-purple-600 text-xl font-semibold">Let's create a magical profile for your little adventurer!</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="block text-sm font-medium text-neutral-700 mb-2">Child's Name (Optional)</Label>
          <Input
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-4 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-neutral-700 mb-2">Birth Month</Label>
            <Select value={formData.birthMonth} onValueChange={(value) => setFormData(prev => ({ ...prev, birthMonth: value }))}>
              <SelectTrigger className="w-full p-4 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
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
              <SelectTrigger className="w-full p-4 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
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
          <Label className="block text-sm font-medium text-neutral-700 mb-3">Interests (Optional)</Label>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map(interest => (
              <button
                key={interest.id}
                onClick={() => handleInterestToggle(interest.id)}
                className={`p-3 border rounded-xl text-left hover:border-primary hover:bg-primary/5 transition-all ${
                  formData.interests.includes(interest.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-200'
                }`}
              >
                <i className={`${interest.icon} text-primary mr-2`}></i>
                <span className="text-sm font-medium">{interest.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={createProfileMutation.isPending}
          className="w-full rainbow-gradient text-white py-5 rounded-2xl font-bold text-xl shadow-xl wiggle"
        >
          {createProfileMutation.isPending ? "Creating Magic Profile... ✨" : "🎉 CREATE MY PROFILE! 🎉"}
        </Button>
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="w-full text-purple-600 py-4 font-semibold text-lg hover:text-purple-800 scale-on-hover"
        >
          Maybe later 🤔
        </Button>
      </div>
    </div>
  );
}
