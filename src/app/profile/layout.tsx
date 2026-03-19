"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Container from "@/components/common/Container";
import ProfileSidebar from "./ProfileSidebar";
import FooterLanding from "@/components/layout/FooterLanding";
import { RiArrowLeftSLine } from "@remixicon/react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProfileRoot = pathname === "/profile";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="h-16 md:h-0 mt-0 md:mt-14"></div>

      <Container className="flex-1 py-8 md:py-12">
        <div className="hidden md:block">
          <h1 className="text-xl lg:text-3xl font-bold font-manrope text-primary-grey mb-8">
            Profile
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          <div className={`${isProfileRoot ? "block" : "hidden"} md:block`}>
            <ProfileSidebar />
          </div>

          <main
            className={`flex-1 bg-white ${isProfileRoot ? "hidden" : "block"} md:block`}
          >
            {children}
          </main>
        </div>
      </Container>

      <div className="h-20 md:h-0"></div>

      <FooterLanding />
    </div>
  );
}
