import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query = "",
  currentPage = 1,
  date?: string | null,
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const page = Number.isFinite(currentPage)
    ? Math.max(1, Math.floor(currentPage))
    : 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE (${date ?? null}::text IS NULL OR to_char(date, 'YYYY-MM-DD') = ${date ?? null})
      AND (
        presiding ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm}
      )
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query = ""): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) AS count
    FROM meetings
    WHERE presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting(
  data: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${JSON.stringify(data.announcements ?? [])}::jsonb,
      ${JSON.stringify(data.openingHymn)}::jsonb,
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)}::jsonb,
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)}::jsonb,
      ${JSON.stringify(data.speakers)}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb,
      ${data.closingPrayer}
    )
    RETURNING id
  `;

  const meeting = await getMeetingById(Number(rows[0]?.id));
  if (!meeting) {
    throw new Error("The new meeting could not be loaded after saving.");
  }

  return meeting;
}

export async function updateMeeting(
  id: number,
  updates: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    UPDATE meetings
    SET
      date = ${updates.date},
      meeting_type = ${updates.meetingType},
      presiding = ${updates.presiding},
      conducting = ${updates.conducting},
      announcements = ${JSON.stringify(updates.announcements ?? [])}::jsonb,
      opening_hymn = ${JSON.stringify(updates.openingHymn)}::jsonb,
      opening_prayer = ${updates.openingPrayer},
      ward_business = ${JSON.stringify(updates.wardBusiness)}::jsonb,
      stake_business = ${updates.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(updates.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(updates.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(updates.closingHymn)}::jsonb,
      closing_prayer = ${updates.closingPrayer}
    WHERE id = ${id}
    RETURNING id
  `;

  if (!rows[0]) {
    return null;
  }

  return getMeetingById(id);
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}
