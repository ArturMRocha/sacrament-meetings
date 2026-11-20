import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Meeting not found</h1>
      <p className="mt-3 text-slate-600">
        This meeting may have been deleted or the link may be incorrect.
      </p>
      <Link
        href="/meetings"
        className="mt-6 inline-flex rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
      >
        Return to meetings
      </Link>
    </div>
  );
}
