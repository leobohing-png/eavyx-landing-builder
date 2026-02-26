import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateCopy } from "@/lib/generator";
import { getSiteById } from "@/lib/store";

interface SitePageProps {
  params: { id: string };
}

type IconProps = { className?: string };

function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function BadgeCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 2.4 1.7 2.9-.2 1.3 2.6L21 9l-.7 2.8 1.1 2.7-2 2-2.7 1.1L14 21l-2.8-.7L8.5 21l-2-2-2.7-1.1L3 15l.7-2.8L2.6 9.5l2-2 2.7-1.1L10 3.7 12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 7" />
    </svg>
  );
}

function CompassIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.5 8.5-2.3 6.1-6.1 2.3 2.3-6.1 6.1-2.3Z" />
    </svg>
  );
}

function SparklesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 1.6 3.9L17.5 8 14 9.6 12 14l-2-4.4L6.5 8l3.9-1.1L12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 16 1 2.5L8.5 20 6 21 5 23l-1-2-2.5-1 2.5-1.5L5 16Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 14 .8 2 2.2.8-2 1.2-.7 2-1-2-2-.8 2-.9.7-2.3Z" />
    </svg>
  );
}

function RocketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 4c3 0 6 3 6 6-2.4.3-4.5 1.5-6 3-1.5 1.5-2.7 3.6-3 6-3 0-6-3-6-6 0-2.4 1-4.5 2.5-6S11.6 4 14 4Z" />
      <circle cx="14" cy="10" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 18-3 3m6-1-3 1 1-3" />
    </svg>
  );
}

function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v6c0 4.2 2.8 7.8 7 9 4.2-1.2 7-4.8 7-9V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 12 1.7 1.7 3.4-3.4" />
    </svg>
  );
}

function DollarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 8.8c-.5-.7-1.4-1.1-2.7-1.1-1.7 0-2.8.8-2.8 2s.9 1.8 2.7 2.2c1.8.4 3 .8 3 2.3s-1.4 2.3-3 2.3c-1.5 0-2.6-.5-3.2-1.5" />
      <path strokeLinecap="round" d="M12 6.5v11" />
    </svg>
  );
}

function DashboardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

function MessageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 18v-1.8A7.2 7.2 0 0 1 12.2 9h6.3A2.5 2.5 0 0 1 21 11.5v4A2.5 2.5 0 0 1 18.5 18H9l-4 3Z" />
    </svg>
  );
}

function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.1L12 17.2 6.5 20l1-6.1L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

export async function generateMetadata({ params }: SitePageProps): Promise<Metadata> {
  const site = await getSiteById(params.id);

  if (!site) {
    return {
      title: "Site not found | Eavyx Landing Builder",
      description: "The requested generated site does not exist."
    };
  }

  return {
    title: `${site.input.businessName} | ${site.input.city}`,
    description: `Explore ${site.input.businessName}'s landing page and services in ${site.input.city}.`
  };
}

const stepIcons = [CompassIcon, SparklesIcon, RocketIcon];
const serviceIcons = [BoltIcon, ShieldIcon, DollarIcon, DashboardIcon, MessageIcon, StarIcon];

