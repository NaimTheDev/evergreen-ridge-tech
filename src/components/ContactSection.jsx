import React from "react";
import Container from "./Container";
import FadeIn from "./FadeIn";
import Button from "./Button";
import Offices from "./Offices";

const ContactSection = () => {
  return (
    <>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn className="rounded-4xl border border-border bg-card p-8 sm:p-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Who&apos;s behind this
            </p>
            {/* TODO: replace both placeholders below with your own name and intro. */}
            <h2 className="mt-3 font-display text-2xl font-medium text-foreground sm:text-3xl">
              [TODO: Your name]
            </h2>
            <p className="mt-4 max-w-2xl text-base/7 text-muted-foreground">
              [TODO: One-line intro about who you are and what you build.]
            </p>
          </div>
        </FadeIn>
      </Container>
      <Container className="mt-8 sm:mt-10">
        <FadeIn
          id="contact"
          className="-mx-6 rounded-4xl bg-primary px-6 py-20 sm:mx-0 sm:py-32 md:px-12"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              Let’s work together
            </h2>
            <p className="mt-4 max-w-2xl text-base/7 text-neutral-300">
              Open to new projects and long-term partnerships.
            </p>
            <div className="mt-6 flex">
              <Button href={"/contact"} invert>
                Say Hello
              </Button>
            </div>
            <div className="mt-10 border-t border-white/10 pt-10">
              <h3 className="font-display text-base font-semibold text-white">
                Our offices
              </h3>
              <Offices
                invert
                className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
};

export default ContactSection;
