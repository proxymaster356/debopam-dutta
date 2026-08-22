import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubpageHeader from './SubpageHeader'
import TelemetryLightbox, { TelemetryItem } from './TelemetryLightbox'
import CircuitParticles from './CircuitParticles'

const competitions = [
  {
    title: 'Himalayan Startup Trek — IIT Mandi Catalyst',
    type: 'FINALIST',
    period: 'JAN 1–4, 2026',
    details: 'Reached the finals of the Startup Grand Challenge hosted by IIT Mandi Catalyst. Engaged in competitive pitch sequences, critical panel review loops, and entrepreneurial modeling workshops.',
    fig: 'FIG.06',
    badge: 'TOP 5% NATIONWIDE'
  },
  {
    title: 'URECKON 2026 — Codexify Hackathon',
    type: '2ND PLACE',
    period: 'FEB 21–22, 2026',
    details: 'Secured 2nd place at the Codexify Hackathon event during URECKON 2026 at UEM Kolkata, developing prototype software systems in an intense 24-hour cycle.',
    fig: 'FIG.07',
    badge: 'HACKATHON WINNER'
  },
  {
    title: 'Project Competition — IEM Innovation Council',
    type: '1ST PLACE',
    period: '04 SEP 2025',
    details: 'Awarded Certificate of Achievement for outstanding research prototype presentation in the CST, CSIT, and CSE department project showcase.',
    fig: 'FIG.08',
    badge: 'CHAMPION AWARD'
  },
  {
    title: 'IEEE MTT-S SBC UEMK — SPARKTANK',
    type: '1ST PLACE & DIAMOND TEAM',
    period: '26 JUL 2025',
    details: 'Received the Diamond Team Certificate of Appreciation for technical development outcomes during the SPARKTANK engineering review.',
    fig: 'FIG.09',
    badge: 'DIAMOND RATING'
  },
]

const certificateCategories = [
  {
    heading: 'AI & MACHINE LEARNING',
    items: [
      { name: 'Foundations of AI & ML — Microsoft', image: '/certificates/ai-ml-microsoft.jpg', date: '2024' },
      { name: 'Introduction to AI — IBM (Coursera)', image: '/certificates/ai-ibm-coursera.jpg', date: '2024' },
    ],
  },
  {
    heading: 'CYBERSECURITY & SYSTEMS',
    items: [
      { name: 'Cyber Security Certificate', image: '/certificates/cyber-security.jpg', date: '2025' },
      { name: '0xDay Cybersecurity Workshop', image: '/certificates/0xday.jpg', date: '2025' },
    ],
  },
  {
    heading: 'ACADEMIC & INNOVATION RECOGNITIONS',
    items: [
      { name: 'Certificate of Achievement — IEM Innovation Council', image: '/certificates/cert-photo-1.jpg', date: '2025' },
      { name: 'IEEE Certificate of Appreciation — SPARKTANK', image: '/certificates/cert-photo-4.jpg', date: '2025' },
      { name: 'Himalayan Startup Trek — IIT Mandi Catalyst Finalist', image: '/certificates/himalayan-startup-trek.jpg', date: '2026' },
      { name: '2nd Place — Codexify Hackathon, URECKON 2026', image: '/certificates/ureckon-2026-cert.jpg', date: '2026' },
    ],
  },
]