export default async function SitePage({ params }: SitePageProps) {
  const site = await getSiteById(params.id);

  if (!site) {
    notFound();
  }

  const copy = generateCopy(site.input);
  const serviceList = site.input.services.length > 0 ? site.input.services : ["Core service"];
  const packageTitles = ["Starter", "Popular", "Premium"];
  const packageSubtitles = ["For getting started", "Best for growing teams", "For advanced needs"];

  const packageServices = packageTitles.map((_, index) => {
    const primary = serviceList[index % serviceList.length];
    const secondary = serviceList[(index + 1) % serviceList.length];

    return {
      name: packageTitles[index],
      subtitle: packageSubtitles[index],
      highlight: index === 1,
      bullets: [
        `${primary} strategy and kickoff`,
        `${secondary} execution with expert support`,
        "Weekly progress updates and priority response"
      ]
    };
  });

  return (
    <div className="space-y-20 pb-16 md:space-y-24">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white px-6 py-12 shadow-soft md:px-12 md:py-16">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-100 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {copy.eyebrow}
            </p>
            <h1 className={`${copy.theme.headline} mt-6 text-balance text-ink`}>{copy.heroHeadline}</h1>
            <p className={`${copy.theme.body} mt-5 max-w-xl text-pretty`}>{site.input.shortDescription || copy.heroSubheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                {copy.primaryCta}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
              <button className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                {copy.secondaryCta}
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-900 to-slate-800 p-5 shadow-2xl">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Performance dashboard</p>
                <BadgeCheckIcon className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Leads", "Bookings", "Conversion", "Satisfaction"].map((item, index) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-slate-400">{item}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{["1.2k", "348", "18.6%", "97%"][index]}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-24 rounded-xl bg-gradient-to-r from-cyan-400/20 via-violet-500/20 to-emerald-400/20" />
            </div>
          </div>
        </div>
      </section>

      <section className={copy.theme.section}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">How it works</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">A simple path to better results</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.howItWorks.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];

            return (
              <article key={step.title} className={copy.theme.card}>
                <div className="inline-flex rounded-xl bg-ink/5 p-3 text-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={copy.theme.section}>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Services</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">Premium services built around your goals</h2>
          <p className="mt-4 text-base text-slate-600">{copy.servicesIntro}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {serviceList.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <article key={service} className={`${copy.theme.card} flex h-full flex-col`}>
                <div className="inline-flex w-fit rounded-xl bg-slate-100 p-3 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{service}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{copy.serviceDescriptions[index] ?? copy.servicesIntro}</p>
                <button className="mt-auto pt-6 text-left text-sm font-semibold text-ink">Learn about {service.toLowerCase()} →</button>
              </article>
            );
          })}
        </div>
      </section>

      <section className={copy.theme.section}>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Packages</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">Choose the plan that fits your stage</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {packageServices.map((pkg) => (
            <article
              key={pkg.name}
              className={`flex h-full flex-col rounded-2xl border p-6 ${
                pkg.highlight ? "border-ink bg-ink text-white shadow-xl" : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${pkg.highlight ? "text-white/80" : "text-slate-500"}`}>{pkg.subtitle}</p>
              <h3 className="mt-2 text-2xl font-semibold">{pkg.name}</h3>
              <ul className="mt-6 space-y-3">
                {pkg.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm">
                    <CheckIcon className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.highlight ? "text-cyan-300" : "text-emerald-600"}`} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  pkg.highlight ? "bg-white text-ink hover:bg-slate-100" : "bg-ink text-white hover:opacity-90"
                }`}
              >
                {copy.primaryCta}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={copy.theme.section}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Social proof</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">Trusted by teams across {site.input.city}</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.testimonials.map((item) => (
            <article key={item.author} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-100 blur-2xl" />
              <p className="relative text-sm leading-relaxed text-slate-700">“{item.quote}”</p>
              <p className="relative mt-5 text-sm font-semibold text-ink">{item.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={copy.theme.section}>
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {copy.faq.map((item) => (
            <details key={item.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <summary className="cursor-pointer list-none pr-6 text-base font-semibold text-ink marker:content-none">{item.question}</summary>
              <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="rounded-3xl border border-slate-200 bg-white px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-ink">{site.input.businessName}</p>
            <p className="mt-1 text-sm text-slate-500">Premium experiences for clients in {site.input.city}</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-medium text-slate-600">
            <a className="transition hover:text-ink" href="#">
              Services
            </a>
            <a className="transition hover:text-ink" href="#">
              Packages
            </a>
            <a className="transition hover:text-ink" href="#">
              FAQ
            </a>
            <a className="transition hover:text-ink" href="#">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
