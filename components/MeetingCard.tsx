import Link from "next/link";

import { deleteMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
          {meeting.meetingType}
        </span>
        <time dateTime={meeting.date} className="text-sm font-medium text-slate-500">
          {formatDate(meeting.date)}
        </time>
      </div>

      <h2 className="text-xl font-semibold text-slate-900">{meeting.presiding}</h2>
      <p className="mt-2 text-sm text-slate-600">Conducting: {meeting.conducting}</p>
      <p className="mt-1 text-sm text-slate-600">
        Opening hymn: {meeting.openingHymn.number} — {meeting.openingHymn.title}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
        <span className="text-sm text-slate-500">
          {meeting.speakers.length} speaker{meeting.speakers.length === 1 ? "" : "s"}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/meetings/${meeting.id}`}
            className="inline-flex items-center rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
          >
            View agenda
          </Link>
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="inline-flex items-center rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            Edit
          </Link>
          <form action={deleteMeeting}>
            <input type="hidden" name="meetingId" value={meeting.id} />
            <button
              type="submit"
              aria-label={`Delete meeting on ${formatDate(meeting.date)}`}
              className="inline-flex items-center rounded-full border border-red-300 px-3 py-2 text-sm font-medium text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
