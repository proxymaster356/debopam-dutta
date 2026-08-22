import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

interface SubpageHeaderProps {
  chapter: string
  title: string
  outlineTitle: string
  description: string
  telemetry: {
    label: string
    value: string
  }[]
  className?: string
}

function SubpageHeader({
  chapter,
  title,
  outlineTitle,
  description,
  telemetry,
  className = "mb-16 md:mb-24"
}: SubpageHeaderProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Top Breadcrumb & Telemetry Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-borders pb-4 mb-8 font-mono text-[10px] uppercase tracking-widest text-smoke">
        <Link
          to="/"
          className="flex items-center gap-2 text-bone hover:text-acid transition-colors duration-200 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span>RETURN TO ROOT [00]</span>
        </Link>

        {/* Dynamic telemetry stats */}
        <div className="flex flex-wrap items-center gap-4 text-smoke">
          {telemetry.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-acid">{item.label}:</span>
              <span className="text-bone font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Title Grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="grid gap-6 lg:grid-cols-12 items-start"
      >
        <div className="lg:col-span-6 text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
            [{chapter}]
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mt-2 text-bone leading-[0.9]">
            {title} <br />
            <span className="text-outline">{outlineTitle}</span>
          </h1>
        </div>
        <p className="lg:col-span-6 text-sm md:text-base font-light text-ash leading-relaxed self-end lg:pl-12 text-left">
          {description}
        </p>
      </motion.div>
    </div>
  )
}

export default SubpageHeader
