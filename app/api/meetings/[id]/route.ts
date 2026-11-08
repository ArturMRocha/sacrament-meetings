import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return Response.json(
      { error: "Meeting ID must be a valid number." },
      { status: 400 },
    );
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return Response.json(
      { error: `No meeting found for id ${numericId}.` },
      { status: 404 },
    );
  }

  return Response.json(meeting);
}
