import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Services from "@/components/Services";
import Button from "@/components/Button";
import logoWithoutWords from "@/images/logo_without_words.png";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Container className="mt-20 sm:mt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn className="max-w-3xl">
            <h1 className="mt-8 font-display text-5xl font-medium tracking-tight text-foreground [text-wrap:balance] sm:text-7xl">
              Software that moves your business forward.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Evergreen Ridge Technology is a software development agency
              delivering secure, scalable web and cloud applications for teams
              that want to ship with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Application development
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Web & mobile apps
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Product design
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Cloud & infrastructure
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Support & maintenance
              </span>
            </div>
          </FadeIn>
          <FadeIn className="relative">
            <div className="rounded-4xl border border-border bg-card p-8 shadow-[0_20px_60px_rgba(15,61,46,0.12)]">
              <div className="flex items-center gap-4">
                <Image
                  src={logoWithoutWords}
                  alt="Evergreen Ridge Technology mark"
                  className="h-12 w-12"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Custom Software Development
                  </p>
                  <p className="text-sm text-muted-foreground">
                    End-to-end product engineering for growing teams
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Core focus
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Clean architecture, resilient systems, and reliable support
                    for your team.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Proven approach
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Plan, build, and ship software with clear communication and
                    accountable delivery.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Engagement model
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Flexible engagements from a single feature to a full
                    product, discovery to launch.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Real impact
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Modern products that improve customer experience and
                    business performance.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-28">
        <FadeIn>
          <div className="grid gap-6 rounded-4xl border border-border bg-card p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Capabilities overview
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Built for scale, engineered for reliability.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                We align every engagement to your business goals, technical
                standards, and measurable outcomes. Our team integrates with
                your stakeholders to deliver technical excellence without
                disruption.
              </p>
              <div className="mt-6">
                <Button href="/contact">Start a project</Button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">
                  Project delivery
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Agile delivery, milestone tracking, and clear communication.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">
                  Quality & reliability
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Testing best practices, continuous monitoring, and
                  well-documented code.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">
                  Technical depth
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cloud adoption, infrastructure, and application development.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>

      <Container className="mt-20 sm:mt-28">
        <FadeIn>
          <div className="rounded-4xl border border-border bg-card p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              How we work
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              A partner for every stage of your product
            </h2>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground">
              From first prototype to production scale, we plug into your team
              and deliver software that lasts.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <div className="rounded-3xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step one
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  Discovery & design
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Define goals, map requirements, and shape the right solution.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step two
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  Build & integrate
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Develop, test, and connect your product to the tools you use.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step three
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  Launch & support
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ship to production and keep it running with ongoing support.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>

      <Services />
      <ContactSection />
    </main>
  );
}
