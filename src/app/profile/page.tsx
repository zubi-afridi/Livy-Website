"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileRoot() {
  const router = useRouter();

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      router.replace("/profile/personal-information");
    }
  }, [router]);

  return <div />;
}
