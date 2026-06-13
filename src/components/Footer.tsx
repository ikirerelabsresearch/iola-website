import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto" style={{ background: '#f8fafc' }}>
      <div className="max-w-[1100px] mx-auto px-8 py-12">
        <div className="flex flex-wrap gap-10 items-start justify-between mb-10">
          <div className="flex flex-col gap-3 max-w-70">
            <img src="/iola-logo-light.png" alt="Ikirere Orbital Labs" className="h-14 w-14 object-contain" />
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Building programmable autonomous multipurpose nanosatellites for the next generation of space systems.
            </p>
          </div>

          <div className="flex gap-12 flex-wrap">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#94a3b8] mb-3">Company</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'About',    to: '/about' },
                  { label: 'Research', to: '/research' },
                  { label: 'Hardware', to: '/hardware' },
                  { label: 'Careers',  to: '/careers' },
                  { label: 'Updates',  to: '/updates' },
                  { label: 'Contact',  to: '/contact' },
                ].map(l => (
                  <Link key={l.to} to={l.to}
                    className="text-sm text-muted hover:text-navy transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#94a3b8] mb-3">Systems</p>
              <div className="flex flex-col gap-2">
                <a href="https://orbit.ikirere.com" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-navy transition-colors">
                  Orbit Simulation ↗
                </a>
                <span className="text-sm text-[#94a3b8]">IkirereMesh SDK</span>
                <span className="text-sm text-[#94a3b8]">Ground Software</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-xs text-[#94a3b8]">© 2026 Ikirere Orbital Labs. Kigali, Rwanda.</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs text-[#94a3b8]">Research & Development Active</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
