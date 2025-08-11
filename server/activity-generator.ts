import { db } from "./db.js";
import { activities } from "../shared/schema.js";
import { generateActivitiesWithClaude } from "./claude.js";
import { and, eq } from "drizzle-orm";

interface FilterCombination {
  ageRange: string;
  energyLevel: string;
  location: string;
  whoPlaying: string;
  targetCount: number;
}

// Define the filter combinations we want to ensure coverage for
const PRIORITY_COMBINATIONS: FilterCombination[] = [
  // 5-6 age group - calm activities
  { ageRange: "5-6", energyLevel: "calm", location: "indoor", whoPlaying: "together", targetCount: 3 },
  { ageRange: "5-6", energyLevel: "calm", location: "indoor", whoPlaying: "alone", targetCount: 2 },
  { ageRange: "5-6", energyLevel: "calm", location: "outdoor", whoPlaying: "together", targetCount: 2 },
  
  // 5-6 age group - active activities
  { ageRange: "5-6", energyLevel: "active", location: "indoor", whoPlaying: "together", targetCount: 3 },
  { ageRange: "5-6", energyLevel: "active", location: "outdoor", whoPlaying: "together", targetCount: 2 },
  { ageRange: "5-6", energyLevel: "active", location: "indoor", whoPlaying: "alone", targetCount: 2 },
  
  // 6-7 age group - calm activities  
  { ageRange: "6-7", energyLevel: "calm", location: "indoor", whoPlaying: "together", targetCount: 3 },
  { ageRange: "6-7", energyLevel: "calm", location: "indoor", whoPlaying: "alone", targetCount: 2 },
  { ageRange: "6-7", energyLevel: "calm", location: "outdoor", whoPlaying: "together", targetCount: 2 },
  
  // 6-7 age group - active activities
  { ageRange: "6-7", energyLevel: "active", location: "indoor", whoPlaying: "together", targetCount: 3 },
  { ageRange: "6-7", energyLevel: "active", location: "outdoor", whoPlaying: "together", targetCount: 2 },
  { ageRange: "6-7", energyLevel: "active", location: "indoor", whoPlaying: "alone", targetCount: 2 },
];

export async function analyzeActivityGaps() {
  console.log("Analyzing activity coverage gaps...");
  
  const gaps = [];
  
  for (const combo of PRIORITY_COMBINATIONS) {
    const [minAge, maxAge] = combo.ageRange.split('-').map(Number);
    
    const existingCount = await db
      .select()
      .from(activities)
      .where(
        and(
          eq(activities.minAge, minAge),
          eq(activities.maxAge, maxAge),
          eq(activities.energyLevel, combo.energyLevel),
          eq(activities.location, combo.location),
          eq(activities.whoPlaying, combo.whoPlaying)
        )
      );
    
    const currentCount = existingCount.length;
    const needed = Math.max(0, combo.targetCount - currentCount);
    
    if (needed > 0) {
      gaps.push({
        ...combo,
        currentCount,
        needed
      });
    }
    
    console.log(`${combo.ageRange} ${combo.energyLevel} ${combo.location} ${combo.whoPlaying}: ${currentCount}/${combo.targetCount} (need ${needed})`);
  }
  
  return gaps;
}

export async function generateMissingActivities() {
  const gaps = await analyzeActivityGaps();
  
  if (gaps.length === 0) {
    console.log("No activity gaps found - all combinations have sufficient coverage!");
    return [];
  }
  
  console.log(`Found ${gaps.length} gaps to fill`);
  const newActivities = [];
  
  for (const gap of gaps) {
    console.log(`Generating ${gap.needed} activities for ${gap.ageRange} ${gap.energyLevel} ${gap.location} ${gap.whoPlaying}...`);
    
    try {
      const generatedActivities = await generateActivitiesWithClaude({
        ageRange: gap.ageRange,
        energyLevel: gap.energyLevel,
        location: gap.location,
        whoPlaying: gap.whoPlaying,
        interests: ["creative", "educational", "active"], // Default interests
        count: gap.needed
      });
      
      // Insert activities into database
      if (generatedActivities && generatedActivities.length > 0) {
        await db.insert(activities).values(generatedActivities);
        newActivities.push(...generatedActivities);
        console.log(`✅ Added ${generatedActivities.length} activities for ${gap.ageRange} ${gap.energyLevel} ${gap.location}`);
      }
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Failed to generate activities for ${gap.ageRange} ${gap.energyLevel} ${gap.location}:`, error);
    }
  }
  
  console.log(`\n🎉 Generated ${newActivities.length} new activities total!`);
  return newActivities;
}