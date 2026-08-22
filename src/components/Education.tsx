import { motion } from 'framer-motion'

const educationItems = [
  {
    title: 'B.Tech in Biotechnology Engineering',
    institute: 'UNIVERSITY OF ENGINEERING & MANAGEMENT, KOLKATA',
    period: '2024 – PRESENT',
    details: 'Current GPA: 8.67 / 10.0 (3rd Semester). Concentrating on applied AI models, biosensing hardware interfaces, and computer vision pipelines.',
    index: '01'
  },
  {
    title: 'Higher Secondary Schooling',
    institute: 'SUBHASPALLY VIDYANIKETAN (H.S.), WEST BENGAL',
    period: '2022 – 2024',
    details: 'Academic GPA: 8.5 / 10.0. Core science track covering physics, chemistry, biology, mathematics, and computer science.',
    index: '02'
  }
]

function Education() {
  return (
    <section 
      id="education" 
      className="px-6 md:px-12 py-24 md:py-32 border-t border-borders bg-void"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="lg:col-span-4 text-left"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
            [CHAPTER_02 // REGISTRY]
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-bone">
            ACADEMIC <br />
            <span className="text-outline">REGISTRY</span>
          </h2>
          <p className="mt-6 text-sm font-light text-ash max-w-xs leading-relaxed">
            Curriculum pathways and foundational qualifications in engineering and biological sciences.
          </p>
        </motion.div>

        {/* Right Side: Ledger list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="lg:col-span-8 border-y border-borders divide-y divide-borders font-mono"
        >
          {educationItems.map((item) => (
            <div 
              key={item.title} 
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-elevated px-4 transition-colors duration-200"
            >
              {/* Year info (cols 3) */}
              <div className="md:col-span-3 text-acid font-semibold text-xs tracking-wider">
                [{item.period}]
              </div>

              {/* Title & Institute (cols 5) */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <h3 className="font-display text-lg font-black uppercase tracking-tight text-bone">
                  {item.title}
                </h3>
                <span className="text-[10px] text-smoke tracking-wider leading-relaxed">
                  // {item.institute}
                </span>
              </div>

              {/* Details / Summary (cols 4) */}
              <div className="md:col-span-4 font-sans text-xs font-light text-ash leading-relaxed">
                {item.details}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Education
