import { motion } from 'framer-motion'

const ledger = [
  { label: 'Academic standing', value: 'GPA 8.67 / 10.0' },
  { label: 'Research core', value: 'BIO AI & COMPUTER VISION' },
  { label: 'Affiliation', value: 'UEM KOLKATA (3RD YEAR)' },
  { label: 'Hardware stack', value: 'COMFORTABLE IN IOT DEVICES TO AI PLATFORMS' },
  { label: 'Scientific tools', value: 'PYMOL, MATLAB, TENSORFLOW, KERNELS' },
  { label: 'Bioinformatics interest', value: 'COMPUTATIONAL GENOMICS' }
]

function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-12 py-24 md:py-32 lg:py-40 max-w-7xl mx-auto border-t border-borders bg-void"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Asymmetric portrait image grid (Spans 5) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          {/* Framed corner-cut portrait */}
          <div className="relative p-1.5 border border-borders bg-surface clip-corner max-w-md w-full">
            <div className="overflow-hidden aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src="/profile-5.jpeg"
                alt="Debopam Dutta - Laboratory Study"
                className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          {/* Micro captions */}
          <div className="flex justify-between items-center max-w-md px-1 font-mono text-[9px] uppercase tracking-widest text-smoke">
            <span>[FIG.03] SPECIMEN_ACTIVE_RUN</span>
            <span className="text-acid">BIO_LAB_STABLE</span>
          </div>
        </motion.div>

        {/* Right Column: Editorial Text & Specifications Ledger (Spans 7) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="lg:col-span-7 flex flex-col gap-10"
        >
          {/* Section Header */}
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
              [CHAPTER_01 // INTRO]
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mt-2 text-bone">
              BIO-ENGINEERING <br />
              <span className="text-outline">MANIFESTO</span>
            </h2>
            <p className="mt-8 text-base md:text-lg leading-relaxed font-light text-ash">
              I am a Biotechnology Engineering student at UEM Kolkata, constructing a workspace at the interface of computational biology and physical hardware. My engineering methodology blends laboratory protocols with deep learning pipelines (YOLOv8, CNNs), embedded firmware (Arduino, ESP32), and sensor networks. I focus on developing modular, explainable intelligence solutions targeting real-world diagnostic, agricultural, and biochemical challenges.
            </p>
          </div>

          {/* Specifications Ledger */}
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid mb-4 block">
              // TECHNICAL_REGISTER_LEDGER
            </span>
            <div className="border-y border-borders divide-y divide-borders font-mono">
              {ledger.map((item, idx) => (
                <div
                  key={idx}
                  className="py-4 flex flex-col sm:flex-row justify-between items-baseline gap-2 text-xs hover:bg-elevated px-3 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-acid">[0{idx + 1}]</span>
                    <span className="text-smoke uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-bone uppercase tracking-widest text-[10px] sm:text-xs">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
