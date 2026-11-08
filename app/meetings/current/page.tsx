"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getMeetings } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    const sundayDate = [
      sunday.getFullYear(),
      String(sunday.getMonth() + 1).padStart(2, "0"),
      String(sunday.getDate()).padStart(2, "0"),
    ].join("-");
    const matchingMeeting = getMeetings(sundayDate)[0];

    if (!matchingMeeting) {
      router.replace("/meetings");
      return;
    }

    router.replace(`/meetings/${matchingMeeting.id}`);
  }, [router]);

  return null;
}
