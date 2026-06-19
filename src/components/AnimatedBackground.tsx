import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,_var(--color-brand-sky)_0%,_transparent_55%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,_var(--color-brand-sky)_0%,_transparent_50%)] opacity-10" />

      <motion.div
        className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-brand-sky/15 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full bg-brand-ice/10 blur-[90px]"
        animate={{ x: [0, -25, 0], y: [0, 15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-brand-sky) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-sky) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)',
        }}
      />
    </div>
  )
}
