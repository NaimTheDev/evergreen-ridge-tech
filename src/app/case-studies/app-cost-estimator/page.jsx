import Link from "next/link";
import Container from "@/components/Container";
import FadeIn, { FadeInStagger } from "@/components/FadeIn";
import PageIntro from "@/components/PageIntro";
import PhoneFrame from "@/components/PhoneFrame";
import ScreenFrame from "@/components/ScreenFrame";
import BrandMark from "@/components/BrandMark";
import ContactSection from "@/components/ContactSection";
import clientRequestStep from "@/images/case-studies/app-cost-estimator/client-request-step.png";
import projectTypeStep from "@/images/case-studies/app-cost-estimator/project-type-step.png";
import featuresStep from "@/images/case-studies/app-cost-estimator/features-step.png";
import generatedProposal from "@/images/case-studies/app-cost-estimator/generated-proposal.png";
import estimatesDashboard from "@/images/case-studies/app-cost-estimator/estimates-dashboard.png";
import proposalSummaryDetail from "@/images/case-studies/app-cost-estimator/proposal-summary-detail.png";
import proposalFeaturesDetail from "@/images/case-studies/app-cost-estimator/proposal-features-detail.png";

export const metadata = {
  title: "App Cost Estimator — AI Scoping Tool Case Study",
  description:
    "How App Cost Estimator turns a paragraph describing a project into an itemized, defensible software estimate — the problem behind it, how it was built, and where the AI actually sits.",
  alternates: {
    canonical: "/case-studies/app-cost-estimator",
  },
  openGraph: {
    type: "article",
    url: "https://www.evergreenridgetech.com/case-studies/app-cost-estimator",
    title: "App Cost Estimator — AI Scoping Tool Case Study",
    description:
      "A tool that reads a project description and returns a priced, line-by-line estimate. Here's the problem behind it, how it was built, and how it came to power the estimator on this site.",
  },
};

const facts = [
  { label: "Role", value: "Product design & full build" },
  { label: "Platform", value: "Web app" },
  { label: "Input", value: "A paragraph of plain English" },
  { label: "Also powers", value: "The estimator on this site" },
];

const steps = [
  {
    number: "Step one",
    title: "Describe it the way the client did",
    image: clientRequestStep,
    alt: "The Client Request step: a large free-text box with an example describing a mobile app for event booking",
    caption:
      "The first screen is a blank box, not a checklist — paste the email the client actually sent.",
    body: "Most scoping tools open with a form. This one opens with the client's own words, because that paragraph is where the real scope is hiding.",
  },
  {
    number: "Step two",
    title: "Say what shape it is",
    image: projectTypeStep,
    alt: "The project type step offering full-stack web app, iOS/Android application, landing page, and admin interface",
    caption: "Four shapes: web app, mobile app, landing page, admin interface.",
    body: "One tap of context that changes how everything after it is read. A landing page and an admin interface share almost no assumptions.",
  },
  {
    number: "Step three",
    title: "See the hours before you commit",
    image: featuresStep,
    alt: "The features step: a checklist where each feature shows its own hour figure, such as authentication at 15 hours",
    caption:
      "Authentication 15 hrs, admin dashboard 20 hrs, notifications 8 hrs — visible while you choose.",
    body: "Every item carries its own number on the way in. Nothing is revealed at the end, so the total is never a surprise you have to justify after the fact.",
  },
];

const pipeline = [
  {
    stage: "Interpret",
    mark: "openai",
    title: "Read the description, name the work",
    description:
      "The model's first job is to go through the client's paragraph and pull out every feature hiding in it, then merge those with whatever was ticked on the checklist and drop the duplicates. This is the part a form genuinely cannot do — it's reading comprehension, and it's what language models are actually good at.",
  },
  {
    stage: "Price",
    title: "Follow a method, not a hunch",
    description:
      "Pricing doesn't come from the model's intuition. It's handed a written method: a baseline hour range for every known feature, multipliers for complexity, an adjustment for a rushed or relaxed timeline, and the overhead every project carries. Anything it found that isn't on the list gets priced by analogy to the nearest thing that is.",
  },
  {
    stage: "Write",
    mark: "openai",
    title: "Hand back a document, not a number",
    description:
      "The result comes back as structured data — every line item with its hours and its cost — which becomes the on-screen breakdown and a downloadable PDF. What lands in front of the client reads like a proposal, not a calculator's output.",
  },
];

