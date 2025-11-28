import { motion } from 'framer-motion'
import PageSEO, { pageSEO } from '../components/PageSEO'

export default function Partnerships() {
  const partners = [
    {
      name: 'SpaceX',
      logo: '/partners/spacex-logo.png',
      description: 'Launch services partner providing rideshare missions to LEO for Ikirere satellites and customer payloads.',
      website: 'https://www.spacex.com',
      category: 'Launch Services'
    },
    {
      name: 'Cerebras Systems',
      logo: '/partners/cerebras-logo.svg',
      description: 'AI compute infrastructure partner powering IkirereMesh training and simulation workloads.',
      website: 'https://www.cerebras.ai',
      category: 'AI Infrastructure'
    },
    {
      name: 'Google',
      logo: '/partners/google-logo.png',
      description: 'Cloud infrastructure and AI/ML tools supporting satellite data processing and constellation coordination.',
      website: 'https://cloud.google.com',
      category: 'Cloud & AI'
    }
  ]

  const partnershipTypes = [
    {
      icon: '🚀',
      title: 'Launch Partners',
      description: 'Providing reliable, cost-effective access to orbit for African satellites'
    },
    {
      icon: '🧠',
      title: 'Technology Partners',
      description: 'Cutting-edge AI/ML infrastructure for constellation coordination and safety'
    },
    {
      icon: '🌍',
      title: 'Academic Partners',
      description: 'Collaborating with African universities on space research and training'
    },
    {
      icon: '🛰️',
      title: 'Agency Partners',
      description: 'Working with space agencies to advance orbital safety standards'
    }
  ]

  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <PageSEO {...pageSEO.partnerships} />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-orbital mb-6">
            Our <span className="text-teal">Partners</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Building Africa's space infrastructure with world-class technology and launch partners
          </p>
        </motion.div>

        {/* Strategic Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Strategic Partners</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-8 hover:border-teal/40 transition-all"
              >
                <div className="h-24 flex items-center justify-center mb-6">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-amber text-sm font-mono mb-3">{partner.category}</div>
                <h3 className="text-2xl font-heading font-bold text-teal mb-3">{partner.name}</h3>
                <p className="text-orbital/60 mb-4">{partner.description}</p>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal hover:text-teal/80 transition-colors text-sm"
                >
                  <span>Visit Website</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Types */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Partnership Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{type.icon}</div>
                <h3 className="text-lg font-heading font-bold text-teal mb-2">{type.title}</h3>
                <p className="text-sm text-orbital/60">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Partner With Us */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-black/40 border border-amber/20 rounded-xl p-12 mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Why Partner With Ikirere</h2>
          <div className="grid md:grid-cols-2 gap-8 text-orbital/70">
            <div>
              <h3 className="text-xl font-semibold text-teal mb-3">🌍 Pan-African Reach</h3>
              <p>
                Access to growing African space market with direct relationships to universities,
                research institutions, and government agencies across the continent.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal mb-3">🚀 Rapid Innovation</h3>
              <p>
                Agile development cycles and deployment-focused approach. From concept to orbit
                in months, not years.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal mb-3">🛡️ Proven Technology</h3>
              <p>
                IkirereMesh SDK with mathematically proven safety guarantees. Production-ready
                CubeSat kits with flight heritage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal mb-3">🎯 Mission Alignment</h3>
              <p>
                Shared commitment to democratizing space access, advancing orbital safety,
                and building sustainable space infrastructure.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-6">
            Interested in Partnering?
          </h2>
          <p className="text-lg text-orbital/70 mb-8 max-w-2xl mx-auto">
            We're always looking for strategic partners who share our vision of making
            space accessible across Africa.
          </p>
          <a
            href="mailto:team@ikirere.com?subject=Partnership%20Inquiry"
            className="inline-block px-8 py-4 bg-teal text-black font-semibold rounded-lg hover:bg-teal/90 transition-all text-lg"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </div>
  )
}
