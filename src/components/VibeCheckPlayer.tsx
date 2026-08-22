import { useState, useRef } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { Play, Pause, Volume2, VolumeX, SkipForward, ListMusic, Power, ChevronDown, ChevronUp, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHANNELS = [
  {
    name: 'NCS BASS BOOST',
    tracks: [
      { title: 'Fade - Alan Walker', id: 'bM7SZ5SBzyY' },
      { title: 'Mortals - Warriyo', id: 'yJg-Y5byMMw' },
      { title: 'Invincible - DEAF KEV', id: 'J2X5mJ3HDYE' },
      { title: 'Blank - Disfigure', id: 'p7ZsBPK656s' },
      { title: 'My Heart - Different Heaven', id: 'jK2aIUmmdP4' },
      { title: 'Heroes Tonight - Janji', id: '3nQNiWdeH2Q' }
    ]
  },
  {
    name: 'THE MIND FRESHENER',
    tracks: [
      { title: 'Ho Hey', id: 'SuZytYa71lk' },
      { title: 'It\'s Time', id: 'l9EhLOvxUSI' },
      { title: 'Castle on the Hill', id: 'wqlTrBCNRiY' },
      { title: 'Sailor Song', id: 'wPY6dOC-MDA' },
      { title: 'Paradise', id: 'Q0TEUMPIhk8' },
      { title: 'Pompeii', id: 'gXLzCTQ76I4' },
      { title: 'End of Beginning', id: 'Kf5pXDhx5Vc' },
      { title: 'Best Day Of My Life', id: 'BeOa6kRA6aw' }
    ]
  },
  {
    name: 'INDIE & CLASSICS',
    playlistId: 'PLL2LC2nWhnyU',
    tracks: [
      { title: 'Indie & Classics Mix', id: '' }
    ]
  },
  {
    name: 'NCS CHILL',
    tracks: [
      { title: 'My Heart - DH', id: 'jK2aIUmmdP4' },
      { title: 'Heroes Tonight', id: '3nQNiWdeH2Q' },
      { title: 'Cradles - Sub Urban', id: 'KBtk5FUeJc4' },
      { title: 'Symbolism', id: '__CRWE-L45k' }
    ]
  },
  {
    name: 'NCS ELECTRONIC',
    tracks: [
      { title: 'Fearless pt.II', id: 'nqnmKsBbpZg' },
      { title: 'Mortals - Warriyo', id: 'yJg-Y5byMMw' },
      { title: 'Shine - Spektrem', id: 'n4tK7LYFxI0' },
      { title: 'Cloud 9 - Tobu', id: 'VtKbiyyVZks' }
    ]
  }
];

export function VibeCheckPlayer() {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChannelIdx, setActiveChannelIdx] = useState(0);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playerStateText, setPlayerStateText] = useState<'READY' | 'PLAYING' | 'PAUSED' | 'BUFFERING' | 'OFFLINE'>('READY');
  const [actualTrackTitle, setActualTrackTitle] = useState('');

  const currentChannel = CHANNELS[activeChannelIdx];
  const currentTrack = currentChannel.tracks[activeTrackIdx] || currentChannel.tracks[0];

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    setPlayerStateText('READY');
  };

  const onPlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    // Attempt to sync title from YouTube if playing a playlist
    const player = event.target;
    if (player.getVideoData) {
      const data = player.getVideoData();
      if (data && data.title) {
        setActualTrackTitle(data.title);
      }
    }

    // -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: cued
    if (event.data === 1) {
      setIsPlaying(true);
      setPlayerStateText('PLAYING');
    } else if (event.data === 2) {
      setIsPlaying(false);
      setPlayerStateText('PAUSED');
    } else if (event.data === 3) {
      setPlayerStateText('BUFFERING');
    } else if (event.data === 0) {
      // Auto-advance to next track when finished
      nextTrack();
    } else if (event.data === 5 || event.data === -1) {
      // If we switch tracks while playing, it enters CUED (5) or UNSTARTED (-1). 
      // We should tell it to play if it's supposed to be playing.
      if (isPlaying) {
        playerRef.current?.playVideo();
      }
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) {
      console.warn("YouTube player not ready yet.");
      return;
    }
    
    // Toggle the local state immediately for snappy UI
    setIsPlaying(!isPlaying);

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (err) {
      console.error('Audio toggle error:', err);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (err) {
      console.error('Mute toggle error:', err);
    }
  };

  const nextTrack = () => {
    if (currentChannel.playlistId && playerRef.current) {
      playerRef.current.nextVideo();
    } else {
      const nextIdx = (activeTrackIdx + 1) % currentChannel.tracks.length;
      setActiveTrackIdx(nextIdx);
    }
  };

  const cycleChannel = () => {
    const nextChan = (activeChannelIdx + 1) % CHANNELS.length;
    setActiveChannelIdx(nextChan);
    setActiveTrackIdx(0);
    setActualTrackTitle('');
  };

  const handleChannelSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveChannelIdx(Number(e.target.value));
    setActiveTrackIdx(0);
    setActualTrackTitle('');
  };

  const opts: YouTubeProps['opts'] = {
    height: '250',
    width: '250',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      rel: 0,
      modestbranding: 1,
      origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
      ...(currentChannel.playlistId ? { listType: 'playlist', list: currentChannel.playlistId } : {})
    },
  };

  return (
    <>
      {/* Off-screen YouTube Player (Must NOT be display:none so browser audio keeps active) */}
      <div 
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '250px',
          height: '250px',
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: -1
        }}
      >
        <YouTube 
          key={currentChannel.name}
          videoId={currentChannel.playlistId ? undefined : currentTrack.id} 
          opts={opts} 
          onReady={onPlayerReady} 
          onStateChange={onPlayerStateChange} 
          onError={() => setPlayerStateText('OFFLINE')}
        />
      </div>

      {/* --- UNIVERSAL UI (Vertical Walkie-Talkie / Floating Widget) --- */}
      <div className="font-mono">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-20 right-4 md:bottom-24 md:right-8 z-50 w-72 bg-[#141414] border-2 border-[#333] shadow-[0_0_35px_rgba(0,0,0,0.95)] rounded-md p-4 flex flex-col gap-4 pointer-events-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-[#666] font-black tracking-widest border-b border-[#222] pb-2">
                <span>BIO-VIBE 9000</span>
                <span className="text-acid drop-shadow-[0_0_5px_rgba(197,255,0,0.6)]">STATUS: {playerStateText}</span>
              </div>
              
              {/* LCD Display */}
              <div className="h-[72px] bg-[#040804] border-2 border-[#122812] shadow-[inset_0_0_18px_rgba(0,25,0,0.95)] rounded p-2.5 relative flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
                <div className="flex justify-between items-center text-[#2a5a2a] font-bold text-[8px] uppercase z-20">
                  <div className="relative group flex items-center">
                    <select 
                      className="bg-transparent border-none outline-none text-[#2a5a2a] group-hover:text-acid transition-colors cursor-pointer appearance-none max-w-[120px] pr-4 z-30 relative"
                      value={activeChannelIdx}
                      onChange={handleChannelSelect}
                      title="Select Playlist"
                    >
                      {CHANNELS.map((ch, idx) => (
                        <option key={idx} value={idx} className="bg-[#040804] text-acid">
                          {ch.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#2a5a2a] group-hover:text-acid" />
                  </div>
                  <span>{isMuted ? 'MUTE' : '100%'}</span>
                </div>
                <div className="text-acid font-bold text-xs truncate uppercase tracking-wider drop-shadow-[0_0_6px_rgba(197,255,0,0.8)] z-20 my-0.5 flex items-center gap-1.5">
                  {isPlaying ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="shrink-0">
                      <Disc size={12} />
                    </motion.div>
                  ) : (
                    <span className="shrink-0">►</span>
                  )} 
                  <span>{currentChannel.playlistId ? (actualTrackTitle || currentTrack.title) : currentTrack.title}</span>
                </div>
                {/* Visualizer bars */}
                <div className="flex items-end gap-[2px] h-4 mt-2 overflow-hidden z-20">
                  {[...Array(32)].map((_, i) => {
                    const delay = (Math.random() * -1.5).toFixed(2);
                    const duration = (0.5 + Math.random() * 0.5).toFixed(2);
                    return (
                      <div 
                        key={i} 
                        className={`w-2 bg-acid ${isPlaying ? 'animate-eq' : 'opacity-30'}`}
                        style={{ 
                          height: '20%',
                          animationDelay: isPlaying ? `${delay}s` : '0s',
                          animationDuration: isPlaying ? `${duration}s` : '0s'
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-2 gap-3 p-2 bg-[#0a0a0a] rounded border border-[#1f1f1f] shadow-[inset_0_2px_8px_rgba(0,0,0,0.7)]">
                <button 
                  onClick={togglePlay} 
                  className={`h-12 border-t border-b-4 rounded flex items-center justify-center active:border-b-0 active:translate-y-1 transition-all cursor-pointer ${
                    isPlaying 
                      ? 'bg-[#1e2e1e] border-t-acid border-b-void text-acid shadow-[0_0_10px_rgba(197,255,0,0.3)]' 
                      : 'bg-[#222] border-t-[#444] border-b-void text-[#aaa]'
                  }`}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <button 
                  onClick={nextTrack} 
                  className="h-12 bg-[#222] border-t border-[#444] border-b-4 border-b-void rounded flex items-center justify-center text-[#aaa] active:border-b-0 active:translate-y-1 active:bg-[#1a1a1a] transition-all hover:text-acid cursor-pointer"
                  title="Next Track"
                >
                  <SkipForward size={18} />
                </button>
                <button 
                  onClick={cycleChannel} 
                  className="h-12 bg-[#222] border-t border-[#444] border-b-4 border-b-void rounded flex items-center justify-center text-[#aaa] active:border-b-0 active:translate-y-1 active:bg-[#1a1a1a] transition-all hover:text-acid cursor-pointer"
                  title="Cycle Audio Channel"
                >
                  <ListMusic size={18} />
                </button>
                <button 
                  onClick={toggleMute} 
                  className={`h-12 bg-[#222] border-t border-[#444] border-b-4 rounded flex items-center justify-center transition-all cursor-pointer ${
                    isMuted 
                      ? 'border-b-0 translate-y-1 bg-[#2a1414] text-red-400 border-t-red-500/50 shadow-[inset_0_0_10px_rgba(255,0,0,0.3)]' 
                      : 'border-b-void text-[#aaa] hover:text-acid active:border-b-0 active:translate-y-1'
                  }`}
                  title={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[60] w-14 h-14 rounded-full flex items-center justify-center bg-[#141414] border-2 ${
            isPlaying ? 'border-acid text-acid shadow-[0_0_15px_rgba(197,255,0,0.35)]' : 'border-[#333] text-[#888]'
          } hover:text-acid hover:border-acid transition-all duration-300 shadow-xl cursor-pointer`}
          title="Toggle Vibe Player"
        >
          <Power size={20} className={isPlaying ? 'animate-pulse' : ''} />
        </button>
      </div>
    </>
  );
}


