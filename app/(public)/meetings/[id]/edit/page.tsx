import { notFound } from "next/navigation";

import { MeetingForm } from "@/components/MeetingForm";
import { getMeetingById } from "@/lib/meetings-db";

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Edit meeting</h1>
      <MeetingForm meeting={meeting} />
    </section>
  );
}
