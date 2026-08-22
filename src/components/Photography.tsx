import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubpageHeader from './SubpageHeader'
import TelemetryLightbox, { TelemetryItem } from './TelemetryLightbox'
import CircuitParticles from './CircuitParticles'

const photos = [
  'WhatsApp Image 2026-03-07 at 13.44.27.jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.27 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.28.jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.28 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.28 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.45.jpeg',
  'WhatsApp Image 2026-03-07 at 13.45.52.jpeg',
  'WhatsApp Image 2026-03-07 at 13.47.04.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.54.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.54 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.55.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.55 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.56.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.56 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.57.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.57 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.57 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.58.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.58 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.58 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.59.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.59 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.00.jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.00 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.00 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.00 (3).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.01.jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.01 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.01 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.02.jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.02 (1).jpeg',
  'WhatsApp Image 2024-09-14 at 23.36.02_5fff57b3.jpg',
  'DSC_1528.JPG',
  'IMG_20210327_232547-EDIT.jpg',
  'IMG_20210905_213211.jpg',
  'IMG_20231024_121128.jpg',
  'IMG_20231025_141032.jpg',
  'IMG_20231026_132139.jpg',
  'IMG_20231028_103505.jpg',
  'IMG_20240814_225827.jpg',
  'SAVE_20201127_223702.jpg',
  'SAVE_20240807_201313.jpg',
]

const buildPhotoPath = (filename: string) => `/photography/${encodeURIComponent(filename)}`
const formatCaption = (filename: string) => filename.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ')

function Photography() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const telemetryItems: TelemetryItem[] = useMemo(
    () =>
      photos.map((file, index) => ({
        image: buildPhotoPath(file),
        title: 'ARCHIVAL OPTICAL CAPTURE',
        category: 'Visual & Sensory Archive',
        plateId: `PLATE.${String(index + 1).padStart(2, '0')}`,
        note: 'High-fidelity sensory capture showcasing contrast, natural textures, or architectural geometry.',
      })),
    [],
  )

  return (
    <section 
      id="photography" 
      className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto bg-void min-h-screen text-left"
    >
      {/* Subtle Background Circuit Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
        <CircuitParticles />
      </div>

      {/* Reusable Subpage Header */}
      <SubpageHeader 
        chapter="ARCHIVE // SENSORY"
        title="PHOTOGRAPHY"
        outlineTitle="& PLATES"
        description="An index of captured sensory details, urban frames, and biological patterns. Grayscale representations that reveal their organic hues upon mouse inspection."
        telemetry={[
          { label: 'STATUS', value: 'INDEXED' },
          { label: 'TOTAL_PLATES', value: '42' },
          { label: 'OPTICAL_SENSOR', value: 'DSLR_RAW' },
        ]}
      />

      {/* CSS Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full">
        {photos.map((file, index) => {
          const plateId = `PLATE.${String(index + 1).padStart(2, '0')}`

          return (
            <motion.div
              key={file}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: (index % 3) * 0.1 }}
              className="break-inside-avoid group border border-borders bg-surface p-3 transition-colors duration-300 hover:border-acid/60 inline-block w-full relative overflow-hidden"
            >
              {/* Laser Scanline simulation on hover */}
              <div className="absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-transparent via-acid to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 ease-in-out pointer-events-none z-10" />

              <div className="overflow-hidden border border-borders bg-void rounded-none relative">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="block w-full focus:outline-none"
                >
                  <img
                    src={buildPhotoPath(file)}
                    alt={formatCaption(file)}
                    loading="lazy"
                    className="w-full h-auto cursor-zoom-in object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-[700ms]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-void/0 group-hover:bg-void/40 transition-all duration-300">
                    <span className="opacity-0 group-hover:opacity-100 bg-acid text-void font-mono text-[9px] uppercase tracking-widest px-4 py-2 transition-all duration-300 font-semibold">
                      TELEMETRY_VIEW
                    </span>
                  </div>
                </button>
              </div>

              {/* FIG index label */}
              <div className="mt-3 flex justify-between items-center font-mono text-[9px] uppercase tracking-widest text-smoke px-1">
                <span className="text-bone group-hover:text-acid transition-colors">{plateId}</span>
                <span className="text-acid">OPTICAL_OK</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Telemetry Lightbox Modal with Navigation */}
      <AnimatePresence>
        {activeIndex !== null && (
          <TelemetryLightbox
            items={telemetryItems}
            currentIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Photography
