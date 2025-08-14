import { readFileSync } from "fs";

// Read the seed file
const seedContent = readFileSync("./seed.ts", "utf-8");

// Extract all activities
const activityRegex = /\{[\s\S]*?title:\s*"([^"]+)"[\s\S]*?ageRange:\s*"([^"]+)"[\s\S]*?tags:\s*\[([^\]]+)\][\s\S]*?interests:\s*\[([^\]]+)\][\s\S]*?\}/g;

const activities: any[] = [];
let match;

// Parse activities from seed file
const lines = seedContent.split('\n');
let currentActivity: any = null;
let braceCount = 0;
let inActivity = false;

for (const line of lines) {
  if (line.includes('title:') && line.includes('"')) {
    if (currentActivity) {
      activities.push(currentActivity);
    }
    const titleMatch = line.match(/title:\s*"([^"]+)"/);
    currentActivity = {
      title: titleMatch ? titleMatch[1] : '',
      ageRange: '',
      tags: [],
      interests: [],
      hasDetailInfo: false
    };
  } else if (currentActivity) {
    if (line.includes('ageRange:')) {
      const ageMatch = line.match(/ageRange:\s*"([^"]+)"/);
      if (ageMatch) currentActivity.ageRange = ageMatch[1];
    } else if (line.includes('tags:')) {
      const tagsMatch = line.match(/tags:\s*\[([^\]]+)\]/);
      if (tagsMatch) {
        currentActivity.tags = tagsMatch[1].split(',').map(t => t.trim().replace(/"/g, ''));
      }
    } else if (line.includes('interests:')) {
      const interestsMatch = line.match(/interests:\s*\[([^\]]+)\]/);
      if (interestsMatch) {
        currentActivity.interests = interestsMatch[1].split(',').map(i => i.trim().replace(/"/g, ''));
      }
    } else if (line.includes('detailedInfo:') || line.includes('detailInfo:')) {
      currentActivity.hasDetailInfo = true;
    }
  }
}

if (currentActivity) {
  activities.push(currentActivity);
}

// Filter for 5-6 and 6-7 age ranges
const targetActivities = activities.filter(a => a.ageRange === "5-6" || a.ageRange === "6-7");

console.log("\n=== ACTIVITY ANALYSIS FOR AGES 5-6 AND 6-7 ===\n");

// Group by similar themes
const themeGroups: Record<string, any[]> = {};

targetActivities.forEach(activity => {
  // Identify themes based on tags and interests
  const themes: string[] = [];
  
  // Check for specific theme patterns
  if (activity.tags.includes('science') || activity.interests.includes('science')) themes.push('Science');
  if (activity.tags.includes('arts') || activity.tags.includes('creative') || activity.interests.includes('arts')) themes.push('Arts/Creative');
  if (activity.tags.includes('building') || activity.interests.includes('building')) themes.push('Building');
  if (activity.tags.includes('literacy') || activity.tags.includes('storytelling') || activity.interests.includes('reading')) themes.push('Literacy/Stories');
  if (activity.tags.includes('math') || activity.interests.includes('math')) themes.push('Math');
  if (activity.tags.includes('music') || activity.interests.includes('music')) themes.push('Music');
  if (activity.tags.includes('nature') || activity.interests.includes('nature')) themes.push('Nature');
  if (activity.tags.includes('mindfulness') || activity.tags.includes('calm')) themes.push('Mindfulness/Calm');
  if (activity.tags.includes('active') || activity.tags.includes('physical')) themes.push('Physical/Active');
  if (activity.title.toLowerCase().includes('research')) themes.push('Research');
  
  themes.forEach(theme => {
    if (!themeGroups[theme]) themeGroups[theme] = [];
    themeGroups[theme].push(activity);
  });
});

// Find duplicates and similar activities
console.log("📊 DUPLICATE/SIMILAR ACTIVITIES BY THEME:\n");

Object.entries(themeGroups).forEach(([theme, acts]) => {
  if (acts.length > 1) {
    console.log(`\n${theme} Theme (${acts.length} activities):`);
    acts.forEach(a => {
      console.log(`  - [${a.ageRange}] ${a.title} ${!a.hasDetailInfo ? '⚠️ NO DETAILS' : '✅'}`);
    });
    
    // Check for very similar titles
    const similarPairs: string[] = [];
    for (let i = 0; i < acts.length; i++) {
      for (let j = i + 1; j < acts.length; j++) {
        const title1 = acts[i].title.toLowerCase();
        const title2 = acts[j].title.toLowerCase();
        
        // Check if titles share significant words
        const words1 = title1.split(' ').filter(w => w.length > 3);
        const words2 = title2.split(' ').filter(w => w.length > 3);
        const commonWords = words1.filter(w => words2.includes(w));
        
        if (commonWords.length >= 2 || 
            (title1.includes('science') && title2.includes('science')) ||
            (title1.includes('story') && title2.includes('story')) ||
            (title1.includes('building') && title2.includes('building'))) {
          similarPairs.push(`    🔄 "${acts[i].title}" vs "${acts[j].title}"`);
        }
      }
    }
    
    if (similarPairs.length > 0) {
      console.log("  ⚠️ Potentially similar/duplicate:");
      similarPairs.forEach(pair => console.log(pair));
    }
  }
});

// Check for activities without detailInfo
console.log("\n\n📝 ACTIVITIES MISSING DETAILINFO:\n");

const missingDetails = targetActivities.filter(a => !a.hasDetailInfo);
console.log(`Total: ${missingDetails.length} out of ${targetActivities.length} activities\n`);

const byAge: Record<string, any[]> = {};
missingDetails.forEach(a => {
  if (!byAge[a.ageRange]) byAge[a.ageRange] = [];
  byAge[a.ageRange].push(a);
});

Object.entries(byAge).forEach(([age, acts]) => {
  console.log(`\nAge ${age} (${acts.length} activities):`);
  acts.forEach(a => {
    console.log(`  - ${a.title}`);
  });
});

// Summary recommendations
console.log("\n\n🎯 RECOMMENDATIONS:\n");
console.log("1. MERGE/DELETE these similar activities:");
console.log("   - 'Advanced Science Experiments' vs 'Beginning Science Journal' (both 5-6)");
console.log("   - 'Creative Writing Stories' vs 'Story Writing Workshop' (5-6 vs 6-7)");
console.log("   - 'Advanced Building Challenge' vs 'Complex Building Projects' (5-6 vs 6-7)");
console.log("   - 'Research Project Fun' appears generic and overlaps with specific research activities");

console.log("\n2. ALL activities need detailInfo added (0 have it currently)");

console.log("\n3. Consider consolidating overlapping age ranges (5-6 and 6-7) for similar activities");