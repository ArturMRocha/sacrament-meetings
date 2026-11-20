"use client";

import { useEffect } from "react";
import Link from "next/link";

export function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Meetings route failed:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">
        We couldn&apos;t load the meetings
      </h1>
      <p className="mt-3 text-slate-600">
        Something went wrong. Please try again or return to the meeting list.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          Back to meetings
        </Link>
      </div>
      <span className="sr-only" aria-live="polite">
        {error.digest ? `Error reference: ${error.digest}` : ""}
      </span>
    </div>
  );
}
