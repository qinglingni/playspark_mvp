import { useLocation } from "wouter";
import { ArrowLeft, Trash2, Check, Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { activitiesService } from "@/lib/activities";
import { useToast } from "@/hooks/use-toast";

export default function Saved() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: savedActivities = [], isLoading } = useQuery({
    queryKey: ['/api/saved-activities']
  });

  const removeSavedMutation = useMutation({
    mutationFn: (savedActivityId: string) => activitiesService.removeSavedActivity(savedActivityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/saved-activities'] });
      toast({
        title: "Removed",
        description: "Activity removed from favorites.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove activity.",
        variant: "destructive"
      });
    }
  });

  const markAsUsedMutation = useMutation({
    mutationFn: ({ savedActivityId, isUsed }: { savedActivityId: string; isUsed: boolean }) => 
      activitiesService.markActivityAsUsed(savedActivityId, isUsed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/saved-activities'] });
      toast({
        title: "Updated",
        description: "Activity status updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update activity.",
        variant: "destructive"
      });
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
        <div className="bg-gradient-to-r from-red-400 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="p-2 bg-white/20 rounded-lg"
            >
              <ArrowLeft className="text-white" size={20} />
            </button>
            <div className="text-center">
              <h2 className="text-xl font-bold">Saved Activities ❤️</h2>
              <p className="text-red-100 text-sm">Loading your favorites...</p>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-neutral-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-400 to-pink-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold">Saved Activities ❤️</h2>
            <p className="text-red-100 text-sm">Your favorite ideas</p>
          </div>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Saved Activities List */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {savedActivities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl mx-auto mb-4 flex items-center justify-center">
              <Heart className="text-white text-3xl" size={48} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No saved activities yet</h3>
            <p className="text-neutral-500 mb-4">Start exploring and save your favorite activities!</p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white"
            >
              Explore Activities
            </Button>
          </div>
        ) : (
          savedActivities.map((saved: any) => (
            <div key={saved.id} className="bg-white rounded-xl shadow-md border border-neutral-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className={`font-bold mb-1 ${saved.isUsed ? 'text-neutral-500 line-through' : 'text-neutral-900'}`}>
                    {saved.activity?.title || 'Activity'}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      Ages {saved.activity?.ageRange}
                    </span>
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                      {saved.activity?.duration}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">{saved.activity?.whyGreat}</p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => removeSavedMutation.mutate(saved.id)}
                    disabled={removeSavedMutation.isPending}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => markAsUsedMutation.mutate({ 
                      savedActivityId: saved.id, 
                      isUsed: !saved.isUsed 
                    })}
                    disabled={markAsUsedMutation.isPending}
                    className={`p-2 rounded-lg transition-colors ${
                      saved.isUsed
                        ? 'text-green-500 bg-green-50'
                        : 'text-neutral-400 hover:bg-neutral-50'
                    }`}
                  >
                    <Check size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex bg-white border-t border-neutral-200">
        <button 
          onClick={() => navigate('/')}
          className="flex-1 p-4 text-center text-neutral-400 hover:text-primary transition-colors"
        >
          <Home className="text-xl mb-1 mx-auto" size={20} />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button className="flex-1 p-4 text-center text-red-500">
          <Heart className="text-xl mb-1 mx-auto fill-current" size={20} />
          <span className="text-xs font-medium">Saved</span>
        </button>
      </div>
    </div>
  );
}
