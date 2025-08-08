import { type User, type InsertUser, type KidProfile, type InsertKidProfile, type Activity, type InsertActivity, type SavedActivity, type InsertSavedActivity, users, kidProfiles, activities, savedActivities } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getKidProfile(userId?: string): Promise<KidProfile | undefined>;
  createKidProfile(profile: InsertKidProfile, userId?: string): Promise<KidProfile>;
  updateKidProfile(id: string, profile: Partial<InsertKidProfile>): Promise<KidProfile | undefined>;
  
  getActivities(): Promise<Activity[]>;
  getActivitiesByFilters(filters: any, interests: string[], age: number): Promise<Activity[]>;
  
  getSavedActivities(userId?: string): Promise<SavedActivity[]>;
  saveActivity(activityId: string, userId?: string): Promise<SavedActivity>;
  removeSavedActivity(id: string): Promise<boolean>;
  markActivityAsUsed(id: string, isUsed: boolean): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getKidProfile(userId?: string): Promise<KidProfile | undefined> {
    if (!userId) {
      const [profile] = await db.select().from(kidProfiles).limit(1);
      return profile || undefined;
    }
    const [profile] = await db.select().from(kidProfiles).where(eq(kidProfiles.userId, userId));
    return profile || undefined;
  }

  async createKidProfile(profile: InsertKidProfile, userId?: string): Promise<KidProfile> {
    const values: any = {
      birthMonth: profile.birthMonth,
      birthYear: profile.birthYear,
      userId: userId || null
    };
    
    if (profile.name !== undefined) values.name = profile.name;
    if (profile.interests !== undefined) values.interests = profile.interests;
    
    const [kidProfile] = await db
      .insert(kidProfiles)
      .values(values)
      .returning();
    return kidProfile;
  }

  async updateKidProfile(id: string, profile: Partial<InsertKidProfile>): Promise<KidProfile | undefined> {
    const updates: any = {};
    
    if (profile.name !== undefined) updates.name = profile.name;
    if (profile.birthMonth !== undefined) updates.birthMonth = profile.birthMonth;
    if (profile.birthYear !== undefined) updates.birthYear = profile.birthYear;
    if (profile.interests !== undefined) updates.interests = profile.interests;
    
    const [updated] = await db
      .update(kidProfiles)
      .set(updates)
      .where(eq(kidProfiles.id, id))
      .returning();
    return updated || undefined;
  }

  async getActivities(): Promise<Activity[]> {
    return await db.select().from(activities);
  }

  async getActivitiesByFilters(filters: any, interests: string[], age: number): Promise<Activity[]> {
    const allActivities = await db.select().from(activities);
    
    return allActivities.filter(activity => {
      // Age filtering
      const ageRange = activity.ageRange.toLowerCase();
      if (ageRange.includes('-')) {
        const [minAge, maxAge] = ageRange.split('-').map(a => parseInt(a.replace(/\D/g, '')));
        if (age < minAge || age > maxAge) return false;
      }
      
      // Filter by who's playing
      if (filters.whoPlaying && activity.whoPlaying !== filters.whoPlaying) {
        return false;
      }
      
      // Filter by energy level
      if (filters.energyLevel && activity.energyLevel !== filters.energyLevel) {
        return false;
      }
      
      // Filter by location
      if (filters.location && activity.location !== filters.location) {
        return false;
      }
      
      // Filter by mess level (activity tags contain mess level)
      if (filters.messLevel) {
        if (!activity.tags?.includes(filters.messLevel)) {
          return false;
        }
      }
      
      // Filter by materials needed - be more flexible with basic materials
      if (filters.materialsNeeded) {
        if (filters.materialsNeeded === 'basic') {
          // "basic" should match activities tagged with "basic" or "none"
          if (!activity.tags?.includes('basic') && !activity.tags?.includes('none')) {
            return false;
          }
        } else {
          if (!activity.tags?.includes(filters.materialsNeeded)) {
            return false;
          }
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Prioritize activities that match interests
      const aMatches = a.interests?.some(interest => interests.includes(interest)) ? 1 : 0;
      const bMatches = b.interests?.some(interest => interests.includes(interest)) ? 1 : 0;
      return bMatches - aMatches;
    });
  }

  async getSavedActivities(userId?: string): Promise<SavedActivity[]> {
    if (!userId) {
      return await db.select().from(savedActivities);
    }
    return await db.select().from(savedActivities).where(eq(savedActivities.userId, userId));
  }

  async saveActivity(activityId: string, userId?: string): Promise<SavedActivity> {
    const [savedActivity] = await db
      .insert(savedActivities)
      .values({
        userId: userId || null,
        activityId,
        isUsed: false,
      })
      .returning();
    return savedActivity;
  }

  async removeSavedActivity(id: string): Promise<boolean> {
    const result = await db.delete(savedActivities).where(eq(savedActivities.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async markActivityAsUsed(id: string, isUsed: boolean): Promise<boolean> {
    const result = await db
      .update(savedActivities)
      .set({ isUsed })
      .where(eq(savedActivities.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private kidProfiles: Map<string, KidProfile>;
  private activities: Map<string, Activity>;
  private savedActivities: Map<string, SavedActivity>;

  constructor() {
    this.users = new Map();
    this.kidProfiles = new Map();
    this.activities = new Map();
    this.savedActivities = new Map();
    this.initializeActivities();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getKidProfile(userId?: string): Promise<KidProfile | undefined> {
    if (!userId) return Array.from(this.kidProfiles.values())[0];
    return Array.from(this.kidProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async createKidProfile(profile: InsertKidProfile, userId?: string): Promise<KidProfile> {
    const id = randomUUID();
    const kidProfile: KidProfile = { 
      id, 
      name: profile.name || null,
      birthMonth: profile.birthMonth,
      birthYear: profile.birthYear,
      interests: (profile.interests as string[]) || [],
      userId: userId || null 
    };
    this.kidProfiles.set(id, kidProfile);
    return kidProfile;
  }

  async updateKidProfile(id: string, profile: Partial<InsertKidProfile>): Promise<KidProfile | undefined> {
    const existing = this.kidProfiles.get(id);
    if (!existing) return undefined;
    
    const updated: KidProfile = { 
      ...existing, 
      name: profile.name !== undefined ? profile.name : existing.name,
      birthMonth: profile.birthMonth || existing.birthMonth,
      birthYear: profile.birthYear || existing.birthYear,
      interests: (profile.interests as string[]) || existing.interests
    };
    this.kidProfiles.set(id, updated);
    return updated;
  }

  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async getActivitiesByFilters(filters: any, interests: string[], age: number): Promise<Activity[]> {
    const allActivities = Array.from(this.activities.values());
    
    return allActivities.filter(activity => {
      // Age filtering
      const ageRange = activity.ageRange.toLowerCase();
      if (ageRange.includes('-')) {
        const [minAge, maxAge] = ageRange.split('-').map(a => parseInt(a.replace(/\D/g, '')));
        if (age < minAge || age > maxAge) return false;
      }
      
      // Filter by who's playing
      if (filters.whoPlaying && activity.whoPlaying !== filters.whoPlaying) {
        return false;
      }
      
      // Filter by energy level
      if (filters.energyLevel && activity.energyLevel !== filters.energyLevel) {
        return false;
      }
      
      // Filter by location
      if (filters.location && activity.location !== filters.location) {
        return false;
      }
      
      // Filter by mess level (activity tags contain mess level)
      if (filters.messLevel) {
        if (!activity.tags?.includes(filters.messLevel)) {
          return false;
        }
      }
      
      // Filter by materials needed - be more flexible with basic materials
      if (filters.materialsNeeded) {
        if (filters.materialsNeeded === 'basic') {
          // "basic" should match activities tagged with "basic" or "none"
          if (!activity.tags?.includes('basic') && !activity.tags?.includes('none')) {
            return false;
          }
        } else {
          if (!activity.tags?.includes(filters.materialsNeeded)) {
            return false;
          }
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Prioritize activities that match interests
      const aMatches = a.interests?.some(interest => interests.includes(interest)) ? 1 : 0;
      const bMatches = b.interests?.some(interest => interests.includes(interest)) ? 1 : 0;
      return bMatches - aMatches;
    });
  }

  async getSavedActivities(userId?: string): Promise<SavedActivity[]> {
    return Array.from(this.savedActivities.values()).filter(
      saved => !userId || saved.userId === userId
    );
  }

  async saveActivity(activityId: string, userId?: string): Promise<SavedActivity> {
    const id = randomUUID();
    const savedActivity: SavedActivity = {
      id,
      userId: userId || null,
      activityId,
      isUsed: false,
    };
    this.savedActivities.set(id, savedActivity);
    return savedActivity;
  }

  async removeSavedActivity(id: string): Promise<boolean> {
    return this.savedActivities.delete(id);
  }

  async markActivityAsUsed(id: string, isUsed: boolean): Promise<boolean> {
    const saved = this.savedActivities.get(id);
    if (!saved) return false;
    
    saved.isUsed = isUsed;
    this.savedActivities.set(id, saved);
    return true;
  }

  private initializeActivities() {
    const activities: Activity[] = [
      {
        id: "1",
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
        duration: "30 min",
        tags: ["creative", "educational", "indoor", "little-mess", "basic"],
        energyLevel: "focused",
        location: "indoor",
        whoPlaying: "together",
        interests: ["arts", "science"]
      },
      {
        id: "2",
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
        duration: "30 min",
        tags: ["adventure", "problem-solving", "indoor", "no-mess", "basic"],
        energyLevel: "active",
        location: "indoor",
        whoPlaying: "together",
        interests: ["adventure"]
      },
      {
        id: "3",
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
        duration: "30 min",
        tags: ["movement", "music", "silly", "no-mess", "none"],
        energyLevel: "silly",
        location: "indoor",
        whoPlaying: "together",
        interests: ["music", "movement"]
      },
      {
        id: "4",
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
        duration: "60 min",
        tags: ["nature", "exploration", "educational", "no-mess", "basic"],
        energyLevel: "active",
        location: "outdoor",
        whoPlaying: "together",
        interests: ["science", "outdoor"]
      },
      {
        id: "5",
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
        duration: "15 min",
        tags: ["language", "creative", "calm", "no-mess", "none"],
        energyLevel: "calm",
        location: "indoor",
        whoPlaying: "together",
        interests: ["reading", "creative"]
      },
      {
        id: "6",
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
        duration: "30 min",
        tags: ["science", "messy", "educational", "messy", "basic"],
        energyLevel: "focused",
        location: "indoor",
        whoPlaying: "together",
        interests: ["science"]
      },
      {
        id: "7",
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
        duration: "30 min",
        tags: ["problem-solving", "quiet", "focused", "no-mess", "basic"],
        energyLevel: "focused",
        location: "indoor",
        whoPlaying: "together",
        interests: ["puzzles"]
      },
      {
        id: "8",
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
        duration: "15 min",
        tags: ["games", "memory", "focused", "no-mess", "basic"],
        energyLevel: "focused",
        location: "indoor",
        whoPlaying: "together",
        interests: ["games"]
      },
      {
        id: "9",
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
        duration: "30 min",
        tags: ["games", "strategy", "social", "no-mess", "basic"],
        energyLevel: "focused",
        location: "indoor",
        whoPlaying: "group",
        interests: ["games"]
      },
      {
        id: "10",
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
        duration: "45 min",
        tags: ["arts", "creative", "sensory", "messy", "special"],
        energyLevel: "focused",
        location: "indoor",
        whoPlaying: "together",
        interests: ["arts", "creative"]
      },
      {
        id: "11",
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
        duration: "30 min",
        tags: ["reading", "quiet", "independent", "no-mess", "none"],
        energyLevel: "calm",
        location: "indoor",
        whoPlaying: "alone",
        interests: ["reading"]
      },
      {
        id: "12",
        title: "Outdoor Obstacle Course",
        materials: [
          { emoji: "🪣", name: "Cones or buckets" },
          { emoji: "🪢", name: "Jump rope" },
          { emoji: "⚽", name: "Ball" }
        ],
        steps: [
          "Set up stations: jumping, crawling, ball toss",
          "Demonstrate each station together",
          "Time runs and cheer each other on!"
        ],
        whyGreat: "Builds gross motor skills, confidence, and provides great physical exercise.",
        ageRange: "4-8",
        duration: "45 min",
        tags: ["physical", "active", "outdoor", "little-mess", "basic"],
        energyLevel: "active",
        location: "outdoor",
        whoPlaying: "together",
        interests: ["sports", "outdoor"]
      },
      {
        id: "8",
        title: "Musical Instruments Making",
        materials: [
          { emoji: "🥫", name: "Empty containers" },
          { emoji: "🌾", name: "Rice or beans" },
          { emoji: "🎨", name: "Decorating supplies" }
        ],
        steps: [
          "Fill containers with rice or beans to make shakers",
          "Decorate with stickers and markers",
          "Create your own family band!"
        ],
        whyGreat: "Combines crafting with music exploration and encourages creative expression.",
        ageRange: "2-6",
        duration: "45 min",
        tags: ["music", "crafts", "creative"],
        energyLevel: "focused",
        location: "indoor",
        whoPlaying: "together",
        interests: ["music", "arts"]
      },
      {
        id: "9",
        title: "Obstacle Course Challenge",
        materials: [
          { emoji: "🪑", name: "Chairs" },
          { emoji: "🛏️", name: "Pillows" },
          { emoji: "📏", name: "Tape for markers" }
        ],
        steps: [
          "Set up a safe obstacle course using household items",
          "Time each other completing the course",
          "Modify and improve the course together"
        ],
        whyGreat: "Develops gross motor skills, spatial awareness, and provides great physical activity.",
        ageRange: "3-8",
        duration: "45 min",
        tags: ["physical", "active", "creative"],
        energyLevel: "active",
        location: "indoor",
        whoPlaying: "together",
        interests: ["sports", "movement"]
      },
      {
        id: "10",
        title: "Quiet Reading Corner",
        materials: [
          { emoji: "📚", name: "Favorite books" },
          { emoji: "🛏️", name: "Comfy pillows" },
          { emoji: "🧸", name: "Stuffed animals" }
        ],
        steps: [
          "Create a cozy reading space together",
          "Choose books to read quietly",
          "Share favorite parts of the stories"
        ],
        whyGreat: "Promotes literacy, creates calm moments, and develops love for reading.",
        ageRange: "2-8",
        duration: "30 min",
        tags: ["reading", "calm", "quiet"],
        energyLevel: "calm",
        location: "indoor",
        whoPlaying: "alone",
        interests: ["reading"]
      }
    ];

    activities.forEach(activity => {
      this.activities.set(activity.id, activity);
    });
  }
}

export const storage = new DatabaseStorage();
