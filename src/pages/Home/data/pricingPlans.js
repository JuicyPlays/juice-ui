export const sharedFeatures = [
  "AI-generated +EV slips — just click and bet",
  "Juicy Screen — live line discrepancy alerts",
  "Slip Generator with optimized parlays",
  "Real-time esports prop coverage",
];

export const pricingPlans = [
  {
    name: "Bi-Weekly",
    label: null,
    labelColor: null,
    subtitle: "Flexible short-term access",
    price: "19.99",
    originalPrice: null,
    period: "/ 2 weeks",
    discount: null,
    featured: false,
    checkoutUrl:
      import.meta.env.VITE_WHOP_CHECKOUT_BIWEEKLY ||
      "https://whop.com/checkout/plan_wZ7lvQANDaJfm",
    ctaText: "Select Plan",
  },
  {
    name: "Monthly",
    label: "MOST POPULAR",
    labelColor: "#6366f1",
    subtitle: "Our most popular choice",
    price: "29.99",
    originalPrice: "49.99",
    period: "/ month",
    discount: "40% off",
    featured: true,
    checkoutUrl:
      import.meta.env.VITE_WHOP_CHECKOUT_MONTHLY ||
      "https://whop.com/checkout/plan_eTvnZxV1Mxi4w",
    ctaText: "Start Winning Now",
  },
  {
    name: "Annual",
    label: "BEST VALUE",
    labelColor: "#10b981",
    subtitle: "Maximum savings, full commitment",
    price: "249",
    originalPrice: "599",
    period: "/ year",
    discount: "58% off",
    featured: false,
    checkoutUrl:
      import.meta.env.VITE_WHOP_CHECKOUT_YEARLY ||
      "https://whop.com/checkout/plan_yUCMmCIrbzdAL",
    ctaText: "Select Plan",
  },
];
