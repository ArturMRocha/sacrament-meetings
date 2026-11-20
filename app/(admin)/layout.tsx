import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Meeting administration
        </p>
        {children}
      </div>
    </div>
  );
}