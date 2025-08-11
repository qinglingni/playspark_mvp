import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface ActivityRequest {
  ageRange: string;
  energyLevel: string;
  location: string;
  whoPlaying: string;
  interests: string[];
  count: number;
}

export async function generateActivitiesWithClaude(request: ActivityRequest) {
  const prompt = `Generate ${request.count} age-appropriate activities for children aged ${request.ageRange} with the following requirements:

- Energy level: ${request.energyLevel}
- Location: ${request.location}
- Who's playing: ${request.whoPlaying}
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
    "interests": ${JSON.stringify(request.interests)},
    "skillRequirements": null
  }
]

Make activities engaging, safe, and developmentally appropriate. Focus on activities that match the exact energy level requested.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
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