import { motion } from 'framer-motion'

const socials = [
  { label: 'GitHub', value: 'proxymaster356', link: 'https://github.com/proxymaster356' },
  { label: 'Instagram', value: 'dutta_debopam', link: 'https://instagram.com/dutta_debopam' },
  { label: 'LinkedIn', value: 'Debopam Dutta', link: 'https://www.linkedin.com/in/debopam-dutta-bb220b323/' },
]

function Contact() {
  return (
    <section 
      id="contact" 
      className="px-6 md:px-12 py-24 md:py-32 lg:py-40 border-t border-borders bg-void"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Details & Socials (Spans 5) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="lg:col-span-5 flex flex-col gap-10 text-left"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
              [CHAPTER_09 // SIGNAL]
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-bone">
              ESTABLISH <br />
              <span className="text-outline">CONTACT</span>
            </h2>
            <p className="mt-6 text-sm font-light text-ash leading-relaxed">
              Let's collaborate on computer vision, IoT embedded systems prototyping, or interdisciplinary biology × artificial intelligence pipelines.
            </p>
          </div>

          <div className="flex flex-col gap-6 font-mono text-xs text-smoke">
            <div>
              <span className="text-acid block mb-1 uppercase tracking-widest text-[9px]">// EMAIL_COMM</span>
              <a 
                href="mailto:debopamdutta99@gmail.com" 
                className="text-bone hover:text-acid transition-colors border-b border-borders hover:border-acid pb-1 inline-block"
              >
                debopamdutta99@gmail.com
              </a>
            </div>
            
            <div>
              <span className="text-acid block mb-1 uppercase tracking-widest text-[9px]">// TELEPHONY_DIRECT</span>
              <a 
                href="tel:+918116324958" 
                className="text-bone hover:text-acid transition-colors border-b border-borders hover:border-acid pb-1 inline-block"
              >
                +91 8116324958
              </a>
            </div>
          </div>

          {/* Socials Ledger */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid mb-4 block">
              // EXTERNAL_CHANNELS
            </span>
            <div className="divide-y divide-borders border-y border-borders font-mono text-xs">
              {socials.map(({ label, value, link }) => (
                <a 
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 flex justify-between items-center hover:bg-elevated px-3 hover:text-acid transition-colors group"
                >
                  <span className="text-smoke uppercase tracking-wider">{label}</span>
                  <span className="text-bone group-hover:text-acid uppercase tracking-wider">{value}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Brutalist Message Form (Spans 7) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="lg:col-span-7 p-8 border border-borders bg-surface"
        >
          <form
            action="mailto:debopamdutta99@gmail.com"
            method="post"
            encType="text/plain"
            className="space-y-8 text-left font-mono"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name-input" className="text-[10px] text-acid uppercase tracking-widest">
                // SENDER_IDENTITY
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                required
                className="w-full border border-borders bg-void py-3 px-4 text-xs text-bone outline-none transition-colors focus:border-acid placeholder:text-smoke uppercase tracking-wider"
                placeholder="INPUT NAME"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email-input" className="text-[10px] text-acid uppercase tracking-widest">
                // RETURN_COORDINATE
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                required
                className="w-full border border-borders bg-void py-3 px-4 text-xs text-bone outline-none transition-colors focus:border-acid placeholder:text-smoke uppercase tracking-wider"
                placeholder="INPUT EMAIL ADDRESS"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message-input" className="text-[10px] text-acid uppercase tracking-widest">
                // TRANSMISSION_BODY
              </label>
              <textarea
                id="message-input"
                name="message"
                rows={5}
                required
                className="w-full border border-borders bg-void py-3 px-4 text-xs text-bone outline-none transition-colors focus:border-acid placeholder:text-smoke uppercase tracking-wider resize-none"
                placeholder="ENTER MESSAGE DETAILS"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full"
              >
                DISPATCH_TRANSMISSION
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
