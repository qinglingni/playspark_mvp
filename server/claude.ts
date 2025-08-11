import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateActivityIdeas(age: number, interests: string[], preferences: any) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: `Generate 3 creative activity ideas for a ${age}-year-old child who likes ${interests.join(', ')}. 
          
          Preferences: ${JSON.stringify(preferences)}
          
          Return as JSON array with this format:
          [{
            "title": "Activity Name",
            "materials": [{"emoji": "🎨", "name": "item"}],
            "steps": ["step1", "step2", "step3"],
            "whyGreat": "Brief explanation",
            "duration": "30 min",
            "energyLevel": "active|calm|focused|silly"
          }]`
        }
      ]
    });

    const content = message.content[0].type === 'text' ? message.content[0].text : '';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

export async function explainActivity(activity: any, childAge: number) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: `Explain this activity in simple terms a parent can use with a ${childAge}-year-old:
          
          Activity: ${activity.title}
          Steps: ${activity.steps.join(', ')}
          
          Provide a fun, engaging explanation that makes the child excited to try it.`
        }
      ]
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

export async function adaptActivityForAge(activity: any, newAge: number) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      temperature: 0.6,
      messages: [
        {
          role: 'user',
          content: `Adapt this activity for a ${newAge}-year-old child:
          
          Original activity: ${JSON.stringify(activity)}
          
          Modify the steps, materials, and complexity to be appropriate for a ${newAge}-year-old's developmental stage.
          
          Return as JSON with the same format as the original.`
        }
      ]
    });

    const content = message.content[0].type === 'text' ? message.content[0].text : '';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}