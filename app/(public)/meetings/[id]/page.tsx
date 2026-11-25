import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { MeetingDetail } from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

type MeetingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MeetingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const meetingId = Number(id);

  if (!/^\d+$/.test(id) || !Number.isSafeInteger(meetingId) || meetingId < 1) {
    return {
      title: "Meeting not found",
      description: "The requested sacrament meeting could not be found.",
    };
  }

  const meeting = await getMeetingById(meetingId);
  if (!meeting) {
    return {
      title: "Meeting not found",
      description: "The requested sacrament meeting could not be found.",
    };
  }

  return {
    title: `Meeting on ${meeting.date}`,
    description: `Sacrament meeting agenda for ${meeting.date}, presided by ${meeting.presiding}.`,
  };
}

async function MeetingDetailContent({ params }: MeetingDetailPageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}

export default function MeetingDetailPage({
  params,
}: MeetingDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-6 py-10 text-slate-600">
          Loading meeting...
        </div>
      }
    >
      <MeetingDetailContent params={params} />
    </Suspense>
  );
}