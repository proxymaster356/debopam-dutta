import type { VercelRequest, VercelResponse } from '@vercel/node';
import { KNOWLEDGE_BASE } from './knowledgeBase.js';

const RESUME_CONTEXT = `
You are an interactive AI assistant embedded in Debopam Dutta's portfolio terminal. Your job is to advocate for Debopam, answer visitor questions about his skills and projects, and present his work professionally. 
IMPORTANT: Speak directly to the visitor. Do NOT refer to Debopam in the third person as if evaluating him (e.g. do not say "Debopam should focus on..."). You are his representative. Provide helpful, conversational answers about his experience based on the knowledge base below.

--- KNOWLEDGE BASE ---
${KNOWLEDGE_BASE}
----------------------
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, messages, persona } = req.body;
    
    let systemPrompt = RESUME_CONTEXT + "\nYou are a helpful AI assistant.";
    
    if (persona === 'think-tank') {
      systemPrompt = RESUME_CONTEXT + "\n\nYou are a Virtual Think Tank panel moderator. Present multi-perspective analysis on Debopam's work, highlight trade-offs, then converge on a summary. Be concise, terminal-friendly.";
    } else if (persona === 'scientific-critical-thinking') {
      systemPrompt = RESUME_CONTEXT + "\n\nYou are a Scientific Critical Thinking agent. Explain Debopam's projects with methodological rigor and scientific terminology. Be precise, empirical, constructive.";
    } else if (persona === 'senior-prompt-engineer') {
      systemPrompt = RESUME_CONTEXT + "\n\nYou are a Senior Prompt Engineer. Frame Debopam's AI skills using expert prompt patterns and LLM terminology. Be concise, terminal-friendly.";
    }

    const chatHistory = [
      { role: 'system', content: systemPrompt },
      ...(messages || [{ role: 'user', content: message }])
    ];

    // Try Groq API first if key exists
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            messages: chatHistory,
            model: 'qwen/qwen3.8-27b', // Using a reliable model
            temperature: 0.7,
            max_tokens: 500,
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.choices && data.choices.length > 0) {
            const reply = data.choices[0].message?.content || "No response generated.";
            return res.status(200).json({ reply });
          } else {
             console.warn("Groq returned ok but no choices:", data);
          }
        } else {
          const errText = await response.text();
          console.warn(`Groq API Error: ${response.status} ${errText}`);
        }
      } catch (groqError) {
        console.warn("Groq fetch failed:", groqError);
      }
    }

    // Fallback to OpenRouter
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      throw new Error("Both Groq failed and OPENROUTER_API_KEY is missing for fallback.");
    }

    const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openRouterKey}`,
        'HTTP-Referer': 'https://debopamdutta.vercel.app',
        'X-Title': 'Debopam Portfolio'
      },
      body: JSON.stringify({
        messages: chatHistory,
        model: 'google/gemini-2.0-flash-exp:free',
        temperature: 0.7,
        max_tokens: 500,
      })
    });

    if (!fallbackResponse.ok) {
      const err = await fallbackResponse.text();
      throw new Error(`OpenRouter API Error: ${fallbackResponse.status} ${err}`);
    }

    const data = await fallbackResponse.json();
    if (!data || !data.choices || data.choices.length === 0) {
      console.warn("OpenRouter returned ok but no choices:", data);
      throw new Error(`OpenRouter returned empty choices. Data: ${JSON.stringify(data)}`);
    }

    const reply = data.choices[0].message?.content || "No response generated from fallback.";
    return res.status(200).json({ reply });
    
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
}
