import { motion } from 'framer-motion'

const publications = [
  {
    title: 'Automated Bacterial Identification & Resistance Analysis',
    status: 'MODELING STAGE',
    summary: 'Machine-learning-driven identification and susceptibility interpretation from inhibition-zone biological datasets.',
  },
  {
    title: 'AI for Bioremediation Decision Support Systems',
    status: 'DRAFTING PHASE',
    summary: 'A framework integrating explainable CNN convolutional neural network models for actionable environmental bioremediation workflows.',
  },
  {
    title: 'Bioluminescence: Mechanisms, Applications & Future Directions',
    status: 'LITERATURE DRAFT',
    summary: 'Investigation of biochemical structures of bioluminescent organisms, with applications in biosensing, medical imaging, and synthetic biology.',
  }
]

function Publications() {
  return (
    <section 
      id="publications" 
      className="px-6 md:px-12 py-24 md:py-32 border-t border-borders bg-void"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Editorial description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="lg:col-span-4 text-left"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
            [CHAPTER_06 // MANUSCRIPTS]
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-bone">
            TECHNICAL <br />
            <span className="text-outline">REPORTS</span>
          </h2>
          <p className="mt-6 text-sm font-light text-ash leading-relaxed">
            Scholarly articles and experimental documentations currently undergoing literature review, modeling, or formatting phases.
          </p>
        </motion.div>

        {/* Right Side: Ledger lines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="lg:col-span-8 border-y border-borders divide-y divide-borders font-mono"
        >
          {publications.map((item, index) => (
            <div 
              key={item.title} 
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start hover:bg-elevated px-4 transition-colors duration-200"
            >
              {/* Index */}
              <div className="md:col-span-1 text-acid font-semibold text-xs">
                [0{index + 1}]
              </div>

              {/* Title & Summary */}
              <div className="md:col-span-8 flex flex-col gap-2 text-left">
                <h3 className="font-display text-lg font-black uppercase tracking-tight text-bone">
                  {item.title}
                </h3>
                <p className="font-sans text-xs font-light text-ash leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Status */}
              <div className="md:col-span-3 md:text-right">
                <span className="badge-acid whitespace-nowrap">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Publications
