import { motion } from 'framer-motion'
import PageSEO, { pageSEO } from '../components/PageSEO'

export default function Pricing() {
  const pricingTiers = [
    {
      name: 'Research',
      description: 'For universities and research labs',
      price: 'Custom',
      features: [
        'Single 3U CubeSat Kit',
        'IkirereMesh SDK (Academic License)',
        'Launch coordination support',
        'Technical training workshops',
        'Email support',
        'Community access'
      ],
      highlight: false
    },
    {
      name: 'Constellation',
      description: 'For operational missions',
      price: 'Custom',
      features: [
        'Multiple CubeSat Kits (3U or 6U)',
        'IkirereMesh SDK (Commercial License)',
        'Priority launch slots',
        'Dedicated mission planning',
        'On-orbit commissioning support',
        '24/7 operations support',
        'Custom feature development'
      ],
      highlight: true
    },
    {
      name: 'Enterprise',
      description: 'For government & space agencies',
      price: 'Custom',
      features: [
        'Large-scale constellation (10+ satellites)',
        'IkirereMesh SDK (Enterprise License)',
        'Guaranteed launch capacity',
        'End-to-end mission management',
        'Custom hardware modifications',
        'Dedicated engineering team',
        'SLA with uptime guarantees',
        'On-premise deployment options'
      ],
      highlight: false
    }
  ]

  const addons = [
    {
      name: 'Launch Services',
      description: 'SpaceX rideshare coordination and integration',
      price: 'From $50k per 3U unit'
    },
    {
      name: 'Ground Station Access',
      description: 'Global network for satellite communications',
      price: 'From $500/month per satellite'
    },
    {
      name: 'Extended Mission Support',
      description: 'Operations and maintenance beyond standard warranty',
      price: 'Custom pricing'
    },
    {
      name: 'Custom Payloads',
      description: 'Integration of specialized sensors and instruments',
      price: 'Custom pricing'
    }
  ]

  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <PageSEO {...pageSEO.pricing} />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-orbital mb-6">
            Transparent <span className="text-teal">Pricing</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Access to space shouldn't be opaque. Choose the plan that fits your mission.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-xl p-8 ${
                tier.highlight
                  ? 'bg-teal/10 border-2 border-teal shadow-lg shadow-teal/20'
                  : 'bg-black/40 border border-teal/20'
              }`}
            >
              {tier.highlight && (
                <div className="text-teal text-sm font-semibold mb-4 uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-3xl font-heading font-bold text-orbital mb-2">{tier.name}</h3>
              <p className="text-orbital/60 mb-6">{tier.description}</p>
              <div className="mb-8">
                <div className="text-4xl font-bold text-teal font-mono">{tier.price}</div>
                <div className="text-orbital/60 text-sm">Contact for quote</div>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-orbital/70">
                    <span className="text-teal mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:ikirerelabs.research@gmail.com?subject=Pricing%20Inquiry:%20${tier.name}"
                className={`block w-full px-6 py-3 rounded-lg font-semibold transition-all text-center ${
                  tier.highlight
                    ? 'bg-teal text-black hover:bg-teal/90'
                    : 'bg-teal/20 text-teal hover:bg-teal/30 border border-teal/30'
                }`}
              >
                Get Quote
              </a>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Optional Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-heading font-bold text-teal mb-2">{addon.name}</h3>
                <p className="text-orbital/60 mb-4">{addon.description}</p>
                <p className="text-amber font-mono">{addon.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-black/40 border border-teal/20 rounded-xl p-8"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8">Pricing FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-teal mb-2">Why is pricing custom?</h3>
              <p className="text-orbital/70">
                Every mission has unique requirements for payload, orbit, launch timing, and support.
                We work with you to optimize costs while meeting your technical goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal mb-2">What's included in the base kit price?</h3>
              <p className="text-orbital/70">
                All CubeSat kits include structure, solar panels, ADCS, communications, compute module,
                and basic integration. Launch services and ground station access are separate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal mb-2">Do you offer academic discounts?</h3>
              <p className="text-orbital/70">
                Yes. African universities and research institutions receive priority pricing and
                access to grant funding resources.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal mb-2">What payment terms do you accept?</h3>
              <p className="text-orbital/70">
                We work with milestone-based payments, grants, and government contracts. Contact us
                to discuss flexible payment structures for your organization.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
