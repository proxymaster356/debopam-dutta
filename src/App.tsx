import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WelcomeGate from './components/WelcomeGate'
import HomePage from './pages/HomePage'
import AchievementsPage from './pages/AchievementsPage'
import PostersPage from './pages/PostersPage'
import EventsPage from './pages/EventsPage'
import PhotographyPage from './pages/PhotographyPage'
import BioAICLI from './components/BioAICLI'
import ResearchLab from './components/ResearchLab'
import UserCursor from './components/UserCursor'
import { VibeCheckPlayer } from './components/VibeCheckPlayer'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('home')
  
  const isWelcome = location.pathname === '/'
  const resolvedActiveSection = location.pathname === '/portfolio' ? activeSection : ''

  // Lenis smooth scrolling setup
  useEffect(() => {
    // Don't enable lenis on welcome page to avoid weird scrolling issues
    if (isWelcome) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [isWelcome])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleGateNavigate = (route: string) => {
    if (route === 'portfolio') navigate('/portfolio');
    if (route === 'bioai') navigate('/bioai-cli');
    if (route === 'gallery') navigate('/photography');
    if (route === 'research') navigate('/research-lab');
  }

  return (
    <div className="relative min-h-screen bg-void text-ash overflow-x-hidden selection:bg-acid/20 selection:text-acid">
      <UserCursor />
      {!isWelcome && <div className="film-grain" />}
      
      {!isWelcome && <Navbar activeSection={resolvedActiveSection} />}
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomeGate onNavigate={handleGateNavigate} />} />
            <Route path="/portfolio" element={<HomePage setActiveSection={setActiveSection} />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/posters" element={<PostersPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/photography" element={<PhotographyPage />} />
            <Route path="/bioai-cli" element={<BioAICLI />} />
            <Route path="/research-lab" element={<ResearchLab />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      {!isWelcome && <VibeCheckPlayer />}
      {!isWelcome && <Footer />}
    </div>
  )
}

export default App
