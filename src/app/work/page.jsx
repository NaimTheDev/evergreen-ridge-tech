import PageIntro from "@/components/PageIntro";
import FadeIn from "@/components/FadeIn";
import React from "react";

const WorkPage = () => {
  return (
    <>
      <PageIntro
        eyebrow="Our work"
        title="Proven solutions for real-world problems."
      >
        <p>
          We help public sector partners modernize systems and deliver reliable
          digital services. Our approach combines disciplined delivery,
          security-minded engineering, and clear communication — so agencies and
          prime contractors can meet mission needs on time and within scope.
        </p>

        <div className="mt-12">
          <FadeIn>
            <h2 className="font-display text-2xl font-semibold text-neutral-950">
              Past performance
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              A snapshot of recent work and delivery experience.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-6">
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
                  <dt className="font-semibold text-neutral-950">POC</dt>
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
                  <dt className="font-semibold text-neutral-950">POC</dt>
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
