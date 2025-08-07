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
      const response = await apiRequest('POST', '/api/profile', profileData);
      return response.json();
    },
    onSuccess: (profile) => {
      localStorageService.setKidProfile(profile);
      localStorageService.setOnboardingComplete(true);
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
      navigate('/');
    },
    onError: () => {
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
    <div className="min-h-screen bg-neutral-50 p-6 flex flex-col justify-center max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl mx-auto mb-6 flex items-center justify-center">
          <Star className="text-white text-3xl" size={48} />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Welcome to PlaySpark!</h1>
        <p className="text-neutral-500 text-lg">Let's create a profile for your little one to get personalized activity ideas</p>
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
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
        >
          {createProfileMutation.isPending ? "Creating Profile..." : "Create Profile ✨"}
        </Button>
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="w-full text-neutral-500 py-3 font-medium"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
