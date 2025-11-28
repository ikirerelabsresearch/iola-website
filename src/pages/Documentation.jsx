import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageSEO, { pageSEO } from '../components/PageSEO'

export default function Documentation() {
  const sections = [
    {
      title: 'Getting Started',
      items: [
        'Installation & Setup',
        'Quick Start Guide',
        'System Requirements',
        'License Activation'
      ]
    },
    {
      title: 'CubeSat Hardware',
      items: [
        'Assembly Instructions',
        'Component Specifications',
        'Power System Configuration',
        'Communication Setup',
        'Testing & Verification'
      ]
    },
    {
      title: 'IkirereMesh SDK',
      items: [
        'API Reference',
        'Constellation Planning',
        'Safety Shield Configuration',
        'Simulation Tools',
        'Deployment Guide'
      ]
    },
    {
      title: 'Mission Operations',
      items: [
        'Launch Preparation',
        'On-Orbit Commissioning',
        'Ground Station Operations',
        'Telemetry & Commands',
        'Anomaly Resolution'
      ]
    }
  ]

  const tutorials = [
    {
      title: 'Your First Satellite Mission',
      duration: '30 minutes',
      description: 'From kit assembly to mission simulation in one tutorial'
    },
    {
      title: 'Collision Avoidance with IkirereMesh',
      duration: '45 minutes',
      description: 'Configure safety shields and plan safe maneuvers'
    },
    {
      title: 'Multi-Satellite Coordination',
      duration: '1 hour',
      description: 'Build and manage a small constellation'
    },
    {
      title: 'Custom Payload Integration',
      duration: '2 hours',
      description: 'Add sensors and instruments to your CubeSat'
    }
  ]

  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <PageSEO {...pageSEO.documentation} />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-orbital mb-6">
            <span className="text-teal">Documentation</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Everything you need to build, launch, and operate your satellite mission.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-6 py-4 bg-black/40 border border-teal/30 rounded-xl text-orbital placeholder-orbital/40 focus:outline-none focus:border-teal/60 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-black/40 border border-teal/20 rounded-xl p-8 hover:border-teal/40 transition-all"
            >
              <h2 className="text-2xl font-heading font-bold text-teal mb-6">{section.title}</h2>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-orbital/70 hover:text-teal transition-colors group"
                    >
                      <span className="text-teal group-hover:translate-x-1 transition-transform">→</span>
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tutorials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Video Tutorials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-6 hover:border-teal/40 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-heading font-bold text-teal">{tutorial.title}</h3>
                  <span className="text-amber text-sm font-mono">{tutorial.duration}</span>
                </div>
                <p className="text-orbital/60 mb-4">{tutorial.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-teal hover:gap-3 transition-all"
                >
                  <span>Watch Tutorial</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-amber/10 border border-amber/30 rounded-xl p-8 text-center"
        >
          <div className="text-amber text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-heading font-bold text-orbital mb-4">
            Full Documentation Coming Q3 2026
          </h2>
          <p className="text-orbital/70 max-w-2xl mx-auto mb-6">
            We're building comprehensive technical documentation, video tutorials, and interactive
            examples. Early access customers will receive draft documentation starting Q2 2026.
          </p>
          <a
            href="mailto:team@ikirere.com?subject=Documentation%20Early%20Access"
            className="inline-block px-6 py-3 bg-amber text-black font-semibold rounded-lg hover:bg-amber/90 transition-all"
          >
            Request Early Access
          </a>
        </motion.div>
      </section>
    </div>
  )
}
