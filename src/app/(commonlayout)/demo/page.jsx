"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DemoPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return <div>hello</div>;
}
