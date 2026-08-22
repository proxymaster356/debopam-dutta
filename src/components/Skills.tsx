import React, { useEffect, useRef } from 'react';
import GithubRepoCard from './GithubRepoCard';
import { IconType } from 'react-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiWolframmathematica, 
  SiTensorflow, 
  SiPytorch, 
  SiPython, 
  SiCplusplus, 
  SiOpencv, 
  SiHuggingface, 
  SiPandas,
  SiArduino, 
  SiEspressif, 
  SiRaspberrypi 
} from 'react-icons/si';
import { FiEye, FiCpu, FiActivity, FiTerminal } from 'react-icons/fi';
import { FaDna } from 'react-icons/fa';
import SpotlightCard from './SpotlightCard';
import MagneticCard from './MagneticCard';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  desc: string;
  icons: IconType[];
}

interface SkillCategory {
  title: string;
  subtitle: string;
  index: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'BIOTECH COMPUTATION',
    subtitle: 'WET-LAB SOFTWARE CO-DESIGN',
    index: '01',
    skills: [
      { name: 'PyMOL', desc: 'Biomolecular 3D rendering', icons: [FaDna] },
      { name: 'MATLAB', desc: 'Numerical modeling & ODEs', icons: [SiWolframmathematica] },
      { name: 'TensorFlow / PyTorch', desc: 'Deep learning frameworks', icons: [SiTensorflow, SiPytorch] },
      { name: 'Python / C++', desc: 'Scientific development', icons: [SiPython, SiCplusplus] },
      { name: 'Bioinformatics', desc: 'Sequence & structural pipelines', icons: [FiTerminal] }
    ]
  },
  {
    title: 'ARTIFICIAL INTELLIGENCE',
    subtitle: 'MODEL TRAINING & INFERENCE',
    index: '02',
    skills: [
      { name: 'Computer Vision', desc: 'YOLOv8 & OpenCV counting', icons: [SiOpencv, FiEye] },
      { name: 'Deep Learning', desc: 'CNN classification models', icons: [SiPytorch] },
      { name: 'Local LLMs', desc: 'Ollama model orchestration', icons: [FiCpu] },
      { name: 'NLP & Transformers', desc: 'HuggingFace & advice streams', icons: [SiHuggingface] },
      { name: 'Preprocessing', desc: 'Pandas dataset validation', icons: [SiPandas] }
    ]
  },
  {
    title: 'EMBEDDED SYSTEMS & IOT',
    subtitle: 'HARDWARE SENSOR NETWORKS',
    index: '03',
    skills: [
      { name: 'Arduino & ESP32', desc: 'Low-latency C++ firmware', icons: [SiArduino, SiEspressif] },
      { name: 'Raspberry Pi', desc: 'Edge processing gateway', icons: [SiRaspberrypi] },
      { name: 'Dual-Factor RFID', desc: 'Secure circuit integration', icons: [FiCpu] },
      { name: 'Biosensor Routing', desc: 'Serial telemetry stream mapping', icons: [FiActivity] },
      { name: 'Data Logging', desc: 'Non-volatile log indexing', icons: [FiTerminal] }
    ]
  }
];

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        }
      });

      // Title animation
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 50, filter: 'blur(10px)' }, 
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
      );

      // Staggered cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        // The card container slides in
        tl.fromTo(card,
          { opacity: 0, scale: 0.9, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' },
          `-=${i === 0 ? 0.4 : 0.5}` // overlap animations
        );

        // Skill rows slide in inside the card
        const rows = card.querySelectorAll('.skill-row');
        tl.fromTo(rows,
          { opacity: 0, x: -20, rotateX: 45 },
          { opacity: 1, x: 0, rotateX: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' },
          "-=0.4"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="px-6 md:px-12 py-24 md:py-32 border-t border-borders bg-void"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Editorial description */}
        <div ref={titleRef} className="lg:col-span-4 text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
            [CHAPTER_03 // SKILLS]
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-bone">
            TECHNICAL <br />
            <span className="text-outline">COMPASS</span>
          </h2>
          <p className="mt-6 text-sm font-light text-ash leading-relaxed">
            Methodical layout of technical specialties spanning biological visualization, physical sensory hardware, and artificial intelligence pipelines.
          </p>
          
          <div className="mt-12 hidden lg:block pr-8">
            <GithubRepoCard username="proxymaster356" repo="Multiplex-AI-Biosensor" />
          </div>
        </div>

        {/* Right Side: Brutalist Grid with GSAP and Magnetic Hover */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full cursor-target">
          {skillCategories.map((category, index) => (
            <div
              key={category.index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={index === 2 ? 'md:col-span-2' : ''}
              style={{ perspective: '1000px' }} // for GSAP 3D rotations
            >
              <SpotlightCard className="p-8 h-full flex flex-col justify-between overflow-hidden">
                <div className="flex flex-col gap-6 text-left relative z-10">
                  {/* Category Header */}
                  <div className="flex justify-between items-baseline border-b border-borders pb-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-acid">
                        // {category.subtitle}
                      </span>
                      <h3 className="font-display text-xl font-black uppercase tracking-tight text-bone">
                        {category.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-smoke">
                      [{category.index}]
                    </span>
                  </div>

                  {/* Skills List with Magnetic Physics */}
                  <div className="flex flex-col gap-3 w-full">
                    {category.skills.map((skill, sIdx) => (
                      <MagneticCard key={sIdx} strength={10} className="w-full skill-row">
                        <div 
                          className="flex justify-between items-center p-3 border border-borders bg-surface/50 backdrop-blur-sm hover:border-acid/80 hover:bg-surface transition-all duration-300 w-full group shadow-lg"
                        >
                          <div className="flex flex-col text-left">
                            <span className="font-mono text-xs font-bold text-bone uppercase tracking-wider group-hover:text-acid transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-[10px] text-smoke font-light mt-0.5 leading-normal">
                              {skill.desc}
                            </span>
                          </div>
                          <div className="flex gap-2 text-smoke text-sm shrink-0 items-center pl-4 group-hover:text-acid transition-colors">
                            {skill.icons.map((Icon, iIdx) => (
                              <Icon key={iIdx} />
                            ))}
                          </div>
                        </div>
                      </MagneticCard>
                    ))}
                  </div>
                </div>
                
                {/* Decorative Terminal Overlay */}
                <div className="absolute bottom-2 left-4 text-[8px] text-acid/30 font-mono select-none pointer-events-none">
                  SYS.LD.{(Math.random() * 100).toFixed(2)}%
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
