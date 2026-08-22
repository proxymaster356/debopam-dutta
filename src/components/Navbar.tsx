import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FiX, FiMenu } from 'react-icons/fi'

const sectionLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

const pageLinks = [
  { to: '/achievements', label: 'Achievements' },
  { to: '/posters', label: 'Posters' },
  { to: '/events', label: 'Events' },
  { to: '/photography', label: 'Photography' },
  { to: '/bioai-cli', label: 'BioAI CLI' },
]

function Navbar({ activeSection }: { activeSection: string }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  
  // The sections (About, Skills, etc.) are actually on the /portfolio route now
  const isPortfolioPage = location.pathname === '/portfolio'

  const handleSectionClick = useCallback((sectionId: string) => {
    setIsOpen(false)
    if (isPortfolioPage) {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(sectionId)
        if (el) {
          // Calculate offset accounting for navbar (64px) + extra visual breathing room
          const y = el.getBoundingClientRect().top + window.scrollY - 100
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }
    } else {
      // If we're on a subpage (e.g., /photography) and click 'Skills', go to /portfolio#skills
      navigate(sectionId === 'home' ? '/portfolio' : `/portfolio#${sectionId}`)
    }
  }, [isPortfolioPage, navigate])

  const menuVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: { 
      clipPath: "inset(0 0 0% 0)", 
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
    },
    exit: { 
      clipPath: "inset(0 0 100% 0)", 
      transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } 
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } 
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-borders bg-void/75 backdrop-blur-xl h-16 transition-all duration-300">
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="font-display text-xl font-black uppercase tracking-tighter text-bone hover:text-acid transition-colors duration-200"
          >
            Debopam Dutta
          </Link>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-8">
            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-6">
              {sectionLinks.slice(0, 4).map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleSectionClick(link.id)}
                  className={`relative font-mono text-xs uppercase tracking-widest py-1 transition-colors duration-200 ${
                    isPortfolioPage && activeSection === link.id
                      ? 'text-acid font-semibold'
                      : 'text-smoke hover:text-bone'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-4 w-px bg-borders" />
              {pageLinks.slice(0, 2).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-mono text-xs uppercase tracking-widest py-1 transition-colors duration-200 ${
                      isActive ? 'text-acid font-semibold' : 'text-smoke hover:text-bone'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* CLI Access Button - glowing */}
            <NavLink
              to="/bioai-cli"
              className={({ isActive }) =>
                `flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 rounded-sm ${
                  isActive
                    ? 'border-acid bg-acid/20 text-acid shadow-[0_0_12px_rgba(196,255,0,0.4)]'
                    : 'border-acid/40 bg-acid/5 text-acid/80 hover:border-acid hover:bg-acid/10 hover:shadow-[0_0_12px_rgba(196,255,0,0.3)]'
                }`
              }
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
              CLI
            </NavLink>

            {/* Menu Trigger Button (Brutalist style) */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 border border-borders bg-surface hover:border-acid hover:text-acid px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
            >
              {isOpen ? <FiX size={14} /> : <FiMenu size={14} />}
              <span>Index</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Overlay Wipe Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-void flex flex-col justify-between pt-16 pb-8 px-6 md:px-12 max-w-full overflow-y-auto lg:overflow-hidden"
          >
            {/* Background microchip-like guidelines */}
            <div className="absolute inset-0 -z-10 grid grid-cols-12 gap-6 opacity-[0.02] pointer-events-none px-6 md:px-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-full border-r border-bone" />
              ))}
            </div>

            <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto">
              {/* Primary Section Links (Cabinet Grotesk display font with mono numbers) */}
              <motion.div 
                variants={containerVariants}
                className="lg:col-span-7 flex flex-col gap-4 md:gap-5"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid mb-1 block">
                  // CORE REGISTER
                </span>
                {sectionLinks.map((link, index) => (
                  <motion.button
                    variants={itemVariants}
                    key={link.id}
                    onClick={() => handleSectionClick(link.id)}
                    className="flex items-baseline gap-4 text-left group w-fit"
                  >
                    <span className="font-mono text-xs text-smoke tracking-wider">
                      0{index + 1}
                    </span>
                    <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-bone group-hover:text-acid transition-colors duration-300 relative leading-none">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-full" />
                    </span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Secondary Subpages Links (Outline type) */}
              <motion.div 
                variants={containerVariants}
                className="lg:col-span-5 flex flex-col gap-5 lg:border-l lg:border-borders lg:pl-12 justify-center"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid mb-3 block">
                    // DOSSIER ARCHIVE
                  </span>
                  <div className="flex flex-col gap-5">
                    {pageLinks.map((link) => (
                      <motion.div variants={itemVariants} key={link.to}>
                        <NavLink
                          to={link.to}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `font-display text-2xl md:text-3xl font-black uppercase tracking-wide block hover:text-acid transition-all duration-300 relative w-fit group leading-none ${
                              isActive ? 'text-acid' : 'text-outline hover:[-webkit-text-stroke-color:#C4FF00]'
                            }`
                          }
                        >
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-full" />
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technical Coordinates metadata */}
                <motion.div 
                  variants={itemVariants} 
                  className="mt-6 pt-6 border-t border-borders font-mono text-[10px] uppercase tracking-widest text-smoke flex flex-col gap-1"
                >
                  <div>SYS_LOC: 22.5726° N, 88.3639° E</div>
                  <div>SEC_STATUS: STABLE // BIO_ENG_AI</div>
                  <div>VERSION: V3.0.0_CINEMATIC</div>
                </motion.div>
              </motion.div>
            </div>

            {/* Footer indicator within menu */}
            <div className="mx-auto w-full max-w-7xl flex justify-between items-center font-mono text-[9px] text-smoke border-t border-borders/40 pt-4 mt-4">
              <span>DEBOPAM DUTTA © 2026</span>
              <span className="text-acid">CRISPR GEN_KEY_OK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
