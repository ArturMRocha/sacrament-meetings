import Link from "next/link";
import { connection } from "next/server";

import { NavLinks } from "@/components/NavLinks";
import { getSession } from "@/lib/auth";
import { logout } from "@/lib/auth-actions";

export async function Header() {
  await connection();
  const session = await getSession();
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
            Riverside Ward
          </Link>
          <p className="text-sm text-slate-600">{today}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <NavLinks />
          {session ? (
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-emerald-700 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
