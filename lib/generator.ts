import { BrandStyle, SiteInput } from "./types";

const toneByStyle: Record<BrandStyle, { adjective: string; voice: string; theme: ThemeClasses }> = {
  Modern: {
    adjective: "streamlined",
    voice: "smart, clear, and contemporary",
    theme: {
      section: "py-16",
      headline: "text-4xl md:text-6xl font-bold tracking-tight",
      body: "text-lg text-slate-600",
      card: "rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
    }
  },
  Luxury: {
    adjective: "bespoke",
    voice: "elevated, polished, and exclusive",
    theme: {
      section: "py-20",
      headline: "text-4xl md:text-6xl font-semibold tracking-tight",
      body: "text-lg text-slate-700",
      card: "rounded-2xl border border-amber-200/60 bg-white p-7 shadow-soft"
    }
  },
  Friendly: {
    adjective: "welcoming",
    voice: "warm, conversational, and supportive",
    theme: {
      section: "py-16",
      headline: "text-4xl md:text-5xl font-extrabold tracking-tight",
      body: "text-lg text-slate-600",
      card: "rounded-2xl border border-sky-200 bg-white p-6 shadow-soft"
    }
  },
  Minimal: {
    adjective: "focused",
    voice: "concise, intentional, and calm",
    theme: {
      section: "py-14",
      headline: "text-4xl md:text-5xl font-semibold tracking-tight",
      body: "text-base text-slate-600",
      card: "rounded-xl border border-slate-200 bg-white p-5"
    }
  },
  Bold: {
    adjective: "high-impact",
    voice: "confident, energetic, and direct",
    theme: {
      section: "py-16",
      headline: "text-4xl md:text-6xl font-black uppercase tracking-tight",
      body: "text-lg text-slate-700",
      card: "rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-soft"
    }
  }
};

export interface ThemeClasses {
  section: string;
  headline: string;
  body: string;
  card: string;
}

export interface GeneratedCopy {
  eyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCta: string;
  secondaryCta: string;
  howItWorks: Array<{ title: string; description: string }>;
  servicesIntro: string;
  serviceDescriptions: string[];
  testimonials: Array<{ quote: string; author: string }>;
  faq: Array<{ question: string; answer: string }>;
  theme: ThemeClasses;
}

function detectCategory(services: string[]): "food" | "cleaning" | "consulting" | "default" {
  const content = services.join(" ").toLowerCase();

  if (/(food|restaurant|pizza|cafe|café|dining|menu)/.test(content)) {
    return "food";
  }

  if (/(cleaning|cleaner|janitorial|maid|deep clean|housekeeping)/.test(content)) {
    return "cleaning";
  }

  if (/(consulting|consultant|marketing|growth|branding|strategy|agency)/.test(content)) {
    return "consulting";
  }

  return "default";
}

export function generateCopy(input: SiteInput): GeneratedCopy {
  const tone = toneByStyle[input.brandStyle];
  const primaryService = input.services[0] ?? "professional services";
  const category = detectCategory(input.services);

  const ctaByCategory = {
    food: { primary: "Order now", secondary: "View menu" },
    cleaning: { primary: "Get a free quote", secondary: "Schedule cleaning" },
    consulting: { primary: "Book a call", secondary: "See case studies" },
    default: { primary: "Get started", secondary: "Learn more" }
  }[category];

  const heroByCategory = {
    food: {
      eyebrow: "Top-rated local favorite",
      subheadline: `Fast, flavor-packed ${primaryService.toLowerCase()} crafted for ${input.city} locals who want quality without the wait.`,
      servicesIntro: `Freshly prepared offerings designed for busy days, group dinners, and everything in between.`
    },
    cleaning: {
      eyebrow: "Trusted by homes and offices",
      subheadline: `Professional ${primaryService.toLowerCase()} that keeps your space spotless, healthy, and guest-ready across ${input.city}.`,
      servicesIntro: `Detailed cleaning plans tailored to your property, schedule, and quality expectations.`
    },
    consulting: {
      eyebrow: "Built for ambitious teams",
      subheadline: `Strategic ${primaryService.toLowerCase()} that helps ${input.city} businesses grow faster with clear priorities and measurable outcomes.`,
      servicesIntro: `Outcome-focused services that align your brand, funnel, and execution around growth.`
    },
    default: {
      eyebrow: `${input.city} trusted team`,
      subheadline: `Premium ${primaryService.toLowerCase()} delivered with a ${tone.voice} experience for clients who expect dependable results.`,
      servicesIntro: `Purpose-built services designed to help you move faster, perform better, and stay ahead.`
    }
  }[category];

  return {
    eyebrow: heroByCategory.eyebrow,
    heroHeadline: `${input.businessName}: ${tone.adjective} ${primaryService} in ${input.city}`,
    heroSubheadline: heroByCategory.subheadline,
    primaryCta: ctaByCategory.primary,
    secondaryCta: ctaByCategory.secondary,
    howItWorks: [
      {
        title: "Share your goals",
        description: `Tell ${input.businessName} what success looks like and we'll map the right plan for you.`
      },
      {
        title: "Get a tailored plan",
        description: `Receive a focused roadmap with clear deliverables, timelines, and transparent next steps.`
      },
      {
        title: "Launch with confidence",
        description: `Move forward with proactive support and consistent updates from kickoff to completion.`
      }
    ],
    servicesIntro: heroByCategory.servicesIntro,
    serviceDescriptions: input.services.map(
      (service) =>
        `${service} tailored for ${input.city} clients who want faster execution, reliable communication, and premium outcomes.`
    ),
    testimonials: [
      {
        quote: `${input.businessName} delivered exactly what they promised. The process was clear, proactive, and felt truly ${tone.adjective}.`,
        author: `Avery M., ${input.city}`
      },
      {
        quote: `From first contact to final delivery, the team made ${primaryService.toLowerCase()} seamless and easy to trust.`,
        author: `Jordan P., ${input.city}`
      },
      {
        quote: `We needed a partner who could execute without hand-holding. ${input.businessName} exceeded expectations.`,
        author: `Taylor S., ${input.city}`
      }
    ],
    faq: [
      {
        question: `What areas do you serve around ${input.city}?`,
        answer: `${input.businessName} primarily serves ${input.city} and nearby communities with fast and dependable scheduling.`
      },
      {
        question: `How soon can I get started with ${primaryService}?`,
        answer: `Most clients can get started quickly after a short consultation and scope review.`
      },
      {
        question: "What makes your service different?",
        answer: `Our approach is ${tone.voice}, which means every project is tailored to your needs and goals.`
      }
    ],
    theme: tone.theme
  };
}
