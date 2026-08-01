import PageIntro from "@/components/PageIntro";
import EstimatorWizard from "@/components/estimator/EstimatorWizard";
import ContactSection from "@/components/ContactSection";
import React from "react";

export const metadata = {
  title: "Cost Estimator",
  description:
    "Get an instant, non-binding draft estimate for your web, mobile, or SaaS project — emailed straight to your inbox.",
};

const CostEstimatorPage = () => {
  return (
    <>
      <PageIntro eyebrow="Cost Estimator" title="Get a draft estimate in minutes">
        <p>
          Answer a few questions about your project and we&apos;ll email you an
          instant, non-binding draft estimate — no obligation, no waiting.
        </p>
      </PageIntro>

      <EstimatorWizard />

      <ContactSection />
    </>
  );
};

export default CostEstimatorPage;
