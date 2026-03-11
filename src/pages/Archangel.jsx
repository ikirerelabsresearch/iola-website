import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageSEO from '../components/PageSEO'

const gaps = [
  'National security monitoring breaks down when signals remain isolated across different systems.',
  'Maritime and airspace operators lose time when anomaly detection and evidence gathering are manual.',
  'Satellite traffic coordination is becoming harder as constellations grow faster than control infrastructure.',
  'Climate and disaster response teams need fused intelligence, not disconnected dashboards.',
]

const signals = [
  'Maritime AIS signals',
  'Radar and air traffic data',
  'Satellite imagery',
  'Geospatial intelligence feeds',
  'Environmental sensors',
  'Infrastructure telemetry',
]

const loop = [
  ['01', 'Ingest', 'Pull live multi-domain streams into one common operational layer.'],
  ['02', 'Fuse', 'Correlate spatial, temporal, and behavioral signals into one picture.'],
  ['03', 'Reason', 'Use machine learning to detect anomalies and attach supporting evidence.'],
  ['04', 'Decide', 'Deliver context-rich alerts so human operators can act quickly.'],
]

const regions = ['North Africa', 'West Africa', 'East Africa', 'Central Africa', 'Southern Africa']
const overlays = ['AU', 'ECOWAS', 'EAC', 'SADC', 'COMESA', 'IGAD', 'ECCAS', 'AMU', 'CEN-SAD']

const useCases = [
  'Maritime monitoring',
  'Airspace awareness',
  'Satellite traffic coordination',
  'Climate and disaster response',
]

