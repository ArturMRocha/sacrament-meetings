import { MeetingCard } from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import Link from "next/link";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const queryValue = params.query;
  const query = Array.isArray(queryValue) ? queryValue[0] ?? "" : queryValue ?? "";
  const pageValue = params.page;
  const noticeValue = params.notice;
  const notice = Array.isArray(noticeValue) ? noticeValue[0] : noticeValue;
  const requestedPage = Number(Array.isArray(pageValue) ? pageValue[0] : pageValue);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? Math.floor(requestedPage)
    : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Upcoming meetings</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Meeting schedule</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <MeetingSearch />
          <Link
            href="/meetings/new"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            Create meeting
          </Link>
        </div>
      </div>

      {notice === "deleted" || notice === "missing" ? (
        <p role="status" aria-live="polite" className="mb-6 rounded-lg bg-emerald-50 p-3 text-emerald-900">
          {notice === "deleted"
            ? "Meeting deleted."
            : "That meeting no longer exists."}
        </p>
      ) : null}

      {meetings.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="border-y border-slate-200 py-10 text-center text-slate-600">
          No meetings match this search.
        </p>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}