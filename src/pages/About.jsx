import { motion } from 'framer-motion'

export default function About() {
  const milestones = [
    {
      year: '2024',
      title: 'Foundation',
      description: 'Ikirere Orbital Labs Africa founded in Accra, Ghana'
    },
    {
      year: '2025 Q2',
      title: 'First Prototype',
      description: 'IkirereMesh SDK alpha release to partner institutions'
    },
    {
      year: '2025 Q4',
      title: 'CubeSat Production',
      description: 'First 3U CubeSat kits delivered to African universities'
    },
    {
      year: '2026 Q2',
      title: 'Launch',
      description: 'First Ikirere satellites deployed via SpaceX rideshare'
    }
  ]

  const values = [
    {
      icon: '🌍',
      title: 'African-First',
      description: 'Building sovereign space infrastructure on the continent, for the continent'
    },
    {
      icon: '🔓',
      title: 'Open Access',
      description: 'Democratizing orbital operations for universities and research labs'
    },
    {
      icon: '🛡️',
      title: 'Safety First',
      description: 'Deterministic collision avoidance to prevent space debris cascades'
    },
    {
      icon: '🚀',
      title: 'Rapid Innovation',
      description: 'From concept to orbit in months, not years'
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
            About <span className="text-teal">Ikirere</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Building the foundational infrastructure for the African space age
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/40 border border-teal/20 rounded-xl p-12 mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-teal mb-6 text-center">Our Mission</h2>
          <p className="text-xl text-orbital/80 leading-relaxed text-center max-w-4xl mx-auto">
            To be the <span className="text-teal font-semibold">NVIDIA for Space</span> — providing
            the hardware and software layer that enables African universities, research institutions,
            and governments to deploy satellites for scientific research, earth observation, and telecommunications.
            We're making Low Earth Orbit accessible across the continent while preventing the tragedy of space debris through deterministic safety guarantees.
          </p>
        </motion.div>

        {/* The Problem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">The Problem We're Solving</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/40 border border-amber/20 rounded-xl p-8">
              <div className="text-amber text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-heading font-bold text-orbital mb-3">Access Inequality</h3>
              <p className="text-orbital/70">
                African institutions lack affordable, integrated satellite infrastructure.
                Current options require navigating complex international supply chains and prohibitive costs.
              </p>
            </div>
            <div className="bg-black/40 border border-amber/20 rounded-xl p-8">
              <div className="text-amber text-4xl mb-4">💥</div>
              <h3 className="text-2xl font-heading font-bold text-orbital mb-3">Space Debris Crisis</h3>
              <p className="text-orbital/70">
                With 34,000+ tracked objects in orbit and growing constellations, collision risk is escalating.
                Kessler Syndrome threatens to make orbital operations unsustainable.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Approach */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Our Approach</h2>
          <div className="bg-black/40 border border-teal/20 rounded-xl p-8">
            <div className="space-y-6 text-orbital/70">
              <div>
                <h3 className="text-xl font-semibold text-teal mb-2">1. Integrated Hardware</h3>
                <p>
                  Pre-built, launch-ready CubeSat kits with NVIDIA compute. No need to source components
                  from dozens of suppliers or navigate complex integration.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal mb-2">2. AI-Powered Coordination</h3>
                <p>
                  IkirereMesh SDK combines Reinforcement Learning for fuel-efficient planning with
                  deterministic safety shields for collision-free guarantees.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal mb-2">3. Launch Partnerships</h3>
                <p>
                  Direct coordination with SpaceX rideshare missions. Streamlined path from lab to orbit.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal mb-2">4. Local Support</h3>
                <p>
                  Training, technical support, and community building for African space programs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-heading font-bold text-teal mb-2">{value.title}</h3>
                <p className="text-sm text-orbital/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Journey to Orbit</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-teal/20 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 + index * 0.2 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-black/40 border border-teal/20 rounded-xl p-6">
                      <div className="text-amber font-mono text-sm mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-heading font-bold text-teal mb-2">{milestone.title}</h3>
                      <p className="text-orbital/60">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-teal hidden md:block flex-shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-4">Based in Accra, Ghana</h2>
          <p className="text-orbital/70 mb-6">
            Building space infrastructure at the intersection of innovation and opportunity
          </p>
          <div className="inline-block px-6 py-3 bg-black/40 border border-teal/20 rounded-lg">
            <a
              href="mailto:ikirerelabs.research@gmail.com"
              className="text-teal hover:text-teal/80 transition-colors"
            >
              ikirerelabs.research@gmail.com
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
