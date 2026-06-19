import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrolled } from '../lib/motion'
import { APPLICATION_FORM_URL, TEAM_NUMBER_DISPLAY } from '../config/team'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/outreach', label: 'Outreach' },
  { to: '/robots', label: 'Robots' },
]

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <motion.div
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-sky/20 ring-1 ring-brand-sky/30"
        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M6 18h12v1.5H6V18z" fill="currentColor" className="text-white" />
          <path d="M10.5 7h3v9h-3V7z" fill="currentColor" className="text-white" />
          <path d="M8 5.5h8l-.75 3H8.75L8 5.5z" fill="currentColor" className="text-brand-sky" />
          <circle cx="12" cy="4.5" r="1.5" fill="currentColor" className="text-white" />
        </svg>
      </motion.div>
      <div className="flex flex-col">
        <span className="font-display text-lg font-bold leading-tight tracking-tight text-white">
          The Janitors
        </span>
        <span className="font-mono text-[11px] font-semibold tracking-wider text-brand-sky">
          {TEAM_NUMBER_DISPLAY}
        </span>
      </div>
    </Link>
  )
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link to={to} className="relative block px-4 py-2 text-sm font-medium text-brand-ice/80 transition-colors hover:text-white">
      {active && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute inset-0 rounded-lg bg-white/12"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative">{label}</span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const scrolled = useScrolled()

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-white/10 bg-brand-navy/95 shadow-lg shadow-brand-navy/20 backdrop-blur-xl'
          : 'border-transparent bg-brand-navy/80 backdrop-blur-md'
      }`}
    >
      <nav className={`container-wide flex items-center justify-between gap-4 px-6 transition-all duration-300 md:px-12 lg:px-24 ${scrolled ? 'py-3' : 'py-4'}`}>
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} label={label} active={location.pathname === to} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="hidden md:block">
            <a
              href={APPLICATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-brand-sky px-5 py-2.5 text-sm font-bold text-brand-navy shadow-md shadow-brand-sky/25 transition hover:bg-brand-sky-dark"
            >
              Join Us
            </a>
          </motion.div>

          <motion.button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            whileTap={{ scale: 0.92 }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-white/10 bg-brand-navy md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      location.pathname === to
                        ? 'bg-brand-sky/20 text-brand-sky'
                        : 'text-brand-ice/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <a
                  href={APPLICATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-xl bg-brand-sky px-4 py-3 text-center text-sm font-bold text-brand-navy"
                >
                  Join Us
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
