"use client";

import Link from "next/link";
import { useMemo } from "react";

import { NavLinks } from "@/components/NavLinks";

export function Header() {
  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    [],
  );

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
            Riverside Ward
          </Link>
          <p className="text-sm text-slate-600">{today}</p>
        </div>

        <NavLinks />
      </div>
    </header>
  );
}
