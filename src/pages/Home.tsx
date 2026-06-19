import { motion } from 'framer-motion'
import { Button, Card } from '../components'
import AnimatedBackground from '../components/AnimatedBackground'
import { APPLICATION_FORM_URL } from '../config/team'
import { Reveal, Stagger, StaggerItem } from '../lib/motion'

const pillars = [
  {
    title: 'Engineering',
    description:
      'Design, build, and iterate competition robots using CAD, fabrication, and programming.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Teamwork',
    description:
      'Collaborate across mechanical, software, and outreach roles to solve real challenges together.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Community',
    description:
      'Give back through outreach, mentorship, and sharing STEM with students in our area.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy">
        <AnimatedBackground />

        <div className="container-wide section-padding relative">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-gradient">The Janitors</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-ice/80 md:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A FIRST Tech Challenge robotics team ready to clean up the competition.
              We design, build, and compete — while growing as engineers and leaders.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button to="/about">Learn About Us</Button>
              <Button href={APPLICATION_FORM_URL} variant="outline">Join Us</Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 hero-fade" />
      </section>

      <section className="relative section-muted">
        <div className="container-wide section-padding !py-14">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center text-lg font-medium leading-relaxed text-default md:text-xl">
              FIRST Tech Challenge inspires young people to be science and technology leaders
              through exciting, mentor-based programs that build skills and self-confidence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-elevated">
        <div className="container-wide">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-gradient-dark md:text-4xl">
                What We Do
              </h2>
              <p className="mt-4 text-subtle">
                More than robots — we build the skills that last a lifetime.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {pillars.map(({ title, description, icon }) => (
              <StaggerItem key={title}>
                <Card hover>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-ice text-brand-navy transition-colors dark:bg-brand-sky/20 dark:text-brand-sky">
                    {icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-subtle">{description}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-padding section-muted">
        <div className="container-wide">
          <Reveal>
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-brand-navy p-10 md:p-16"
              whileHover={{ scale: 1.005 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-sky)_0%,_transparent_55%)] opacity-20" />
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-sky/20 blur-3xl" />

              <div className="relative mx-auto max-w-2xl text-center">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  Ready to Build Something Great?
                </h2>
                <p className="mt-4 text-brand-ice/80">
                  We&apos;re looking for passionate students to join our inaugural season.
                  No prior experience required — just curiosity and commitment.
                </p>
                <div className="mt-8">
                  <Button href={APPLICATION_FORM_URL}>Join Us</Button>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
