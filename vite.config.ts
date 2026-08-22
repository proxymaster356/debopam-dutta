import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Read .env manually at config load time so it's available in middleware
function getEnvVars() {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const vars: Record<string, string> = {};
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex > 0) {
          vars[trimmed.slice(0, eqIndex).trim()] = trimmed.slice(eqIndex + 1).trim();
        }
      }
    }
    return vars;
  } catch { return {}; }
}

const envVars = getEnvVars();

import { KNOWLEDGE_BASE } from './api/knowledgeBase'

const localApiMiddleware = () => ({
  name: 'local-api-middleware',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const parsedBody = JSON.parse(body);
            const apiKey = envVars.GROQ_API_KEY;
            
            if (!apiKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Missing API key in .env" }));
              return;
            }

            const RESUME_CONTEXT = `You are an interactive AI assistant embedded in Debopam Dutta's portfolio terminal. Your job is to advocate for Debopam, answer visitor questions about his skills and projects, and present his work professionally. IMPORTANT: Speak directly to the visitor. Do NOT refer to Debopam in the third person as if evaluating him or giving him recommendations (e.g. do not say "Debopam should focus on..."). You are his representative. Provide helpful, conversational answers about his experience based on the knowledge base below.

--- KNOWLEDGE BASE ---
${KNOWLEDGE_BASE}
----------------------`;

            let systemPrompt = RESUME_CONTEXT;
            if (parsedBody.persona === 'think-tank') {
              systemPrompt += ' You are a Virtual Think Tank. Present multi-perspective analysis of Debopam\'s work, highlight trade-offs in his tech stack, then converge on a summary. Be concise.';
            } else if (parsedBody.persona === 'scientific-critical-thinking') {
              systemPrompt += ' You are a Scientific Critical Thinking agent. Explain Debopam\'s projects with methodological rigor and scientific terminology.';
            } else if (parsedBody.persona === 'senior-prompt-engineer') {
              systemPrompt += ' You are a Senior Prompt Engineer. Frame Debopam\'s AI skills using expert prompt patterns and LLM terminology.';
            }

            const messages = [
              { role: 'system', content: systemPrompt },
              ...(parsedBody.messages || [{ role: 'user', content: parsedBody.message }])
            ];

            try {
              const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                  messages,
                  model: 'llama-3.1-8b-instant',
                  temperature: 0.7,
                  max_tokens: 500
                })
              });

              if (!response.ok) {
                const err = await response.text();
                throw new Error(`Groq Error: ${response.status} ${err}`);
              }

              const data = await response.json();
              const reply = data.choices[0]?.message?.content || "No response generated.";
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply }));
            } catch (groqError: any) {
              console.warn("Groq failed in local middleware, attempting OpenRouter fallback:", groqError.message);
              
              const openRouterKey = envVars.OPENROUTER_API_KEY;
              if (!openRouterKey) {
                throw new Error("Both Groq failed and OPENROUTER_API_KEY is missing for fallback.");
              }

              const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${openRouterKey}`,
                  'HTTP-Referer': 'http://localhost:5173',
                  'X-Title': 'Debopam Portfolio (Local)'
                },
                body: JSON.stringify({
                  messages,
                  model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
                  temperature: 0.7,
                  max_tokens: 500
                })
              });

              if (!fallbackResponse.ok) {
                const err = await fallbackResponse.text();
                throw new Error(`OpenRouter API Error: ${fallbackResponse.status} ${err}`);
              }

              const data = await fallbackResponse.json();
              const reply = data.choices[0]?.message?.content || "No response generated from fallback.";
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply }));
            }
          } catch (e: any) {
            console.error("Local API Error:", e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiMiddleware()],
  build: {
    chunkSizeWarningLimit: 1000,
  }
})
