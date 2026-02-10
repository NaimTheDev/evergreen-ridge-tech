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
        title="We deliver dependable IT services built for government missions."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Our team aligns with agency requirements, security standards, and
          performance outcomes to keep programs on track and mission teams
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
            <ListItem title="IT modernization">
              Refresh legacy environments with secure architectures, phased
              migrations, and clear performance baselines.
            </ListItem>
            <ListItem title="Cybersecurity & compliance">
              Apply risk management, continuous monitoring, and documentation
              practices aligned to federal and state requirements.
            </ListItem>
            <ListItem title="Cloud & infrastructure">
              Design and operate resilient cloud and hybrid environments that
              improve scalability, uptime, and cost transparency.
            </ListItem>
            <ListItem title="Service desk & operations">
              Deliver responsive support, incident management, and continuous
              improvement for mission-critical users.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
};

export default Services;
