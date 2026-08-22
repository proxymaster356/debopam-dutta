import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubpageHeader from './SubpageHeader'
import TelemetryLightbox, { TelemetryItem } from './TelemetryLightbox'
import CircuitParticles from './CircuitParticles'

const posters = [
  {
    title: 'Code to Cure Presentation Poster',
    event: 'Code to Cure, UEM Kolkata',
    note: 'Visualizing biological datasets, cellular morphology classification models, and computational diagnostic pipelines for precision medicine.',
    image: 'number1.jpg',
    date: '2025',
    category: 'Bioinformatics & Machine Learning',
    fig: 'POSTER_01'
  },
  {
    title: 'SPARKTANK Physics Showcase Poster',
    event: 'SPARKTANK Physics Poster Session',
    note: 'Physics showcase detailing biosensor circuits, piezoelectric transduction nodes, and multi-factor telemetry routing on ESP32 microcontrollers.',
    image: 'Physics_poster.png',
    date: '2025',
    category: 'Embedded Systems & Biophysics',
    fig: 'POSTER_02'
  },
]

const buildPosterPath = (filename: string) => `/photography/${encodeURIComponent(filename)}`

function Posters() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const posterItems: TelemetryItem[] = useMemo(
    () =>
      posters.map((item) => ({
        image: buildPosterPath(item.image),
        title: item.title,
        category: item.category,
        date: item.date,
        plateId: item.fig,
        note: item.note,
      })),
    [],
  )

  return (
    <section 
      id="posters" 
      className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto bg-void min-h-screen text-left"
    >
      {/* Subtle Background Circuit Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
        <CircuitParticles />
      </div>

      {/* Subpage Header */}
      <SubpageHeader 
        chapter="ARCHIVE // EXHIBITIONS"
        title="CONFERENCE"
        outlineTitle="POSTERS"
        description="Visual summaries of research publications, biological data pipelines, and physical instrumentation designs prepared for conference poster sessions."
        telemetry={[
          { label: 'STATUS', value: 'INDEXED' },
          { label: 'BOARDS', value: '02' },
          { label: 'RESOLUTION', value: '4K_DPI' },
        ]}
      />

      {/* Posters 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {posters.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
            className="group border border-borders bg-surface p-8 flex flex-col justify-between hover:border-acid/60 transition-all duration-300 relative overflow-hidden"
          >
            {/* Laser Scanline simulation on hover */}
            <div className="absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-transparent via-acid to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 ease-in-out pointer-events-none z-10" />

            <div>
              {/* Header tags */}
              <div className="flex justify-between items-baseline font-mono text-[10px] mb-6">
                <span className="text-acid font-bold">[{item.fig}]</span>
                <span className="text-smoke uppercase tracking-wider">{item.event}</span>
              </div>

              {/* Image preview frame with blueprint feel */}
              <div className="mb-6 overflow-hidden border border-borders bg-void relative">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="block w-full focus:outline-none"
                >
                  <img
                    src={buildPosterPath(item.image)}
                    alt={item.event}
                    loading="lazy"
                    className="h-80 w-full cursor-zoom-in object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-[700ms]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-void/0 group-hover:bg-void/40 transition-all duration-300">
                    <span className="opacity-0 group-hover:opacity-100 bg-acid text-void font-mono text-[9px] uppercase tracking-widest px-4 py-2 transition-all duration-300 font-semibold">
                      INSPECT_POSTER
                    </span>
                  </div>
                </button>
              </div>

              {/* Typography metadata */}
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-bone group-hover:text-acid transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-sans text-xs font-light text-ash leading-relaxed mt-2">
                  {item.note}
                </p>
              </div>
            </div>

            {/* Bottom ledger */}
            <div className="mt-8 pt-4 border-t border-borders/60 flex justify-between items-center font-mono text-[10px]">
              <span className="text-smoke">{item.category}</span>
              <span className="badge-acid">SESSION_{item.date}</span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Telemetry Lightbox Modal with Navigation */}
      <AnimatePresence>
        {activeIndex !== null && (
          <TelemetryLightbox
            items={posterItems}
            currentIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Posters
