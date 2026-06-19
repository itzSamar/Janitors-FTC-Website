import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface ButtonProps {
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  children: React.ReactNode
  className?: string
}

const variants = {
  primary:
    'bg-brand-sky text-brand-navy shadow-lg shadow-brand-sky/30 hover:bg-brand-sky-dark hover:shadow-brand-sky/40 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-brand-navy text-white shadow-lg shadow-brand-navy/25 hover:bg-brand-navy-light hover:-translate-y-0.5 active:translate-y-0 dark:bg-brand-sky dark:text-brand-navy dark:hover:bg-brand-sky-dark',
  outline:
    'border-2 border-white/40 text-white hover:bg-white/15 hover:border-white/60 hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'border-2 border-brand-navy/15 text-brand-navy hover:bg-brand-ice/50 hover:border-brand-sky/40 hover:-translate-y-0.5 active:translate-y-0 dark:border-white/20 dark:text-white dark:hover:bg-white/10',
}

const MotionLink = motion.create(Link)
const MotionA = motion.create('a')

const motionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
}

export default function Button({
  to,
  href,
  variant = 'primary',
  children,
  className = '',
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <MotionA href={href} className={classes} target="_blank" rel="noopener noreferrer" {...motionProps}>
        {children}
      </MotionA>
    )
  }

  return (
    <motion.button type="button" className={classes} {...motionProps}>
      {children}
    </motion.button>
  )
}
