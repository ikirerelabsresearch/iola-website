import { motion } from 'framer-motion'
import PageSEO, { pageSEO } from '../components/PageSEO'

export default function Team() {
  const team = [
    {
      name: 'Jason Quist',
      country: 'Ghana',
      role: 'Founder and Archangel Intelligence Platform Lead Engineer',
      bio: 'AI researcher specializing in reinforcement learning and autonomous systems; founder of Ikirere Orbital Labs Africa building AI infrastructure for space operations and operational intelligence.'
    },
    {
      name: 'Gideon Salami',
      country: 'Ghana',
      role: 'Senior Software Engineer',
      bio: 'Focused on machine learning systems, RL environments, and backend architecture for large-scale simulation and data pipelines.'
    },
    {
      name: 'Abigail Boateng',
      country: 'Ghana',
      role: 'Chief Research Scientist',
      bio: 'Leading the research program on reinforcement learning, orbital coordination algorithms, and safety-critical AI systems.'
    },
    {
      name: 'Jessica Randall',
      country: 'South Africa',
      role: 'Software Engineer',
      bio: 'Software engineer with strong mathematical foundations supporting machine learning research, modeling, and algorithm development.'
    },
    {
      name: 'Ignatius Balayo',
      country: 'Uganda',
      role: 'AI Master\'s Student and Software Developer',
      bio: 'Responsible for evaluation frameworks, experiment tracking, and machine learning validation pipelines.'
    },
    {
      name: 'Alph Doamekpor',
      country: 'Germany',
      role: 'Aerospace and Machine Learning Expert',
      bio: 'Aerospace and machine learning expert with over two decades of experience across ESA, NASA and EUMETSAT guiding research direction and space systems integration.'
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

  const values = [
    {
      title: 'Rigorous Research',
      description: 'Mathematical reasoning and safety-critical thinking shape how we design systems.'
    },
    {
      title: 'Africa-Focused',
      description: 'We are building infrastructure that expands sovereign capability on the continent.'
    },
    {
      title: 'Operational Discipline',
      description: 'The work is practical, deployment-oriented, and judged by whether operators can trust it.'
    },
    {
      title: 'Safety First',
      description: 'Collision-free and evidence-backed operation remains the standard across our stack.'
    }
  ]

  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <PageSEO {...pageSEO.team} />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-orbital mb-6">
            Meet the <span className="text-teal">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-4xl mx-auto leading-relaxed">
            Engineers and researchers building AI infrastructure for space operations and operational intelligence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Core Technical Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-8 hover:border-teal/40 transition-all"
              >
                <div className="w-24 h-24 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center text-3xl font-heading font-black text-teal mb-4 mx-auto">
                  {member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </div>
                <h3 className="text-2xl font-heading font-bold text-teal text-center mb-2">{member.name}</h3>
                <p className="text-orbital/70 text-center mb-3">{member.role}</p>
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 rounded-full border border-amber/20 bg-amber/10 text-amber text-xs font-mono uppercase tracking-[0.2em]">
                    {member.country}
                  </span>
                </div>
                <p className="text-orbital/60 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-black/40 border border-amber/30 rounded-xl p-12 text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-4">Join Our Research Lab</h2>
          <p className="text-xl text-orbital/70 mb-8 max-w-2xl mx-auto">
            Building a world-class technical team for orbital intelligence, coordination, and safety-critical AI.
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Research Lab Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-black/40 border border-teal/20 rounded-xl p-8">
                <h3 className="text-xl font-heading font-bold text-teal mb-3">{value.title}</h3>
                <p className="text-orbital/60">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
