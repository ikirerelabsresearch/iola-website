import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Roadmap() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  const phases = [
    {
      phase: 'Phase 1',
      status: 'In Progress',
      title: 'Sandbox Simulation',
      period: 'Current',
      description: 'High-fidelity 32-satellite LEO simulation with RL planner and safety shield integration.',
      deliverables: [
        'WebGL visualization dashboard',
        'Collision avoidance verification',
        'Multi-agent coordination prototype',
      ],
      color: 'amber',
      active: true,
    },
    {
      phase: 'Phase 2',
      status: 'Q1 2025',
      title: 'Real Orbital Data',
      period: 'Next',
      description: 'Integration with ESA DRAMA and NASA CARA databases for real-time conjunction analysis.',
      deliverables: [
        'Live TLE feed integration',
        'Historical conjunction database',
        'Benchmarking vs. traditional CDMs',
      ],
      color: 'teal',
      active: false,
    },
    {
      phase: 'Phase 3',
      status: 'Q2 2025',
      title: 'CubeSat Onboard Profile',
      period: 'Planned',
      description: 'Deploy IkirereMesh to flight-ready CubeSat hardware with onboard decision-making.',
      deliverables: [
        'Embedded Linux port',
        'Hardware-in-the-loop testing',
        'Flight certification prep',
      ],
      color: 'teal',
      active: false,
    },
    {
      phase: 'Phase 4',
      status: 'Q4 2025',
      title: 'Inter-Operator Protocol',
      period: 'Vision',
      description: 'Standardized mesh coordination protocol for multi-operator constellations (ISO compliance).',
      deliverables: [
        'Open-source protocol spec',
        'Multi-tenant simulation',
        'Partnership with satellite operators',
      ],
      color: 'teal',
      active: false,
    },
  ]

  return (
    <section id="roadmap" className="relative py-32 bg-stratosphere">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-orbital mb-6">
            Development <span className="text-teal">Roadmap</span>
          </h2>
          <p className="text-xl text-orbital/70 max-w-3xl mx-auto">
            From simulation to orbit. A systematic path to sovereign orbital infrastructure.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">

          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-teal/20 transform -translate-x-1/2" />

          {/* Phases */}
          <div className="space-y-24">
            {phases.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative grid md:grid-cols-2 gap-8 items-center ${
                  i % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div className={`inline-block px-4 py-2 ${
                    item.active ? 'bg-amber/10 border-amber/30' : 'bg-teal/10 border-teal/30'
                  } border rounded-full mb-4`}>
                    <span className={`${item.active ? 'text-amber' : 'text-teal'} font-mono text-xs tracking-wider uppercase`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-3xl font-heading font-bold text-orbital mb-2">
                    {item.title}
                  </h3>

                  <div className="text-sm text-orbital/50 font-mono mb-4">{item.phase}</div>

                  <p className="text-orbital/70 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    {item.deliverables.map((deliverable, j) => (
                      <div key={j} className={`flex items-center gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-orbital/60">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Node */}
                <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.2 + 0.3 }}
                    className={`relative w-12 h-12 rounded-full ${
                      item.active ? 'bg-amber' : 'bg-teal'
                    } flex items-center justify-center z-10 ${
                      item.active ? 'glow-amber' : ''
                    }`}
                  >
                    {item.active && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                    <span className="relative text-stratosphere font-bold font-mono text-sm">
                      {i + 1}
                    </span>
                  </motion.div>
                </div>

                {/* Visual Card (opposite side) */}
                <div className={`${i % 2 === 0 ? 'md:col-start-2 md:pl-12' : 'md:col-start-1 md:pr-12'}`}>
                  <div className="glass rounded-xl p-6 hover:border-teal/30 transition-all">
                    <div className="text-orbital/50 text-xs font-mono mb-2 tracking-wider uppercase">
                      {item.period}
                    </div>
                    <div className="text-6xl font-heading font-black text-teal/10">
                      {item.phase.split(' ')[1]}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="glass rounded-2xl p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-orbital mb-4">
              Join the Mission
            </h3>
            <p className="text-orbital/70 mb-8">
              Be part of Africa's space infrastructure revolution. Get early access to the IkirereMesh sandbox.
            </p>

            {/* Waitlist Form */}
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-3 bg-stratosphere border border-teal/30 rounded-lg text-orbital placeholder-orbital/40 focus:outline-none focus:border-teal"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-amber text-stratosphere font-bold rounded-lg hover:bg-amber/90 transition-all glow-amber whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </form>

            <p className="text-xs text-orbital/40 mt-4">
              Early access opens Q1 2025. No spam, ever.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
