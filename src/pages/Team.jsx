import { motion } from 'framer-motion'

export default function Team() {
  const team = [
    {
      name: 'Jason Quist',
      role: 'Founder & CEO',
      bio: 'Building the foundational infrastructure for the African space age. Previously worked on satellite systems and AI safety.',
      linkedin: 'https://www.linkedin.com/company/ikirere-orbital-labs-africa'
    }
  ]

  const advisors = [
    {
      area: 'Orbital Mechanics',
      description: 'Experts in spacecraft dynamics, mission planning, and collision avoidance',
      status: 'Forming advisory board'
    },
    {
      area: 'Reinforcement Learning',
      description: 'Leading researchers in multi-agent RL and safety-constrained optimization',
      status: 'Forming advisory board'
    },
    {
      area: 'Space Policy',
      description: 'African space agency leaders and international regulatory experts',
      status: 'Forming advisory board'
    }
  ]

  const openRoles = [
    'Flight Software Engineer',
    'Hardware Engineer (CubeSat)',
    'ML Research Engineer',
    'Mission Operations Specialist'
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
            Meet the <span className="text-teal">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Builders, researchers, and operators making orbital operations accessible to Africa
          </p>
        </motion.div>

        {/* Core Team */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Core Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-8 hover:border-teal/40 transition-all"
              >
                <div className="w-24 h-24 rounded-full bg-teal/20 flex items-center justify-center text-4xl mb-4 mx-auto">
                  👤
                </div>
                <h3 className="text-2xl font-heading font-bold text-teal text-center mb-2">{member.name}</h3>
                <p className="text-orbital/70 text-center mb-4">{member.role}</p>
                <p className="text-orbital/60 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:text-teal/80 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advisory Board */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Advisory Board</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.area}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-heading font-bold text-teal mb-2">{advisor.area}</h3>
                <p className="text-orbital/60 mb-3">{advisor.description}</p>
                <p className="text-amber text-sm font-mono">{advisor.status}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* We're Growing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-black/40 border border-amber/30 rounded-xl p-12 text-center"
        >
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl font-heading font-bold text-orbital mb-4">We're Growing</h2>
          <p className="text-xl text-orbital/70 mb-8 max-w-2xl mx-auto">
            Building a world-class team of engineers, researchers, and operators. Join us in making
            space accessible across Africa.
          </p>
          <div className="mb-8">
            <h3 className="text-xl font-heading font-bold text-teal mb-4">Open Positions</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {openRoles.map((role) => (
                <span
                  key={role}
                  className="px-4 py-2 bg-teal/20 border border-teal/30 rounded-lg text-teal text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
          <a
            href="/careers"
            className="inline-block px-8 py-4 bg-teal text-black font-semibold rounded-lg hover:bg-teal/90 transition-all"
          >
            View All Careers
          </a>
        </motion.div>

        {/* Culture & Values */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Our Culture</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/40 border border-teal/20 rounded-xl p-8">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-heading font-bold text-teal mb-3">Africa-First Mindset</h3>
              <p className="text-orbital/60">
                We're building infrastructure that serves African institutions first. Our success
                is measured by the number of African satellites we put in orbit.
              </p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-heading font-bold text-teal mb-3">Move Fast, Stay Safe</h3>
              <p className="text-orbital/60">
                Rapid iteration on hardware and software, but never compromise on safety.
                Deterministic guarantees in everything we ship to orbit.
              </p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-8">
              <div className="text-4xl mb-4">🔓</div>
              <h3 className="text-xl font-heading font-bold text-teal mb-3">Open Knowledge</h3>
              <p className="text-orbital/60">
                We publish our research, share our learnings, and train the next generation
                of African space engineers.
              </p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-heading font-bold text-teal mb-3">Mission-Driven</h3>
              <p className="text-orbital/60">
                Every decision is evaluated against our mission: making orbital operations
                accessible and sustainable for Africa.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
