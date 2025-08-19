import Anthropic from '@anthropic-ai/sdk';
import { type Activity } from '../shared/schema.js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface ActivityRequest {
  ageRange: string;
  energyLevel: string;
  location: string;
  whoPlaying: string;
  messyLevel?: string;
  interests: string[];
  count: number;
}

export async function generateActivitiesWithClaude(request: ActivityRequest) {
  const prompt = `Generate ${request.count} age-appropriate activities for children aged ${request.ageRange} with the following requirements:

- Energy level: ${request.energyLevel}
- Location: ${request.location}
- Who's playing: ${request.whoPlaying}${request.messyLevel ? `
- Mess level: ${request.messyLevel}` : ''}
- Interests: ${request.interests.join(', ')}

For each activity, provide:
1. Title (engaging and age-appropriate)
2. Materials needed (3-4 items with emoji and name)
3. Steps (3 clear, simple steps)
4. Why it's great (educational benefit in one sentence)
5. Duration (realistic time estimate)
6. Tags (3-4 relevant tags)

Format as valid JSON array with this exact structure:
[
  {
    "title": "Activity Name",
    "materials": [
      {"emoji": "🎨", "name": "Item name"},
      {"emoji": "📄", "name": "Another item"}
    ],
    "steps": [
      "First step instruction",
      "Second step instruction", 
      "Third step instruction"
    ],
    "whyGreat": "Educational benefit explanation.",
    "ageRange": "${request.ageRange}",
    "minAge": ${request.ageRange.split('-')[0]},
    "maxAge": ${request.ageRange.split('-')[1]},
    "developmentStage": "${request.ageRange === '5-6' ? 'kindergarten' : 'early-elementary'}",
    "duration": "XX min",
    "tags": ["tag1", "tag2", "tag3", "${request.ageRange === '5-6' ? 'kindergarten' : 'early-elementary'}"],
    "energyLevel": "${request.energyLevel}",
    "location": "${request.location}",
    "whoPlaying": "${request.whoPlaying}",
    "messLevel": "${request.messyLevel || 'nomess'}",
    "interests": ${JSON.stringify(request.interests)},
    "skillRequirements": null
  }
]

Make activities engaging, safe, and developmentally appropriate. Focus on activities that match the exact energy level requested.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      // Extract JSON from the response
      const jsonMatch = content.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    
    throw new Error('Failed to extract valid JSON from Claude response');
  } catch (error) {
    console.error('Error generating activities with Claude:', error);
    throw error;
  }
}

export async function generateActivityEnhancement(activity: Activity, childAge: number, specificQuestion?: string) {
  if (!anthropic) {
    throw new Error('Claude AI is not configured. Please check ANTHROPIC_API_KEY environment variable.');
  }

  const prompt = `You are an expert child development specialist and activity designer. Please provide enhanced, detailed information about this activity for a ${childAge}-year-old child.

ACTIVITY: ${activity.title}
CURRENT DESCRIPTION: ${activity.whyGreat}
MATERIALS: ${activity.materials.map(m => m.name).join(', ')}
BASIC STEPS: ${activity.steps.join(' → ')}

${specificQuestion ? `SPECIFIC QUESTION: ${specificQuestion}` : ''}

Please provide a comprehensive enhancement that includes:

1. **Detailed Step-by-Step Guide**: Break down each step with specific tips for a ${childAge}-year-old
2. **Learning Benefits**: What skills this develops (motor, cognitive, social, emotional)
3. **Age-Specific Adaptations**: How to adjust for this exact age
4. **Common Challenges**: What might go wrong and how to handle it
5. **Extension Ideas**: Ways to make it more challenging or keep the fun going
6. **Safety Considerations**: Any safety tips specific to this age
7. **Parent Coaching Tips**: How parents can support without taking over

${specificQuestion ? `Please pay special attention to answering: "${specificQuestion}"` : ''}

Format your response as clear, practical advice that a parent can immediately use. Use encouraging, supportive language that builds confidence in both parent and child.`;

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1500,
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const enhancement = response.content[0].type === 'text' ? response.content[0].text : '';
  return enhancement;
}