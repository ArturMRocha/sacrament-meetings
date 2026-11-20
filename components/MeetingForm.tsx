"use client";

import { useActionState, useState } from "react";

import { createMeeting, updateMeeting } from "@/lib/actions";
import type { MeetingFormState } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

type MeetingFormProps = {
  meeting?: SacramentMeeting;
};

type MeetingFormValues = {
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;
  announcements: string;
  openingHymnNumber: string;
  openingHymnTitle: string;
  openingPrayer: string;
  wardBusiness: string;
  stakeBusiness: boolean;
  sacramentHymnNumber: string;
  sacramentHymnTitle: string;
  speakers: string;
  closingHymnNumber: string;
  closingHymnTitle: string;
  closingPrayer: string;
};

type FieldName = NonNullable<MeetingFormState["errors"]> extends infer Errors
  ? keyof Errors
  : never;

const initialState: MeetingFormState = {};
const inputClassName =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100";

function FieldError({
  id,
  name,
  errors,
}: {
  id: string;
  name: FieldName;
  errors: MeetingFormState["errors"];
}) {
  return (
    <p id={id} aria-live="polite" className="mt-1 min-h-5 text-sm text-red-700">
      {errors?.[name]?.join(" ")}
    </p>
  );
}

function getInitialValues(meeting?: SacramentMeeting): MeetingFormValues {
  return {
    date: meeting?.date ?? "",
    meetingType: meeting?.meetingType ?? "regular",
    presiding: meeting?.presiding ?? "",
    conducting: meeting?.conducting ?? "",
    announcements: meeting?.announcements?.join("\n") ?? "",
    openingHymnNumber: String(meeting?.openingHymn.number ?? ""),
    openingHymnTitle: meeting?.openingHymn.title ?? "",
    openingPrayer: meeting?.openingPrayer ?? "",
    wardBusiness: meeting?.wardBusiness.map((item) => item.description).join("\n") ?? "",
    stakeBusiness: meeting?.stakeBusiness ?? false,
    sacramentHymnNumber: String(meeting?.sacramentHymn.number ?? ""),
    sacramentHymnTitle: meeting?.sacramentHymn.title ?? "",
    speakers: meeting?.speakers
      .map((speaker) => `${speaker.type === "musical-number" ? "Musical: " : ""}${speaker.name} | ${speaker.topic}`)
      .join("\n") ?? "",
    closingHymnNumber: String(meeting?.closingHymn.number ?? ""),
    closingHymnTitle: meeting?.closingHymn.title ?? "",
    closingPrayer: meeting?.closingPrayer ?? "",
  };
}

