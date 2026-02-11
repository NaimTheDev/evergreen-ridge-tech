import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import PageIntro from "@/components/PageIntro";
import Image from "next/image";
import React from "react";
import headshot from "@/images/professional_headshot.png";
import ContactSection from "@/components/ContactSection";

const AboutPage = () => {
  return (
    <>
      <PageIntro eyebrow="About" title="About the Founder">
        <p>
          Evergreenridge Technologies was founded by Naim Abubaker, a software
          engineer with over six years of experience building scalable,
          high-performance applications across healthcare, enterprise, and SaaS
          environments.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="overflow-hidden rounded-4xl border border-border bg-card">
              <Image
                src={headshot}
                alt="Professional headshot"
                className="h-auto w-full grayscale"
                priority
              />
            </div>
          </FadeIn>

          <FadeIn>
            <div className="rounded-4xl border border-border bg-card p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                About the Founder
              </h2>
              <p className="mt-6 text-base/7 text-muted-foreground">
                Evergreenridge Technologies was founded by Naim Abubaker, a
                software engineer with over six years of experience building
                scalable, high-performance applications across healthcare,
                enterprise, and SaaS environments. He has led frontend
                architecture and performance optimization initiatives at
                organizations including AndHealth and Cardinal Health,
                improving workflow efficiency, reducing system latency, and
                standardizing reusable UI systems across teams. With deep
                expertise in React, Angular, Flutter, and modern state
                management, he focuses on delivering secure, maintainable
                software designed for real-world operational use. His work
                emphasizes clarity, performance, and long-term reliability in
                environments where accuracy and system integrity matter.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>

      <ContactSection />
    </>
  );
};

export default AboutPage;
