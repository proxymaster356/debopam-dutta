import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubpageHeader from './SubpageHeader'
import TelemetryLightbox, { TelemetryItem } from './TelemetryLightbox'
import CircuitParticles from './CircuitParticles'

const events = [
  {
    title: 'IIT Mandi Innovation Participation',
    type: 'FINALIST SHOWCASE',
    period: 'JAN 2026',
    details: 'Presented our Wearable AI Navigation Assistant prototype to a panel of startup and engineering experts, receiving feedback on technical robustness and edge scaling.',
    fig: 'FIG.10',
    location: 'IIT MANDI, HIMACHAL PRADESH'
  },
  {
    title: 'Technical Showcases & Hack Sessions',
    type: 'EXHIBITORS',
    period: '2025–2026',
    details: 'Demonstrated real-time OpenCV automated count systems and ESP32 dual-factor circuits in departmental tech-fests and university workshops.',
    fig: 'FIG.11',
    location: 'KOLKATA, WB'
  },
]

const certificateCategories = [
  {
    heading: 'RESEARCH & PUBLICATIONS',
    items: [
      { name: 'Poster Presentation Certificate', image: '/certificates/debmalya-publication.jpg', date: '2025' },
      { name: 'IRIS Photography Club Certificate', image: '/certificates/iris-certificate.jpg', date: '2024' },
    ],
  },
  {
    heading: 'WORKSHOPS & VOLUNTEERING',
    items: [
      { name: 'Volunteer — Driveblaze Event', image: '/certificates/volunteer-driveblaze.png', date: '2025' },
      { name: 'Certificate of Volunteering', image: '/certificates/debopam-cert-1.jpg', date: '2025' },
      { name: 'Biospectrum Technical Workshop', image: '/certificates/img5.jpg', date: '2024' },
    ],
  },
  {
    heading: 'CONFERENCES & ACADEMIC PARTICIPATION',
    items: [
      { name: 'Certificate of Participation — Code to Cure, UEM Biotech', image: '/certificates/cert-photo-2.jpg', date: '2025' },
      { name: 'IEEE Certificate of Participation — SPARKTANK', image: '/certificates/cert-photo-3.jpg', date: '2025' },
      { name: 'HackSnippet 3.0 Hackathon — UEM Kolkata', image: '/certificates/2nd-sem-cert.png', date: '2024' },
      { name: 'UEMCOS 2024 — International Conference', image: '/certificates/40.jpg', date: '2024' },
    ],
  },
]

function Events() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Flatten all event certificate items into a single array for lightbox navigation
  const allEventCertItems: TelemetryItem[] = useMemo(() => {
    const items: TelemetryItem[] = []
    certificateCategories.forEach((cat) => {
      cat.items.forEach((cert) => {
        items.push({
          image: cert.image,
          title: cert.name,
          category: cat.heading,
          date: cert.date,
          plateId: `SEMINAR_${items.length + 1}`,
          note: 'Conference presentation or workshop participation credential verified by academic council.',
        })
      })
    })
    return items
  }, [])

  return (
    <section 
      id="events" 
      className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto bg-void min-h-screen text-left"
    >
      {/* Background Subtle Particle Canvas */}
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
        <CircuitParticles />
      </div>

      {/* Subpage Header */}
      <SubpageHeader 
        chapter="ARCHIVE // SEMINARS"
        title="EVENTS &"
        outlineTitle="WORKSHOPS"
        description="Documentation of hackathons, technical conferences, active presentations, and certifications completed in applied computing and bioinformatics."
        telemetry={[
          { label: 'STATUS', value: 'INDEXED' },
          { label: 'TOTAL_RECORDS', value: '11' },
          { label: 'LAST_SESSION', value: 'FEB 2026' },
        ]}
      />

      {/* Events Highlights */}
      <div className="mb-24">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-acid mb-8 border-b border-borders pb-4">
          <span>// REGISTER_01: HIGHLIGHTED ACTIVITIES</span>
          <span className="text-smoke">ACTIVE TIMELINE</span>
        </div>
        
        <div className="flex flex-col gap-6">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.08 }}
              className="border border-borders bg-surface p-8 hover:border-acid/60 transition-colors duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden group"
            >
              <div className="md:col-span-2 font-mono text-xs text-acid font-bold flex flex-col gap-1">
                <span>[{event.fig}]</span>
                <span className="text-smoke text-[9px] uppercase tracking-wider">{event.period}</span>
              </div>
              <div className="md:col-span-7 flex flex-col gap-2">
                <h3 className="font-display text-lg font-black uppercase tracking-tight text-bone group-hover:text-acid transition-colors duration-200">
                  {event.title}
                </h3>
                <p className="font-sans text-xs font-light text-ash leading-relaxed">
                  {event.details}
                </p>
                <span className="font-mono text-[9px] text-smoke uppercase tracking-widest mt-1">
                  LOC: {event.location}
                </span>
              </div>
              <div className="md:col-span-3 md:text-right">
                <span className="badge-acid">{event.type}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Certificate Categories */}
      <div>
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-acid mb-12 border-b border-borders pb-4">
          <span>// REGISTER_02: WORKSHOP CREDENTIALS</span>
          <span className="text-smoke">9 ARCHIVES</span>
        </div>

        <div className="flex flex-col gap-20">
          {certificateCategories.map((cat) => (
            <div key={cat.heading} className="flex flex-col gap-8 text-left">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-acid" />
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-bone">
                  {cat.heading}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((cert, i) => {
                  const flatIdx = allEventCertItems.findIndex((c) => c.image === cert.image && c.title === cert.name)
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

                    <div className="relative aspect-[4/3] overflow-hidden bg-void">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[700ms]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-void/0 group-hover:bg-void/40 transition-all duration-300">
                        <span className="opacity-0 group-hover:opacity-100 bg-acid text-void font-mono text-[9px] uppercase tracking-widest px-4 py-2 transition-all duration-300 font-semibold">
                          INSPECT_TELEMETRY
                        </span>
                      </div>
                    </div>
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
            items={allEventCertItems}
            currentIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Events
