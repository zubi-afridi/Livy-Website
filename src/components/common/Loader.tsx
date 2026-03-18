"use client";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/70 backdrop-blur-xl transition-all duration-300">
      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner Container */}
        <div className="relative h-28 w-28 md:h-32 md:w-32">
          {/* Outer Shimmering Ring */}
          <div className="absolute inset-0 rounded-full border border-primary/10"></div>

          {/* Main Spinning Border */}
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>

          {/* Secondary Spinning Border (Reverse) */}
          <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-primary-blue/30 animate-spin-reverse delay-150"></div>

          {/* Logo Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-14 w-14 md:h-16 md:w-16 animate-pulse-slow">
              <Image
                src="/icons/logo.svg"
                alt="Livy Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center">
          <span className="font-inter text-primary text-2xl font-bold uppercase tracking-[0.2em] mt-1">
            Loading...
          </span>
        </div>

        {/* Floating background blobs for extra premium feel */}
        <div className="absolute -z-10 h-64 w-64 rounded-full bg-primary/5 blur-[80px] animate-pulse"></div>
        <div className="absolute -z-10 h-64 w-64 rounded-full bg-primary-blue/5 blur-[80px] animate-pulse delay-700 translate-x-12 translate-y-12"></div>
      </div>
    </div>
  );
};

export default Loader;
