import { motion } from 'framer-motion'

const researchTracks = [
  {
    index: '01',
    title: 'Biomedical Computer Vision',
    domain: 'Computer Vision & Healthcare',
    focus: [
      'Colony counting automation using morphological filters & threshold segmentation.',
      'Contour analysis pipelines for real-time bacteria colony size quantification.',
      'Explainable validation structures for biomedical cellular classification models.'
    ],
    stat: 'Colony Counter: 94% Accuracy'
  },
  {
    index: '02',
    title: 'Assistive AI & IoT Prototyping',
    domain: 'Embedded Systems & Accessibility',
    focus: [
      'Wearable navigation systems utilizing local edge-inference YOLOv8 detectors.',
      'Integrating ultrasonic sensor grids with Raspberry pi4.',
      'Lidar sensor based navigation for autonomous mobile direction indicators',
      'Speech synthesis feedback models delivering context-aware spatial telemetry.'
    ],
    stat: 'Finalist HST26 IIT Mandi'
  },
  {
    index: '03',
    title: 'Agri-Bio Recommendation Models',
    domain: 'NLP & Agricultural Data',
    focus: [
      'Orchestrating local Ollama models for agricultural disease advice streams.',
      'Sensory mapping of environmental bioremediation severity variables.',
      'Explainable CNN architectures recommending soil contamination clean-up.'
    ],
    stat: 'BioIntel LLM: 91% Accuracy'
  }
]

function Research() {
  return (
    <section
      id="research"
      className="px-6 md:px-12 py-24 md:py-32 border-t border-borders bg-void"
    >
      {/* Editorial Header */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24 text-left">
        <div className="lg:col-span-5">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-acid">
            [CHAPTER_07 // RESEARCH]
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter mt-2 text-bone">
            ACTIVE <br />
            <span className="text-outline">TRACKS</span>
          </h2>
        </div>
        <p className="lg:col-span-7 text-lg font-light text-ash leading-relaxed self-end lg:pl-12">
          Bridging lab observations with computational architectures. My focus centers on developing high-accuracy computer vision networks, physical sensor integration, and explainable models.
        </p>
      </div>

      {/* Research Tracks Grid */}
      <div className="mx-auto max-w-7xl border-y border-borders divide-y divide-borders font-mono text-left">
        {researchTracks.map((track, i) => (
          <motion.div
            key={track.index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-elevated px-4 transition-colors duration-200"
          >
            {/* Track ID & Domain */}
            <div className="lg:col-span-3 flex flex-col gap-1">
              <span className="text-acid font-semibold text-sm tracking-wider">
                [TRACK_{track.index}]
              </span>
              <span className="text-xs text-smoke uppercase tracking-widest">
                // {track.domain}
              </span>
            </div>

            {/* Title & Stat */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <h3 className="font-display text-xl font-black uppercase tracking-tight text-bone">
                {track.title}
              </h3>
              <div className="mt-1">
                <span className="badge-acid">
                  {track.stat}
                </span>
              </div>
            </div>

            {/* Focus List */}
            <ul className="lg:col-span-5 flex flex-col gap-3 font-sans text-sm font-light text-ash leading-relaxed">
              {track.focus.map((item, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-acid font-mono text-xs select-none mt-0.5 flex-shrink-0">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Research
