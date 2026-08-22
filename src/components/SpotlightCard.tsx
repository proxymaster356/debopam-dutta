import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'article'
  [key: string]: any
}

function SpotlightCard({ children, className = '', as = 'div', ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const Tag = as === 'article' ? motion.article : motion.div

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden border border-borders bg-surface transition-all duration-300
        hover:border-acid/50 hover:bg-elevated rounded-none
        ${className}`}
      {...rest}
    >
      {/* Radial spotlight overlay - CRISPR Acid Green */}
      <div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, rgba(196, 255, 0, 0.08), transparent 45%)`,
        }}
      />
      
      {/* Spotlight border glow - CRISPR Acid Green */}
      <div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${position.x}px ${position.y}px, rgba(196, 255, 0, 0.22), transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  )
}

export default SpotlightCard
