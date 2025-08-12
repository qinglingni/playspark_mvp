import { Activity } from "@shared/schema";
import { useState } from "react";
import { Heart, RotateCcw, ChevronDown, ChevronUp, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActivityCardProps {
  activity: Activity;
  onSave?: () => void;
  onShuffle?: () => void;
  isSaved?: boolean;
  showActions?: boolean;
}

export function ActivityCard({ 
  activity, 
  onSave, 
  onShuffle, 
  isSaved = false, 
  showActions = true
}: ActivityCardProps) {
  const [isHearted, setIsHearted] = useState(isSaved);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [showDetails, setShowDetails] = useState(false);

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

  // Use detailed steps if available, otherwise fall back to simple steps
  const stepsToRender = activity.detailedInfo?.detailedSteps || activity.steps.map((step: string) => ({ 
    step,
    description: "",
    tips: []
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
            {stepsToRender.map((step, index) => (
              <li key={index} className="space-y-2">
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-sm font-bold rounded-full flex items-center justify-center sparkle">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-base text-purple-700 font-medium">{step.step}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Why it's great */}
        <div className="p-5 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-2xl border-2 border-yellow-200">
          <h4 className="text-lg font-bold text-purple-800 mb-2 flex items-center">
            <span className="text-xl mr-2">⭐</span>
            Why it's awesome:
          </h4>
          <p className="text-base text-purple-700 font-medium">{activity.whyGreat}</p>
          
          {/* Details Button */}
          {activity.detailedInfo && (
            <div className="mt-4 pt-3 border-t border-purple-200">
              <Button
                onClick={() => setShowDetails(true)}
                variant="outline"
                size="sm"
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Info className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          )}
        </div>

        {/* Mobile-Optimized Details Panel */}
        {showDetails && activity.detailedInfo && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
            {/* Mobile: Slide up from bottom, Desktop: Center modal */}
            <div className="bg-white w-full h-[90vh] sm:h-auto sm:max-w-2xl sm:max-h-[85vh] sm:rounded-2xl shadow-2xl sm:m-4 flex flex-col">
              {/* Header */}
              <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between sm:rounded-t-2xl">
                <h3 className="text-lg font-bold text-purple-800 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Details for "{activity.title}"
                </h3>
                <Button
                  onClick={() => setShowDetails(false)}
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6"
                   style={{ 
                     height: 'calc(90vh - 80px)', 
                     WebkitOverflowScrolling: 'touch' 
                   }}>
                {/* Detailed Steps */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">Step-by-Step Guide</h4>
                  <div className="space-y-3">
                    {activity.detailedInfo.detailedSteps.map((step, index) => (
                      <div key={index} className="bg-purple-50 rounded-lg p-3">
                        <div className="font-medium text-purple-900 mb-1">
                          {index + 1}. {step.step}
                        </div>
                        {step.description && (
                          <p className="text-purple-700 text-sm mb-2">{step.description}</p>
                        )}
                        {step.tips.length > 0 && (
                          <div className="space-y-1">
                            {step.tips.map((tip, tipIndex) => (
                              <div key={tipIndex} className="text-purple-600 text-sm flex items-start">
                                <span className="mr-1">💡</span>
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Benefits */}
                {activity.detailedInfo.learningBenefits.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Learning Benefits</h4>
                    <div className="space-y-2">
                      {activity.detailedInfo.learningBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start text-purple-700">
                          <span className="mr-2">🧠</span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safety Tips */}
                {activity.detailedInfo.safetyTips.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Safety Tips</h4>
                    <div className="space-y-2">
                      {activity.detailedInfo.safetyTips.map((tip, index) => (
                        <div key={index} className="flex items-start text-orange-700 bg-orange-50 p-2 rounded">
                          <span className="mr-2">⚠️</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variations */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">Variations</h4>
                  <div className="space-y-3">
                    {activity.detailedInfo.variations.easier && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="font-medium text-green-800 mb-1">🟢 Make it Easier</div>
                        <p className="text-green-700 text-sm">{activity.detailedInfo.variations.easier}</p>
                      </div>
                    )}
                    {activity.detailedInfo.variations.harder && (
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="font-medium text-red-800 mb-1">🔴 Make it Harder</div>
                        <p className="text-red-700 text-sm">{activity.detailedInfo.variations.harder}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Parent Tips */}
                {activity.detailedInfo.parentTips.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Parent Tips</h4>
                    <div className="space-y-2">
                      {activity.detailedInfo.parentTips.map((tip, index) => (
                        <div key={index} className="flex items-start text-blue-700 bg-blue-50 p-2 rounded">
                          <span className="mr-2">👨‍👩‍👧‍👦</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Bottom padding for safe scrolling */}
                <div className="pb-6"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
