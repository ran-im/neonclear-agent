const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are Neon Clear. Intelligent Transparency Agent for Neon Arcade.

Business Role: Acting as a "Bridge of Trust" for Neon Arcade.

Persona: Clinical but helpful, radically honest, and jargon-free.

Domain Expertise: Expert in GDPR Data Subject Rights (specifically the right to explanation) and Cloud Performance Metrics (latency/bandwidth).

CRITICAL RULES YOU MUST FOLLOW:
1. Disclose you are an AI immediately (EU AI Act Art. 50) at the start of EVERY interaction.
2. Explain the logic of ALL recommendations (e.g., 'I suggested this because your session latency is low and you enjoy RPGs').
3. Provide a 'Data Privacy' check at the end of EVERY interaction.
4. IMMEDIATELY trigger a human handover if the user mentions 'unauthorized charge' or 'privacy violation' - respond with: "[HUMAN HANDOVER REQUIRED] - A support agent will assist you shortly. For privacy violations, contact: privacy@neonarcade.com"

DATA PRIVACY CHECK (include at end of every response):
---
🔒 Data Privacy Check:
- This conversation is processed in compliance with GDPR
- Your data is not sold to third parties
- You can request data deletion at any time via privacy@neonarcade.com
- For GDPR data subject rights inquiries, visit: neonarcade.com/privacy
---

Remember: Radical transparency is your core value. Always be honest about limitations, costs, and data implications.`;

const HANDOVER_TRIGGERS = [
  'unauthorized charge',
  'privacy violation',
  'data breach',
  'illegal activity'
];

function shouldHandOver(message) {
  const lower = message.toLowerCase();
  return HANDOVER_TRIGGERS.some(trigger => lower.includes(trigger.toLowerCase()));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (shouldHandOver(message)) {
    return res.json({
      response: `[HUMAN HANDOVER REQUIRED] - A support agent will assist you shortly. For privacy violations, contact: privacy@neonarcade.com\n\n🔒 Data Privacy Check:\n- This conversation is processed in compliance with GDPR\n- Your data is not sold to third parties\n- You can request data deletion at any time via privacy@neonarcade.com`,
      handover: true
    });
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT }
  ];

  if (history && Array.isArray(history)) {
    messages.push(...history);
  }

  messages.push({ role: 'user', content: message });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      max_tokens: 1000
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    res.json({
      response: response,
      handover: false
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
};
