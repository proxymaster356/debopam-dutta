import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  homeX: number
  homeY: number
  vx: number
  vy: number
  radius: number
}

function CircuitParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const spacing = 45 // Grid cell size
    const repulsionRadius = 130
    const springStrength = 0.04
    const friction = 0.88
    const mouseForce = 0.55

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
      initGrid()
    }

    const initGrid = () => {
      particles = []
      const cols = Math.floor(canvas.width / spacing) + 1
      const rows = Math.floor(canvas.height / spacing) + 1

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // Add slight organic offset to the microchip grid nodes
          const x = c * spacing + (Math.random() - 0.5) * 8
          const y = r * spacing + (Math.random() - 0.5) * 8
          particles.push({
            x,
            y,
            homeX: x,
            homeY: y,
            vx: 0,
            vy: 0,
            radius: Math.random() > 0.85 ? 2.5 : 1.2,
          })
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    resize()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current

      // Update particle positions
      particles.forEach((p) => {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Mouse repulsion
        if (dist < repulsionRadius) {
          const force = (repulsionRadius - dist) / repulsionRadius
          const angle = Math.atan2(dy, dx)
          // Repel away from cursor
          p.vx -= Math.cos(angle) * force * mouseForce * 8
          p.vy -= Math.sin(angle) * force * mouseForce * 8
        }

        // Return to home position using spring physics
        const homeDx = p.homeX - p.x
        const homeDy = p.homeY - p.y
        p.vx += homeDx * springStrength
        p.vy += homeDy * springStrength

        // Apply friction and move
        p.vx *= friction
        p.vy *= friction
        p.x += p.vx
        p.y += p.vy
      })

      // Draw circuit lines (connections)
      ctx.strokeStyle = 'rgba(196, 255, 0, 0.07)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        // Connect to some neighboring particles in the array list
        // (Since particles are initialized row-by-row, look ahead by 1 and cols size)
        const checkCount = 8
        for (let j = i + 1; j < Math.min(i + checkCount, particles.length); j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy
          
          if (distSq < spacing * spacing * 1.8) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Draw circuit nodes (dots)
      ctx.fillStyle = '#C4FF00'
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 bg-void"
    />
  )
}

export default CircuitParticles
