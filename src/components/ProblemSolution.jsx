import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ProblemSolution() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1])

  const [ref1, inView1] = useInView({ threshold: 0.5, triggerOnce: false })
  const [ref2, inView2] = useInView({ threshold: 0.5, triggerOnce: false })
  const [ref3, inView3] = useInView({ threshold: 0.5, triggerOnce: false })

  return (
    <section id="mission" ref={containerRef} className="relative py-32 bg-stratosphere">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-orbital mb-6">
            Precision in <span className="text-teal">Chaos</span>
          </h2>
          <p className="text-xl text-orbital/70 max-w-3xl mx-auto">
            Low Earth Orbit is congested. We bring deterministic order to the orbital environment.
          </p>
        </motion.div>

        {/* Scrollytelling Steps */}
        <div className="space-y-96">

          {/* Step 1: The Problem */}
          <motion.div
            ref={ref1}
            style={{ opacity: opacity1 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className={`transition-all duration-700 ${inView1 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
                <span className="text-red-400 font-mono text-sm tracking-wider">PROBLEM</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-orbital mb-6">
                Space is <span className="text-red-400">Crowded</span>
              </h3>
              <p className="text-lg text-orbital/70 mb-6 leading-relaxed">
                Over <span className="text-teal font-bold">34,000 tracked debris objects</span> orbit Earth.
                A single collision can cascade into thousands of fragments, making entire orbital shells unusable.
              </p>
              <ul className="space-y-3">
                {['Kessler Syndrome Risk', 'Uncoordinated Maneuvers', 'Limited Orbital Awareness'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-orbital/80">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`relative transition-all duration-700 delay-200 ${inView1 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="aspect-square glass rounded-2xl p-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Chaotic debris visualization */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-red-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        x: [0, Math.random() * 40 - 20],
                        y: [0, Math.random() * 40 - 20],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 2: The Solution */}
          <motion.div
            ref={ref2}
            style={{ opacity: opacity2 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className={`relative order-2 md:order-1 transition-all duration-700 ${inView2 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="aspect-square glass rounded-2xl p-8 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Safety shield visualization */}
                  <motion.div
                    className="absolute inset-0 border-4 border-teal rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-amber rounded-full glow-amber" />
                  </div>
                  {/* Grid lines */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px bg-teal/20"
                      style={{ top: `${(i + 1) * 12.5}%` }}
                    />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-full w-px bg-teal/20"
                      style={{ left: `${(i + 1) * 12.5}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={`order-1 md:order-2 transition-all duration-700 delay-200 ${inView2 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="inline-block px-4 py-2 bg-teal/10 border border-teal/30 rounded-full mb-6">
                <span className="text-teal font-mono text-sm tracking-wider">SOLUTION</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-orbital mb-6">
                We Bring <span className="text-teal">Order</span>
              </h3>
              <p className="text-lg text-orbital/70 mb-6 leading-relaxed">
                <span className="text-teal font-bold">IkirereMesh</span> coordinates satellite constellations
                using a graph-based planner with deterministic safety shields that guarantee collision-free trajectories.
              </p>
              <ul className="space-y-3">
                {['Reinforcement Learning Planner', 'Deterministic Safety Override', 'Multi-Agent Coordination'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-orbital/80">
                    <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Step 3: The Result */}
          <motion.div
            ref={ref3}
            style={{ opacity: opacity3 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className={`transition-all duration-700 ${inView3 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-block px-4 py-2 bg-amber/10 border border-amber/30 rounded-full mb-6">
                <span className="text-amber font-mono text-sm tracking-wider">OUTCOME</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-orbital mb-6">
                Deterministic <span className="text-amber">Safety</span>
              </h3>
              <p className="text-lg text-orbital/70 mb-6 leading-relaxed">
                Our safety shield mathematically guarantees separation distances,
                overriding any unsafe RL actions with <span className="text-amber font-bold">provably safe maneuvers</span>.
              </p>
              <div className="glass rounded-xl p-6 font-mono text-sm">
                <div className="text-teal/60 mb-2">// Safety Shield Output</div>
                <div className="text-orbital/80">
                  <span className="text-amber">if</span> (collision_risk &gt; threshold) {'{'}<br />
                  &nbsp;&nbsp;<span className="text-teal">execute</span>(deterministic_maneuver);<br />
                  &nbsp;&nbsp;<span className="text-amber">guarantee</span>(min_separation);<br />
                  {'}'}
                </div>
              </div>
            </div>
            <div className={`relative transition-all duration-700 delay-200 ${inView3 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="glass rounded-2xl p-8">
                <div className="space-y-6">
                  {[
                    { label: 'Collision Avoidance', value: '100%', color: 'amber' },
                    { label: 'Fuel Efficiency', value: '95%', color: 'teal' },
                    { label: 'Reaction Time', value: '<500ms', color: 'teal' },
                  ].map((metric, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-orbital/70 text-sm">{metric.label}</span>
                        <span className={`text-${metric.color} font-bold`}>{metric.value}</span>
                      </div>
                      <div className="h-2 bg-stratosphere rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-${metric.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: metric.value === '100%' ? '100%' : metric.value === '95%' ? '95%' : '85%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
