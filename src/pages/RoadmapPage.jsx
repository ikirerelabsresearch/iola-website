import { motion } from 'framer-motion'

export default function RoadmapPage() {
  const phases = [
    {
      phase: 'Phase 1',
      status: 'In Progress',
      title: 'Sandbox Simulation',
      period: 'Current - Q4 2025',
      description: 'High-fidelity 32-satellite LEO simulation with RL planner and safety shield integration.',
      deliverables: [
        'WebGL visualization dashboard',
        'Collision avoidance verification',
        'Multi-agent coordination prototype',
        'Safety shield mathematical proofs',
        'Academic paper submission'
      ],
      color: 'amber',
      active: true,
      details: 'Building the core IkirereMesh technology stack with simulated orbital environments. Proving safety guarantees through formal verification methods.'
    },
    {
      phase: 'Phase 2',
      status: 'Q1 2026',
      title: 'Real Orbital Data',
      period: 'Q1 2026',
      description: 'Integration with ESA DRAMA and NASA CARA databases for real-time conjunction analysis.',
      deliverables: [
        'Live TLE feed integration',
        'Historical conjunction database',
        'Benchmarking vs. traditional CDMs',
        'Real-time debris tracking',
        'Alpha SDK release to partners'
      ],
      color: 'teal',
      active: false,
      details: 'Transition from simulation to real-world data. Validate IkirereMesh performance against actual conjunction events and compare with industry standards.'
    },
    {
      phase: 'Phase 3',
      status: 'Q2 2026',
      title: 'CubeSat Onboard Profile',
      period: 'Q2 2026',
      description: 'Deploy IkirereMesh to flight-ready CubeSat hardware with onboard decision-making.',
      deliverables: [
        'Embedded Linux port',
        'Hardware-in-the-loop testing',
        'Flight certification prep',
        'NVIDIA Jetson optimization',
        'First CubeSat kit deliveries'
      ],
      color: 'teal',
      active: false,
      details: 'Port IkirereMesh to embedded systems. Complete integration with CubeSat hardware and prepare for flight operations.'
    },
    {
      phase: 'Phase 4',
      status: 'Q3-Q4 2026',
      title: 'Launch & Operations',
      period: 'Q3-Q4 2026',
      description: 'First Ikirere satellites deployed via SpaceX. On-orbit validation of IkirereMesh.',
      deliverables: [
        'SpaceX rideshare integration',
        'Launch of first constellation',
        'On-orbit commissioning',
        'Live collision avoidance demo',
        'Ground station network setup'
      ],
      color: 'teal',
      active: false,
      details: 'Deploy first operational satellites. Demonstrate real-world collision avoidance and constellation coordination in orbit.'
    }
  ]

  const milestones = [
    {
      date: 'Q4 2025',
      title: 'IkirereMesh SDK Beta',
      description: 'First beta release to partner universities'
    },
    {
      date: 'Q1 2026',
      title: 'First CubeSat Orders',
      description: 'Begin accepting pre-orders for 3U and 6U kits'
    },
    {
      date: 'Q2 2026',
      title: 'Training Workshops',
      description: 'Launch technical training program across Africa'
    },
    {
      date: 'Q3 2026',
      title: 'First Launch',
      description: 'Maiden flight via SpaceX rideshare mission'
    },
    {
      date: 'Q4 2026',
      title: 'Constellation Operational',
      description: 'Full constellation with IkirereMesh coordination'
    }
  ]

  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-orbital mb-6">
            Product <span className="text-teal">Roadmap</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Our journey from simulation to orbit. Transparent timelines for hardware, software, and operations.
          </p>
        </motion.div>

        {/* Development Phases */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Development Phases</h2>
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-black/40 border-2 rounded-xl p-8 ${
                  phase.active
                    ? 'border-amber/40 shadow-lg shadow-amber/20'
                    : 'border-teal/20'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-3xl font-heading font-bold text-teal">{phase.phase}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        phase.active
                          ? 'bg-amber/20 text-amber'
                          : 'bg-teal/20 text-teal'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-orbital mb-2">{phase.title}</h4>
                    <p className="text-orbital/60 mb-4">{phase.description}</p>
                    <p className="text-orbital/70">{phase.details}</p>
                  </div>
                  <div className="text-amber font-mono text-lg md:text-right mt-4 md:mt-0">
                    {phase.period}
                  </div>
                </div>
                <div className="border-t border-teal/10 pt-6">
                  <h5 className="text-orbital font-semibold mb-3">Key Deliverables:</h5>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {phase.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-orbital/70">
                        <span className="text-teal mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Milestones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Key Milestones</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-teal/20 md:left-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className={`flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 md:pl-8" />
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-teal" />
                  </div>
                  <div className="flex-1 md:pr-8">
                    <div className="bg-black/40 border border-teal/20 rounded-xl p-6">
                      <div className="text-amber font-mono text-sm mb-2">{milestone.date}</div>
                      <h3 className="text-xl font-heading font-bold text-teal mb-2">{milestone.title}</h3>
                      <p className="text-orbital/60">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Long-term Vision */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="bg-gradient-to-r from-teal/10 to-amber/10 border border-teal/30 rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-6">2027 and Beyond</h2>
          <div className="grid md:grid-cols-3 gap-8 text-orbital/70">
            <div>
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-xl font-heading font-bold text-teal mb-2">Pan-African Network</h3>
              <p>Support 50+ African universities with satellite infrastructure and training</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🛰️</div>
              <h3 className="text-xl font-heading font-bold text-teal mb-2">Large Constellations</h3>
              <p>Scale IkirereMesh to coordinate 100+ satellite constellations</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-heading font-bold text-teal mb-2">Global Standard</h3>
              <p>Establish IkirereMesh as the industry standard for safe orbital operations</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
