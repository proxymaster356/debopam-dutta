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
    
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiKey = process.env.CLOUDFLARE_API_TOKEN;
    
    if (!accountId || !apiKey) {
      throw new Error("Cloudflare credentials missing. Add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN to your environment variables.");
    }

    const chatHistory = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(messages || [{ role: 'user', content: message }])
    ];

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: chatHistory,
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Cloudflare AI Error: ${response.status} ${err}`);
    }

    const data = await response.json();
    const reply = data.result?.response || "No response generated.";
    
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
}
