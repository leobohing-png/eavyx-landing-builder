import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateCopy } from "@/lib/generator";
import { getSiteById } from "@/lib/store";

interface SitePageProps {
  params: { id: string };
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

export default async function SitePage({ params }: SitePageProps) {
  const site = await getSiteById(params.id);

  if (!site) {
    notFound();
  }

  const copy = generateCopy(site.input);

  return (
    <div className="space-y-8">
      <section className={`${copy.theme.section} rounded-3xl bg-gradient-to-br from-white to-slate-100 p-8 md:p-12`}>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{site.input.brandStyle} Brand Experience</p>
        <h1 className={`${copy.theme.headline} mt-4 text-ink`}>{copy.heroHeadline}</h1>
        <p className={`${copy.theme.body} mt-4 max-w-2xl`}>{site.input.shortDescription || copy.heroSubheadline}</p>
        <button className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">{copy.primaryCta}</button>
      </section>

      <section className={copy.theme.section}>
        <h2 className="text-3xl font-bold tracking-tight text-ink">Services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {site.input.services.map((service) => (
            <article key={service} className={copy.theme.card}>
              <h3 className="text-lg font-semibold text-ink">{service}</h3>
              <p className="mt-2 text-sm text-slate-600">Tailored {service.toLowerCase()} solutions for clients in {site.input.city}.</p>
            </article>
          ))}
        </div>
      </section>

      <section className={copy.theme.section}>
        <h2 className="text-3xl font-bold tracking-tight text-ink">Trusted by local clients</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {copy.testimonials.map((item) => (
            <article key={item.author} className={copy.theme.card}>
              <p className="text-slate-700">“{item.quote}”</p>
              <p className="mt-4 text-sm font-medium text-slate-500">{item.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={copy.theme.section}>
        <h2 className="text-3xl font-bold tracking-tight text-ink">FAQ</h2>
        <div className="mt-6 space-y-3">
          {copy.faq.map((item) => (
            <details key={item.question} className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer text-base font-semibold text-ink">{item.question}</summary>
              <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`${copy.theme.section} rounded-3xl border border-slate-200 bg-white p-8`}>
        <h2 className="text-3xl font-bold tracking-tight text-ink">Contact us</h2>
        <p className="mt-2 text-sm text-slate-600">Front-end demo form</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <input placeholder="Name" className="rounded-xl border border-slate-300 px-4 py-3" />
          <input type="email" placeholder="Email" className="rounded-xl border border-slate-300 px-4 py-3" />
          <textarea placeholder="Message" rows={4} className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2" />
          <button type="button" className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
            Send message
          </button>
        </form>
      </section>
    </div>
  );
}
