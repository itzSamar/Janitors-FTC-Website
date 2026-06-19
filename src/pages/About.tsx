import { PageHeader, Card } from '../components'
import { Reveal, Stagger, StaggerItem } from '../lib/motion'

const values = [
  {
    title: 'Gracious Professionalism',
    description:
      'We compete hard but treat every team, judge, and volunteer with respect. Winning matters — how we win matters more.',
  },
  {
    title: 'Continuous Learning',
    description:
      'Every failure is data. We iterate, document, and improve — on the robot and as individuals.',
  },
  {
    title: 'Inclusive Team Culture',
    description:
      'Great ideas come from everyone. We welcome students of all backgrounds and experience levels.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Meet The Janitors — a new FTC team built on engineering excellence, teamwork, and community impact."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-gradient-dark">
                Our Story
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-default">
                <p>
                  The Janitors is a FIRST Tech Challenge robotics team entering its inaugural
                  season. We&apos;re a group of students passionate about STEM, problem-solving,
                  and pushing the boundaries of what we can build together.
                </p>
                <p>
                  FTC challenges teams to design, build, program, and operate robots to compete
                  in an alliance format against other teams. It&apos;s the ultimate sport for the
                  mind — and we&apos;re just getting started.
                </p>
                <p className="italic text-faint">
                  More details about our team, location, and founding story coming soon.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="panel aspect-[4/3] overflow-hidden rounded-2xl">
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-ice animate-float dark:bg-brand-sky/20">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-brand-navy dark:text-brand-sky" fill="none">
                      <path d="M6 18h12v1.5H6V18z" fill="currentColor" />
                      <path d="M10.5 7h3v9h-3V7z" fill="currentColor" />
                      <path d="M8 5.5h8l-.75 3H8.75L8 5.5z" fill="currentColor" className="text-brand-sky" />
                      <circle cx="12" cy="4.5" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <p className="text-sm text-faint">Team photo coming soon</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding section-elevated">
        <div className="container-wide">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-gradient-dark">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-subtle">
              The principles that guide everything we do — on and off the field.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map(({ title, description }) => (
              <StaggerItem key={title}>
                <Card hover>
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-subtle">{description}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-padding section-muted">
        <div className="container-wide">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-gradient-dark">
              The Team
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-subtle">
              Roster and leadership bios will be added as our season gets underway.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {['Team Captain', 'Lead Engineer', 'Software Lead', 'Outreach Lead'].map((role) => (
              <StaggerItem key={role}>
                <Card className="text-center" hover>
                  <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-brand-ice ring-2 ring-brand-sky/20 dark:bg-brand-sky/15" />
                  <p className="font-display font-semibold">TBD</p>
                  <p className="mt-1 text-sm text-faint">{role}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
