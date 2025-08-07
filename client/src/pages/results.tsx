import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/ActivityCard";
import { localStorageService, calculateAge } from "@/lib/storage";
import { activitiesService } from "@/lib/activities";
import { Activity } from "@shared/schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Results() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activities, setActivities] = useState<Activity[]>([]);

  const { data: profile } = useQuery({
    queryKey: ['/api/profile']
  });

  const { data: savedActivities } = useQuery({
    queryKey: ['/api/saved-activities']
  });

  const saveActivityMutation = useMutation({
    mutationFn: (activityId: string) => activitiesService.saveActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/saved-activities'] });
      toast({
        title: "Saved!",
        description: "Activity added to your favorites.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save activity.",
        variant: "destructive"
      });
    }
  });

  const generateActivitiesMutation = useMutation({
    mutationFn: async () => {
      const filters = localStorageService.getFilters();
      const interests = profile?.interests || [];
      const age = profile ? calculateAge(profile.birthMonth, profile.birthYear) : 5;
      
      return activitiesService.generateActivities({
        filters,
        interests,
        age
      });
    },
    onSuccess: (newActivities) => {
      setActivities(newActivities);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate activities.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    generateActivitiesMutation.mutate();
  }, []);

  const handleSaveActivity = (activityId: string) => {
    const isAlreadySaved = savedActivities?.some(saved => saved.activityId === activityId);
    if (isAlreadySaved) {
      toast({
        title: "Already Saved",
        description: "This activity is already in your favorites.",
      });
      return;
    }
    saveActivityMutation.mutate(activityId);
  };

  const handleShuffleCard = (index: number) => {
    // Generate a new activity for this position
    // For now, we'll just regenerate all activities
    generateActivitiesMutation.mutate();
  };

  const displayName = profile?.name || "you";

  if (generateActivitiesMutation.isPending && activities.length === 0) {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="p-2 bg-white/20 rounded-lg"
            >
              <ArrowLeft className="text-white" size={20} />
            </button>
            <div className="text-center">
              <h2 className="text-xl font-bold">Generating Ideas... ✨</h2>
              <p className="text-indigo-100 text-sm">Finding perfect activities</p>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 animate-pulse"></div>
            <p className="text-neutral-500">Creating magical activities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold">Perfect Activities! 🎉</h2>
            <p className="text-indigo-100 text-sm">Picked just for {displayName}</p>
          </div>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-search text-white text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No activities found</h3>
            <p className="text-neutral-500 mb-4">Try adjusting your filters and searching again.</p>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
            >
              Change Filters
            </Button>
          </div>
        ) : (
          activities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onSave={() => handleSaveActivity(activity.id)}
              onShuffle={() => handleShuffleCard(index)}
              isSaved={savedActivities?.some(saved => saved.activityId === activity.id)}
            />
          ))
        )}
      </div>

      {/* Action Buttons */}
      {activities.length > 0 && (
        <div className="p-6 bg-white border-t border-neutral-200 space-y-3">
          <Button
            onClick={() => generateActivitiesMutation.mutate()}
            disabled={generateActivitiesMutation.isPending}
            variant="outline"
            className="w-full border-2 border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/5"
          >
            {generateActivitiesMutation.isPending ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Show More Ideas"
            )}
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold"
          >
            ✨ New Search
          </Button>
        </div>
      )}
    </div>
  );
}
