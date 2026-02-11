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
              Mission-ready IT for government agencies.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Evergreen Ridge Technology is a government contracting partner
              delivering secure, scalable IT services that support critical
              missions across federal, state, and local agencies.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Application Development
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                IT modernization
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Cybersecurity & compliance
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Cloud & infrastructure
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                Service desk & operations
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
                    Government IT Contracting
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Trusted delivery for regulated environments
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Core focus
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Secure networks, resilient systems, and reliable support for
                    mission teams.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Proven approach
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Plan, build, and sustain IT programs with clear reporting
                    and accountable delivery.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Engagement model
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Flexible teaming for prime or subcontract support, from
                    discovery to closeout.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Mission impact
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Modernized systems that improve service delivery and
                    operational readiness.
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
                Built for compliance, engineered for reliability.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                We align every engagement to agency requirements, security
                standards, and measurable outcomes. Our teams integrate with
                your stakeholders to deliver technical excellence without
                disruption.
              </p>
              <div className="mt-6">
                <Button
                  href="https://drive.google.com/file/d/163Sh0tNKRmPctKZm1f5Vkofw01k37-cZ/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                >
                  View capability statement
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">
                  Program delivery
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Structured PMO support, milestone tracking, and risk
                  management.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">
                  Secure operations
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cybersecurity best practices, continuous monitoring, and
                  compliant documentation.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">
                  Technical depth
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cloud adoption, infrastructure upgrades, and application
                  sustainment.
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
              NAICS codes
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Contracting classifications we support
            </h2>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground">
              These NAICS codes align with our core delivery areas across
              software, systems design, and related IT services.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <div className="rounded-3xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Primary
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  54151
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Custom Computer Programming Services
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Secondary
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  541512
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Computer Systems Design Services
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Secondary
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  541519
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Other Computer Related Services
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
