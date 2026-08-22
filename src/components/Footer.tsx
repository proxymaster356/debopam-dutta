import { FiArrowUp } from 'react-icons/fi'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-borders bg-void px-6 py-16 md:px-12 relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Signal Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
              [Signal]
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs text-smoke">
              <a href="mailto:debopamdutta99@gmail.com" className="hover:text-bone transition-colors duration-200">
                debopamdutta99@gmail.com
              </a>
              <a href="tel:+918116324958" className="hover:text-bone transition-colors duration-200">
                +91 8116324958
              </a>
            </div>
          </div>

          {/* Channels Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
              [Channels]
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs text-smoke">
              <a 
                href="https://github.com/proxymaster356" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-bone transition-colors duration-200"
              >
                GitHub // proxymaster356
              </a>
              <a 
                href="https://www.linkedin.com/in/debopam-dutta-bb220b323/" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-bone transition-colors duration-200"
              >
                LinkedIn // debopam-dutta
              </a>
              <a 
                href="https://instagram.com/dutta_debopam" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-bone transition-colors duration-200"
              >
                Instagram // dutta_debopam
              </a>
            </div>
          </div>

          {/* Coordinates Column */}
          <div className="md:col-span-4 flex flex-col gap-4 relative">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
              [Coordinates]
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs text-smoke">
              <span>Kolkata, WB, India</span>
              <span>22.5726° N, 88.3639° E</span>
              <span>UEM Kolkata // Biotech Eng</span>
            </div>
            
            {/* Scroll back to top button */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="absolute right-0 bottom-0 border border-borders bg-surface hover:border-acid hover:text-acid p-2.5 transition-colors duration-200"
            >
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Giant solid wordmark */}
        <div className="border-t border-borders/40 pt-12 select-none pointer-events-none">
          <div className="font-display text-[13vw] font-black uppercase text-white leading-[0.8] text-center">
            DEBOPAM
          </div>
        </div>

        {/* Legal / System status bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono uppercase tracking-widest text-smoke gap-2">
          <span>&copy; {currentYear} DEBOPAM DUTTA. ALL SYSTEM LOGS ACTIVE.</span>
          <span className="text-acid">CRISPR_LOCK_SYSTEM_ARMED</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
