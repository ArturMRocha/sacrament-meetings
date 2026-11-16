import { Suspense } from "react";
import { notFound } from "next/navigation";

import { MeetingDetail } from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

type MeetingDetailPageProps = {
  params: Promise<{ id: string }>;
};

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