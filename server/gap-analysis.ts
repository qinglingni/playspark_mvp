import { storage } from "./storage";
import { ActivityFilters } from "@shared/schema";

export interface GapAnalysis {
  missingCombinations: FilterCombination[];
  lowCoverageCombinations: FilterCombination[];
  totalCombinations: number;
  coveredCombinations: number;
  coveragePercentage: number;
}

export interface FilterCombination {
  energyLevel: string;
  location: string;
  whoPlaying: string;
  ageRange: string;
  activityCount: number;
  minAge: number;
  maxAge: number;
}

export async function analyzeActivityGaps(): Promise<GapAnalysis> {
  const activities = await storage.getActivities();
  
  // Define all possible filter combinations
  const energyLevels = ["calm", "focused", "active", "silly"];
  const locations = ["indoor", "outdoor"];
  const whoPlayingOptions = ["alone", "together", "group"];
  const ageRanges = [
    { label: "5-6", min: 5, max: 6 },
    { label: "6-7", min: 6, max: 7 },
    { label: "7-8", min: 7, max: 8 }
  ];

  const allCombinations: FilterCombination[] = [];
  const missingCombinations: FilterCombination[] = [];
  const lowCoverageCombinations: FilterCombination[] = [];

  for (const energyLevel of energyLevels) {
    for (const location of locations) {
      for (const whoPlaying of whoPlayingOptions) {
        for (const ageRange of ageRanges) {
          // Count activities matching this combination
          const matchingActivities = activities.filter(activity => {
            const ageMatch = activity.minAge !== null && activity.maxAge !== null &&
              ageRange.min >= activity.minAge && ageRange.max <= activity.maxAge;
            return (
              activity.energyLevel === energyLevel &&
              activity.location === location &&
              activity.whoPlaying === whoPlaying &&
              ageMatch
            );
          });

          const combination: FilterCombination = {
            energyLevel,
            location,
            whoPlaying,
            ageRange: ageRange.label,
            activityCount: matchingActivities.length,
            minAge: ageRange.min,
            maxAge: ageRange.max
          };

          allCombinations.push(combination);

          if (matchingActivities.length === 0) {
            missingCombinations.push(combination);
          } else if (matchingActivities.length < 2) {
            lowCoverageCombinations.push(combination);
          }
        }
      }
    }
  }

  const totalCombinations = allCombinations.length;
  const coveredCombinations = allCombinations.filter(c => c.activityCount > 0).length;
  const coveragePercentage = Math.round((coveredCombinations / totalCombinations) * 100);

  return {
    missingCombinations,
    lowCoverageCombinations,
    totalCombinations,
    coveredCombinations,
    coveragePercentage
  };
}

export function prioritizeGaps(gaps: GapAnalysis): FilterCombination[] {
  // Priority order:
  // 1. Missing combinations with common filters first
  // 2. Low coverage combinations
  
  const priorityOrder = (combo: FilterCombination): number => {
    let priority = 0;
    
    // Higher priority for missing vs low coverage
    if (combo.activityCount === 0) priority += 100;
    
    // Higher priority for common energy levels
    if (combo.energyLevel === "focused" || combo.energyLevel === "active") priority += 20;
    if (combo.energyLevel === "silly") priority += 15; // User specifically mentioned this
    
    // Higher priority for indoor activities
    if (combo.location === "indoor") priority += 10;
    
    // Higher priority for together activities
    if (combo.whoPlaying === "together") priority += 10;
    
    return priority;
  };

  const allGaps = [...gaps.missingCombinations, ...gaps.lowCoverageCombinations];
  return allGaps.sort((a, b) => priorityOrder(b) - priorityOrder(a));
}