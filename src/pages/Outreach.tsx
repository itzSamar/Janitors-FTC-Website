import { PageHeader, Card } from '../components'
import { Reveal, Stagger, StaggerItem } from '../lib/motion'

const plannedInitiatives = [
  {
    title: 'STEM Workshops',
    description:
      'Hands-on robotics and engineering workshops for local students to spark interest in STEM careers.',
    status: 'Planned',
  },
  {
    title: 'Community Demos',
    description:
      'Bringing our robot to schools, libraries, and community events to showcase FTC and inspire the next generation.',
    status: 'Planned',
  },
  {
    title: 'Mentorship',
    description:
      'Partnering with younger students and rookie FTC teams to share knowledge and build the robotics community.',
    status: 'Planned',
  },
]

export default function Outreach() {
  return (
    <>
      <PageHeader
        title="Outreach"
        subtitle="Using robotics to make a difference in our community — inspiring the next generation of innovators."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-gradient-dark">
                Beyond the Competition
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-default">
                Outreach is a core part of who we are. FTC isn&apos;t just about building robots —
                it&apos;s about building people and communities. As a new team, we&apos;re laying the
                foundation for programs that will grow with us season after season.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-elevated">
        <div className="container-wide">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-gradient-dark">
              Our Initiatives
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-subtle">
              Programs we&apos;re planning for our inaugural season and beyond.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {plannedInitiatives.map(({ title, description, status }) => (
              <StaggerItem key={title}>
                <Card hover>
                  <span className="badge !px-3 !py-1 text-xs">{status}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
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
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-gradient-dark">
              Impact Log
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-subtle">
              A running record of our outreach events and community engagement.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-14 max-w-2xl">
              <Card className="text-center">
                <div className="py-8">
                  <p className="text-faint">
                    Our first outreach events will be documented here as our season progresses.
                  </p>
                  <p className="mt-2 text-sm text-faint">Check back soon!</p>
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