export function MeetingForm({ meeting }: MeetingFormProps) {
  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [values, setValues] = useState(() => getInitialValues(meeting));

  function updateValue<Key extends keyof MeetingFormValues>(
    name: Key,
    value: MeetingFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.message ? (
        <p
          aria-live="polite"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-800"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="font-medium text-slate-800">
            Meeting date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={values.date}
            onChange={(event) => updateValue("date", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.date)}
            aria-describedby="date-error"
            className={inputClassName}
          />
          <FieldError id="date-error" name="date" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="meetingType" className="font-medium text-slate-800">
            Meeting type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            required
            value={values.meetingType}
            onChange={(event) => updateValue("meetingType", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.meetingType)}
            aria-describedby="meetingType-error"
            className={inputClassName}
          >
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
          <FieldError id="meetingType-error" name="meetingType" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="presiding" className="font-medium text-slate-800">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            required
            value={values.presiding}
            onChange={(event) => updateValue("presiding", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.presiding)}
            aria-describedby="presiding-error"
            className={inputClassName}
          />
          <FieldError id="presiding-error" name="presiding" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="conducting" className="font-medium text-slate-800">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            required
            value={values.conducting}
            onChange={(event) => updateValue("conducting", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.conducting)}
            aria-describedby="conducting-error"
            className={inputClassName}
          />
          <FieldError id="conducting-error" name="conducting" errors={state.errors} />
        </div>
      </div>

      <div>
        <label htmlFor="announcements" className="font-medium text-slate-800">
          Announcements (one per line)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          value={values.announcements}
          onChange={(event) => updateValue("announcements", event.currentTarget.value)}
          aria-invalid={Boolean(state.errors?.announcements)}
          aria-describedby="announcements-error"
          className={inputClassName}
        />
        <FieldError id="announcements-error" name="announcements" errors={state.errors} />
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-3 text-lg font-semibold text-slate-900">
          Opening
        </legend>
        <div>
          <label htmlFor="openingHymnNumber" className="font-medium text-slate-800">
            Opening hymn number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            step="1"
            required
            value={values.openingHymnNumber}
            onChange={(event) => updateValue("openingHymnNumber", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.openingHymnNumber)}
            aria-describedby="openingHymnNumber-error"
            className={inputClassName}
          />
          <FieldError id="openingHymnNumber-error" name="openingHymnNumber" errors={state.errors} />
        </div>
        <div>
          <label htmlFor="openingHymnTitle" className="font-medium text-slate-800">
            Opening hymn title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            required
            value={values.openingHymnTitle}
            onChange={(event) => updateValue("openingHymnTitle", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.openingHymnTitle)}
            aria-describedby="openingHymnTitle-error"
            className={inputClassName}
          />
          <FieldError id="openingHymnTitle-error" name="openingHymnTitle" errors={state.errors} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="openingPrayer" className="font-medium text-slate-800">
            Opening prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            required
            value={values.openingPrayer}
            onChange={(event) => updateValue("openingPrayer", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.openingPrayer)}
            aria-describedby="openingPrayer-error"
            className={inputClassName}
          />
          <FieldError id="openingPrayer-error" name="openingPrayer" errors={state.errors} />
        </div>
      </fieldset>

      <div>
        <label htmlFor="wardBusiness" className="font-medium text-slate-800">
          Ward business (one item per line)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={3}
          value={values.wardBusiness}
          onChange={(event) => updateValue("wardBusiness", event.currentTarget.value)}
          aria-invalid={Boolean(state.errors?.wardBusiness)}
          aria-describedby="wardBusiness-error"
          className={inputClassName}
        />
        <FieldError id="wardBusiness-error" name="wardBusiness" errors={state.errors} />
      </div>

      <div>
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          checked={values.stakeBusiness}
          onChange={(event) => updateValue("stakeBusiness", event.currentTarget.checked)}
          aria-invalid={Boolean(state.errors?.stakeBusiness)}
          aria-describedby="stakeBusiness-error"
          className="size-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
        />
        <label htmlFor="stakeBusiness" className="ml-2 font-medium text-slate-800">
          Include stake business
        </label>
        <FieldError id="stakeBusiness-error" name="stakeBusiness" errors={state.errors} />
      </div>

      <div>
        <label htmlFor="speakers" className="font-medium text-slate-800">
          Speakers (one per line: Name | Topic, or Musical: Name | Title)
        </label>
        <textarea
          id="speakers"
          name="speakers"
          rows={4}
          value={values.speakers}
          onChange={(event) => updateValue("speakers", event.currentTarget.value)}
          aria-invalid={Boolean(state.errors?.speakers)}
          aria-describedby="speakers-error"
          className={inputClassName}
        />
        <FieldError id="speakers-error" name="speakers" errors={state.errors} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sacramentHymnNumber" className="font-medium text-slate-800">
            Sacrament hymn number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="1"
            step="1"
            required
            value={values.sacramentHymnNumber}
            onChange={(event) => updateValue("sacramentHymnNumber", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.sacramentHymnNumber)}
            aria-describedby="sacramentHymnNumber-error"
            className={inputClassName}
          />
          <FieldError id="sacramentHymnNumber-error" name="sacramentHymnNumber" errors={state.errors} />
        </div>
        <div>
          <label htmlFor="sacramentHymnTitle" className="font-medium text-slate-800">
            Sacrament hymn title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            required
            value={values.sacramentHymnTitle}
            onChange={(event) => updateValue("sacramentHymnTitle", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.sacramentHymnTitle)}
            aria-describedby="sacramentHymnTitle-error"
            className={inputClassName}
          />
          <FieldError id="sacramentHymnTitle-error" name="sacramentHymnTitle" errors={state.errors} />
        </div>
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-3 text-lg font-semibold text-slate-900">
          Closing
        </legend>
        <div>
          <label htmlFor="closingHymnNumber" className="font-medium text-slate-800">
            Closing hymn number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            step="1"
            required
            value={values.closingHymnNumber}
            onChange={(event) => updateValue("closingHymnNumber", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.closingHymnNumber)}
            aria-describedby="closingHymnNumber-error"
            className={inputClassName}
          />
          <FieldError id="closingHymnNumber-error" name="closingHymnNumber" errors={state.errors} />
        </div>
        <div>
          <label htmlFor="closingHymnTitle" className="font-medium text-slate-800">
            Closing hymn title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            required
            value={values.closingHymnTitle}
            onChange={(event) => updateValue("closingHymnTitle", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.closingHymnTitle)}
            aria-describedby="closingHymnTitle-error"
            className={inputClassName}
          />
          <FieldError id="closingHymnTitle-error" name="closingHymnTitle" errors={state.errors} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="closingPrayer" className="font-medium text-slate-800">
            Closing prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            required
            value={values.closingPrayer}
            onChange={(event) => updateValue("closingPrayer", event.currentTarget.value)}
            aria-invalid={Boolean(state.errors?.closingPrayer)}
            aria-describedby="closingPrayer-error"
            className={inputClassName}
          />
          <FieldError id="closingPrayer-error" name="closingPrayer" errors={state.errors} />
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : meeting ? "Save changes" : "Create meeting"}
        </button>
      </div>
    </form>
  );
}
