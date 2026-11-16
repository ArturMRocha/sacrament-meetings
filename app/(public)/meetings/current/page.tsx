'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CurrentMeetingPage() {
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const sunday = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() - today.getUTCDay(),
      ),
    );
    const sundayDate = sunday.toISOString().slice(0, 10);

    fetch(`/api/meetings?date=${encodeURIComponent(sundayDate)}`)
      .then((response) => response.json())
      .then((meetings) => {
        const [meeting] = meetings;
        router.replace(meeting ? `/meetings/${meeting.id}` : "/meetings");
      })
      .catch(() => {
        router.replace("/meetings");
      });
  }, [router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-slate-600 sm:px-6 lg:px-8">
      Loading current meeting...
    </div>
  );
}