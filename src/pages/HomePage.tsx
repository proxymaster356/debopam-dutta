import { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import InfiniteMarquee from '../components/InfiniteMarquee'
import Education from '../components/Education'
import Skills from '../components/Skills'
import CoreCompetencies from '../components/CoreCompetencies'
import Toolbox from '../components/Toolbox'
import Projects from '../components/Projects'
import Publications from '../components/Publications'
import Research from '../components/Research'
import Contact from '../components/Contact'
import VoiceAssistant from '../components/VoiceAssistant'

const sectionIds = [
  'home',
  'about',
  'education',
  'skills',
  'core-competencies',
  'toolbox',
  'projects',
  'publications',
  'research',
  'contact',
]

interface HomePageProps {
  setActiveSection: (id: string) => void
}

function HomePage({ setActiveSection }: HomePageProps) {
  // Intersection Observer to track active nav section
  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-64px 0px -40% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [setActiveSection])

  // Handle hash scrolling on page load/change
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return
      const target = document.getElementById(hash)
      if (target) {
        setTimeout(() => {
          const yOffset = -100
          const y = target.getBoundingClientRect().top + window.scrollY + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }, 100)
      }
    }

    handleHashScroll()
    window.addEventListener('hashchange', handleHashScroll)
    return () => window.removeEventListener('hashchange', handleHashScroll)
  }, [])

  return (
    <div className="relative w-full">
      <Hero />
      <InfiniteMarquee />
      <About />
      <Education />
      <Skills />
      <CoreCompetencies />
      <Toolbox />
      <Projects />
      <Publications />
      <Research />
      <Contact />
      <VoiceAssistant />
    </div>
  )
}

export default HomePage
