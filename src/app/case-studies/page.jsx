import Link from "next/link";
import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import ContactSection from "@/components/ContactSection";
import { caseStudies } from "@/constants/caseStudies";

export const metadata = {
  title: "Case Studies",
  description:
    "A closer look at the products Evergreen Ridge Technology has designed and built — the problem behind each one, how it came together, and the tools it connects to.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    type: "website",
    url: "https://www.evergreenridgetech.com/case-studies",
    title: "Case Studies | Evergreen Ridge Technology",
    description:
      "A closer look at the products we've designed and built — the problem behind each one, how it came together, and the tools it connects to.",
  },
};

const CaseStudiesPage = () => {
  return (
    <>
      <PageIntro
        eyebrow="Case studies"
        title="The thinking behind the software."
      >
        <p>
          Every project starts with a problem someone was working around by
          hand. These write-ups walk through what that problem was, the
          decisions we made while building, and the tools each product connects
          to once it&apos;s live.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <div className="grid gap-8">
          {caseStudies.map((study) => (
            <FadeIn key={study.slug}>
              <article className="overflow-hidden rounded-4xl border border-border bg-card">
                <div className="grid items-center gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-16">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      {study.role} · {study.platform}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                      <Link
                        href={study.href}
                        className="transition hover:text-primary"
                      >
                        {study.name}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-2xl text-base/7 text-muted-foreground">
                      {study.summary}
                    </p>
                    <ul
                      role="list"
                      className="mt-6 flex flex-wrap gap-3"
                      aria-label={`${study.name} focus areas`}
                    >
                      {study.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={study.href}
                      className="mt-8 inline-flex rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      Read the case study
                    </Link>
                  </div>

                  <div className="mx-auto w-full max-w-[14rem] rounded-[2.5rem] border border-border bg-background p-2 shadow-[0_20px_60px_rgba(15,61,46,0.12)]">
                    <div className="overflow-hidden rounded-[2rem]">
                      <Image
                        src={study.image}
                        alt={study.imageAlt}
                        sizes="(min-width: 1024px) 14rem, 60vw"
                        className="h-auto w-full"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-12 text-base text-muted-foreground">
            More case studies are on the way as current projects go live. In the
            meantime,{" "}
            <Link
              href="/work"
              className="font-semibold text-foreground underline underline-offset-4"
            >
              see the rest of our delivery experience
            </Link>
            .
          </p>
        </FadeIn>
      </Container>

      <ContactSection />
    </>
  );
};

export default CaseStudiesPage;
