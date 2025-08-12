import { Activity } from "@shared/schema";
import { useState } from "react";
import { Heart, RotateCcw, ChevronDown, ChevronUp, HelpCircle, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { activitiesService } from "@/lib/activities";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

interface ActivityCardProps {
  activity: Activity;
  onSave?: () => void;
  onShuffle?: () => void;
  isSaved?: boolean;
  showActions?: boolean;
  childAge?: number;
}

export function ActivityCard({ 
  activity, 
  onSave, 
  onShuffle, 
  isSaved = false, 
  showActions = true,
  childAge
}: ActivityCardProps) {
  const [isHearted, setIsHearted] = useState(isSaved);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [aiEnhancement, setAiEnhancement] = useState<string | null>(null);

  const handleSave = () => {
    setIsHearted(!isHearted);
    onSave?.();
  };

  const toggleStepExpansion = (index: number) => {
    setExpandedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const enhancementMutation = useMutation({
    mutationFn: async (specificQuestion?: string) => {
      if (!childAge) throw new Error('Child age is required');
      return activitiesService.getActivityEnhancement(activity.id, childAge, specificQuestion);
    },
    onSuccess: (data) => {
      setAiEnhancement(data.enhancement);
      setShowAIHelp(true);
    },
    onError: (error) => {
      console.error('Failed to get AI enhancement:', error);
    }
  });

  const handleGetAIHelp = () => {
    if (aiEnhancement) {
      setShowAIHelp(true);
    } else {
      enhancementMutation.mutate();
    }
  };

  // Use detailed steps if available, otherwise fall back to simple steps
  const stepsToRender = activity.stepsDetailed || activity.steps.map((step: string) => ({ 
    step,
    details: undefined,
    tips: undefined,
    ageVariations: undefined
  }));

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl border-3 border-purple-200 overflow-hidden scale-on-hover">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-purple-800 mb-3 bounce-gentle">{activity.title}</h3>
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800 text-sm font-bold rounded-full">
                🎂 Ages {activity.ageRange}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 text-sm font-bold rounded-full">
                ⏰ {activity.duration}
              </span>
            </div>
          </div>
          {showActions && (
            <div className="flex space-x-2">
              {onShuffle && (
                <button
                  onClick={onShuffle}
                  className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              {onSave && (
                <button
                  onClick={handleSave}
                  className={cn(
                    "p-2 transition-colors",
                    isHearted
                      ? "text-red-500"
                      : "text-neutral-400 hover:text-red-500"
                  )}
                >
                  <Heart className={cn("w-4 h-4", isHearted && "fill-current")} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Materials */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
            <span className="text-xl mr-2">🛍️</span>
            What you need:
          </h4>
          <div className="flex flex-wrap gap-3">
            {activity.materials.map((material, index) => (
              <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border-2 border-green-200">
                <span className="text-lg">{material.emoji}</span>
                <span className="text-sm font-semibold text-green-800">{material.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
            <span className="text-xl mr-2">📝</span>
            How to play:
          </h4>
          <ol className="space-y-3">
            {stepsToRender.map((stepData, index) => {
              const isExpanded = expandedSteps.includes(index);
              const hasDetails = stepData.details && stepData.details.length > 0;
              const step = typeof stepData === 'string' ? stepData : stepData.step;
              
              return (
                <li key={index} className="space-y-2">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-sm font-bold rounded-full flex items-center justify-center sparkle">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <span className="text-base text-purple-700 font-medium">{step}</span>
                        {hasDetails && (
                          <button
                            onClick={() => toggleStepExpansion(index)}
                            className="ml-2 text-purple-500 hover:text-purple-700 transition-colors flex items-center gap-1 text-sm"
                          >
                            <HelpCircle className="w-4 h-4" />
                            {isExpanded ? (
                              <>Hide <ChevronUp className="w-3 h-3" /></>
                            ) : (
                              <>Show me how <ChevronDown className="w-3 h-3" /></>
                            )}
                          </button>
                        )}
                      </div>
                      
                      {/* Expandable details */}
                      {isExpanded && hasDetails && (
                        <div className="mt-3 pl-2 border-l-2 border-purple-200 space-y-2">
                          {stepData.details?.map((detail: string, detailIndex: number) => (
                            <p key={detailIndex} className="text-sm text-purple-600">
                              • {detail}
                            </p>
                          ))}
                          {stepData.tips && (
                            <p className="text-sm text-purple-600 italic">
                              💡 Tip: {stepData.tips}
                            </p>
                          )}
                          {stepData.ageVariations && activity.minAge && activity.maxAge && (
                            <div className="text-sm text-purple-600">
                              <p className="font-semibold">Age variations:</p>
                              {Object.entries(stepData.ageVariations).map(([age, variation]) => (
                                <p key={age} className="ml-2">• {age}: {String(variation)}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Why it's great */}
        <div className="p-5 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-2xl border-2 border-yellow-200">
          <h4 className="text-lg font-bold text-purple-800 mb-2 flex items-center">
            <span className="text-xl mr-2">⭐</span>
            Why it's awesome:
          </h4>
          <p className="text-base text-purple-700 font-medium">{activity.whyGreat}</p>
          
          {/* AI Help Button */}
          {childAge && (
            <div className="mt-4 pt-3 border-t border-purple-200">
              <Button
                onClick={handleGetAIHelp}
                disabled={enhancementMutation.isPending}
                variant="outline"
                size="sm"
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                {enhancementMutation.isPending ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Getting AI tips...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get AI Help & Tips
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* AI Enhancement Modal/Overlay */}
        {showAIHelp && aiEnhancement && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-purple-800 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Tips for "{activity.title}"
                </h3>
                <Button
                  onClick={() => setShowAIHelp(false)}
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6">
                <div className="prose prose-purple max-w-none">
                  {aiEnhancement.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
