import { MeetingCard } from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const response = await fetch(new URL("/api/meetings", baseUrl), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }

  return (await response.json()) as SacramentMeeting[];
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

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
