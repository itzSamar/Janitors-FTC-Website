import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { APPLICATION_FORM_URL } from '../config/team'

const footerLinks: { label: string; to?: string; href?: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/outreach', label: 'Outreach' },
  { to: '/robots', label: 'Robots' },
  { href: APPLICATION_FORM_URL, label: 'Join Us' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-brand-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-brand-sky)_0%,_transparent_60%)] opacity-10" />

      <div className="container-wide section-padding relative !py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="font-display text-xl font-bold">The Janitors</div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-ice/70">
              A FIRST Tech Challenge robotics team. Building skills, community, and
              competition-ready robots — one season at a time.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-ice">
              Navigation
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.map(({ to, href, label }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-brand-ice/60 transition hover:text-brand-sky"
                    >
                      <motion.span whileHover={{ x: 4 }} className="inline-block">
                        {label}
                      </motion.span>
                    </a>
                  ) : (
                    <Link
                      to={to!}
                      className="group inline-flex items-center gap-1 text-sm text-brand-ice/60 transition hover:text-brand-sky"
                    >
                      <motion.span whileHover={{ x: 4 }} className="inline-block">
                        {label}
                      </motion.span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-ice">
              Connect
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-brand-ice/60">
              <li>
                <span className="text-brand-gray-dark">Email:</span>{' '}
                <a href="mailto:team@example.com" className="transition hover:text-brand-sky">
                  team@example.com
                </a>
              </li>
              <li>
                <span className="text-brand-gray-dark">Instagram:</span>{' '}
                <span className="text-brand-gray-dark">Coming soon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-brand-ice/50">
            &copy; {new Date().getFullYear()} The Janitors FTC. All rights reserved.
          </p>
          <p className="text-xs text-brand-ice/40">
            FIRST&reg; and FIRST Tech Challenge&reg; are registered trademarks of FIRST&reg;.
          </p>
        </div>
      </div>
    </footer>
  )
}
