import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/builder" className="text-lg font-semibold tracking-tight text-ink">
          Eavyx Landing Builder
        </Link>
        <Link
          href="/builder"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          New project
        </Link>
      </nav>
    </header>
  );
}
