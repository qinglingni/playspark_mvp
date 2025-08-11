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
  },
  {
    title: "Kitchen Science Experiments",
    materials: [
      { emoji: "🧪", name: "Baking soda" },
      { emoji: "🍋", name: "Vinegar" },
      { emoji: "🎨", name: "Food coloring" }
    ],
    steps: [
      "Mix baking soda and vinegar to create fizzing reactions",
      "Add food coloring for colorful eruptions",
      "Discuss what's happening scientifically"
    ],
    whyGreat: "Introduces basic chemistry concepts in a safe, hands-on way that kids love!",
    ageRange: "4-8",
    minAge: 4,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["science", "messy", "educational", "messy", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["science"],
    skillRequirements: null
  },
  {
    title: "Puzzle Time Challenge",
    materials: [
      { emoji: "🧩", name: "Age-appropriate puzzles" },
      { emoji: "⏰", name: "Timer" }
    ],
    steps: [
      "Choose a puzzle suitable for your child's age",
      "Work together to complete it",
      "Celebrate completion with a victory dance!"
    ],
    whyGreat: "Develops problem-solving skills, patience, and fine motor coordination.",
    ageRange: "2-8",
    minAge: 2,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["problem-solving", "quiet", "focused", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["puzzles"],
    skillRequirements: null
  },
  {
    title: "Card Memory Game",
    materials: [
      { emoji: "🃏", name: "Deck of cards" },
      { emoji: "🧠", name: "Memory skills" }
    ],
    steps: [
      "Lay out 6-12 cards face down in a grid",
      "Take turns flipping two cards to find matches",
      "Keep matches when you find pairs!"
    ],
    whyGreat: "Improves memory, concentration, and turn-taking skills in a classic game format.",
    ageRange: "4-8",
    minAge: 4,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "15 min",
    tags: ["games", "memory", "focused", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["games"],
    skillRequirements: null
  },
  {
    title: "Simple Board Game Fun",
    materials: [
      { emoji: "🎲", name: "Board game" },
      { emoji: "⭐", name: "Game pieces" }
    ],
    steps: [
      "Choose an age-appropriate board game",
      "Take turns rolling dice and moving pieces",
      "Celebrate wins and good sportsmanship!"
    ],
    whyGreat: "Teaches rules, strategy, patience, and social skills in a structured, fun way.",
    ageRange: "3-8",
    minAge: 3,
    maxAge: 8,
    developmentStage: "late-preschool",
    duration: "30 min",
    tags: ["games", "strategy", "social", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "group",
    interests: ["games"],
    skillRequirements: null
  },
  {
    title: "Messy Paint Creation",
    materials: [
      { emoji: "🎨", name: "Washable paints" },
      { emoji: "📄", name: "Big paper" },
      { emoji: "🖌️", name: "Brushes" }
    ],
    steps: [
      "Set up a protected painting area",
      "Let creativity flow with finger painting or brushes",
      "Display the masterpiece when dry!"
    ],
    whyGreat: "Encourages self-expression, creativity, and sensory exploration through art.",
    ageRange: "2-6",
    minAge: 2,
    maxAge: 6,
    developmentStage: "early-preschool",
    duration: "45 min",
    tags: ["arts", "creative", "sensory", "messy", "special"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["arts", "creative"],
    skillRequirements: null
  },
  {
    title: "Solo Reading Adventure",
    materials: [
      { emoji: "📖", name: "Picture books" },
      { emoji: "🛋️", name: "Cozy spot" }
    ],
    steps: [
      "Choose a few favorite books or discover new ones",
      "Find a comfortable reading spot",
      "Enjoy quiet story time at their own pace"
    ],
    whyGreat: "Builds independence, vocabulary, and imagination while enjoying peaceful quiet time.",
    ageRange: "3-8",
    minAge: 3,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["reading", "quiet", "independent", "no-mess", "none"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["reading"],
    skillRequirements: null
  },
  {
    title: "Outdoor Obstacle Course",
    materials: [
      { emoji: "🏃", name: "Space to run" },
      { emoji: "📦", name: "Household items for obstacles" },
      { emoji: "⏱️", name: "Timer (optional)" }
    ],
    steps: [
      "Set up obstacles using chairs, pillows, ropes",
      "Create challenges: crawl under, jump over, balance",
      "Time runs and celebrate improvements!"
    ],
    whyGreat: "Develops gross motor skills, coordination, and provides great physical exercise.",
    ageRange: "4-8",
    minAge: 4,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "45 min",
    tags: ["physical", "active", "outdoor", "little-mess", "basic"],
    energyLevel: "active",
    location: "outdoor",
    whoPlaying: "together",
    interests: ["sports", "outdoor"],
    skillRequirements: null
  },
  {
    title: "Building Block Challenge",
    materials: [
      { emoji: "🧱", name: "Building blocks or LEGO" },
      { emoji: "📐", name: "Ruler (optional)" }
    ],
    steps: [
      "Challenge: build the tallest tower possible",
      "Try different designs and structures",
      "Test stability by adding one more block"
    ],
    whyGreat: "Enhances spatial reasoning, engineering thinking, and problem-solving skills.",
    ageRange: "3-8",
    minAge: 3,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "45 min",
    tags: ["building", "creative", "focused", "little-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["creative", "puzzles"],
    skillRequirements: null
  },
  {
    title: "Musical Instruments Band",
    materials: [
      { emoji: "🥄", name: "Kitchen utensils" },
      { emoji: "📦", name: "Empty boxes" },
      { emoji: "🎵", name: "Music to play along" }
    ],
    steps: [
      "Create instruments from household items",
      "Practice different rhythms and sounds",
      "Put on a concert for family!"
    ],
    whyGreat: "Develops rhythm, creativity, and confidence while exploring music and sound.",
    ageRange: "3-7",
    minAge: 3,
    maxAge: 7,
    developmentStage: "late-preschool",
    duration: "30 min",
    tags: ["music", "creative", "active", "little-mess", "basic"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "together",
    interests: ["music", "creative"],
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