export default function Archangel() {
  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <PageSEO
        title="Archangel | Operational Intelligence Platform"
        description="Archangel is a real-time operational intelligence platform that fuses maritime, air, orbital, geospatial, and environmental signals into one evidence-backed decision layer."
        keywords="Archangel platform, operational intelligence, maritime monitoring, airspace awareness, geospatial intelligence, satellite traffic coordination"
        aiDescription="Archangel is Ikirere Orbital Labs Africa's operational intelligence platform. It ingests maritime AIS, radar and air traffic data, satellite imagery, geospatial intelligence feeds, environmental sensors, and infrastructure telemetry to create a unified operational picture. Machine learning models detect anomalies and generate evidence-backed alerts with context and reasoning so governments and organizations can monitor activity across large geographic areas."
        path="/archangel"
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(0,240,255,0.18),_transparent_24%),radial-gradient(circle_at_80%_30%,_rgba(255,191,0,0.14),_transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div>
              <div className="inline-flex rounded-full border border-teal/20 bg-black/30 px-4 py-2 text-xs font-mono uppercase tracking-[0.34em] text-teal">
                Archangel
              </div>
              <h1 className="mt-8 text-5xl md:text-7xl xl:text-[5.4rem] font-heading font-black leading-[0.92] text-orbital">
                Operational Intelligence
                <span className="block text-teal text-glow-teal">for a crowded world</span>
              </h1>
              <p className="mt-8 max-w-3xl text-lg md:text-2xl leading-relaxed text-orbital/74">
                Archangel is a real-time intelligence platform built to fuse multi-domain signals into a unified operational picture.
                It is designed for organizations that need decision-grade awareness across maritime, air, orbital, and terrestrial systems.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/brief" className="inline-flex rounded-md bg-teal px-6 py-3 text-sm font-semibold tracking-wide text-stratosphere transition-colors hover:bg-teal/90">
                  Read Company Brief
                </Link>
                <Link to="/partnerships" className="inline-flex rounded-md border border-orbital/20 px-6 py-3 text-sm font-semibold tracking-wide text-orbital transition-colors hover:border-teal/40 hover:text-teal">
                  Strategic Partnerships
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-3xl border border-teal/20 bg-black/45 p-8 shadow-[0_0_80px_rgba(0,240,255,0.08)]"
            >
              <div className="text-sm font-mono uppercase tracking-[0.28em] text-teal">Command Summary</div>
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-teal/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-mono uppercase tracking-[0.24em] text-teal/80">Scope</div>
                  <p className="mt-2 text-lg leading-relaxed text-orbital/78">Multi-domain fusion across maritime, radar, orbital, geospatial, and environmental streams.</p>
                </div>
                <div className="rounded-2xl border border-teal/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-mono uppercase tracking-[0.24em] text-teal/80">Output</div>
                  <p className="mt-2 text-lg leading-relaxed text-orbital/78">Evidence-backed alerts with reasoning, context, and supporting data for human operators.</p>
                </div>
                <div className="rounded-2xl border border-amber/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-mono uppercase tracking-[0.24em] text-amber/80">Deployment Model</div>
                  <p className="mt-2 text-lg leading-relaxed text-orbital/78">One core engine with data-driven regionalization across Africa.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] mb-20"
        >
          <div className="rounded-3xl border border-amber/20 bg-black/35 p-8 md:p-10">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-amber">The Problem</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">Data streams are multiplying faster than operators can reason about them.</h2>
            <div className="mt-8 space-y-4">
              {gaps.map((gap) => (
                <div key={gap} className="rounded-2xl border border-amber/10 bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-orbital/72">
                  {gap}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-teal/20 bg-gradient-to-br from-teal/10 to-black/30 p-8 md:p-10">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-teal">What Archangel Does</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">Turn raw signals into operational decisions.</h2>
            <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-orbital/74">
              <p>Archangel ingests live feeds from multiple domains and fuses them into a common operational picture that analysts and operators can use immediately.</p>
              <p>The goal is not another dashboard. The goal is a serious decision layer that explains what is happening, why it matters, and what requires attention now.</p>
              <p>Every alert is built to carry enough evidence and context that a human operator can review it quickly and act with confidence.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }} className="mb-20">
          <div className="mb-8 text-center">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-teal">Signal Inputs</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">Multi-domain collection, one operational picture.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {signals.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="rounded-2xl border border-teal/15 bg-black/35 p-6"
              >
                <div className="text-xs font-mono uppercase tracking-[0.24em] text-teal/80">Input {String(index + 1).padStart(2, '0')}</div>
                <div className="mt-3 text-2xl font-heading font-bold text-orbital">{item}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }} className="mb-20">
          <div className="mb-8 text-center">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-teal">Operating Loop</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">Structured for fast human decision-making.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {loop.map(([step, title, text], index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-3xl border border-teal/15 bg-black/35 p-7"
              >
                <div className="text-sm font-mono uppercase tracking-[0.28em] text-amber">{step}</div>
                <h3 className="mt-4 text-3xl font-heading font-black text-orbital">{title}</h3>
                <p className="mt-4 leading-relaxed text-orbital/68">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] mb-20"
        >
          <div className="rounded-3xl border border-teal/20 bg-black/35 p-8 md:p-10">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-teal">Regional Deployment</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">Built for continent-scale intelligence layers.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {regions.map((region) => (
                <div key={region} className="rounded-2xl border border-teal/10 bg-white/[0.03] px-5 py-4 text-base font-semibold text-orbital/82">
                  {region}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-amber/10 bg-white/[0.03] p-5">
              <div className="text-xs font-mono uppercase tracking-[0.24em] text-amber/80">Political and Economic Overlays</div>
              <div className="mt-4 flex flex-wrap gap-3">
                {overlays.map((overlay) => (
                  <span key={overlay} className="rounded-full border border-amber/15 px-3 py-2 text-xs font-mono uppercase tracking-[0.18em] text-orbital/75">
                    {overlay}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-amber/20 bg-black/35 p-8 md:p-10">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-amber">Operational Uses</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">Designed for high-consequence environments.</h2>
            <div className="mt-8 space-y-4">
              {useCases.map((item) => (
                <div key={item} className="rounded-2xl border border-amber/10 bg-white/[0.03] px-5 py-4 text-lg text-orbital/74">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg leading-relaxed text-orbital/70">
              One core engine powers the system. Regionalization is data-driven, so deployments can adapt to different operational theaters without rebuilding the platform.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] border border-teal/20 bg-gradient-to-r from-teal/12 via-black/35 to-amber/12 p-8 md:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="text-sm font-mono uppercase tracking-[0.3em] text-teal">Archangel Positioning</div>
              <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">A decision engine for the orbital and intelligence economy.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-orbital/74">
                Archangel is the layer that interprets signals, distributes context, and helps operators act across large geographic areas. As more collection systems come online, the need for this kind of operational reasoning infrastructure only becomes more acute.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="/brief" className="inline-flex items-center justify-center rounded-md bg-amber px-6 py-3 text-sm font-semibold tracking-wide text-stratosphere transition-colors hover:bg-amber/90">
                Back to Brief
              </Link>
              <Link to="/team" className="inline-flex items-center justify-center rounded-md border border-orbital/20 px-6 py-3 text-sm font-semibold tracking-wide text-orbital transition-colors hover:border-teal/40 hover:text-teal">
                Meet the Team
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
