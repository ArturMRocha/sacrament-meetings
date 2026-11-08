import { notFound } from "next/navigation";

import { MeetingDetail } from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

async function getMeeting(id: string): Promise<SacramentMeeting> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const response = await fetch(new URL(`/api/meetings/${id}`, baseUrl), {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch the meeting detail");
  }

  return (await response.json()) as SacramentMeeting;
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  return <MeetingDetail meeting={meeting} />;
}
