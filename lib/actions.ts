"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  addMeeting as addMeetingToDatabase,
  deleteMeeting as deleteMeetingFromDatabase,
  updateMeeting as updateMeetingInDatabase,
} from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

const MeetingFormSchema = z.object({
  date: z.iso.date({ error: "Enter a valid meeting date." }),
  meetingType: z.enum(
    ["testimony", "regular", "stake", "general", "special"],
    { error: "Choose a meeting type." },
  ),
  presiding: z.string().trim().min(1, "Enter who is presiding."),
  conducting: z.string().trim().min(1, "Enter who is conducting."),
  announcements: z.string().max(2000, "Use no more than 2,000 characters."),
  openingHymnNumber: z.coerce.number().int().positive("Enter a hymn number."),
  openingHymnTitle: z.string().trim().min(1, "Enter the opening hymn title."),
  openingPrayer: z.string().trim().min(1, "Enter who will offer the opening prayer."),
  wardBusiness: z.string().max(2000, "Use no more than 2,000 characters."),
  stakeBusiness: z.preprocess((value) => value === "on", z.boolean()),
  sacramentHymnNumber: z.coerce.number().int().positive("Enter a hymn number."),
  sacramentHymnTitle: z.string().trim().min(1, "Enter the sacrament hymn title."),
  speakers: z.string().max(2000, "Use no more than 2,000 characters.").superRefine((value, context) => {
    const lines = value.split("\n").map((line) => line.trim()).filter(Boolean);

    if (lines.some((line) => {
      const [rawName, topic, ...extra] = line.split("|").map((part) => part.trim());
      const name = rawName?.replace(/^musical:\s*/i, "").trim();
      return !name || !topic || extra.length > 0;
    })) {
      context.addIssue({
        code: "custom",
        message: "Enter each person on a new line as Name | Topic, or Musical: Name | Title.",
      });
    }
  }),
  closingHymnNumber: z.coerce.number().int().positive("Enter a hymn number."),
  closingHymnTitle: z.string().trim().min(1, "Enter the closing hymn title."),
  closingPrayer: z.string().trim().min(1, "Enter who will offer the closing prayer."),
});

export type MeetingFormState = {
  message?: string;
  errors?: Partial<
    Record<
      | "date"
      | "meetingType"
      | "presiding"
      | "conducting"
      | "announcements"
      | "openingHymnNumber"
      | "openingHymnTitle"
      | "openingPrayer"
      | "wardBusiness"
      | "stakeBusiness"
      | "sacramentHymnNumber"
      | "sacramentHymnTitle"
      | "speakers"
      | "closingHymnNumber"
      | "closingHymnTitle"
      | "closingPrayer",
      string[]
    >
  >;
};

function getRawFormValues(formData: FormData) {
  return {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.get("announcements"),
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),
    wardBusiness: formData.get("wardBusiness"),
    stakeBusiness: formData.get("stakeBusiness"),
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    speakers: formData.get("speakers"),
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),
  };
}

function toMeeting(values: z.infer<typeof MeetingFormSchema>): Omit<SacramentMeeting, "id"> {
  return {
    date: values.date,
    meetingType: values.meetingType,
    presiding: values.presiding,
    conducting: values.conducting,
    announcements: values.announcements.split("\n").map((line) => line.trim()).filter(Boolean),
    openingHymn: {
      number: values.openingHymnNumber,
      title: values.openingHymnTitle,
    },
    openingPrayer: values.openingPrayer,
    wardBusiness: values.wardBusiness
      .split("\n")
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({ description })),
    stakeBusiness: values.stakeBusiness,
    sacramentHymn: {
      number: values.sacramentHymnNumber,
      title: values.sacramentHymnTitle,
    },
    speakers: values.speakers
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [rawName, topic] = line.split("|").map((part) => part.trim());
        const isMusicalNumber = /^musical:\s*/i.test(rawName);
        const name = isMusicalNumber
          ? rawName.replace(/^musical:\s*/i, "").trim()
          : rawName;
        return {
          name,
          topic,
          type: isMusicalNumber ? "musical-number" as const : "speaker" as const,
        };
      }),
    closingHymn: {
      number: values.closingHymnNumber,
      title: values.closingHymnTitle,
    },
    closingPrayer: values.closingPrayer,
  };
}

export async function createMeeting(
  _previousState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const result = MeetingFormSchema.safeParse(getRawFormValues(formData));

  if (!result.success) {
    return {
      message: "Please correct the highlighted fields.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await addMeetingToDatabase(toMeeting(result.data));
  } catch (error) {
    console.error("Failed to create meeting:", error);
    throw new Error("We couldn't save this meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _previousState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  if (!Number.isSafeInteger(id) || id < 1) {
    return { message: "The meeting ID is invalid. Return to the meeting list." };
  }

  const result = MeetingFormSchema.safeParse(getRawFormValues(formData));

  if (!result.success) {
    return {
      message: "Please correct the highlighted fields.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  let meeting: SacramentMeeting | null;
  try {
    meeting = await updateMeetingInDatabase(id, toMeeting(result.data));
  } catch (error) {
    console.error("Failed to update meeting:", error);
    throw new Error("We couldn't update this meeting. Please try again.");
  }

  if (!meeting) {
    return { message: "This meeting no longer exists. Return to the meeting list." };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = Number(formData.get("meetingId"));
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("The meeting ID is invalid.");
  }

  let deleted: boolean;
  try {
    deleted = await deleteMeetingFromDatabase(id);
  } catch (error) {
    console.error("Failed to delete meeting:", error);
    throw new Error("We couldn't delete this meeting. Please try again.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect(deleted ? "/meetings?notice=deleted" : "/meetings?notice=missing");
}
