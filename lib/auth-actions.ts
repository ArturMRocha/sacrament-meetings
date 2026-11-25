"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createSession, deleteSession, verifyCredentials } from "@/lib/auth";

const LoginSchema = z.object({
  username: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
  callbackUrl: z.string().optional(),
});

export type LoginFormState = {
  message?: string;
  errors?: {
    username?: string[];
    password?: string[];
  };
};

function getSafeCallbackUrl(callbackUrl: string | undefined): string {
  if (!callbackUrl || !callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
    return "/meetings";
  }
  return callbackUrl;
}

export async function authenticate(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const result = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    callbackUrl: formData.get("callbackUrl"),
  });

  if (!result.success) {
    return {
      message: "Please correct the highlighted fields.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password, callbackUrl } = result.data;

  if (!verifyCredentials(username, password)) {
    return {
      message: "Invalid username or password.",
    };
  }

  await createSession(username);
  redirect(getSafeCallbackUrl(callbackUrl));
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
