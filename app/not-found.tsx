import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
      <h1 className="text-3xl font-bold text-ink">Landing page not found</h1>
      <p className="mt-3 text-slate-600">The requested page does not exist or may have been removed.</p>
      <Link href="/builder" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
        Create a new landing page
      </Link>
    </section>
  );
}
