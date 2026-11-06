import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop Thomas Reed",
    conducting: "Brother Daniel Carter",
    announcements: [
      "Ward service project on Saturday at 9:00 a.m.",
      "Temple recommend interviews available after the meeting.",
    ],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Emma Johnson",
    wardBusiness: [{ description: "Sustaining of the new Relief Society president." }],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "Brother Michael Hill",
        topic: "Living the Gospel in Daily Life",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Samuel Green",
  },
  {
    id: 2,
    date: "2026-11-15",
    meetingType: "testimony",
    presiding: "President Laura Evans",
    conducting: "Brother Nathan Cole",
    openingHymn: { number: 132, title: "I Need Thee Every Hour" },
    openingPrayer: "Sister Olivia Price",
    wardBusiness: [
      { description: "Fast offering donations will be collected after the meeting." },
      { description: "Thank you to all youth who helped with the community cleanup." },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: "Jesus, Once of Mortal Race" },
    speakers: [
      {
        name: "Sister Rachel Clark",
        topic: "The blessings of personal scripture study",
        type: "speaker",
      },
      {
        name: "Brother Isaac White",
        topic: "Testimony of the Book of Mormon",
        type: "speaker",
      },
    ],
    closingHymn: { number: 182, title: "Guide Us, O Thou Great Jehovah" },
    closingPrayer: "Brother Marcus Lee",
    announcements: ["Primary activity is scheduled for Friday evening."],
  },
  {
    id: 3,
    date: "2026-11-22",
    meetingType: "stake",
    presiding: "Stake President Wilson",
    conducting: "Elder Benjamin Ross",
    openingHymn: { number: 148, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Sister Hannah Foster",
    wardBusiness: [{ description: "Ward members encouraged to participate in the youth conference." }],
    stakeBusiness: true,
    sacramentHymn: { number: 87, title: "There Is a Green Hill Far Away" },
    speakers: [
      {
        name: "Sister Grace Thompson",
        topic: "Becoming a peacemaker in the home",
        type: "speaker",
      },
      {
        name: "Youth String Ensemble",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: { number: 99, title: "I Stand All Amazed" },
    closingPrayer: "Brother Frank Ward",
    announcements: [
      "Stake conference will be held next Sunday in the stake center.",
      "Missionary fireside is planned for Wednesday.",
    ],
  },
  {
    id: 4,
    date: "2026-11-29",
    meetingType: "general",
    presiding: "Bishop Anthony Foster",
    conducting: "Brother David Young",
    openingHymn: { number: 21, title: "Praise to the Lord, the Almighty" },
    openingPrayer: "Brother Joshua Smith",
    wardBusiness: [{ description: "Review of the ward budget and upcoming unit activities." }],
    stakeBusiness: false,
    sacramentHymn: { number: 200, title: "I Believe in Christ" },
    speakers: [
      {
        name: "Brother Alan Rivera",
        topic: "The joy of service and ministering",
        type: "speaker",
      },
      {
        name: "Sister Morgan Stone",
        topic: "Faith through adversity",
        type: "speaker",
      },
    ],
    closingHymn: { number: 61, title: "O My Father" },
    closingPrayer: "Sister Lila Brooks",
    announcements: ["Ward social night will follow next Sunday after the meeting."],
  },
  {
    id: 5,
    date: "2026-12-06",
    meetingType: "regular",
    presiding: "Bishop Thomas Reed",
    conducting: "Brother Daniel Carter",
    openingHymn: { number: 115, title: "When Faith Endures" },
    openingPrayer: "Brother Kevin Adams",
    wardBusiness: [{ description: "Christmas outreach plans and volunteer sign-ups." }],
    stakeBusiness: false,
    sacramentHymn: { number: 177, title: "Behold the Great Redeemer Die" },
    speakers: [
      {
        name: "Sister Katherine Hall",
        topic: "Finding peace in Christ during busy seasons",
        type: "speaker",
      },
      {
        name: "Primary Children",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: { number: 7, title: "Jesus, the Very Thought of Thee" },
    closingPrayer: "Sister Nora King",
    announcements: ["Holiday food drive collection starts this week."],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
