import type { Express } from "express";
import { generateActivityIdeas, explainActivity, adaptActivityForAge } from "./claude";

export function registerClaudeRoutes(app: Express) {
  // Generate new AI-powered activity ideas
  app.post("/api/ai/generate-activities", async (req, res) => {
    try {
      const { age, interests, preferences } = req.body;
      
      if (!age || !interests) {
        return res.status(400).json({ 
          message: "Age and interests are required" 
        });
      }

      const activities = await generateActivityIdeas(age, interests, preferences || {});
      res.json(activities);
    } catch (error) {
      console.error('Error generating activities:', error);
      res.status(500).json({ 
        message: "Failed to generate activities",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get child-friendly explanation of an activity
  app.post("/api/ai/explain-activity", async (req, res) => {
    try {
      const { activity, childAge } = req.body;
      
      if (!activity || !childAge) {
        return res.status(400).json({ 
          message: "Activity and child age are required" 
        });
      }

      const explanation = await explainActivity(activity, childAge);
      res.json({ explanation });
    } catch (error) {
      console.error('Error explaining activity:', error);
      res.status(500).json({ 
        message: "Failed to explain activity",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Adapt activity for different age
  app.post("/api/ai/adapt-activity", async (req, res) => {
    try {
      const { activity, newAge } = req.body;
      
      if (!activity || !newAge) {
        return res.status(400).json({ 
          message: "Activity and new age are required" 
        });
      }

      const adaptedActivity = await adaptActivityForAge(activity, newAge);
      res.json(adaptedActivity);
    } catch (error) {
      console.error('Error adapting activity:', error);
      res.status(500).json({ 
        message: "Failed to adapt activity",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Chat with AI about parenting/activities
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      
      if (!message) {
        return res.status(400).json({ 
          message: "Message is required" 
        });
      }

      // You can expand this to maintain conversation history
      const Anthropic = (await import('@anthropic-ai/sdk')).default;
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `You are a helpful parenting assistant for the PlaySpark app. 
            Context: ${JSON.stringify(context || {})}
            
            User question: ${message}
            
            Provide helpful, friendly advice focused on activities and play for children.`
          }
        ]
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      res.json({ response: content });
    } catch (error) {
      console.error('Error in chat:', error);
      res.status(500).json({ 
        message: "Failed to process chat",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
}