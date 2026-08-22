import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'

const competencies = [
  { 
    label: 'Team collaboration & leadership', 
    value: 95, 
    desc: 'Led interdisciplinary hardware-software teams during hackathons and engineered dual-factor security systems.',
    index: '01'
  },
  { 
    label: 'Problem solving under constraints', 
    value: 90, 
    desc: 'Constructed custom local AI inference models (Ollama/YOLO) for real-time obstacle avoidance in offline environments.',
    index: '02'
  },
  { 
    label: 'Technical pitching & presentation', 
    value: 80, 
    desc: 'National finalist presentation at IIT Mandi Catalyst HST26, explaining complex biological + ML designs to panels.',
    index: '03'
  },
  { 
    label: 'Hybrid timeline management', 
    value: 75, 
    desc: 'Coordinating wet-lab biochemical testing intervals with parallel software compiles and hardware assembly milestones.',
    index: '04'
  },
]

function CoreCompetencies() {
  return (
    <section 
      id="core-competencies" 
      className="px-6 md:px-12 py-24 md:py-32 border-t border-borders bg-void"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Editorial Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="lg:col-span-4 text-left"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
            [CHAPTER_04 // OPERATIONAL]
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-bone">
            OPERATIONAL <br />
            <span className="text-outline">METRICS</span>
          </h2>
          <p className="mt-6 text-sm font-light text-ash leading-relaxed">
            Quantifiable evaluations of organizational, leadership, and analytical execution capabilities.
          </p>
        </motion.div>

        {/* Right Side: Ledger with Spotlight Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {competencies.map((item, index) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
            >
              <SpotlightCard className="p-8 h-full flex flex-col justify-between text-left">
                <div className="flex flex-col gap-4">
                  {/* Card Title & Value */}
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="text-[10px] text-smoke uppercase tracking-wider">
                      [{item.index}]
                    </span>
                    <span className="text-acid text-xs font-semibold">
                      {item.value}%
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-black uppercase tracking-tight text-bone">
                    {item.label}
                  </h3>

                  {/* Horizontal Bar */}
                  <div className="h-[2px] w-full bg-borders relative overflow-hidden my-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
                      className="h-full bg-acid"
                    />
                  </div>

                  <p className="font-sans text-xs font-light text-smoke leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreCompetencies
