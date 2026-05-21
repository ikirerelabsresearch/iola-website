import { useState } from 'react'
import { NavLink } from 'react-router'

const links = [
  { label: 'About',    to: '/about' },
  { label: 'Research', to: '/research' },
  { label: 'Careers',  to: '/careers' },
  { label: 'Updates',  to: '/updates' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/97 backdrop-blur-md border-b border-[#e2e8f0]"
        style={{ boxShadow: '0 1px 0 rgba(10,36,99,0.06)' }}>
        <div className="max-w-[1100px] mx-auto px-8 h-16 flex items-center justify-between">

          <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
            <img src="/iola-logo-light.png" alt="Ikirere Orbital Labs Africa" className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold tracking-wide text-[#111827] leading-none" style={{ letterSpacing: '0.04em' }}>IKIRERE</p>
              <p className="text-[10px] text-[#64748b] tracking-widest leading-none mt-0.5" style={{ letterSpacing: '0.12em' }}>ORBITAL LABS AFRICA</p>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            <a
              href="https://orbit.ikirere.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#0A2463] hover:bg-[#f0f4f9] px-3 py-1.5 rounded-md transition-all"
            >
              Orbit ↗
            </a>
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm px-3 py-1.5 rounded-md transition-all ${
                    isActive
                      ? 'text-[#0A2463] font-medium bg-[#f0f4f9]'
                      : 'text-[#64748b] hover:text-[#111827] hover:bg-[#f8fafc]'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="text-sm font-medium ml-2 px-4 py-1.5 border border-[#0A2463] text-[#0A2463] rounded-md hover:bg-[#0A2463] hover:text-white transition-all"
            >
              Contact
            </NavLink>
          </nav>

          <button
            className="md:hidden flex flex-col gap-[5px] w-6 cursor-pointer p-1"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block h-[1.5px] bg-[#111827] transition-all origin-center ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block h-[1.5px] bg-[#111827] transition-all ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[1.5px] bg-[#111827] transition-all origin-center ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-white flex flex-col gap-1 p-6 border-t border-[#e2e8f0]"
          style={{ boxShadow: '0 8px 24px rgba(10,36,99,0.08)' }}>
          <a href="https://orbit.ikirere.com" target="_blank" rel="noopener noreferrer"
            className="text-base font-medium text-[#0A2463] px-3 py-3 rounded-lg hover:bg-[#f0f4f9]"
            onClick={() => setOpen(false)}>
            Orbit ↗
          </a>
          {links.map(l => (
            <NavLink key={l.to} to={l.to}
              className="text-base font-medium text-[#111827] px-3 py-3 rounded-lg hover:bg-[#f8fafc]"
              onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact"
            className="text-base font-medium text-[#111827] px-3 py-3 rounded-lg hover:bg-[#f8fafc]"
            onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </div>
      )}
    </>
  )
}
