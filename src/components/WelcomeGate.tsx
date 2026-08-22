import React from 'react';
import { motion } from 'framer-motion';
import Ferrofluid from './Ferrofluid';
import TargetCursor from './TargetCursor';
import TextPressure from './TextPressure';

interface WelcomeGateProps {
  onNavigate: (route: string) => void;
}

const WelcomeGate: React.FC<WelcomeGateProps> = ({ onNavigate }) => {
  const navItems = [
    { id: 'portfolio', label: 'PORTFOLIO', desc: 'Core Engineering & Projects' },
    { id: 'bioai', label: 'BIOAI', desc: 'BioTerminal' },
    { id: 'gallery', label: "DEB'S GALLERY", desc: 'Visual & Sensory Archive' },
    { id: 'research', label: 'RESEARCH', desc: 'Publications & Findings' },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-void font-mono text-bone cursor-none">
      {/* Background Ferrofluid Effect */}
      <div className="absolute inset-0 z-0">
        <Ferrofluid
          colors={["#C5FF00", "#d2ff3b", "#e7ff06"]}
          speed={0.6}
          scale={1.2}
          turbulence={1}
          fluidity={0.13}
          rimWidth={0.22}
          sharpness={2.5}
          shimmer={1.5}
          glow={2.3}
          flowDirection="right"
          opacity={1}
          mouseInteraction
          mouseStrength={1.9}
          mouseRadius={0.35}
        />
      </div>

      {/* Target Cursor Component */}
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-8 px-8">

        {/* Welcome Header — upper zone */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full text-center flex-shrink-0"
        >
          <div className="text-[10px] text-acid tracking-[0.3em] uppercase mb-3">
            // SECURE_CONNECTION_ESTABLISHED
          </div>
          <div className="w-full max-w-[95vw] mx-auto h-[100px] md:h-[160px]">
            <TextPressure
              text="DEBOPAM_OS"
              textColor="#f8fafc"
              stroke={true}
              strokeColor="#C5FF00"
              strokeWidth={1}
              flex={true}
              alpha={false}
              italic={true}
              width={true}
              weight={true}
            />
          </div>
        </motion.div>

        {/* Navigation Grid — lower zone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl flex-1 content-end pb-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              className="group cursor-target"
              onClick={() => onNavigate(item.id)}
            >
              <div className="border border-borders bg-surface/80 backdrop-blur-sm p-6 hover:border-acid transition-all duration-300 relative overflow-hidden">
                {/* Laser scanline */}
                <div className="absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-transparent via-acid to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 ease-in-out pointer-events-none z-10" />

                <h2 className="text-2xl font-black text-bone group-hover:text-acid transition-colors duration-300">
                  {item.label}
                </h2>
                <p className="text-smoke text-sm mt-2 font-light">
                  {item.desc}
                </p>

                <div className="absolute bottom-2 right-2 text-[8px] text-acid/50 group-hover:text-acid transition-colors">
                  SYSTEM_READY
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-smoke tracking-widest uppercase">
          SELECT_OPERATING_MODE
        </div>
      </div>
    </div>
  );
};

export default WelcomeGate;