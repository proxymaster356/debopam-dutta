import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CircuitParticles from './CircuitParticles'
import DecryptedText from './DecryptedText'
import TiltedCard from './TiltedCard'

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Parallax scroll calculations
  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 800], [0, 160])
  const figure1Y = useTransform(scrollY, [0, 800], [0, -120])
  const figure2Y = useTransform(scrollY, [0, 800], [0, 220])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])

  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Animating line reveal variants
  const lineVariants = {
    hidden: { y: '110%' },
    visible: (custom: number) => ({
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.76, 0, 0.24, 1],
        delay: custom * 0.15,
      },
    }),
  }

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden border-b border-borders bg-void"
    >
      {/* Canvas circuit particles background */}
      <CircuitParticles />

      {/* Radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_95%)] pointer-events-none z-0" />

      {/* Main Grid Layout */}
      <motion.div 
        style={{ opacity: isDesktop ? heroOpacity : 1 }}
        className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 md:pt-0"
      >
        {/* Left side: Editorial Typography block */}
        <motion.div 
          style={{ y: isDesktop ? textY : 0 }}
          className="lg:col-span-7 flex flex-col gap-8 text-left"
        >
          {/* Micro-labels in mono */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
            <span className="text-acid">[REGISTER_01]</span>
            <span>UEM KOLKATA // CGPA: 8.67</span>
            <span className="text-borders">|</span>
            <span className="text-acid">[REGISTER_02]</span>
            <span>BIOTECH + AI DEVELOPER</span>
          </div>

          {/* Staggered Heading Line Reveal */}
          <div>
            <div className="overflow-hidden h-fit flex py-1">
              <motion.h1 
                custom={0}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-[15vw] md:text-[11vw] lg:text-[9.5vw] font-black uppercase leading-[0.8] tracking-tighter text-bone"
              >
                DEBOPAM
              </motion.h1>
            </div>
            <div className="overflow-hidden h-fit flex py-1">
              <motion.h1 
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-[15vw] md:text-[11vw] lg:text-[9.5vw] font-black uppercase leading-[0.8] text-outline-acid"
              >
                DUTTA
              </motion.h1>
            </div>
          </div>

          {/* Subtitle with Scramble DecryptedText animation */}
          <div className="max-w-lg">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-acid mb-2">
              // SYS_STATE: INITIALIZING_BIOLOGIC_CIRCUITS
            </div>
            <p className="text-lg font-light leading-relaxed text-ash">
              <DecryptedText 
                text="Aspiring Biotechnology Engineer combining wet-lab cellular analysis with local AI models, IoT embedded sensors, and computer vision pipelines to engineer healthcare and bio-intelligence."
                speed={30}
                maxIterations={15}
                animateOn="view"
                className="text-ash"
                encryptedClassName="text-acid font-mono font-semibold"
              />
            </p>
          </div>

          {/* Action CTAs with Hard-Swap Hover Transitions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('projects')
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 64
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
              className="btn-primary"
            >
              PROJECTS_PORTFOLIO
            </button>
            <button
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="btn-secondary"
            >
              DOWNLOAD_CV.PDF
            </button>
          </div>
        </motion.div>

        {/* Right side: Two Parallax Figures (Corner-cut polygons) */}
        <div className="lg:col-span-5 relative flex flex-col sm:flex-row lg:block items-center justify-center gap-8 lg:gap-0 mt-8 lg:mt-0 min-h-auto lg:min-h-[500px]">
          {/* Primary Figure (Tilted and Parallax Drifting) */}
          <motion.div 
            style={{ y: isDesktop ? figure1Y : 0 }}
            className="relative lg:absolute z-20 w-64 md:w-72 lg:left-4 lg:top-12"
          >
            <TiltedCard 
              imageSrc="/profile-1.jpeg" 
              altText="Debopam Dutta - Lab Work"
              containerHeight="380px"
              imageHeight="380px"
              imageWidth="100%"
              rotateAmplitude={8}
              scaleOnHover={1.03}
            />
            <div className="mt-2 text-left font-mono text-[8px] uppercase tracking-widest text-smoke">
              [FIG.01] PRIMARY_SUBJECT // SYS_PLATE_01
            </div>
          </motion.div>

          {/* Secondary Figure (Clipped, Offset and Parallax Drifting) */}
          <motion.div 
            style={{ y: isDesktop ? figure2Y : 0 }}
            className="relative lg:absolute z-10 w-44 md:w-48 lg:right-4 lg:bottom-12"
          >
            <div className="clip-corner bg-surface border border-borders p-1.5 backdrop-blur-md">
              <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <img 
                  src="/profile-3.jpeg" 
                  alt="Debopam Dutta - Microscope Focus" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="mt-2 text-left font-mono text-[8px] uppercase tracking-widest text-smoke">
              [FIG.02] LAB_ANALYSIS // SPECTROSCOPY_FOCUS
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Vertical SCROLL Cue on the right edge */}
      <div className="absolute right-6 bottom-16 z-20 hidden md:flex flex-col items-center gap-4 cursor-pointer" onClick={scrollToAbout}>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-smoke rotate-90 translate-y-[-10px]">
          SCROLL
        </span>
        <div className="w-[1px] h-12 bg-borders relative overflow-hidden">
          <motion.div 
            animate={{ y: [-48, 48] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
            className="w-full h-4 bg-acid absolute top-0"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero

