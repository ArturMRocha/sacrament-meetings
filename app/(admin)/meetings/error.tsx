"use client";

import { MeetingsError } from "@/components/MeetingsError";

export default function AdminMeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <MeetingsError error={error} reset={reset} />;
}
