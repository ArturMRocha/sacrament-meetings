export function MeetingFormFallback() {
  return (
    <div
      aria-busy="true"
      className="min-h-[140rem] sm:min-h-[104rem]"
    >
      <p role="status" className="text-slate-600">
        Loading meeting form...
      </p>
    </div>
  );
}
