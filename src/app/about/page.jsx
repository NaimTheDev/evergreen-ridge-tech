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
          Evergreen Ridge Technology is a software development studio founded by
          Naim Abubaker — a software engineer with 6+ years building secure,
          scalable web and mobile applications for healthcare, enterprise, and
          SaaS companies.
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
                Evergreen Ridge Technology was founded by Naim Abubaker, a
                software engineer with more than six years of experience
                building scalable, high-performance web and mobile applications
                across healthcare, enterprise, and SaaS. He has led frontend
                architecture and performance initiatives at companies like
                AndHealth and Cardinal Health — streamlining workflows, cutting
                system latency, and building reusable design systems that helped
                teams ship faster.
              </p>
              <p className="mt-4 text-base/7 text-muted-foreground">
                With deep expertise in React, Angular, Flutter, and modern state
                management, Naim founded Evergreen Ridge Technology to bring that
                same engineering rigor to growing businesses. The result is
                secure, maintainable software built for the real world —
                products that are fast, reliable, and easy to scale as your team
                grows.
              </p>
              <p className="mt-4 text-base/7 text-muted-foreground">
                Whether you&apos;re launching a new product or modernizing an
                existing one, Evergreen Ridge Technology partners with you from
                first idea to launch and beyond.
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
