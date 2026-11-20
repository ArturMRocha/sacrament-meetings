"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.max(totalPages, 1);
  const currentPage = Math.min(Math.max(requestedPage, 1), pageCount);

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-5">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm text-slate-400" aria-disabled="true">
          Previous
        </span>
      )}
      <span className="text-sm font-medium text-slate-700" aria-live="polite">
        Page {currentPage} of {pageCount}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm text-slate-400" aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}