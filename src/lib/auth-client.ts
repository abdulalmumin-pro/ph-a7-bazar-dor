"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://ph-a7-bazar-dor.vercel.app",
});

export const { signIn, signUp, useSession } = authClient;