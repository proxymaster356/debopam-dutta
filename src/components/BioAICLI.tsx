import React, { useState, useRef, useEffect } from 'react';
import SubpageHeader from './SubpageHeader';

interface LogEntry {
  id: number;
  type: 'user' | 'system' | 'ai' | 'logo';
  content: string;
}

const logoLines = [
  '██████╗ ███████╗██████╗    █████╗ ██╗',
  '██╔══██╗██╔════╝██╔══██╗  ██╔══██╗██║',
  '██║  ██║█████╗  ██████╔╝  ███████║██║',
  '██║  ██║██╔══╝  ██╔══██╗  ██╔══██║██║',
  '██████╔╝███████╗██████╔╝  ██║  ██║██║',
  '╚═════╝ ╚══════╝╚═════╝   ╚═╝  ╚═╝╚═╝',
];

const startColor = [0, 200, 255] as const;   // cyan
const endColor   = [150, 80, 255] as const;  // violet

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function getGradientColor(index: number, total: number): string {
  const t = total > 1 ? index / (total - 1) : 0;
  const r = lerp(startColor[0], endColor[0], t);
  const g = lerp(startColor[1], endColor[1], t);
  const b = lerp(startColor[2], endColor[2], t);
  return `rgb(${r}, ${g}, ${b})`;
}

