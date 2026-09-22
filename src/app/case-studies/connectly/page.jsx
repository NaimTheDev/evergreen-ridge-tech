import Link from "next/link";
import Container from "@/components/Container";
import FadeIn, { FadeInStagger } from "@/components/FadeIn";
import PageIntro from "@/components/PageIntro";
import PhoneFrame from "@/components/PhoneFrame";
import BrandMark from "@/components/BrandMark";
import ContactSection from "@/components/ContactSection";
import mentorDirectory from "@/images/case-studies/connectly/mentor-directory.png";
import homeDashboard from "@/images/case-studies/connectly/home-dashboard.png";
import chooseATime from "@/images/case-studies/connectly/choose-a-time.png";
import sessionConfirmed from "@/images/case-studies/connectly/session-confirmed.png";
import upcomingCalls from "@/images/case-studies/connectly/upcoming-calls.png";

export const metadata = {
  title: "Connectly — Mentorship Booking App Case Study",
  description:
    "How Connectly turns finding a mentor and getting on their calendar into a single flow — the intent behind the product, how it was built, and the tools it connects to.",
  alternates: {
    canonical: "/case-studies/connectly",
  },
  openGraph: {
    type: "article",
    url: "https://www.evergreenridgetech.com/case-studies/connectly",
    title: "Connectly — Mentorship Booking App Case Study",
    description:
      "A mentorship app where browsing, booking, and staying in touch all happen in one place. Here's the intent behind it, how it was built, and what it connects to.",
  },
};

const facts = [
  { label: "Role", value: "Product design & full build" },
  { label: "Platform", value: "iOS & Android" },
  { label: "Audience", value: "Mentors & mentees" },
  { label: "Scheduling", value: "Mentors' own calendars" },
];

const partners = [
  {
    key: "calendly",
    name: "Calendly",
    role: "Scheduling",
  },
  {
    key: "zoom",
    name: "Zoom",
    role: "Video sessions",
  },
  {
    key: "stripe",
    name: "Stripe",
    role: "Payments",
    status: "In build",
  },
];

const integrations = [
  {
    name: "Calendly",
    mark: "calendly",
    role: "Real availability, real bookings",
    description:
      "Mentors connect the calendar they already keep, once, through a secure sign-in — no copying keys or pasting links. From then on the app shows only times they're genuinely free, books the session on the mentee's behalf, and offers reschedule and cancel options on the confirmation. If a session changes anywhere else, Connectly hears about it and updates itself.",
  },
  {
    name: "Zoom",
    mark: "zoom",
    role: "The room the session happens in",
    description:
      "Booking a session creates the video meeting automatically, and the link lands on the mentee's home screen behind a single Join Call button. Video links take a moment to be created, so the app waits for it rather than showing an empty button — and if one ever fails to appear, the session is flagged instead of quietly leaving someone staring at a dead link.",
  },
  {
    name: "Secure sign-in",
    role: "Getting in without friction",
    description:
      "One tap with Google, or an email and password for everyone else — with password resets handled properly so nobody gets stuck at the door. Each person's role travels with their account, so mentors and mentees land in the version of the app built for them.",
  },
  {
    name: "Live data sync",
    role: "Everything current, everywhere",
    description:
      "Profiles, messages, and bookings update the moment they change. A newly booked session shows up on the home screen and the calls tab without anyone pulling to refresh, and a conversation picks up on a second device exactly where it left off.",
  },
  {
    name: "Photo hosting",
    role: "Profiles people recognize",
    description:
      "Mentors upload a headshot during setup; it's stored, resized for the app, and shown next to their name everywhere they appear. Anyone who hasn't added one yet gets a clean initials avatar instead of a broken image.",
  },
  {
    name: "A private server layer",
    role: "Where the sensitive work happens",
    description:
      "The credentials that connect to a mentor's calendar never touch anyone's phone. A small, private backend holds them, does the talking, and hands the app back only what it needs: open times and confirmations. It also means the scheduling provider can be swapped later without shipping a new version of the app.",
  },
];

