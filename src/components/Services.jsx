import React from "react";
import SectionIntro from "./SectionIntro";
import Container from "./Container";
import FadeIn from "./FadeIn";
import StylizedImage from "./StylizedImage";
import imageLaptop from "../images/laptop.jpg";
import List, { ListItem } from "./List";

const Services = () => {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="We deliver dependable software services built for growing businesses."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Our team aligns with your business goals, technical standards, and
          performance outcomes to keep projects on track and your team
          supported.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          {/* List item */}
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Web & app development">
              Build modern, secure web and mobile applications with clean
              architecture and clear performance baselines.
            </ListItem>
            <ListItem title="AI application development">
              Build AI-powered web applications — from chatbots and intelligent
              assistants to LLM integrations, retrieval-augmented generation, and
              automation that fits naturally into your product.
            </ListItem>
            <ListItem title="Security & reliability">
              Apply security best practices, continuous monitoring, and
              documentation to keep your applications safe and dependable.
            </ListItem>
            <ListItem title="Cloud & infrastructure">
              Design and operate resilient cloud and hybrid environments that
              improve scalability, uptime, and cost transparency.
            </ListItem>
            <ListItem title="Support & maintenance">
              Deliver responsive support, incident management, and continuous
              improvement for your users.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
};

export default Services;
