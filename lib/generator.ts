import { BrandStyle, SiteInput } from "./types";

const toneByStyle: Record<BrandStyle, { adjective: string; cta: string; voice: string; theme: ThemeClasses }> = {
  Modern: {
    adjective: "streamlined",
    cta: "Book a strategy call",
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
    cta: "Request a private consultation",
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
    cta: "Let’s chat today",
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
    cta: "Get started",
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
    cta: "Claim your free quote",
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
  heroHeadline: string;
  heroSubheadline: string;
  primaryCta: string;
  testimonials: Array<{ quote: string; author: string }>;
  faq: Array<{ question: string; answer: string }>;
  theme: ThemeClasses;
}

export function generateCopy(input: SiteInput): GeneratedCopy {
  const tone = toneByStyle[input.brandStyle];
  const primaryService = input.services[0] ?? "professional services";

  return {
    heroHeadline: `${input.businessName}: ${tone.adjective} ${primaryService} in ${input.city}`,
    heroSubheadline: `Built for people who value ${tone.voice}. We help ${input.city} clients get reliable results with ${input.businessName}.`,
    primaryCta: tone.cta,
    testimonials: [
      {
        quote: `${input.businessName} delivered exactly what they promised. The process was clear and the result felt ${tone.adjective}.`,
        author: `Avery M., ${input.city}`
      },
      {
        quote: `From first contact to final delivery, the team made ${primaryService} simple. Highly recommended.`,
        author: `Jordan P., ${input.city}`
      },
      {
        quote: `I was looking for dependable ${primaryService}, and ${input.businessName} exceeded expectations.`,
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
