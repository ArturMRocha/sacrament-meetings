import type { SacramentMeeting } from "@/lib/types";

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = formatDate(meeting.date);

  return (
    <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">{meeting.meetingType}</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Sacrament Meeting</h1>
        <p className="mt-2 text-lg text-slate-600">{formattedDate}</p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Presiding</p>
          <p className="mt-2 text-lg font-medium text-slate-900">{meeting.presiding}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Conducting</p>
          <p className="mt-2 text-lg font-medium text-slate-900">{meeting.conducting}</p>
        </div>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Announcements</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {meeting.announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Opening</h2>
          <div className="mt-3 rounded-2xl bg-slate-50 p-4">
            <p><span className="font-semibold">Hymn:</span> {meeting.openingHymn.number} — {meeting.openingHymn.title}</p>
            <p className="mt-2"><span className="font-semibold">Prayer:</span> {meeting.openingPrayer}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Ward business</h2>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              {meeting.wardBusiness.map((item) => (
                <li key={item.description}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-slate-700">No ward business listed.</p>
          )}
          <p className="mt-3 text-slate-700">
            <span className="font-semibold">Stake business:</span> {meeting.stakeBusiness ? "Yes" : "No"}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Sacrament</h2>
          <p className="mt-3 text-slate-700">
            <span className="font-semibold">Hymn:</span> {meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Speakers</h2>
          {meeting.speakers.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {meeting.speakers.map((item) => (
                <li key={`${item.name}-${item.topic || "musical-number"}`} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  {item.type === "speaker" ? (
                    <p className="mt-1 text-slate-700">Topic: {item.topic}</p>
                  ) : (
                    <p className="mt-1 text-slate-700">Musical number</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-slate-700">No speakers listed.</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Closing</h2>
          <div className="mt-3 rounded-2xl bg-slate-50 p-4">
            <p><span className="font-semibold">Hymn:</span> {meeting.closingHymn.number} — {meeting.closingHymn.title}</p>
            <p className="mt-2"><span className="font-semibold">Prayer:</span> {meeting.closingPrayer}</p>
          </div>
        </section>
      </div>
    </article>
  );
}
