import { PageHeader, Card } from '../components'
import { Reveal, Stagger, StaggerItem } from '../lib/motion'

export default function Robots() {
  return (
    <>
      <PageHeader
        title="Robots"
        subtitle="Every season brings a new challenge, a new design, and a new robot built from the ground up."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="badge mb-6">Season 1 — In Development</div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-gradient-dark">
                Our Current Robot
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-default">
                We&apos;re in the early stages of designing and building our competition robot
                for the upcoming FTC season. Check back as we reveal our design, progress photos,
                and technical highlights.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14">
              <div className="panel relative mx-auto max-w-4xl overflow-hidden rounded-2xl">
                <div className="flex aspect-video flex-col items-center justify-center gap-6 p-12">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-ice ring-1 ring-brand-sky/20 animate-float dark:bg-brand-sky/15">
                    <svg className="h-12 w-12 text-brand-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-xl font-semibold">Robot Reveal Coming Soon</p>
                    <p className="mt-2 text-sm text-faint">
                      Photos, CAD renders, and build documentation will appear here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-elevated">
        <div className="container-wide">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-gradient-dark">
              Design Highlights
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-subtle">
              Key features and engineering decisions from our build — updated throughout the season.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {['Drivetrain', 'Intake / Manipulator', 'Autonomous', 'Electronics', 'Software', 'Strategy'].map(
              (subsystem) => (
                <StaggerItem key={subsystem}>
                  <Card hover>
                    <h3 className="font-display text-lg font-semibold">{subsystem}</h3>
                    <p className="mt-2 text-sm text-faint">Technical details coming soon.</p>
                  </Card>
                </StaggerItem>
              ),
            )}
          </Stagger>
        </div>
      </section>

      <section className="section-padding section-muted">
        <div className="container-wide">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-gradient-dark">
              Past Seasons
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-subtle">
              Our robot archive will grow with each season we compete.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-14 max-w-md">
              <Card className="text-center" hover>
                <p className="font-display text-2xl font-bold text-brand-sky">2025–2026</p>
                <p className="mt-2 text-sm text-subtle">Rookie Season — In Progress</p>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
