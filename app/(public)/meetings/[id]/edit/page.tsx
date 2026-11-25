import { notFound } from "next/navigation";
import { Suspense } from "react";

import { MeetingForm } from "@/components/MeetingForm";
import { MeetingFormFallback } from "@/components/MeetingFormFallback";
import { getMeetingById } from "@/lib/meetings-db";

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

async function EditMeetingContent({ params }: EditMeetingPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  return <MeetingForm meeting={meeting} />;
}

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Edit meeting</h1>
      <Suspense fallback={<MeetingFormFallback />}>
        <EditMeetingContent params={params} />
      </Suspense>
    </section>
  );
}
