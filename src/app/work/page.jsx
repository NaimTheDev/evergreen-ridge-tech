import PageIntro from "@/components/PageIntro";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import React from "react";

const WorkPage = () => {
  return (
    <>
      <PageIntro
        eyebrow="Our work"
        title="Proven solutions for real-world problems."
      >
        <p>
          We help businesses modernize systems and deliver reliable digital
          products. Our approach combines disciplined delivery, security-minded
          engineering, and clear communication — so our clients can meet their
          goals on time and within scope.
        </p>

        <div className="mt-12">
          <FadeIn>
            <h2 className="font-display text-2xl font-semibold text-neutral-950">
              Selected work
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              A snapshot of recent projects and delivery experience.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-6">
            <FadeIn className="rounded-3xl bg-muted p-6">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                App Cost Estimator — AI Scoping Tool
              </h3>
              <p className="mt-3 text-base text-neutral-600">
                A web product that reads a project described in plain English
                and returns an itemized estimate, with hours and cost on every
                line.
              </p>
              <Link
                href="/case-studies/app-cost-estimator"
                className="mt-4 inline-flex text-sm font-semibold text-neutral-950 underline underline-offset-4"
              >
                Read the case study{" "}
                <span aria-hidden="true" className="ml-1">
                  &rarr;
                </span>
              </Link>
            </FadeIn>

            <FadeIn className="rounded-3xl bg-muted p-6">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                Connectly — Mentorship Booking App
              </h3>
              <p className="mt-3 text-base text-neutral-600">
                An iOS and Android app where mentees find a mentor, book real
                time on their calendar, and keep the conversation going
                afterward.
              </p>
              <Link
                href="/case-studies/connectly"
                className="mt-4 inline-flex text-sm font-semibold text-neutral-950 underline underline-offset-4"
              >
                Read the case study{" "}
                <span aria-hidden="true" className="ml-1">
                  &rarr;
                </span>
              </Link>
            </FadeIn>

            <FadeIn className="rounded-3xl bg-muted p-6">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                Healthcare Operations Platform
              </h3>
              <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-neutral-950">Client</dt>
                  <dd className="mt-1 text-neutral-600">
                    Commercial Healthcare Organization
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-neutral-950">Period</dt>
                  <dd className="mt-1 text-neutral-600">10/2024–10/2025</dd>
                </div>
                <div>
                  <dt className="font-semibold text-neutral-950">Reference</dt>
                  <dd className="mt-1 text-neutral-600">AndHealth LC</dd>
                </div>
              </dl>
            </FadeIn>

            <FadeIn className="rounded-3xl bg-muted p-6">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                Enterprise Systems Modernization
              </h3>
              <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-neutral-950">Period</dt>
                  <dd className="mt-1 text-neutral-600">06/2020–09/2024</dd>
                </div>
                <div>
                  <dt className="font-semibold text-neutral-950">Reference</dt>
                  <dd className="mt-1 text-neutral-600">Ethan Hong, Cardinal Health</dd>
                </div>
              </dl>
            </FadeIn>
          </div>
        </div>
      </PageIntro>
    </>
  );
};

export default WorkPage;
