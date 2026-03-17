"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import Container from "../common/Container";

const stats = [
  {
    label: "Successful Check-Ins",
    value: "1,000+",
    icon: "/icons/check-in.svg",
  },
  { label: "Happy Guests", value: "400+", icon: "/icons/guests.svg" },
  {
    label: "Smart Home Integrations",
    value: "50+",
    icon: "/icons/smart-home-icon.svg",
  },
  {
    label: "Cities Served in Brazil",
    value: "5+",
    icon: "/icons/cities-icon.svg",
  },
];

const AboutLivy: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();

    setIsPlaying(!isPlaying);
  };

  return (
    <Container>
      <section className="hidden md:block font-sans pt-16 md:pt-40 lg:pt-40 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-12 items-center">
          <div
            className="relative rounded-2xl"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="relative w-full max-w-133.75 mx-auto md:mx-0 aspect-square">
              <Image
                src="/images/bedroom.png"
                alt="Luxury Bedroom"
                priority
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            <div
              className="
                absolute overflow-hidden rounded-2xl shadow-lg
                bottom-4 right-4
                w-55 h-38.75
                md:bottom-6 md:right-0 md:w-66.75 md:h-47.25
                lg:bottom-10 lg:right-0 lg:w-66.75 lg:h-47.25
              "
            >
              <video
                ref={videoRef}
                src="/videos/about-video.mp4"
                muted
                loop
                playsInline
                className="h-full w-full object-cover hidden md:block"
              />

              <button
                onClick={togglePlay}
                className="absolute inset-0 items-center justify-center transition-all duration-300 hidden md:flex group cursor-pointer"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {!isPlaying ? (
                  <Image
                    src="/icons/play-icon.svg"
                    alt="Play"
                    width={50}
                    height={50}
                    priority
                    className="cursor-pointer"
                  />
                ) : (
                  <Image
                    src="/icons/pause-icon.svg"
                    alt="Pause"
                    width={50}
                    height={50}
                    priority
                    className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </button>
            </div>
          </div>

          <div
            className="flex flex-col gap-6 md:gap-3 lg:gap-8 h-full"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div data-aos="fade-up" data-aos-delay="100">
              <h2 className="font-manrope font-bold text-2xl md:text-[32px] lg:text-[36px] leading-[100%] tracking-[0%] text-[#111827] mb-3 md:mb-2 lg:mb-3.5">
                About Livy
              </h2>
              <p className="font-inter font-normal text-[14px] md:text-[14px] lg:text-[16px] leading-5 lg:leading-5.5 tracking-[0%] text-[#6B7280]">
                A smarter way to stay. Livy was created to bring simplicity,
                comfort, and technology together for travelers across Brazil. We
                focus on making your stay smoother—from booking your home to
                unlocking the door with a single tap.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-1 mt-6 md:mt-2 lg:mt-11.25"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 md:p-5.5 lg:p-6 border border-gray-100 rounded-2xl bg-white shadow-sm"
                >
                  <div>
                    <p className="font-manrope font-bold text-[20px] md:text-[23px] lg:text-[24px] leading-[100%] tracking-[0%] text-[#111827] mb-1">
                      {stat.value}
                    </p>
                    <p className="font-inter font-normal text-[12px] md:text-[13px] lg:text-[14px] leading-[100%] tracking-[0%] text-[#9CA3AF]">
                      {stat.label}
                    </p>
                  </div>

                  <div className="relative w-10 h-10 md:w-11.5 md:h-11.5 lg:w-12 lg:h-12">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={24}
                      height={24}
                      className="size-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="100"
              data-aos-offset="0"
              data-aos-anchor-placement="top-bottom"
            >
              <button className="w-full md:w-auto bg-primary hover:bg-[#963333] text-white px-8 md:px-10 lg:px-12 py-4 md:py-4.5 lg:py-5 rounded-xl transition-colors shadow-lg active:scale-95 font-inter font-semibold text-[16px] leading-[100%] tracking-[0%] cursor-pointer">
                Explore Listings
              </button>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutLivy;