function Certificates() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Flatten all certificate items into a single array for lightbox navigation
  const allCertItems: TelemetryItem[] = useMemo(() => {
    const items: TelemetryItem[] = []
    certificateCategories.forEach((cat) => {
      cat.items.forEach((cert, i) => {
        items.push({
          image: cert.image,
          title: cert.name,
          category: cat.heading,
          date: cert.date,
          plateId: `CERT_${items.length + 1}`,
          note: 'Verified certificate document registered with departmental innovation records.',
        })
      })
    })
    return items
  }, [])

  return (
    <section 
      id="achievements" 
      className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto bg-void min-h-screen text-left"
    >
      {/* Background Subtle Particle Canvas */}
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
        <CircuitParticles />
      </div>

      {/* Reusable Subpage Header */}
      <SubpageHeader 
        chapter="ARCHIVE // ACCREDITATION"
        title="ACHIEVEMENTS"
        outlineTitle="& RECORDS"
        description="Chronological record of interdisciplinary competitions, prototype achievements, and verified credentials validated by scientific and engineering panels."
        telemetry={[
          { label: 'STATUS', value: 'VERIFIED' },
          { label: 'TOTAL_RECORDS', value: '12' },
          { label: 'PANEL_AUDIT', value: 'PASSED' },
        ]}
      />

      {/* Competitions Bento Subsection */}
      <div className="mb-24">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-acid mb-8 border-b border-borders pb-4">
          <span>// REGISTER_01: COMPETITIVE OUTCOMES</span>
          <span className="text-smoke">4 ENTRIES AUDITED</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitions.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
              className="group relative border border-borders bg-surface p-8 flex flex-col justify-between hover:border-acid/60 transition-all duration-300 overflow-hidden"
            >
              {/* Corner accent tick */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-acid opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-baseline font-mono text-[10px]">
                  <span className="text-acid font-bold">[{item.fig}]</span>
                  <span className="text-smoke uppercase tracking-wider">{item.period}</span>
                </div>
                
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-bone group-hover:text-acid transition-colors duration-200">
                  {item.title}
                </h3>
                
                <p className="font-sans text-xs font-light text-ash leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-borders/60 flex flex-wrap justify-between items-center gap-3 font-mono text-[10px]">
                <span className="text-smoke">{item.badge}</span>
                <span className="badge-acid">{item.type}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Certificates Categories Subsection */}
      <div>
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-acid mb-12 border-b border-borders pb-4">
          <span>// REGISTER_02: VERIFIED CREDENTIALS</span>
          <span className="text-smoke">8 CERTIFICATES</span>
        </div>

        <div className="flex flex-col gap-20">
          {certificateCategories.map((cat) => (
            <div key={cat.heading} className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-acid" />
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-bone">
                  {cat.heading}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((cert, i) => {
                  // Find the flat index of this cert in allCertItems
                  const flatIdx = allCertItems.findIndex((c) => c.image === cert.image && c.title === cert.name)
                  return (
                  <motion.div
                    key={`${cat.heading}-${i}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveIndex(flatIdx)}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(flatIdx)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }}
                    className="group cursor-pointer border border-borders bg-surface flex flex-col hover:border-acid/60 transition-colors duration-300 relative overflow-hidden"
                  >
                    {/* Laser Scanline simulation on hover */}
                    <div className="absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-transparent via-acid to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 ease-in-out pointer-events-none z-10" />

                    {/* Grayscale hover image container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-void">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[700ms]"
                        loading="lazy"
                      />
                      {/* Interactive Telemetry Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-void/0 group-hover:bg-void/40 transition-all duration-300">
                        <span className="opacity-0 group-hover:opacity-100 bg-acid text-void font-mono text-[9px] uppercase tracking-widest px-4 py-2 transition-all duration-300 font-semibold">
                          INSPECT_TELEMETRY
                        </span>
                      </div>
                    </div>

                    {/* Label & Meta */}
                    <div className="p-4 border-t border-borders flex justify-between items-center font-mono">
                      <p className="text-left text-xs uppercase tracking-tight text-smoke group-hover:text-bone transition-colors duration-200 truncate pr-2">
                        {cert.name}
                      </p>
                      <span className="text-[9px] text-acid shrink-0">
                        [{cert.date}]
                      </span>
                    </div>
                  </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Lightbox Modal with Navigation */}
      <AnimatePresence>
        {activeIndex !== null && (
          <TelemetryLightbox
            items={allCertItems}
            currentIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Certificates
