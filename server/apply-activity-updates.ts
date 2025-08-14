import { db } from "./db.js";
import { activities } from "../shared/schema.js";
import { eq, and, sql } from "drizzle-orm";
import { activitiesToRemove, enhancedActivities, titleUpdates, calmActivities } from "./dedupe-and-enhance-activities.js";

async function applyUpdates() {
  console.log("🚀 Starting activity updates...\n");

  // 1. Remove duplicate activities
  console.log("📝 Removing duplicate activities...");
  for (const titleToRemove of activitiesToRemove) {
    try {
      const result = await db
        .delete(activities)
        .where(eq(activities.title, titleToRemove));
      console.log(`  ❌ Removed: ${titleToRemove}`);
    } catch (error) {
      console.log(`  ⚠️ Could not remove ${titleToRemove}:`, error.message);
    }
  }

  // 2. Update activity titles
  console.log("\n📝 Updating activity titles...");
  for (const update of titleUpdates) {
    try {
      await db
        .update(activities)
        .set({ title: update.newTitle })
        .where(eq(activities.title, update.oldTitle));
      console.log(`  📝 Renamed: ${update.oldTitle} → ${update.newTitle}`);
    } catch (error) {
      console.log(`  ⚠️ Could not rename ${update.oldTitle}:`, error.message);
    }
  }

  // 3. Add detailedInfo to activities
  console.log("\n📝 Adding detailed information...");
  const allEnhanced = [...enhancedActivities, ...calmActivities];
  
  for (const enhancement of allEnhanced) {
    try {
      await db
        .update(activities)
        .set({ 
          detailedInfo: enhancement.detailedInfo 
        })
        .where(
          and(
            eq(activities.title, enhancement.title),
            eq(activities.ageRange, enhancement.ageRange)
          )
        );
      console.log(`  ✅ Enhanced: ${enhancement.title} (${enhancement.ageRange})`);
    } catch (error) {
      console.log(`  ⚠️ Could not enhance ${enhancement.title}:`, error.message);
    }
  }

  // 4. Verify changes
  console.log("\n📊 Verification:");
  
  // Count activities with detailedInfo
  const withDetails = await db
    .select({ count: sql<number>`count(*)` })
    .from(activities)
    .where(sql`detailed_info IS NOT NULL`);
  
  console.log(`  Activities with detailedInfo: ${withDetails[0]?.count || 0}`);
  
  // Count activities for 5-6 and 6-7 age ranges
  const ageCount5_6 = await db
    .select({ count: sql<number>`count(*)` })
    .from(activities)
    .where(eq(activities.ageRange, "5-6"));
    
  const ageCount6_7 = await db
    .select({ count: sql<number>`count(*)` })
    .from(activities)
    .where(eq(activities.ageRange, "6-7"));
  
  console.log(`  Activities for age 5-6: ${ageCount5_6[0]?.count || 0}`);
  console.log(`  Activities for age 6-7: ${ageCount6_7[0]?.count || 0}`);

  console.log("\n✅ Activity updates complete!");
  console.log("\n🎯 Next steps:");
  console.log("1. Test the app to see the enhanced activity details");
  console.log("2. Click 'View Details' on activities to see the new information");
  console.log("3. Verify duplicate activities have been removed");
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  applyUpdates()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Failed to update activities:", error);
      process.exit(1);
    });
}