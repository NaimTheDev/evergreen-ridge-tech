import homeDashboard from "@/images/case-studies/connectly/home-dashboard.png";
import featuresStep from "@/images/case-studies/app-cost-estimator/features-step.png";

export const caseStudies = [
  {
    slug: "connectly",
    name: "Connectly",
    href: "/case-studies/connectly",
    summary:
      "A mentorship app where finding the right mentor and getting on their calendar happens in the same place — no back-and-forth messages, no scheduling links lost in a thread.",
    role: "Product design & full build",
    platform: "iOS & Android",
    tags: ["Mobile app", "Scheduling", "Messaging", "In-house product"],
    image: homeDashboard,
    imageAlt:
      "The Connectly home screen showing featured mentors and an upcoming call",
  },
  {
    slug: "app-cost-estimator",
    name: "App Cost Estimator",
    href: "/case-studies/app-cost-estimator",
    summary:
      "A tool that reads a project described in plain English and returns an itemized estimate — hours and cost on every line, including the work most quotes forget to charge for.",
    role: "Product design & full build",
    platform: "Web app",
    tags: ["Web product", "AI/LLM", "Estimating", "In-house product"],
    image: featuresStep,
    imageAlt:
      "The App Cost Estimator features step, where each feature shows its own hour figure",
  },
];

export default caseStudies;