const BioAICLI = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, type: 'logo', content: '' },
  ]);
  const [activePersona, setActivePersona] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const bootRan = useRef(false);

  // Boot sequence — runs once on mount (ref guard prevents StrictMode double-fire)
  useEffect(() => {
    if (bootRan.current) return;
    bootRan.current = true;

    const bootMessages = [
      { delay: 400, text: 'Establishing secure connection...' },
      { delay: 800, text: 'BioAI Neural Link v9.4.2 ─── HANDSHAKE OK' },
      { delay: 1200, text: 'Loading knowledge base ········ DONE' },
      { delay: 1600, text: 'Groq LLM endpoint ············ CONNECTED' },
      { delay: 2000, text: 'Memory subsystem ·············· ACTIVE' },
      { delay: 2300, text: '─'.repeat(40) },
      { delay: 2600, text: 'System ready. Type /help for commands, or just chat.' },
    ];

    bootMessages.forEach(({ delay, text }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { id: Date.now() + Math.random(), type: 'system', content: text }]);
      }, delay);
    });
  }, []);

  // Auto-scroll to bottom inside the terminal only
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [logs]);

  // Focus input on click anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const addLog = (type: 'user' | 'system' | 'ai' | 'logo', content: string) => {
    setLogs(prev => [...prev, { id: Date.now(), type, content }]);
  };

  const processCommand = async (command: string) => {
    if (apiLoading) return;

    addLog('user', `> ${command}`);

    // Command parsing
    const cmdStr = command.trim();
    const parts = cmdStr.split(' ');
    const cmd = parts[0].toLowerCase();

    if (['/think-tank', '/scientific-critical-thinking', '/senior-prompt-engineer'].includes(cmd)) {
      setActivePersona(cmd.substring(1));
      addLog('system', `Persona switched to: ${cmd.substring(1).toUpperCase()}`);

      const query = parts.slice(1).join(' ');
      if (query) {
        await fetchAIResponse(query, cmd.substring(1));
      }
      return;
    }

    // Static instant commands
    switch (cmd) {
      case '/clear':
        setLogs([]);
        return;
      case '/help':
        addLog('system', 'Available Commands:\n  /about    - Brief profile summary\n  /projects - List of major projects\n  /contact  - Get contact information\n  /resume   - Download/view resume\n  /clear    - Clear terminal\n\nOr simply type any question to chat with the AI!');
        return;
      case '/about':
        addLog('system', 'Debopam is a 2nd Year B.Tech Biotechnology Engineering student building practical systems that combine Biology, AI/ML, Sensors, Embedded Hardware, and Computer Vision.');
        return;
      case '/projects':
        addLog('system', '1. BioRemed AI (Multimodal Environmental AI)\n2. Automated Antimicrobial Susceptibility Testing (CV)\n3. Drishti (AI Navigation for Visually Impaired)\n4. Bacteria Detection/Counting System\n5. BusBuddy (Smart Transit)\n6. Sympteller (AI Health Assistant prototype)\n7. RFID + Face Rec Attendance System');
        return;
      case '/contact':
        addLog('system', 'Email: debopamdutta99@gmail.com\nPhone: +91 8116324958\nGitHub: github.com/debopamdutta\nLinkedIn: linkedin.com/in/debopamdutta');
        return;
      case '/resume':
        addLog('system', 'You can view Debopam\'s full resume at the root of the portfolio, or by contacting him directly.');
        return;
    }

    // If it's not a known slash command, just send it to the AI as a general chat
    await fetchAIResponse(cmdStr, activePersona || 'default');
  };

  const fetchAIResponse = async (message: string, persona: string) => {
    // Construct memory from past logs
    const history = logs
      .filter(log => log.type === 'user' || log.type === 'ai')
      .map(log => ({
        role: log.type === 'user' ? 'user' : 'assistant',
        content: log.content.startsWith('> ') ? log.content.slice(2) : log.content
      }));

    // Add current message
    history.push({ role: 'user', content: message });

    addLog('system', 'Processing query...');
    setApiLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, messages: history, persona })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'API route failed');
      }

      const data = await res.json();
      const reply = data.reply;

      addLog('ai', reply);

    } catch (error: any) {
      addLog('system', `Connection Error: ${error.message}`);
      // Fallback for UI demonstration if API is missing
      const mockReply = `[SIMULATION] Your API call failed, but here is a simulated response!`;
      addLog('ai', mockReply);
    } finally {
      setApiLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      processCommand(input);
      setInput('');
    }
  };

  return (
    <section className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto bg-void min-h-screen text-left flex flex-col">
      <SubpageHeader
        chapter="SYSTEM // INTERFACE"
        title="DebAI_CLI"
        outlineTitle=""
        description="Bioinformatics terminal simulator and model interaction interface."
        telemetry={[
          { label: 'API_STATUS', value: 'ONLINE' },
          { label: 'PERSONA', value: activePersona ? activePersona.toUpperCase() : 'DEFAULT' }
        ]}
        className="mb-6 md:mb-8"
      />

      {/* Terminal Container with CRT effects */}
      <div
        className="mt-6 h-[60vh] min-h-[400px] bg-black border border-acid/50 text-acid/80 font-mono p-4 overflow-hidden relative shadow-[0_0_15px_rgba(196,255,0,0.1)] rounded-sm cursor-text flex flex-col"
        onClick={handleTerminalClick}
        style={{
          backgroundImage: 'linear-gradient(rgba(196, 255, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 255, 0, 0.02) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-50" />

        {/* Logs */}
        <div className="flex-1 overflow-y-auto z-20 space-y-2 pb-4 scrollbar-thin scrollbar-thumb-acid scrollbar-track-transparent">
          {logs.map((log) => (
            <div key={log.id} className="whitespace-pre-wrap break-words">
              {log.type === 'user' && <span className="text-white opacity-90">{log.content}</span>}
              {log.type === 'system' && <span className="text-acid/70 opacity-80 italic">{log.content}</span>}
              {log.type === 'logo' && (
                <div className="mb-4 select-none font-bold">
                  {logoLines.map((line, i) => (
                    <div
                      key={i}
                      style={{
                        color: getGradientColor(i, logoLines.length),
                        textShadow: `0 0 10px ${getGradientColor(i, logoLines.length)}40, 0 0 20px ${getGradientColor(i, logoLines.length)}20`,
                      }}
                    >
                      {line}
                    </div>
                  ))}
                  <div className="text-white/50 text-xs mt-2">
                    {'  v9.4.2 · Kernel 4.1.0-ai-enhanced'}
                  </div>
                  <div className="text-white/20 text-xs">
                    {'  ' + '─'.repeat(37)}
                  </div>
                </div>
              )}
              {log.type === 'ai' && (
                <div className="text-acid font-bold pl-4 border-l-2 border-acid/50 my-2 py-2 bg-acid/10">
                  <span className="opacity-70 mr-2">[AI]</span>
                  <span className="drop-shadow-[0_0_5px_rgba(196,255,0,0.3)]">{log.content}</span>
                </div>
              )}
            </div>
          ))}
          {apiLoading && <div className="text-acid/50 animate-pulse mt-2 italic">Waiting for AI response...</div>}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center z-20 mt-2 border-t border-acid/30 pt-2">
          <span className="text-acid font-bold mr-2 text-xl">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-acid/30"
            placeholder={apiLoading ? "Awaiting API response..." : "Type a message or command (e.g. /help)"}
            spellCheck="false"
            autoComplete="off"
            disabled={apiLoading}
          />
          <style>{`
            input[type="text"] { caret-color: #C4FF00; }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default BioAICLI;
