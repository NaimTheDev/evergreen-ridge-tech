// Deterministic PERT-based estimation engine. Ported from the O/M/P hour table and
// multiplier rules previously encoded in a GPT-4 prompt in the scopecraft project,
// reimplemented as plain math so it runs client-side with no AI call or API key.

export const HOURLY_RATE = 125;

// feature key -> [optimistic, mostLikely, pessimistic] baseline hours
export const FEATURES = [
  { key: "authentication", label: "Authentication", omp: [8, 15, 25] },
  { key: "adminDashboard", label: "Admin Dashboard", omp: [12, 20, 35] },
  { key: "notifications", label: "Notifications", omp: [4, 8, 15] },
  { key: "calendarIntegration", label: "Calendar Integration", omp: [6, 12, 20] },
  { key: "settingsProfile", label: "Settings / Profile Page", omp: [5, 10, 18] },
  { key: "onboardingFlow", label: "Onboarding Flow", omp: [3, 6, 12] },
  { key: "reusableUiSystem", label: "Reusable UI System", omp: [8, 12, 20] },
  { key: "mobileResponsiveness", label: "Mobile Responsiveness", omp: [3, 5, 10] },
  { key: "paymentIntegration", label: "Payment Integration", omp: [8, 16, 28] },
  { key: "searchFunctionality", label: "Search Functionality", omp: [4, 8, 16] },
  { key: "userManagement", label: "User Management", omp: [6, 12, 20] },
  { key: "dataImportExport", label: "Data Import / Export", omp: [5, 10, 18] },
  { key: "emailSystem", label: "Email System", omp: [4, 8, 15] },
  { key: "fileUpload", label: "File Upload", omp: [3, 6, 12] },
  { key: "reportingDashboard", label: "Reporting Dashboard", omp: [8, 15, 25] },
];

export const PROJECT_TYPES = [
  { key: "webApp", label: "Web App" },
  { key: "mobileApp", label: "Mobile App" },
  { key: "landingPage", label: "Landing Page" },
  { key: "saasDashboard", label: "SaaS Dashboard" },
];

export const COMPLEXITY_LEVELS = [
  { key: "simple", label: "Simple", description: "Few moving parts, standard patterns.", multiplier: [1, 1, 1] },
  { key: "medium", label: "Medium", description: "Multiple integrations or custom flows.", multiplier: [1.2, 1.3, 1.4] },
  { key: "high", label: "High", description: "Complex logic, heavy integrations, or novel tech.", multiplier: [1.5, 1.7, 2.0] },
];

export const TIMELINE_OPTIONS = [
  { key: "rush", label: "Rush (< 2 weeks)", description: "Tight turnaround — pessimistic hours increase." },
  { key: "standard", label: "Standard (2–8 weeks)", description: "Typical pace — no adjustment." },
  { key: "flexible", label: "Flexible (8+ weeks)", description: "Room to breathe — optimistic hours decrease." },
];

export const BUDGET_RANGES = [
  { key: "starter", label: "Starter ($2,000 – $5,000)" },
  { key: "professional", label: "Professional ($5,000 – $15,000)" },
  { key: "enterprise", label: "Enterprise ($15,000 – $50,000)" },
  { key: "custom", label: "Custom / not sure yet" },
];

const roundToHalf = (n) => Math.round(n * 2) / 2;

const formatCurrency = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

function applyComplexity([o, m, p], complexityKey) {
  const level = COMPLEXITY_LEVELS.find((c) => c.key === complexityKey) ?? COMPLEXITY_LEVELS[0];
  const [mo, mm, mp] = level.multiplier;
  return [o * mo, m * mm, p * mp];
}

function applyTimeline([o, m, p], timelineKey) {
  if (timelineKey === "rush") return [o, m, p * 1.5];
  if (timelineKey === "flexible") return [o * 0.9, m, p];
  return [o, m, p];
}

function expectedHours([o, m, p]) {
  return roundToHalf((o + 4 * m + p) / 6);
}

/**
 * @param {{ features: string[], complexity: string, timeline: string, hourlyRate?: number }} input
 */
export function calculateEstimate({ features, complexity, timeline, hourlyRate = HOURLY_RATE }) {
  const breakdown = features.map((key) => {
    const feature = FEATURES.find((f) => f.key === key);
    if (!feature) return null;
    const withComplexity = applyComplexity(feature.omp, complexity);
    const withTimeline = applyTimeline(withComplexity, timeline);
    const hours = expectedHours(withTimeline);
    return { key, label: feature.label, hours, cost: hours * hourlyRate };
  }).filter(Boolean);

  if (breakdown.length === 0) {
    return {
      breakdown,
      bufferLines: [],
      totalHours: 0,
      totalCost: 0,
      totalCostLow: 0,
      totalCostHigh: 0,
      hourlyRate,
      formatCurrency,
    };
  }

  const featureHours = breakdown.reduce((sum, item) => sum + item.hours, 0);

  const discoveryHours = 8;
  const qaHours = roundToHalf(featureHours * 0.2);
  const pmHours = roundToHalf(featureHours * 0.1);
  const deploymentHours = 8;

  const bufferLines = [
    { key: "discovery", label: "Discovery & Requirements", hours: discoveryHours },
    { key: "qa", label: "QA & Testing", hours: qaHours },
    { key: "pm", label: "Project Management", hours: pmHours },
    { key: "deployment", label: "Deployment & Launch", hours: deploymentHours },
  ].map((line) => ({ ...line, cost: line.hours * hourlyRate }));

  const preContingencyHours = featureHours + bufferLines.reduce((sum, l) => sum + l.hours, 0);
  const contingencyHours = roundToHalf(preContingencyHours * 0.1);
  bufferLines.push({
    key: "contingency",
    label: "Contingency Buffer",
    hours: contingencyHours,
    cost: contingencyHours * hourlyRate,
  });

  const totalHours = preContingencyHours + contingencyHours;
  const totalCost = totalHours * hourlyRate;

  return {
    breakdown,
    bufferLines,
    totalHours,
    totalCost,
    totalCostLow: Math.round(totalCost * 0.85),
    totalCostHigh: Math.round(totalCost * 1.15),
    hourlyRate,
    formatCurrency,
  };
}

export { formatCurrency };
