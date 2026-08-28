import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    title: 'WEARABLE AI NAVIGATION ASSISTANT',
    desc: 'Developed a real-time, offline navigation system using YOLOv8 for obstacle detection and Ollama for local scene interpretation. Retrained models on custom datasets representing complex Indian urban environments, improving detection accuracy by 67%. Integrated Gemini API for interactive context and Python TTS for auditory feedback.',
    tech: ['YOLOv8', 'Ollama', 'Google Gemini', 'Python', 'TTS', 'EDGE AI'],
    status: 'FINALIST HST26 IIT MANDI',
    image: '/ChatGPT Image Aug 16, 2026, 12_14_55 AM.png',
    fig: 'FIG.01',
    github: 'https://github.com/proxymaster356'
  },
  {
    title: 'Smart Dual-Factor Attendance System',
    desc: 'Built an IoT-based attendance tracker to prevent proxy registration. Integrated physical RFID scanning authentication with real-time facial recognition algorithms for dual-factor verification. Streamed registration data dynamically to Google Sheets ledger records.',
    tech: ['IoT Hardware', 'RFID', 'Face Recognition', 'ESP32', 'Python'],
    status: 'COMPLETED',
    image: '/Screenshot 2026-08-16 000533.png',
    fig: 'FIG.02',
    github: 'https://github.com/proxymaster356/smart-attendance-system'
  },
  {
    title: 'BACTERIA COLONY COUNTING SYSTEM',
    desc: 'Created a custom computer vision tool for automated bacterial colony quantification. Designed edge-detection and contour-segmentation algorithms in OpenCV to analyze laboratory culture plate images, reducing manual counting error.',
    tech: ['Computer Vision', 'OpenCV', 'Python', 'Image Processing'],
    status: 'COMPLETED LAB DEPLOY',
    image: '/ChatGPT Image Aug 16, 2026, 12_01_17 AM.png',
    fig: 'FIG.03',
    github: 'https://github.com/proxymaster356'
  },
  {
    title: 'AUTOMATED BACTERIAL IDENTIFICATION & ANTIBIOTIC ANALYZER',
    desc: 'AI-powered diagnostic assistance system for automated bacterial identification and antibiotic resistance categorization. Analyzed zone of inhibition data using machine learning classification models to guide therapeutic recommendations.',
    tech: ['Machine Learning', 'Data Science', 'Python', 'Biostatistics'],
    status: 'IN PROGRESS',
    image: '/828c3381-13fa-4454-821f-15510af9239f.png',
    fig: 'FIG.04',
    github: 'https://github.com/proxymaster356'
  },
  {
    title: 'ECOREMED AI: BIOREMEDIATION SITE ANALYZER',
    desc: 'An environmental intelligence system using CNN deep learning models to detect pollution, forecast contamination severity, and recommend optimized bioremediation strategies with explainable decision support.',
    tech: ['CNN', 'Deep Learning', 'XAI', 'Environmental Science'],
    status: 'IN PROGRESS',
    image: '/Screenshot 2026-08-16 085705.png',
    fig: 'FIG.05',
    github: 'https://github.com/proxymaster356'
  },
  {
    title: 'CROPINTEL: AI-POWERED SMART FARMING ASSISTANT',
    desc: 'CropIntel is a full-stack AI-powered mobile application built for farmers and agricultural professionals. It combines on-device image analysis, LLM-powered chat, Gemini AI news, and a secure cloud backend to give farmers intelligent, real-time insights about their crops — right from their phone.',
    tech: ['Flutter', 'Python', 'FastAPI', 'Flask', 'MongoDB', 'Gemini', 'Ollama'],
    status: 'COMPLETED',
    image: '/BIOINTEL.jpeg',
    fig: 'FIG.06',
    github: 'https://github.com/proxymaster356'
  },
  {
    title: 'AI-ENABLED MULTIPLEX BIOSENSOR SYSTEM',
    desc: 'A Point-of-Care Diagnostic Pipeline for AMR, Biofilm & Oncology-Associated Microbial Biomarkers. This project implements a complete AI-powered point-of-care (POC) biosensor pipeline — from raw electrochemical signal to clinical decision report.',
    tech: ['AI', 'Biosensors', 'Diagnostics', 'Biomarkers', 'Machine Learning', 'CNN'],
    status: 'ACTIVE BUILD software build done',
    image: '/Screenshot 2026-04-20 140117.png',
    fig: 'FIG.07',
    github: 'https://github.com/proxymaster356/Multiplex-AI-Biosensor'
  },

  function Projects() {
    return (
      <section
        id="projects"
        className="px-6 md:px-12 py-24 md:py-32 lg:py-40 border-t border-borders bg-void"
      >
        <div className="mx-auto max-w-7xl">
          {/* Editorial Header */}
          <div className="grid gap-6 lg:grid-cols-12 items-start mb-24 text-left">
            <div className="lg:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
                [CHAPTER_05 // PORTFOLIO]
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-bone">
                SELECTED <br />
                <span className="text-outline">WORKS</span>
              </h2>
            </div>
            <p className="lg:col-span-7 text-base font-light text-ash leading-relaxed self-end lg:pl-12">
              An index of development prototypes combining biological datasets with machine learning models and physical sensor hardware.
            </p>
          </div>

          {/* Projects List (Alternating Rows) */}
          <div className="flex flex-col gap-24 md:gap-32">
            {projects.map((proj, index) => {
              const isOdd = index % 2 !== 0

              return (
                <div
                  key={proj.title}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  {/* Image Section (Reorder on odd rows) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className={`lg:col-span-5 ${isOdd ? 'lg:order-last' : ''}`}
                  >
                    <div className="relative group p-1 border border-borders bg-surface clip-corner">
                      <div className="overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[700ms]">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-auto object-contain transition-transform duration-[700ms] group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Text Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                    className="lg:col-span-7 flex flex-col gap-4 text-left"
                  >
                    {/* FIG Index and status badges */}
                    <div className="flex items-center gap-4 font-mono">
                      <span className="text-acid text-[10px] tracking-[0.2em]">
                        [{proj.fig}]
                      </span>
                      <span className="badge-acid">
                        {proj.status}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-bone leading-tight">
                      {proj.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm font-light text-ash leading-relaxed">
                      {proj.desc}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="border border-borders px-3 py-1 font-mono text-[11px] text-smoke uppercase tracking-wider bg-surface"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 pt-4">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs text-bone hover:text-acid border-b border-borders hover:border-acid pb-1 transition-all duration-200"
                      >
                        <FiGithub size={12} />
                        <span>SOURCE_CODE // REPO</span>
                        <FiExternalLink size={10} className="opacity-55" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

export default Projects
