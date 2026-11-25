import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

export const SESSION_COOKIE_NAME = "sm_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

type SessionPayload = {
  username: string;
  expiresAt: number;
};

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured.");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

function encodePayload(payload: SessionPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodePayload(encoded: string): SessionPayload | null {
  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;

    if (
      typeof parsed.username !== "string" ||
      typeof parsed.expiresAt !== "number"
    ) {
      return null;
    }

    return { username: parsed.username, expiresAt: parsed.expiresAt };
  } catch {
    return null;
  }
}

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  return timingSafeEqual(aBuffer, bBuffer);
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.BISHOPRIC_USERNAME;
  const expectedPassword = process.env.BISHOPRIC_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return false;
  }

  return (
    safeEqual(username, expectedUsername) &&
    safeEqual(password, expectedPassword)
  );
}

export function createSessionToken(username: string): string {
  const payload: SessionPayload = {
    username,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  const encoded = encodePayload(payload);
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) {
    return null;
  }

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) {
    return null;
  }

  const expectedSignature = sign(encoded);
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  const payload = decodePayload(encoded);
  if (!payload || payload.expiresAt <= Date.now()) {
    return null;
  }

  return payload;
}

export async function getSession(): Promise<SessionPayload | null> {
  await connection();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function createSession(username: string): Promise<void> {
  const token = createSessionToken(username);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}

export async function requireAuth(): Promise<void> {
  const session = await getSession();
  if (!session) {
    throw new Error("Authentication required.");
  }
}
