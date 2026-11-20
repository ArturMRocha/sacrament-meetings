"use client";

import { MeetingsError } from "@/components/MeetingsError";

export default function MeetingsErrorBoundary(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <MeetingsError {...props} />;
}
