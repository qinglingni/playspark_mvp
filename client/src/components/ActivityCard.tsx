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
            {activity.steps.map((step, index) => (
              <li key={index} className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-sm font-bold rounded-full flex items-center justify-center sparkle">
                  {index + 1}
                </span>
                <span className="text-base text-purple-700 font-medium">{step}</span>
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
        </div>
      </div>
    </div>
  );
}
