import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Loader2, Volume2 } from 'lucide-react';

// Define SpeechRecognition types for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setError(`Microphone error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        // If we have a transcript and it's not processing, send it
        if (transcript.trim() && !isProcessing && isOpen) {
          handleProcessVoice();
        }
      };
    } else {
      setError("Speech Recognition is not supported in this browser. Try Chrome or Edge.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [transcript, isProcessing, isOpen]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setError('');
      setTranscript('');
      setResponse('');
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleProcessVoice = async () => {
    if (!transcript.trim()) return;
    
    setIsProcessing(true);
    setResponse('');
    setError('');

    try {
      // Step 1: Get LLM response from Cloudflare
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: transcript })
      });

      if (!res.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await res.json();
      const aiText = data.reply;
      setResponse(aiText);

      // Step 2: Get TTS audio from KittenTTS
      setIsSpeaking(true);
      const ttsRes = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiText })
      });

      if (!ttsRes.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await ttsRes.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        audioRef.current.onended = () => {
          setIsSpeaking(false);
        };
      } else {
        // Fallback if ref isn't available
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setIsSpeaking(false);
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while processing voice.');
      setIsSpeaking(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[60] flex flex-col items-start font-mono pointer-events-none">
      <audio ref={audioRef} className="hidden" />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 w-72 sm:w-80 p-5 bg-[#141414] border-2 border-[#333] shadow-[0_0_35px_rgba(0,0,0,0.95)] rounded-md relative pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-borders/50">
              <span className="text-[10px] text-acid tracking-widest uppercase">
                {isProcessing ? 'PROCESSING...' : isSpeaking ? 'SPEAKING...' : isListening ? 'LISTENING...' : 'EDGE VOICE ASSISTANT'}
              </span>
              <button onClick={() => setIsOpen(false)} className="text-ash hover:text-acid transition-colors">
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 min-h-24 max-h-48 overflow-y-auto custom-scrollbar text-sm">
              {error ? (
                <div className="text-red-400 text-xs">ERR: {error}</div>
              ) : (
                <>
                  <div className="text-smoke">
                    <span className="text-acid mr-2">{'>'}</span> 
                    {transcript || (isListening ? '...' : 'Click mic to speak.')}
                  </div>
                  {response && (
                    <div className="text-bone mt-2 pl-3 border-l border-borders/50">
                      {response}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-borders/50 flex justify-between items-center">
              <button
                onClick={toggleListen}
                disabled={isProcessing || isSpeaking}
                className={`p-3 rounded-full flex items-center justify-center transition-all ${
                  isListening 
                    ? 'bg-acid text-void animate-pulse' 
                    : isProcessing || isSpeaking 
                      ? 'bg-surface text-ash cursor-not-allowed'
                      : 'bg-surface border border-borders text-bone hover:text-acid hover:border-acid'
                }`}
              >
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Mic size={16} />}
              </button>
              
              {isSpeaking && (
                <button
                  onClick={stopAudio}
                  className="flex items-center gap-2 text-xs text-ash hover:text-acid transition-colors px-3 py-1.5 border border-borders hover:border-acid"
                >
                  <Square size={12} /> STOP
                </button>
              )}
              
              <div className="text-[9px] text-ash tracking-widest uppercase flex items-center gap-1.5">
                <Volume2 size={10} className={isSpeaking ? 'text-acid animate-pulse' : ''} />
                KittenTTS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full flex items-center justify-center bg-[#141414] border-2 ${
            isListening || isSpeaking || isProcessing ? 'border-acid text-acid shadow-[0_0_15px_rgba(197,255,0,0.35)]' : 'border-[#333] text-[#888]'
          } hover:text-acid hover:border-acid transition-all duration-300 shadow-xl cursor-pointer pointer-events-auto group`}
        >
          <Mic size={20} className={`relative z-10 ${isListening || isSpeaking || isProcessing ? 'animate-pulse' : ''}`} />
        </motion.button>
      )}
    </div>
  );
}
