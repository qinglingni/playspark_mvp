import { db } from "./db";
import { activities, type Activity } from "@shared/schema";

const seedActivities: Omit<Activity, 'id'>[] = [
  {
    title: "Paper Airplane Contest",
    materials: [
      { emoji: "📄", name: "Paper" },
      { emoji: "✏️", name: "Crayons" },
      { emoji: "📏", name: "Ruler" }
    ],
    steps: [
      "Fold different types of paper airplanes together",
      "Decorate each plane with unique designs",
      "Test which plane flies the farthest!"
    ],
    whyGreat: "Combines creativity with science! Kids learn about aerodynamics while expressing their artistic side.",
    ageRange: "4-8",
    minAge: 4,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["creative", "educational", "indoor", "little-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["arts", "science"],
    skillRequirements: null
  },
  {
    title: "Indoor Treasure Hunt",
    materials: [
      { emoji: "📝", name: "Paper" },
      { emoji: "🖍️", name: "Crayons" },
      { emoji: "🏠", name: "Household items" }
    ],
    steps: [
      "Draw simple picture clues leading to different rooms",
      "Hide clues around the house",
      "Follow the trail to find the treasure!"
    ],
    whyGreat: "Develops problem-solving skills and keeps kids active indoors. Great for rainy days!",
    ageRange: "3-7",
    minAge: 3,
    maxAge: 7,
    developmentStage: "late-preschool",
    duration: "30 min",
    tags: ["adventure", "problem-solving", "indoor", "no-mess", "basic"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "together",
    interests: ["adventure"],
    skillRequirements: null
  },
  {
    title: "Dance Party Freeze",
    materials: [
      { emoji: "🎵", name: "Music player" },
      { emoji: "🕺", name: "Space to dance" }
    ],
    steps: [
      "Play upbeat music and dance together",
      "When music stops, freeze like statues!",
      "Try silly poses and take turns being the statue judge"
    ],
    whyGreat: "Burns energy, improves listening skills, and creates joyful bonding moments!",
    ageRange: "2-6",
    minAge: 2,
    maxAge: 6,
    developmentStage: "early-preschool",
    duration: "30 min",
    tags: ["movement", "music", "silly", "no-mess", "none"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["music", "movement"],
    skillRequirements: null
  },
  {
    title: "Nature Scavenger Hunt",
    materials: [
      { emoji: "📋", name: "Checklist" },
      { emoji: "✏️", name: "Pencil" },
      { emoji: "🎒", name: "Collection bag" }
    ],
    steps: [
      "Create a list of outdoor items to find",
      "Explore the backyard or park together",
      "Check off items as you discover them"
    ],
    whyGreat: "Encourages observation skills and outdoor exploration while learning about nature.",
    ageRange: "3-8",
    minAge: 3,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "60 min",
    tags: ["nature", "exploration", "educational", "no-mess", "basic"],
    energyLevel: "active",
    location: "outdoor",
    whoPlaying: "together",
    interests: ["science", "outdoor"],
    skillRequirements: null
  },
  {
    title: "Story Building Game",
    materials: [
      { emoji: "📚", name: "Picture books" },
      { emoji: "🎭", name: "Imagination" }
    ],
    steps: [
      "Start a story with one sentence",
      "Take turns adding one sentence each",
      "See where your silly story adventure goes!"
    ],
    whyGreat: "Builds language skills, creativity, and turn-taking while having fun together.",
    ageRange: "3-7",
    minAge: 3,
    maxAge: 7,
    developmentStage: "late-preschool",
    duration: "15 min",
    tags: ["language", "creative", "calm", "no-mess", "none"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["reading", "creative"],
    skillRequirements: null
  }
];

export async function seedDatabase() {
  console.log("Seeding database with activities...");
  
  // Check if activities already exist
  const existingActivities = await db.select().from(activities).limit(1);
  if (existingActivities.length > 0) {
    console.log("Activities already exist, skipping seed...");
    return;
  }
  
  try {
    await db.insert(activities).values(seedActivities);
    console.log(`Successfully seeded ${seedActivities.length} activities`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}