import { Suspense } from "react";

import { MeetingForm } from "@/components/MeetingForm";
import { MeetingFormFallback } from "@/components/MeetingFormFallback";

export default function NewMeetingPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Create meeting</h1>
      <Suspense fallback={<MeetingFormFallback />}>
        <MeetingForm />
      </Suspense>
    </section>
  );
}