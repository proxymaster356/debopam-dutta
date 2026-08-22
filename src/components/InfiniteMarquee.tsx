const words = [
  'BIOTECH',
  'AI',
  'HARDWARE',
  'EMBEDDED',
  'COMPUTATIONAL BIOLOGY',
  'COMPUTER VISION',
  'BIOSENSORS',
  'MACHINE LEARNING',
  'IOT SYSTEMS',
]

function InfiniteMarquee() {
  return (
    <div className="relative border-y border-borders bg-void/50 overflow-hidden py-10 select-none group w-full">
      <div className="flex w-[200%] overflow-hidden">
        {/* Seamless scrolling marquee strips */}
        {[0, 1].map((index) => (
          <div
            key={index}
            className="flex shrink-0 items-center justify-around min-w-full animate-marquee-slow group-hover:[animation-play-state:paused]"
            aria-hidden={index === 1}
          >
            {words.map((word, wIdx) => (
              <div
                key={`${index}-${wIdx}`}
                className="flex items-center gap-12 text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase"
              >
                <span className="text-outline whitespace-nowrap">
                  {word}
                </span>
                <span className="text-acid text-2xl md:text-3xl font-light">
                  ×
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfiniteMarquee
