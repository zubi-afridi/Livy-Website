"use client";

import { usePathname } from "next/navigation";
import FloatingBtn from "@/components/layout/FloatingBtn";

const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

export default function GlobalFloatingBtn() {
  const pathname = usePathname();

  const hideOnAuthPage = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (hideOnAuthPage) return null;

  return <FloatingBtn />;
}
