import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  dark?: boolean
}

export default function Card({ children, className = '', hover = false, dark = false }: CardProps) {
  const base = dark
    ? 'border-white/10 bg-brand-navy/60 text-white'
    : 'border-brand-navy/8 bg-white text-brand-navy shadow-sm shadow-brand-navy/5 dark:border-white/10 dark:bg-brand-navy/80 dark:text-white dark:shadow-black/20'

  if (hover) {
    return (
      <motion.div
        className={`card-shine rounded-2xl border p-6 backdrop-blur-sm ${base} ${className}`}
        whileHover={{ y: -6, boxShadow: dark ? '0 20px 40px rgba(16,47,78,0.3)' : '0 20px 40px rgba(133,177,248,0.15)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`rounded-2xl border p-6 ${base} ${className}`}>
      {children}
    </div>
  )
}
