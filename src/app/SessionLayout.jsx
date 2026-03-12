"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Wrap children components in SessionProvider
 * Any page using `useSession()` MUST be inside this
 */
export default function SessionLayout({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
