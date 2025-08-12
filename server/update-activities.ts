import { db } from "./db.js";
import { activities } from "../shared/schema.js";
import { eq } from "drizzle-orm";
import { improvedActivities } from "./improved-activities.js";

// Map old titles to new improved activities
const activityReplacements = [
  {
    oldTitle: "Music Composition Basics",
    newActivity: improvedActivities[0] // Kitchen Music Lab
  },
  {
    oldTitle: "Engineering Design Challenge", 
    newActivity: improvedActivities[1] // Bridge Building Challenge
  },
  {
    oldTitle: "Research Project Fun",
    newActivity: improvedActivities[2] // Backyard Science Detective
  },
  {
    oldTitle: "Cultural Research Project",
    newActivity: improvedActivities[4] // Pizza Restaurant Math (replacing repetitive research)
  },
  {
    oldTitle: "Story Writing Workshop",
    newActivity: improvedActivities[3] // Story Dice Adventure
  }
];

export async function updateActivitiesToImproved() {
  console.log("Starting activity improvements...");
  
  for (const replacement of activityReplacements) {
    try {
      // Find the existing activity
      const [existingActivity] = await db
        .select()
        .from(activities)
        .where(eq(activities.title, replacement.oldTitle))
        .limit(1);
      
      if (existingActivity) {
        // Update with improved version
        await db
          .update(activities)
          .set({
            title: replacement.newActivity.title,
            materials: replacement.newActivity.materials,
            steps: replacement.newActivity.steps,
            stepsDetailed: replacement.newActivity.stepsDetailed,
            whyGreat: replacement.newActivity.whyGreat,
            tags: replacement.newActivity.tags,
            // Keep existing age ranges and other properties
            // but update if provided in new activity
            ...replacement.newActivity
          })
          .where(eq(activities.id, existingActivity.id));
        
        console.log(`✅ Updated: ${replacement.oldTitle} → ${replacement.newActivity.title}`);
      } else {
        console.log(`⚠️ Not found: ${replacement.oldTitle}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${replacement.oldTitle}:`, error);
    }
  }
  
  console.log("Activity improvements complete!");
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateActivitiesToImproved()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Failed to update activities:", error);
      process.exit(1);
    });
}