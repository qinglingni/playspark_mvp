import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertKidProfileSchema, filterSchema, insertSavedActivitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Kid Profile Routes
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getKidProfile();
      if (!profile) {
        return res.json(null);
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to get profile" });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const profileData = insertKidProfileSchema.parse(req.body);
      const profile = await storage.createKidProfile(profileData);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  app.put("/api/profile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const profileData = insertKidProfileSchema.partial().parse(req.body);
      const profile = await storage.updateKidProfile(id, profileData);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // Activity Generation Routes
  app.post("/api/activities/analyze-gaps", async (req, res) => {
    try {
      const { analyzeActivityGaps } = await import("./activity-generator.js");
      const gaps = await analyzeActivityGaps();
      res.json(gaps);
    } catch (error) {
      console.error('Error analyzing gaps:', error);
      res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.post("/api/activities/generate-missing", async (req, res) => {
    try {
      const { generateMissingActivities } = await import("./activity-generator.js");
      const newActivities = await generateMissingActivities();
      res.json({ 
        message: `Generated ${newActivities.length} new activities`,
        activities: newActivities 
      });
    } catch (error) {
      console.error('Error generating missing activities:', error);
      res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.post("/api/activities/generate", async (req, res) => {
    try {
      const filters = filterSchema.parse(req.body.filters || {});
      const interests = req.body.interests || [];
      const age = req.body.age || 5;
      
      // Debug logging
      console.log('🔍 Activity Generation Request:', {
        filters,
        interests,
        age,
        requestBody: req.body
      });
      
      const activities = await storage.getActivitiesByFilters(filters, interests, age);
      
      console.log(`📊 Found ${activities.length} matching activities for age ${age}`);
      if (activities.length === 0) {
        console.log('❌ No activities found - checking what activities exist for this age...');
        const allActivities = await storage.getActivities();
        const ageCompatible = allActivities.filter(a => 
          a.minAge !== null && a.maxAge !== null && age >= a.minAge && age <= a.maxAge
        );
        console.log(`Age ${age} compatible activities: ${ageCompatible.length}`);
        console.log('Energy levels available:', Array.from(new Set(ageCompatible.map(a => a.energyLevel))));
        console.log('Locations available:', Array.from(new Set(ageCompatible.map(a => a.location))));
        console.log('whoPlaying options:', Array.from(new Set(ageCompatible.map(a => a.whoPlaying))));
      }
      
      // Return top 2 activities
      const selectedActivities = activities.slice(0, Math.min(2, activities.length));
      
      res.json(selectedActivities);
    } catch (error) {
      console.error('Error generating activities:', error);
      res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to get activities" });
    }
  });

  // Saved Activities Routes
  app.get("/api/saved-activities", async (req, res) => {
    try {
      const savedActivities = await storage.getSavedActivities();
      const activities = await storage.getActivities();
      
      const savedWithDetails = savedActivities.map(saved => {
        const activity = activities.find(a => a.id === saved.activityId);
        return {
          ...saved,
          activity
        };
      });
      
      res.json(savedWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to get saved activities" });
    }
  });

  app.post("/api/saved-activities", async (req, res) => {
    try {
      const { activityId } = insertSavedActivitySchema.parse(req.body);
      const savedActivity = await storage.saveActivity(activityId);
      res.json(savedActivity);
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data" });
    }
  });

  app.delete("/api/saved-activities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.removeSavedActivity(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Saved activity not found" });
      }
      
      res.json({ message: "Saved activity removed" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove saved activity" });
    }
  });

  app.patch("/api/saved-activities/:id/used", async (req, res) => {
    try {
      const { id } = req.params;
      const { isUsed } = req.body;
      
      const updated = await storage.markActivityAsUsed(id, isUsed);
      
      if (!updated) {
        return res.status(404).json({ message: "Saved activity not found" });
      }
      
      res.json({ message: "Activity marked as used" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update activity" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