const upcoming = {
  name: "Stripe",
  mark: "stripe",
  role: "Paid sessions and paid chats",
  status: "In build",
  description:
    "Mentors already name their price during setup — one rate for a video session, another for chat — and mentees already see it before they book. The next release closes that loop: paying for a session at the moment it's booked, and paying for chat access the same way, with payouts landing in the mentor's account without anyone sending an invoice. The groundwork is deliberate — pricing, roles, and the private server layer were all built with this step in mind.",
};

const ConnectlyCaseStudyPage = () => {
  return (
    <>
      <PageIntro
        eyebrow="Case study — Connectly"
        title="Mentorship that actually makes it onto the calendar."
      >
        <p>
          Connectly is a mentorship app for two kinds of people: someone looking
          for guidance from a person who has already walked the road, and the
          mentor who wants to help without their inbox turning into a
          scheduling desk. Browsing, booking, and staying in touch all happen in
          one place.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <FadeInStagger faster>
          <dl className="grid grid-cols-1 gap-8 rounded-4xl border border-border bg-card p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
            {facts.map((fact) => (
              <FadeIn key={fact.label}>
                <dt className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-display text-lg font-semibold text-foreground">
                  {fact.value}
                </dd>
              </FadeIn>
            ))}
          </dl>
        </FadeInStagger>
      </Container>

      {/* The intent */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            The intent
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Matching people was never the hard part.
          </h2>
          <div className="mt-6 space-y-6 text-base/7 text-muted-foreground">
            <p>
              Almost every mentorship conversation dies in the same place. Two
              people agree they should talk, someone promises to send times,
              messages drift down the thread, a week goes by, and the momentum
              is gone. The introduction worked perfectly. Everything after it
              was left to good intentions.
            </p>
            <p>
              Connectly was built to close that gap. The goal was to make the
              distance between &ldquo;this person could help me&rdquo; and a
              confirmed session as short as a few taps — no link swapping, no
              guessing at time zones, no waiting for a reply to know whether
              Tuesday works.
            </p>
            <p>
              The second goal was to protect the mentor. Their time is the
              scarce thing in the whole system, so the app is built around their
              terms: they choose whether they offer video calls, chat sessions,
              or both, they set their own prices, and the only times a mentee
              ever sees are the ones they actually left open. Mentors say yes
              once, during setup, and the app handles the rest.
            </p>
          </div>
        </FadeIn>
      </Container>

      {/* Walkthrough */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            The product
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            From &ldquo;who can help me?&rdquo; to a booked session.
          </h2>
          <p className="mt-6 text-base/7 text-muted-foreground">
            Five screens carry the whole experience. Each one exists to answer a
            single question and then get out of the way.
          </p>
        </FadeIn>

        <FadeInStagger faster className="mt-14">
          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <FadeIn>
              <PhoneFrame
                image={mentorDirectory}
                alt="Connectly's mentor directory with a search field and a list of mentors showing their focus areas"
                caption="Search by name or focus area — mentorship, finance, software, whatever you came for."
                priority
              />
              <h3 className="mt-6 text-center font-display text-lg font-semibold text-foreground">
                Find someone worth an hour
              </h3>
              <p className="mt-2 text-center text-base/7 text-muted-foreground">
                Every mentor leads with who they are and what they help with, so
                a mentee can judge fit before committing to anything.
              </p>
            </FadeIn>

            <FadeIn>
              <PhoneFrame
                image={homeDashboard}
                alt="The Connectly home screen with featured mentors and an upcoming call card with a Join Call button"
                caption="Featured mentors up top, your next session directly underneath."
                priority
              />
              <h3 className="mt-6 text-center font-display text-lg font-semibold text-foreground">
                A home screen that answers &ldquo;what&apos;s next?&rdquo;
              </h3>
              <p className="mt-2 text-center text-base/7 text-muted-foreground">
                The upcoming call is the first thing you see, with the join
                button already on it — no hunting through email for a link.
              </p>
            </FadeIn>

            <FadeIn>
              <PhoneFrame
                image={chooseATime}
                alt="A 'Choose a time' sheet listing available half-hour slots across several days"
                caption="Open slots pulled straight from the mentor's own calendar."
              />
              <h3 className="mt-6 text-center font-display text-lg font-semibold text-foreground">
                Pick a time that really is free
              </h3>
              <p className="mt-2 text-center text-base/7 text-muted-foreground">
                No requests, no waiting for confirmation. If a time appears in
                the list, it can be booked right then.
              </p>
            </FadeIn>

            <FadeIn>
              <PhoneFrame
                image={sessionConfirmed}
                alt="A 'Session Confirmed' dialog showing the invitee, email, time, and reschedule or cancel options"
                caption="Who, when, and what to do if plans change — all in one card."
              />
              <h3 className="mt-6 text-center font-display text-lg font-semibold text-foreground">
                Confirmation without the guesswork
              </h3>
              <p className="mt-2 text-center text-base/7 text-muted-foreground">
                Rescheduling and cancelling sit right next to the booking, so
                changing plans never means chasing anyone down.
              </p>
            </FadeIn>

            <FadeIn>
              <PhoneFrame
                image={upcomingCalls}
                alt="The Calls tab listing an upcoming session with Join Call and Details buttons"
                caption="Every booked session in one place, ready to join."
              />
              <h3 className="mt-6 text-center font-display text-lg font-semibold text-foreground">
                One tab for everything booked
              </h3>
              <p className="mt-2 text-center text-base/7 text-muted-foreground">
                Sessions stay current on their own — if one is cancelled
                elsewhere, it disappears here too.
              </p>
            </FadeIn>

            <FadeIn className="flex">
              <div className="flex w-full flex-col justify-center rounded-4xl border border-border bg-card p-8">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  And in between sessions
                </h3>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  Not every question needs a video call. Mentors can offer chat
                  sessions instead of — or alongside — calls, so a quick
                  question gets a quick answer and the relationship keeps going
                  between meetings rather than resetting each time.
                </p>
              </div>
            </FadeIn>
          </div>
        </FadeInStagger>
      </Container>

      {/* How it was built */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            How it was built
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Build the one thing that matters, then earn the rest.
          </h2>
        </FadeIn>

        <FadeInStagger faster className="mt-12">
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="lift h-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Start narrow
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  The booking loop came first
                </h3>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  Find a mentor, pick a time, get confirmed. That loop was built
                  and made to feel good before anything else was allowed in.
                  Every feature that came afterward — messaging, profiles,
                  pricing — had to justify itself against that core, which is
                  why the app never grew a settings screen nobody asked for.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="lift h-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Two audiences, one app
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  Sign-up splits, the app doesn&apos;t
                </h3>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  New members pick a side on their first screen and the setup
                  forks from there: mentees describe what they&apos;re working
                  toward, mentors describe what they know, what they offer, and
                  what they charge. Progress is saved as they go, so nobody
                  loses ten minutes of typing to a dropped connection — and
                  neither side is ever shown a control meant for the other.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="lift h-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Integrate, don&apos;t reinvent
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  No calendar was rebuilt here
                </h3>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  Scheduling is a deceptively deep problem — time zones,
                  double-bookings, buffers, cancellations. Rather than rebuild
                  that badly, Connectly plugs into the calendar tool mentors
                  already trust and wraps it in an experience that feels native
                  to the app. Months of work avoided, and a category of bugs
                  that simply never existed.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="lift h-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  One look, everywhere
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  A shared design language, defined once
                </h3>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  Colors, spacing, buttons, and avatars are all defined in a
                  single place and reused across every screen. New features
                  inherit the look automatically instead of drifting, and a
                  brand tweak is one change rather than a hundred. It&apos;s
                  also why the app reads cleanly in both light and dark mode
                  without a separate design pass.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="lift h-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Built once, runs twice
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  iPhone and Android from the same build
                </h3>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  One codebase produces both apps, so a fix ships to everyone at
                  once and the two platforms can&apos;t quietly drift apart.
                  That decision kept the build affordable and keeps it cheap to
                  maintain — the real cost of any app is the years after launch.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="lift h-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Guardrails
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  Safe to keep changing
                </h3>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  Automated tests and checks run over the app on every change,
                  covering the paths that matter most — signing in, finishing
                  setup, booking a session. The point isn&apos;t perfection;
                  it&apos;s confidence that improving messaging on a Tuesday
                  won&apos;t quietly break scheduling on a Wednesday.
                </p>
              </div>
            </FadeIn>
          </div>
        </FadeInStagger>
      </Container>

      {/* Integrations */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Integrations
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            The pieces working quietly in the background.
          </h2>
          <p className="mt-6 text-base/7 text-muted-foreground">
            A good integration is one nobody notices. Here&apos;s what Connectly
            leans on, and what each piece is responsible for.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <ul
            role="list"
            className="flex flex-wrap items-center gap-4 sm:gap-6"
            aria-label="Services Connectly integrates with"
          >
            {partners.map((partner) => (
              <li
                key={partner.key}
                className="lift group flex items-center gap-4 rounded-full border border-border bg-card py-3 pl-4 pr-6 hover:border-accent/60"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                  <BrandMark name={partner.key} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-base font-semibold leading-tight text-foreground">
                    {partner.name}
                  </span>
                  <span className="block text-sm leading-tight text-muted-foreground">
                    {partner.status ? `${partner.role} · ${partner.status}` : partner.role}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeInStagger faster className="mt-10">
          <ul role="list" className="grid gap-6 lg:grid-cols-2">
            {integrations.map((integration) => (
              <li key={integration.name} className="flex">
                <FadeIn className="lift w-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="flex items-center gap-3 font-display text-xl font-semibold text-foreground">
                      {integration.mark && (
                        <BrandMark
                          name={integration.mark}
                          className="h-5 w-5 flex-none text-muted-foreground"
                        />
                      )}
                      {integration.name}
                    </h3>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {integration.role}
                    </p>
                  </div>
                  <p className="mt-4 text-base/7 text-muted-foreground">
                    {integration.description}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>

        <FadeIn className="mt-6">
          <div className="lift rounded-4xl border border-dashed border-border bg-muted/40 p-8 hover:border-accent/60 hover:bg-muted/60">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              <h3 className="flex items-center gap-3 font-display text-xl font-semibold text-foreground">
                <BrandMark
                  name={upcoming.mark}
                  className="h-5 w-5 flex-none text-muted-foreground"
                />
                {upcoming.name}
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                  {upcoming.status}
                </span>
              </h3>
              <p className="text-sm font-semibold text-muted-foreground">
                {upcoming.role}
              </p>
            </div>
            <p className="mt-4 max-w-4xl text-base/7 text-muted-foreground">
              {upcoming.description}
            </p>
          </div>
        </FadeIn>
      </Container>

      {/* Takeaways */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn>
          <div className="rounded-4xl bg-primary px-8 py-12 sm:px-12 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              What the build proved
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              The fastest products to build are the ones that know what to leave
              out.
            </h2>
            <FadeInStagger faster className="mt-10 grid gap-8 sm:grid-cols-3">
              <FadeIn>
                <p className="font-display text-lg font-semibold text-white">
                  Solve the drop-off, not the feature list
                </p>
                <p className="mt-2 text-base/7 text-neutral-300">
                  Finding where people give up — and designing that moment away
                  — did more for Connectly than any feature could have.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="font-display text-lg font-semibold text-white">
                  Borrow the hard parts
                </p>
                <p className="mt-2 text-base/7 text-neutral-300">
                  Connecting to mature tools for scheduling and accounts freed
                  the entire budget to go toward the experience itself.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="font-display text-lg font-semibold text-white">
                  Decide who it&apos;s for, early
                </p>
                <p className="mt-2 text-base/7 text-neutral-300">
                  Designing for mentors and mentees from day one kept one
                  audience from becoming an awkward afterthought.
                </p>
              </FadeIn>
            </FadeInStagger>
          </div>
        </FadeIn>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <FadeIn>
          <p className="text-base text-muted-foreground">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 font-semibold text-foreground underline underline-offset-4"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              >
                ←
              </span>
              Back to all case studies
            </Link>
          </p>
        </FadeIn>
      </Container>

      <ContactSection />
    </>
  );
};

export default ConnectlyCaseStudyPage;
