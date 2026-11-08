import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-sky-50 p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Sunday planning
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Prepare a thoughtful sacrament meeting.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Track announcements, speakers, hymns, and business items in one place so ward leaders can focus on the spiritual experience.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/meetings"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              View meeting list
            </Link>
            <Link
              href="/meetings/current"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-100"
            >
              Go to current Sunday
            </Link>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/meeting-hero.svg"
            alt="Illustration of a sacrament meeting agenda and planning board"
            width={1200}
            height={800}
            priority
            className="h-auto w-full rounded-2xl border border-slate-200 bg-white"
          />
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">This week</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">5</p>
          <p className="mt-2 text-slate-600">Scheduled meetings in the planner</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Current service</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">Sunday</p>
          <p className="mt-2 text-slate-600">A single page links the current week agenda.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Ward focus</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">Care</p>
          <p className="mt-2 text-slate-600">Support each agenda item with clarity and accessibility.</p>
        </div>
      </section>
    </div>
  );
}
