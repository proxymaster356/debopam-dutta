import type { VercelRequest, VercelResponse } from '@vercel/node';
import { KNOWLEDGE_BASE } from './knowledgeBase';

const SYSTEM_PROMPT = `
You are an interactive, open-source AI voice assistant embedded in Debopam Dutta's portfolio.
Your job is to advocate for Debopam, answer visitor questions about his skills and projects, and present his work professionally.
IMPORTANT: You are speaking aloud to the user, so keep your responses concise, conversational, and avoid markdown or complex formatting that doesn't sound good when spoken.
Speak directly to the visitor. Do NOT refer to Debopam in the third person as if evaluating him (e.g. do not say "Debopam should focus on..."). You are his representative.

--- KNOWLEDGE BASE ---
${KNOWLEDGE_BASE}
----------------------
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, messages } = req.body;
    
    const apiKey = process.env.GROQ_API_KEY || process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      throw new Error("API credentials missing. Add GROQ_API_KEY or OPENROUTER_API_KEY to your environment variables.");
    }

    const chatHistory = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(messages || [{ role: 'user', content: message }])
    ];

    const apiUrl = process.env.GROQ_API_KEY 
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions';
      
    const model = process.env.GROQ_API_KEY 
      ? 'llama-3.1-8b-instant' 
      : 'meta-llama/llama-3.1-8b-instruct';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: chatHistory,
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`AI API Error: ${response.status} ${err}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";
    
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
}