const buildNotes = [
  {
    eyebrow: "Design the ending first",
    title: "The document was the spec",
    description:
      "The build started from what a client should receive — a proposal with a summary, a line for every piece of work, and the overhead spelled out — and worked backwards to the questions needed to produce it. That's why the flow is five short steps instead of one long form: each one exists because the document needs it.",
  },
  {
    eyebrow: "No sign-up wall",
    title: "You can use it before you commit",
    description:
      "Anyone can start an estimate without creating an account — a session is opened quietly in the background, and the work is saved against it from the first step. Nobody is asked to register before they've seen whether the tool is any good.",
  },
  {
    eyebrow: "Show the math",
    title: "The overhead is a line item, not a markup",
    description:
      "Discovery, QA, project management, deployment and contingency each appear as their own row with their own hours. Most quotes bury this in a round number at the bottom; putting it in the open is what lets someone defend the total line by line.",
  },
  {
    eyebrow: "Don't block on the slow part",
    title: "The PDF renders in the background",
    description:
      "Generating the document is the slowest step, so it doesn't hold anything up. The estimate is saved and the summary appears immediately, and the file arrives on its own. If rendering fails, the estimate is still there — it was never dependent on it.",
  },
];

const AppCostEstimatorCaseStudyPage = () => {
  return (
    <>
      <PageIntro
        eyebrow="Case study — App Cost Estimator"
        title="A paragraph goes in. A priced proposal comes out."
      >
        <p>
          App Cost Estimator reads a project described in plain English — the
          email a client actually sent — and returns an itemized estimate with
          hours and cost on every line. It&apos;s a product in its own right,
          and the estimating method behind it is the one now running on this
          site&apos;s own cost estimator.
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

      {/* The problem */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            The problem
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            The hard part was never the arithmetic.
          </h2>
          <div className="mt-6 space-y-6 text-base/7 text-muted-foreground">
            <p>
              Every quote starts the same way: a client describes what they want
              in a few sentences, and someone experienced spends the next hour
              turning those sentences into line items. The multiplication at the
              end takes seconds. The translation is what costs the afternoon.
            </p>
            <p>
              It&apos;s also where quotes go wrong. Two people at the same shop
              will read the same paragraph and produce different numbers,
              because they noticed different things in it. And an estimate that
              arrives as a single figure can&apos;t survive the obvious
              question — a number you can&apos;t break apart is a number you
              can&apos;t defend.
            </p>
            <p>
              So the tool was built around translation rather than calculation:
              read the description properly, name every piece of work it
              implies, and price each one out in the open.
            </p>
          </div>
        </FadeIn>

        <FadeInStagger faster className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-4xl border border-border bg-muted/40 p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Before
                </p>
                <p className="mt-3 font-display text-xl font-semibold text-foreground">
                  An hour in a spreadsheet, per lead
                </p>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  Re-reading the email, remembering what auth usually costs,
                  guessing at the parts nobody mentioned, and rounding the
                  total until it feels about right.
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="lift h-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  After
                </p>
                <p className="mt-3 font-display text-xl font-semibold text-foreground">
                  A paragraph, then a document you can send
                </p>
                <p className="mt-3 text-base/7 text-muted-foreground">
                  Same description, five short steps, and a proposal with every
                  line priced — including the work that usually goes unquoted.
                </p>
              </div>
            </FadeIn>
          </div>
        </FadeInStagger>
      </Container>

      {/* What it asks */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            What it asks
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Five short steps, and the first one is a blank box.
          </h2>
          <p className="mt-6 text-base/7 text-muted-foreground">
            The flow asks for as little as it can get away with. Here are the
            three that shape the estimate.
          </p>
        </FadeIn>

        <FadeInStagger faster className="mt-14">
          <ol className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.number}>
                <FadeIn>
                  <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {step.number}
                  </p>
                  <PhoneFrame
                    image={step.image}
                    alt={step.alt}
                    caption={step.caption}
                    priority={index < 2}
                  />
                  <h3 className="mt-6 text-center font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-center text-base/7 text-muted-foreground">
                    {step.body}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </FadeInStagger>
      </Container>

      {/* What it produces */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            What it produces
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Every number attached to something.
          </h2>
        </FadeIn>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
          <FadeIn>
            <PhoneFrame
              image={generatedProposal}
              alt="The full generated proposal, showing the project summary followed by a long feature breakdown table"
              caption="The full proposal, top to bottom."
              size="lg"
            />
          </FadeIn>

          <FadeIn>
            <ScreenFrame
              image={proposalSummaryDetail}
              alt="Detail of the proposal's Project Summary: 274.5 total hours, a $100 hourly rate, and a $27,450 total cost"
              caption="The summary a client sees first."
            />
            <div className="mt-8 space-y-6 text-base/7 text-muted-foreground">
              <p>
                The proposal opens with the headline figures and then earns
                them: a row for every feature, with its hours and its share of
                the cost. There is no opaque total — the number at the top is
                the sum of things you can point at.
              </p>
              <p>
                The rows most quotes leave out are in there as line items of
                their own: discovery and requirements, QA and testing, project
                management, deployment and launch, and a contingency buffer.
                That work always happens. Putting it on the page is the
                difference between a quote that gets negotiated down and one
                that gets understood.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Reading between the lines */}
      <Container className="mt-20 sm:mt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Reading between the lines
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Three of these were never on the checklist.
            </h2>
            <div className="mt-6 space-y-6 text-base/7 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">
                  Onboarding Flow
                </span>{" "}
                came from the checklist.{" "}
                <span className="font-semibold text-foreground">
                  Focus Timers
                </span>
                ,{" "}
                <span className="font-semibold text-foreground">
                  Gamification
                </span>{" "}
                and{" "}
                <span className="font-semibold text-foreground">
                  Progression Systems
                </span>{" "}
                appear on no list anywhere in the product. They were read out of
                a description of a focus app where users grow something during a
                session instead of planting a tree.
              </p>
              <p>
                That is the whole reason the first screen is a blank box. A
                checklist can only price the work someone already knew to ask
                for; the interesting scope is almost always the part the client
                described but never named. Features with no preset get priced
                against the nearest one that has.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <ScreenFrame
              image={proposalFeaturesDetail}
              alt="Detail of the feature breakdown showing Onboarding Flow at 6.5 hours, then Focus Timers at 9 hours, Gamification at 13 hours and Progression Systems at 13 hours"
              caption="Four rows from the same breakdown — one from the checklist, three from the description."
            />
          </FadeIn>
        </div>
      </Container>

      {/* Where the AI is */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Where the AI actually is
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Let it read and write. Don&apos;t let it guess.
          </h2>
          <p className="mt-6 text-base/7 text-muted-foreground">
            &ldquo;AI-powered&rdquo; usually hides more than it explains, so
            here is the honest version — three jobs, and what each one is
            allowed to decide.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <ul
            role="list"
            className="flex flex-wrap items-center gap-4 sm:gap-6"
            aria-label="Services this product uses"
          >
            <li className="lift group flex items-center gap-4 rounded-full border border-border bg-card py-3 pl-4 pr-6 hover:border-accent/60">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                <BrandMark name="openai" className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-base font-semibold leading-tight text-foreground">
                  OpenAI
                </span>
                <span className="block text-sm leading-tight text-muted-foreground">
                  Reading the brief · Writing the breakdown
                </span>
              </span>
            </li>
          </ul>
        </FadeIn>

        <FadeInStagger faster className="mt-10">
          <ol className="grid gap-6 lg:grid-cols-3">
            {pipeline.map((stage) => (
              <li key={stage.stage} className="flex">
                <FadeIn className="lift w-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                  <div className="flex items-center gap-3">
                    {stage.mark ? (
                      <BrandMark
                        name={stage.mark}
                        className="h-5 w-5 flex-none text-muted-foreground"
                      />
                    ) : null}
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {stage.stage}
                    </p>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-base/7 text-muted-foreground">
                    {stage.description}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </FadeInStagger>

        <FadeIn className="mt-6">
          <p className="max-w-3xl text-base/7 text-muted-foreground">
            Note which card has no logo on it. The model is trusted to
            understand a brief and to lay out a document — the two things it
            does better than a form ever could. It is not trusted to invent what
            an hour of work is worth.
          </p>
        </FadeIn>
      </Container>

      {/* After the estimate */}
      <Container className="mt-20 sm:mt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              After the estimate
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Quotes don&apos;t end when you send them.
            </h2>
            <div className="mt-6 space-y-6 text-base/7 text-muted-foreground">
              <p>
                Every estimate is kept — with its cost, its hours and the
                features it covered — so a quote from two months ago can be
                reopened when the client comes back with changes, instead of
                being rebuilt from memory.
              </p>
              <p>
                The running total across the account turns out to be the most
                quietly useful number on the screen: it&apos;s a record of how
                much work has been scoped, sitting next to every individual
                quote that made it up.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <PhoneFrame
              image={estimatesDashboard}
              alt="The estimates dashboard listing saved estimates with cost, hours and feature tags, above a running total of 6,278.5 hours"
              caption="Saved estimates, ready to reopen or turn into a proposal."
            />
          </FadeIn>
        </div>
      </Container>

      {/* How it was built */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            How it was built
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Four decisions that shaped everything else.
          </h2>
        </FadeIn>

        <FadeInStagger faster className="mt-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {buildNotes.map((note) => (
              <FadeIn key={note.eyebrow}>
                <div className="lift h-full rounded-4xl border border-border bg-card p-8 hover:border-accent/60 hover:shadow-[0_18px_50px_rgba(15,61,46,0.10)]">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {note.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                    {note.title}
                  </h3>
                  <p className="mt-3 text-base/7 text-muted-foreground">
                    {note.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
      </Container>

      {/* Dogfooding */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn>
          <div className="rounded-4xl border border-border bg-card p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              The same engine, on this site
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              The estimator on this site came out of this product.
            </h2>
            <div className="mt-6 max-w-3xl space-y-6 text-base/7 text-muted-foreground">
              <p>
                Writing the method down precisely enough for a machine to follow
                had a side effect worth more than the tool itself: it turned out
                to be a specification. Every rule was already explicit — the
                baseline hours for each kind of feature, the multipliers for
                complexity, what a rushed timeline does to the worst case, and
                the five overhead lines that always apply.
              </p>
              <p>
                So the cost estimator on this site is the same method, rewritten
                as ordinary arithmetic. Same feature vocabulary, same hour
                ranges, same multipliers, same buffers — running in the browser,
                with no model call and no API key, which is why it answers the
                instant you tick a box. Once a method is written down, it
                doesn&apos;t need to be interpreted.
              </p>
              <p>
                There&apos;s still a model in the loop here, doing the job it
                should: when you submit, it writes the proposal that reaches
                your inbox. The figures were already settled before it was
                asked, and it never recalculates them.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/cost-estimator"
                className="group/cta inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Try it on this site
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  &rarr;
                </span>
              </Link>
            </div>
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
              A method you can write down is worth more than a clever answer.
            </h2>
            <FadeInStagger faster className="mt-10 grid gap-8 sm:grid-cols-3">
              <FadeIn>
                <p className="font-display text-lg font-semibold text-white">
                  Translation, not arithmetic
                </p>
                <p className="mt-2 text-base/7 text-neutral-300">
                  The expensive part of quoting is turning a description into
                  line items. Automate that and the maths takes care of itself.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="font-display text-lg font-semibold text-white">
                  Give the model a method
                </p>
                <p className="mt-2 text-base/7 text-neutral-300">
                  Asking what something costs invites a guess. Handing over the
                  rules and asking it to apply them is a different question.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="font-display text-lg font-semibold text-white">
                  Build it for yourself first
                </p>
                <p className="mt-2 text-base/7 text-neutral-300">
                  Every opinion in it came from quoting real work — which is
                  also how it ended up running on this site.
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

export default AppCostEstimatorCaseStudyPage;
