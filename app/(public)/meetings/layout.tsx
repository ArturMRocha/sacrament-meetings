import type { ReactNode } from "react";

export default function MeetingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Meeting resources</p>
          <p className="mt-1 text-slate-600">Review the upcoming agenda, current Sunday schedule, and meeting details.</p>
        </div>
      </div>
      {children}
    </div>
  );
}