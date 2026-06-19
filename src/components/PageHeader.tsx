import { Reveal } from '../lib/motion'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-brand-navy">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-sky)_0%,_transparent_55%)] opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-brand-ice)_0%,_transparent_50%)] opacity-10" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(var(--color-brand-sky) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-sky) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      <div className="container-wide section-padding relative">
        <Reveal>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-2xl text-lg text-brand-ice/80 md:text-xl">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
