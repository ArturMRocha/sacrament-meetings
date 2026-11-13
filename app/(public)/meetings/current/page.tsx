import { redirect } from "next/navigation";

import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  const today = new Date();
  const sunday = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - today.getUTCDay(),
    ),
  );
  const sundayDate = sunday.toISOString().slice(0, 10);
  const [meeting] = await getMeetings("", 1, sundayDate);

  if (!meeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${meeting.id}`);
}