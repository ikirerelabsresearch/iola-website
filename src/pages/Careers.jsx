import { motion } from 'framer-motion'
import PageSEO, { pageSEO } from '../components/PageSEO'

export default function Careers() {
  const positions = [
    {
      title: 'Flight Software Engineer',
      location: 'Accra, Ghana',
      type: 'Full-time',
      description: 'Build embedded Linux systems for CubeSats. Work on ADCS, communications, and onboard autonomy.',
      requirements: [
        'C/C++ and Python expertise',
        'Embedded systems experience',
        'Understanding of spacecraft systems',
        'Linux kernel development (preferred)'
      ]
    },
    {
      title: 'Hardware Engineer (CubeSat)',
      location: 'Accra, Ghana',
      type: 'Full-time',
      description: 'Design and integrate CubeSat subsystems. Work with power, ADCS, comms, and payload modules.',
      requirements: [
        'Electrical engineering background',
        'PCB design and testing',
        'Thermal and structural analysis',
        'Experience with space-grade components'
      ]
    },
    {
      title: 'ML Research Engineer',
      location: 'Remote / Accra',
      type: 'Full-time',
      description: 'Develop reinforcement learning algorithms for constellation coordination and collision avoidance.',
      requirements: [
        'PhD or equivalent in ML/RL',
        'PyTorch or JAX experience',
        'Multi-agent systems knowledge',
        'Publications in top-tier venues (preferred)'
      ]
    },
    {
      title: 'Mission Operations Specialist',
      location: 'Accra, Ghana',
      type: 'Full-time',
      description: 'Operate satellite constellations. Manage ground station networks and respond to orbital events.',
      requirements: [
        'Astrodynamics fundamentals',
        'Experience with STK or GMAT',
        'Telemetry and command protocols',
        '24/7 shift work availability'
      ]
    }
  ]

  const perks = [
    {
      icon: '🚀',
      title: 'Build Real Satellites',
      description: 'Your code and hardware will fly in orbit'
    },
    {
      icon: '🌍',
      title: 'Africa-First Mission',
      description: 'Directly impact African space capabilities'
    },
    {
      icon: '💰',
      title: 'Competitive Compensation',
      description: 'Salary + equity in a frontier market'
    },
    {
      icon: '📚',
      title: 'Learning Budget',
      description: 'Conferences, courses, and research resources'
    },
    {
      icon: '🏥',
      title: 'Health Coverage',
      description: 'Comprehensive medical and dental insurance'
    },
    {
      icon: '⏰',
      title: 'Flexible Work',
      description: 'Hybrid remote, focus on outcomes over hours'
    }
  ]

  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <PageSEO {...pageSEO.careers} />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-orbital mb-6">
            Join <span className="text-teal">Ikirere</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Build the foundational infrastructure for the African space age. We're looking for
            engineers, researchers, and operators who want to make history.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-teal/10 to-amber/10 border border-teal/30 rounded-xl p-8 mb-20 text-center"
        >
          <h2 className="text-2xl font-heading font-bold text-orbital mb-4">Why Ikirere?</h2>
          <p className="text-lg text-orbital/80 max-w-3xl mx-auto leading-relaxed">
            Most space companies are building satellites for communication or imaging. We're building
            the <span className="text-teal font-semibold">infrastructure layer</span> that makes orbital
            operations accessible to an entire continent. Your work here will enable dozens of African
            universities, governments, and research labs to deploy their own missions.
          </p>
        </motion.div>

        {/* Open Positions */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-8 hover:border-teal/40 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-teal mb-2">{position.title}</h3>
                    <div className="flex items-center gap-4 text-orbital/60 text-sm">
                      <span>📍 {position.location}</span>
                      <span>•</span>
                      <span>💼 {position.type}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:ikirerelabs.research@gmail.com?subject=Application:%20${position.title}`}
                    className="mt-4 md:mt-0 px-6 py-3 bg-teal text-black font-semibold rounded-lg hover:bg-teal/90 transition-all inline-block text-center"
                  >
                    Apply Now
                  </a>
                </div>
                <p className="text-orbital/70 mb-4">{position.description}</p>
                <div>
                  <h4 className="text-orbital font-semibold mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {position.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-orbital/60">
                        <span className="text-teal mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Perks & Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Perks & Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{perk.icon}</div>
                <h3 className="text-lg font-heading font-bold text-teal mb-2">{perk.title}</h3>
                <p className="text-sm text-orbital/60">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Application Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6 text-center">
              <div className="text-teal text-3xl font-bold mb-2">1</div>
              <h3 className="text-lg font-heading font-bold text-orbital mb-2">Apply</h3>
              <p className="text-sm text-orbital/60">Send CV and cover letter</p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6 text-center">
              <div className="text-teal text-3xl font-bold mb-2">2</div>
              <h3 className="text-lg font-heading font-bold text-orbital mb-2">Screen</h3>
              <p className="text-sm text-orbital/60">Initial technical interview</p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6 text-center">
              <div className="text-teal text-3xl font-bold mb-2">3</div>
              <h3 className="text-lg font-heading font-bold text-orbital mb-2">Challenge</h3>
              <p className="text-sm text-orbital/60">Take-home technical project</p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6 text-center">
              <div className="text-teal text-3xl font-bold mb-2">4</div>
              <h3 className="text-lg font-heading font-bold text-orbital mb-2">Offer</h3>
              <p className="text-sm text-orbital/60">Team meet & final decision</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="bg-black/40 border border-amber/30 rounded-xl p-12 text-center"
        >
          <div className="text-5xl mb-6">🌟</div>
          <h2 className="text-3xl font-heading font-bold text-orbital mb-4">
            Don't See Your Role?
          </h2>
          <p className="text-lg text-orbital/70 mb-6 max-w-2xl mx-auto">
            We're always looking for exceptional talent. If you're passionate about space, Africa,
            and building foundational infrastructure, we want to hear from you.
          </p>
          <a
            href="mailto:ikirerelabs.research@gmail.com?subject=General%20Application"
            className="inline-block px-8 py-4 bg-amber text-black font-semibold rounded-lg hover:bg-amber/90 transition-all"
          >
            Send General Application
          </a>
        </motion.div>
      </section>
    </div>
  )
}
