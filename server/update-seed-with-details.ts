import { readFileSync, writeFileSync } from "fs";
import { activitiesToRemove, enhancedActivities, titleUpdates, calmActivities } from "./dedupe-and-enhance-activities.js";

// Read current seed file
const seedPath = "./seed.ts";
const seedContent = readFileSync(seedPath, "utf-8");

// Parse activities from seed file
const lines = seedContent.split('\n');
let updatedLines: string[] = [];
let inActivityToRemove = false;
let braceCount = 0;
let currentActivityTitle = "";
let skipUntilNextActivity = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if we're starting a new activity
  if (line.includes('title:') && line.includes('"')) {
    const titleMatch = line.match(/title:\s*"([^"]+)"/);
    if (titleMatch) {
      currentActivityTitle = titleMatch[1];
      inActivityToRemove = activitiesToRemove.includes(currentActivityTitle);
      skipUntilNextActivity = inActivityToRemove;
      
      if (inActivityToRemove) {
        // Skip this activity - find the closing brace
        braceCount = 1;
        continue;
      }
      
      // Check if title needs updating
      const titleUpdate = titleUpdates.find(u => u.oldTitle === currentActivityTitle);
      if (titleUpdate) {
        line.replace(currentActivityTitle, titleUpdate.newTitle);
        updatedLines.push(line.replace(currentActivityTitle, titleUpdate.newTitle));
        continue;
      }
    }
  }
  
  // Skip lines if we're removing an activity
  if (skipUntilNextActivity) {
    if (line.includes('{')) braceCount++;
    if (line.includes('}')) {
      braceCount--;
      if (braceCount === 0) {
        skipUntilNextActivity = false;
        inActivityToRemove = false;
        // Skip the comma after the closing brace if it exists
        if (i + 1 < lines.length && lines[i + 1].trim() === ',') {
          i++;
        }
      }
    }
    continue;
  }
  
  // Check if we need to add detailedInfo to this activity
  const allEnhanced = [...enhancedActivities, ...calmActivities];
  const enhancement = allEnhanced.find(e => e.title === currentActivityTitle);
  
  if (enhancement && line.includes('skillRequirements:')) {
    // Add detailedInfo before skillRequirements
    updatedLines.push(`    detailedInfo: ${JSON.stringify(enhancement.detailedInfo, null, 6).split('\\n').join('\\n    ')},`);
  }
  
  updatedLines.push(line);
}

// Write updated seed file
const updatedContent = updatedLines.join('\n');

// Create backup first
writeFileSync("./seed.backup.ts", seedContent);
console.log("✅ Created backup at seed.backup.ts");

// Write updated seed
writeFileSync(seedPath, updatedContent);
console.log("✅ Updated seed.ts with:");
console.log(`  - Removed ${activitiesToRemove.length} duplicate activities`);
console.log(`  - Added detailedInfo to ${enhancedActivities.length + calmActivities.length} activities`);
console.log(`  - Updated ${titleUpdates.length} activity titles`);

// Summary of changes
console.log("\n📋 CHANGES SUMMARY:");
console.log("\nRemoved activities:");
activitiesToRemove.forEach(title => console.log(`  ❌ ${title}`));

console.log("\nEnhanced with detailedInfo:");
[...enhancedActivities, ...calmActivities].forEach(act => console.log(`  ✅ ${act.title}`));

console.log("\nRenamed activities:");
titleUpdates.forEach(update => console.log(`  📝 ${update.oldTitle} → ${update.newTitle}`));

console.log("\n🎯 Next steps:");
console.log("1. Review the updated seed.ts file");
console.log("2. Run 'npm run db:seed' to update the database");
console.log("3. Test the app to see the new detailed views");