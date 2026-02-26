"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const brandStyles = ["Modern", "Luxury", "Friendly", "Minimal", "Bold"] as const;

export default function BuilderPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      businessName: String(formData.get("businessName") ?? ""),
      city: String(formData.get("city") ?? ""),
      services: String(formData.get("services") ?? ""),
      brandStyle: String(formData.get("brandStyle") ?? "Modern"),
      shortDescription: String(formData.get("shortDescription") ?? "")
    };

    const response = await fetch("/api/sites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setError("Could not generate landing page. Check your inputs and try again.");
      setSubmitting(false);
      return;
    }

    const data = (await response.json()) as { id: string };
    router.push(`/site/${data.id}`);
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-ink">AI Landing Page Generator</h1>
        <p className="mt-3 text-slate-600">Fill in your business details to generate a polished, conversion-ready page.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Business name *</span>
            <input name="businessName" required className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-sky-500 focus:ring" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">City *</span>
            <input name="city" required className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-sky-500 focus:ring" />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Services (comma-separated) *</span>
          <input
            name="services"
            required
            placeholder="Web design, SEO, Branding"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-sky-500 focus:ring"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Brand style</span>
          <select name="brandStyle" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-sky-500 focus:ring">
            {brandStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Short description (optional, 200 chars)</span>
          <textarea
            name="shortDescription"
            maxLength={200}
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-sky-500 focus:ring"
          />
        </label>

        {error ? <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Generating..." : "Generate landing"}
        </button>
      </form>
    </section>
  );
}
