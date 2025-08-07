import { Activity } from "@shared/schema";
import { useState } from "react";
import { Heart, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const handleSave = () => {
    setIsHearted(!isHearted);
    onSave?.();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">{activity.title}</h3>
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                Ages {activity.ageRange}
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                {activity.duration}
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
        <div className="mb-4">
          <h4 className="font-semibold text-neutral-900 mb-2">Materials needed:</h4>
          <div className="flex flex-wrap gap-2">
            {activity.materials.map((material, index) => (
              <div key={index} className="flex items-center space-x-1 px-3 py-1 bg-neutral-100 rounded-lg">
                <span>{material.emoji}</span>
                <span className="text-sm">{material.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="mb-4">
          <h4 className="font-semibold text-neutral-900 mb-2">Steps:</h4>
          <ol className="space-y-2">
            {activity.steps.map((step, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm text-neutral-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Why it's great */}
        <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
          <h4 className="font-semibold text-neutral-900 mb-1">Why it's great:</h4>
          <p className="text-sm text-neutral-700">{activity.whyGreat}</p>
        </div>
      </div>
    </div>
  );
}
