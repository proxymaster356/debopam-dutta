import { useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { FiX, FiExternalLink, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export interface TelemetryItem {
  image: string
  title: string
  category?: string
  date?: string
  plateId?: string
  note?: string
}

interface TelemetryLightboxProps {
  items: TelemetryItem[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

/* ─── Mini Stack Preview (React Bits inspired) ─── */
function StackCard({
  children,
  onSendToBack,
}: {
  children: React.ReactNode
  onSendToBack: () => void
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-60, 60], [30, -30])
  const rotateY = useTransform(x, [-60, 60], [-30, 30])

  function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.offset.y) > 80) {
      onSendToBack()
    } else {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}

function PhotoStack({
  items,
  currentIndex,
  onNavigate,
}: {
  items: TelemetryItem[]
  currentIndex: number
  onNavigate: (index: number) => void
}) {
  // Build a small window of upcoming cards (max 4)
  const upcomingIndices: number[] = []
  for (let i = 1; i <= Math.min(4, items.length - 1); i++) {
    upcomingIndices.push((currentIndex + i) % items.length)
  }

  const [stackOrder, setStackOrder] = useState(upcomingIndices)

  // Reset stack when currentIndex changes
  useEffect(() => {
    const next: number[] = []
    for (let i = 1; i <= Math.min(4, items.length - 1); i++) {
      next.push((currentIndex + i) % items.length)
    }
    setStackOrder(next)
  }, [currentIndex, items.length])

  const sendToBack = (idx: number) => {
    // Navigate to the dragged card
    onNavigate(idx)
  }

  if (stackOrder.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-[9px] uppercase tracking-widest text-acid">
        // NEXT_IN_QUEUE [{stackOrder.length}]
      </span>
      <div
        className="relative mx-auto"
        style={{
          width: 140,
          height: 100,
          perspective: 600,
        }}
      >
        {stackOrder.map((itemIdx, i) => {
          const item = items[itemIdx]
          if (!item) return null
          const randomRotate = (i % 2 === 0 ? 1 : -1) * (i * 2.5)

          return (
            <StackCard key={`${itemIdx}-${i}`} onSendToBack={() => sendToBack(itemIdx)}>
              <motion.div
                className="absolute inset-0 border border-borders bg-void overflow-hidden cursor-grab active:cursor-grabbing"
                animate={{
                  rotateZ: (stackOrder.length - i - 1) * 4 + randomRotate,
                  scale: 1 + i * 0.05 - stackOrder.length * 0.05,
                  transformOrigin: '90% 90%',
                }}
                initial={false}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{ width: 140, height: 100 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                {/* Plate ID overlay */}
                <div className="absolute bottom-1 left-1 font-mono text-[7px] text-acid bg-void/70 px-1">
                  {item.plateId || `PLATE_${itemIdx + 1}`}
                </div>
              </motion.div>
            </StackCard>
          )
        })}
      </div>
      <span className="font-mono text-[8px] text-smoke text-center mt-1 select-none">
        DRAG TO BROWSE
      </span>
    </div>
  )
}

/* ─── Main Telemetry Lightbox ─── */
function TelemetryLightbox({ items, currentIndex, onClose, onNavigate }: TelemetryLightboxProps) {
  const item = items[currentIndex]

  const goNext = useCallback(() => {
    if (items.length > 1) {
      onNavigate((currentIndex + 1) % items.length)
    }
  }, [currentIndex, items.length, onNavigate])

  const goPrev = useCallback(() => {
    if (items.length > 1) {
      onNavigate((currentIndex - 1 + items.length) % items.length)
    }
  }, [currentIndex, items.length, onNavigate])

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    },
    [onClose, goNext, goPrev],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!item) return null

  // Generate a reproducible pseudo-hash from the image path
  const hashSource = item.image || item.title
  const hash =
    '0x' +
    Array.from(hashSource)
      .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0)
      .toString(16)
      .toUpperCase()
      .padStart(8, '0')

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-void/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-5xl bg-surface border border-borders rounded-none shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 border border-borders bg-surface hover:border-acid hover:text-acid p-2 transition-colors duration-200"
          aria-label="Close modal"
        >
          <FiX size={16} />
        </button>

        {/* Left Side: High-Resolution Frame (Spans 8 cols) */}
        <div className="lg:col-span-8 relative bg-void flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-borders overflow-hidden">
          {/* Visual crosshair corners */}
          <div className="absolute top-2 left-2 text-acid text-xs font-mono select-none pointer-events-none">+</div>
          <div className="absolute top-2 right-2 text-acid text-xs font-mono select-none pointer-events-none">+</div>
          <div className="absolute bottom-2 left-2 text-acid text-xs font-mono select-none pointer-events-none">+</div>
          <div className="absolute bottom-2 right-2 text-acid text-xs font-mono select-none pointer-events-none">+</div>

          {/* Counter badge */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-smoke z-10">
            [{String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}]
          </div>

          {/* Prev/Next Arrows on Image */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 border border-borders bg-surface/80 hover:border-acid hover:text-acid p-2 transition-colors duration-200 backdrop-blur-sm"
                aria-label="Previous photo"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 border border-borders bg-surface/80 hover:border-acid hover:text-acid p-2 transition-colors duration-200 backdrop-blur-sm"
                aria-label="Next photo"
              >
                <FiChevronRight size={18} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={item.image}
              src={item.image}
              alt={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="w-full max-h-[65vh] lg:max-h-[75vh] object-contain select-none"
            />
          </AnimatePresence>
        </div>

        {/* Right Side: Telemetry Specs Sidebar (Spans 4 cols) */}
        <div className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between font-mono text-left bg-surface overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between font-mono text-[9px] text-acid uppercase tracking-widest mb-1">
                <span>// {item.plateId || 'DOSSIER_PLATE'}</span>
                <span className="flex items-center gap-1 text-acid">
                  <FiCheckCircle size={10} /> VALIDATED
                </span>
              </div>
              <h3 className="font-display text-lg font-black uppercase tracking-tight text-bone leading-tight">
                {item.title}
              </h3>
            </div>

            {/* Metadata Ledger */}
            <div className="divide-y divide-borders border-y border-borders text-xs font-mono py-1">
              {item.category && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-smoke">CATEGORY:</span>
                  <span className="text-bone uppercase">{item.category}</span>
                </div>
              )}
              {item.date && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-smoke">DATE_STAMP:</span>
                  <span className="text-bone">{item.date}</span>
                </div>
              )}
              <div className="py-2.5 flex justify-between">
                <span className="text-smoke">CHECKSUM:</span>
                <span className="text-acid">{hash}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-smoke">INTEGRITY:</span>
                <span className="text-bone">100%_SECURE</span>
              </div>
            </div>

            {item.note && (
              <p className="font-sans text-xs font-light text-ash leading-relaxed">
                {item.note}
              </p>
            )}

            {/* Photo Stack Preview — React Bits Stack Pattern */}
            {items.length > 1 && (
              <div className="pt-2 border-t border-borders">
                <PhotoStack
                  items={items}
                  currentIndex={currentIndex}
                  onNavigate={onNavigate}
                />
              </div>
            )}
          </div>

          <div className="pt-6 flex flex-col gap-3">
            {items.length > 1 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="btn-secondary flex-1 text-center flex items-center justify-center gap-2 text-[10px]"
                >
                  <FiChevronLeft size={12} />
                  <span>PREV</span>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="btn-secondary flex-1 text-center flex items-center justify-center gap-2 text-[10px]"
                >
                  <span>NEXT</span>
                  <FiChevronRight size={12} />
                </button>
              </div>
            )}
            <a
              href={item.image}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full text-center flex items-center justify-center gap-2 text-[10px]"
            >
              <span>EXPAND_RAW_FILE</span>
              <FiExternalLink size={12} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

export default TelemetryLightbox
