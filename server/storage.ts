import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "./db.js";
import { 
  users, 
  kidProfiles, 
  activities, 
  savedActivities,
  type User, 
  type InsertUser,
  type KidProfile, 
  type InsertKidProfile,
  type Activity,
  type SavedActivity,
  type InsertSavedActivity
} from "../shared/schema.js";

interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Kid Profile methods
  getKidProfile(userId?: string): Promise<KidProfile | undefined>;
  createKidProfile(profile: InsertKidProfile, userId?: string): Promise<KidProfile>;
  updateKidProfile(id: string, profile: Partial<InsertKidProfile>): Promise<KidProfile | undefined>;

  // Activity methods
  getActivities(): Promise<Activity[]>;
  getActivitiesByFilters(filters: any, interests: string[], age: number): Promise<Activity[]>;

  // Saved Activity methods
  getSavedActivities(userId?: string): Promise<SavedActivity[]>;
  saveActivity(activityId: string, userId?: string): Promise<SavedActivity>;
  removeSavedActivity(id: string): Promise<boolean>;
  markActivityAsUsed(id: string, isUsed: boolean): Promise<boolean>;
}

class DatabaseStorage implements IStorage {
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
      // Get the most recently created profile when no userId is provided
      const profiles = await db.select().from(kidProfiles).orderBy(kidProfiles.id).limit(1);
      return profiles[0] || undefined;
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
    
    const filtered = allActivities.filter(activity => {
      // Age filtering - more flexible approach
      // Allow activities if the child's age overlaps with or is close to the activity's age range
      if (activity.minAge !== null && activity.maxAge !== null) {
        // Allow activities if child's age is within 1 year of the activity range
        const ageBuffer = 1;
        if (age < (activity.minAge - ageBuffer) || age > (activity.maxAge + ageBuffer)) {
          return false;
        }
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
      
      // Filter by mess level (activity tags contain mess level) - make optional
      if (filters.messLevel) {
        // For now, skip mess level filtering since our activities don't have these tags yet
        // TODO: Add mess level tags to activities in future
      }
      
      // Filter by materials needed - make more flexible
      if (filters.materialsNeeded) {
        // For now, skip materials filtering since our activities don't have these specific tags
        // All activities are considered to have basic materials available
        // TODO: Add specific material requirement tags to activities in future
      }
      
      return true;
    }).sort((a, b) => {
      // Prioritize activities that match interests
      const aMatches = a.interests?.some(interest => interests.includes(interest)) ? 1 : 0;
      const bMatches = b.interests?.some(interest => interests.includes(interest)) ? 1 : 0;
      return bMatches - aMatches;
    });

    return filtered;
  }

  async getSavedActivities(userId?: string): Promise<SavedActivity[]> {
    if (!userId) {
      return await db.select().from(savedActivities);
    }
    return await db.select().from(savedActivities).where(eq(savedActivities.userId, userId));
  }

  async saveActivity(activityId: string, userId?: string): Promise<SavedActivity> {
    const [saved] = await db
      .insert(savedActivities)
      .values({
        userId: userId || null,
        activityId,
        isUsed: false,
      })
      .returning();
    return saved;
  }

  async removeSavedActivity(id: string): Promise<boolean> {
    const result = await db.delete(savedActivities).where(eq(savedActivities.id, id));
    return (result.rowCount || 0) > 0;
  }

  async markActivityAsUsed(id: string, isUsed: boolean): Promise<boolean> {
    const result = await db
      .update(savedActivities)
      .set({ isUsed })
      .where(eq(savedActivities.id, id));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new DatabaseStorage();