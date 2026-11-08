import { MeetingCard } from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Upcoming meetings</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Meeting schedule</h1>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
