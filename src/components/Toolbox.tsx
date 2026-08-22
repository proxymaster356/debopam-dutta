import { motion } from 'framer-motion'
import { 
  SiReact, SiNodedotjs, SiPython, SiPytorch, SiTypescript, 
  SiDocker, SiCplusplus, SiLinux, SiGit, SiArduino, 
  SiOpencv, SiEspressif, SiRaspberrypi,
  SiTensorflow, SiKeras, SiScikitlearn, SiJupyter, SiPandas
} from 'react-icons/si'
import { GiMolecule, GiTestTubes, GiDna2 } from 'react-icons/gi'
import LogoLoop, { LogoItem } from './LogoLoop'

const row1 = [
  { icon: SiReact, label: 'REACT' },
  { icon: SiNodedotjs, label: 'NODE.JS' },
  { icon: SiTypescript, label: 'TYPESCRIPT' },
  { icon: SiDocker, label: 'DOCKER' },
  { icon: SiGit, label: 'GIT' },
  { icon: SiLinux, label: 'LINUX' },
  { icon: SiCplusplus, label: 'C++' },
]

const row2 = [
  { icon: SiPython, label: 'PYTHON' },
  { icon: SiArduino, label: 'ARDUINO' },
  { icon: SiEspressif, label: 'ESP32' },
  { icon: SiRaspberrypi, label: 'RASPBERRY_PI' },
  { icon: SiOpencv, label: 'OPENCV/ROBOFLOW' },
  { icon: SiJupyter, label: 'DATA ANALYSIS' },
  { icon: SiPandas, label: 'PANDAS' },
]

const row3 = [
  { icon: SiPytorch, label: 'PYTORCH' },
  { icon: SiTensorflow, label: 'TENSORFLOW' },
  { icon: SiKeras, label: 'KERAS' },
  { icon: SiScikitlearn, label: 'SCIKIT-LEARN' },
  { icon: GiMolecule, label: 'DOCKING' },
  { icon: GiTestTubes, label: 'SCREENING' },
  { icon: GiDna2, label: 'BIOINFORMATICS' },
]

function mapToCard(logos: typeof row1): LogoItem[] {
  return logos.map(({ icon: Icon, label }) => ({
    node: (
      <div className="py-8 px-2 group/card relative">
        <div className="w-36 h-32 flex flex-col items-center justify-center bg-[#111111] border border-[#292929] rounded-lg transition-all duration-300 group-hover/card:drop-shadow-[0_0_25px_rgba(197,255,0,0.6)] group-hover/card:scale-110 group-hover/card:border-acid group-hover/card:z-50 relative cursor-pointer text-smoke group-hover/card:text-acid">
          <Icon className="text-4xl mb-3 transition-transform duration-300 group-hover/card:scale-110" />
          <span className="font-mono text-[9px] font-bold tracking-widest text-center px-1">{label}</span>
        </div>
      </div>
    )
  }))
}

function Toolbox() {
  const items1 = mapToCard(row1)
  const items2 = mapToCard(row2)
  const items3 = mapToCard(row3)

  return (
    <section 
      id="toolbox" 
      className="py-24 border-t border-borders bg-void overflow-hidden text-left w-full"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid">
            [SYSTEM // STACK]
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mt-2 text-bone">
            TECHNICAL <span className="text-outline">TOOLBOX</span>
          </h2>
        </motion.div>
      </div>

      <div className="w-full relative py-4 h-auto overflow-hidden">
        {/* Left/Right fading edge masks for brutalist layout overlay */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-void via-void/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-void via-void/80 to-transparent z-20 pointer-events-none" />

        {/* 3D Perspective Wrapper */}
        <div 
          className="flex flex-col gap-6 w-[120%] -ml-[10%]"
          style={{
            transform: 'perspective(1600px) rotateX(10deg) rotateY(0deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <LogoLoop 
            logos={items1}
            speed={40}
            logoHeight={128}
            gap={0}
            direction="left"
            pauseOnHover={true}
            scaleOnHover={false}
            className="w-full !overflow-visible -my-8 hover:z-10 relative"
          />
          <LogoLoop 
            logos={items2}
            speed={35}
            logoHeight={128}
            gap={0}
            direction="right"
            pauseOnHover={true}
            scaleOnHover={false}
            className="w-full !overflow-visible -my-8 hover:z-10 relative"
          />
          <LogoLoop 
            logos={items3}
            speed={45}
            logoHeight={128}
            gap={0}
            direction="left"
            pauseOnHover={true}
            scaleOnHover={false}
            className="w-full !overflow-visible -my-8 hover:z-10 relative"
          />
        </div>
      </div>
    </section>
  )
}

export default Toolbox
