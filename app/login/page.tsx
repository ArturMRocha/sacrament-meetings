import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { LoginForm } from "@/app/login/LoginForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to manage sacrament meeting schedules and details.",
};

type LoginPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function LoginContent({ searchParams }: LoginPageProps) {
  const session = await getSession();
  if (session) {
    redirect("/meetings");
  }

  const params = await searchParams;
  const callbackUrlValue = params.callbackUrl;
  const callbackUrl = Array.isArray(callbackUrlValue)
    ? callbackUrlValue[0] ?? "/meetings"
    : callbackUrlValue ?? "/meetings";

  return <LoginForm callbackUrl={callbackUrl} />;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Bishopric access
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to create, edit, and manage sacrament meeting schedules.
        </p>

        <div className="mt-6">
          <Suspense
            fallback={<p className="text-sm text-slate-500">Loading sign-in form...</p>}
          >
            <LoginContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
