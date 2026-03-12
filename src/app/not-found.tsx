"use client";

import Link from "next/link";
import { Home, MoveLeft } from "lucide-react";
import FloatingBtn from "@/components/layout/FloatingBtn";

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="h-screen w-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 font-sans selection:bg-primary/20 space-y-2">
      <div className="flex flex-col items-center text-center max-w-lg px-6 w-full h-full justify-center ">
        <h1
          className="text-[120px] md:text-[150px] font-bold text-[#B63E41] font-manrope leading-none"
          data-aos="zoom-in"
        >
          404
        </h1>

        <h2
          className="text-2xl md:text-3xl font-semibold text-[#262626] font-manrope"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Page Not Found
        </h2>
        <p
          className="text-base text-[#666] font-inter max-w-sm mx-auto mt-2"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto my-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 font-sans w-full sm:w-auto"
            data-aos="fade-right"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>

          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 bg-white border border-[#ebebeb] hover:bg-[#f9f9f9] text-[#262626] px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer active:scale-95 font-sans w-full sm:w-auto"
            data-aos="fade-left"
          >
            <MoveLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <span className="text-secondary-text text-sm font-inter">
            You might be looking for:
          </span>
          <div className="flex gap-4">
            <Link
              href="/"
              className="text-primary hover:opacity-85 text-sm font-medium font-inter"
            >
              Home
            </Link>
            <Link
              href="/bookings"
              className="text-primary hover:opacity-85 text-sm font-medium font-inter"
            >
              Bookings
            </Link>
            <Link
              href="/profile"
              className="text-primary hover:opacity-85 text-sm font-medium font-inter"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
      <FloatingBtn />
    </div>
  );
}
