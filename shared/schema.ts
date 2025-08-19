import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const kidProfiles = pgTable("kid_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name"),
  birthMonth: text("birth_month").notNull(),
  birthYear: integer("birth_year").notNull(),
  interests: jsonb("interests").$type<string[]>().default([]),
  userId: varchar("user_id"),
});

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  materials: jsonb("materials").$type<{emoji: string, name: string}[]>().notNull(),
  steps: jsonb("steps").$type<string[]>().notNull(),
  detailedInfo: jsonb("detailed_info").$type<{
    detailedSteps: Array<{
      step: string;
      description: string;
      tips: string[];
    }>;
    learningBenefits: string[];
    safetyTips: string[];
    variations: {
      easier: string;
      harder: string;
    };
    parentTips: string[];
  }>(),
  whyGreat: text("why_great").notNull(),
  ageRange: text("age_range").notNull(), // Keep for backwards compatibility
  minAge: integer("min_age"), // New: minimum age in years
  maxAge: integer("max_age"), // New: maximum age in years
  developmentStage: text("development_stage"), // New: "toddler", "early-preschool", "late-preschool", "kindergarten", "early-elementary", "late-elementary"
  duration: text("duration").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  energyLevel: text("energy_level"),
  location: text("location"),
  whoPlaying: text("who_playing"),
  messLevel: text("mess_level"),
  interests: jsonb("interests").$type<string[]>().default([]),
  skillRequirements: jsonb("skill_requirements").$type<{
    motor?: "basic" | "developing" | "advanced",
    cognitive?: "simple" | "moderate" | "complex",
    social?: "solo" | "parallel" | "cooperative",
    attention?: "5min" | "15min" | "30min+"
  }>(), // New: skill-based requirements
});

export const savedActivities = pgTable("saved_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  activityId: varchar("activity_id").notNull(),
  isUsed: boolean("is_used").default(false),
});

export const insertKidProfileSchema = createInsertSchema(kidProfiles).omit({
  id: true,
  userId: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
});

export const insertSavedActivitySchema = createInsertSchema(savedActivities).omit({
  id: true,
  userId: true,
});

export type InsertKidProfile = z.infer<typeof insertKidProfileSchema>;
export type KidProfile = typeof kidProfiles.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertSavedActivity = z.infer<typeof insertSavedActivitySchema>;
export type SavedActivity = typeof savedActivities.$inferSelect;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const filterSchema = z.object({
  whoPlaying: z.enum(["alone", "together", "group"]).optional(),
  timeAvailable: z.enum(["15", "30", "60"]).optional(),
  energyLevel: z.enum(["calm", "focused", "active", "silly"]).optional(),
  location: z.enum(["indoor", "outdoor"]).optional(),
  messLevel: z.enum(["nomess", "littlemess", "messy"]).optional(),
  materialsNeeded: z.enum(["none", "basic", "special"]).optional(),
  allowRepeats: z.boolean().default(true),
});

export type ActivityFilters = z.infer<typeof filterSchema>;
