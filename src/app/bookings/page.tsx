"use client";

import { useState, useRef, useCallback } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/common/Footer";
import Container from "@/components/common/Container";
import FooterLanding from "@/components/layout/FooterLanding";
import FloatingBtn from "@/components/layout/FloatingBtn";

interface Booking {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  status: string;
  statusColor: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  amount: string;
}

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  const bookings: Booking[] = [
    {
      id: "1",
      title: "Charming Riverfront Apa..",
      location: "In vibrant Vila Velha, Brazil",
      image: "/images/booking-img.png",
      rating: 4.98,
      status: "Reserved",
      statusColor: "text-[#30b0c7]",
      checkIn: "11/09/2025",
      checkOut: "16/10/2025",
      guests: "2 Adult",
      amount: "$112",
    },
    {
      id: "2",
      title: "Charming Riverfront Apa..",
      location: "In vibrant Vila Velha, Brazil",
      image: "/images/booking-img.png",
      rating: 4.98,
      status: "Early check-in pending",
      statusColor: "text-[#FF9500]",
      checkIn: "11/09/2025",
      checkOut: "16/10/2025",
      guests: "2 Adult",
      amount: "$112",
    },
    {
      id: "3",
      title: "Charming Riverfront Apa..",
      location: "In vibrant Vila Velha, Brazil",
      image: "/images/booking-img.png",
      rating: 4.98,
      status: "Ready for check-in",
      statusColor: "text-[#AF52DE]",
      checkIn: "11/09/2025",
      checkOut: "16/10/2025",
      guests: "2 Adult",
      amount: "$112",
    },
    {
      id: "4",
      title: "Charming Riverfront Apa..",
      location: "In vibrant Vila Velha, Brazil",
      image: "/images/booking-img.png",
      rating: 4.98,
      status: "Active",
      statusColor: "text-[#34C759]",
      checkIn: "11/09/2025",
      checkOut: "16/10/2025",
      guests: "2 Adult",
      amount: "$112",
    },
  ];

  const pastBookings: Booking[] = bookings.map((b) => ({
    ...b,
    status: "Completed",
    statusColor: "text-primary-green",
  }));

  const activeBookings = activeTab === "past" ? pastBookings : bookings;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FloatingBtn />
      <Header />

      <div className="h-16 md:h-0 mt-0 md:mt-14"></div>

      <Container className="flex-1 py-6 md:py-12">
        <h1 className="text-xl lg:text-3xl font-bold font-manrope text-primary-grey md:text-3xl mb-6 md:mb-8">
          Bookings
        </h1>

        <div className="flex mb-6 md:mb-14 border-b border-gray-200 md:gap-8">
          <button
            onClick={() => setActiveTab("current")}
            className={`flex-1 md:flex-none pb-3 text-center md:text-left font-manrope font-semibold text-[15px] md:text-base transition-all relative ${
              activeTab === "current"
                ? "text-primary-grey"
                : "text-secondary-text hover:text-primary-grey"
            }`}
          >
            Current
            {activeTab === "current" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 md:flex-none pb-3 text-center md:text-left font-manrope font-semibold text-[15px] md:text-base transition-all relative ${
              activeTab === "past"
                ? "text-primary-grey"
                : "text-[#999999] hover:text-primary-grey"
            }`}
          >
            Past
            {activeTab === "past" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        </div>

        <div className="hidden md:flex justify-end gap-2 mb-4">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`size-8 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors ${
              canScrollLeft
                ? "hover:bg-gray-50 text-primary-grey cursor-pointer"
                : "text-gray-300 cursor-not-allowed opacity-50"
            }`}
          >
            <RiArrowLeftSLine size={20} />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`size-8 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors ${
              canScrollRight
                ? "hover:bg-gray-50 text-primary-grey cursor-pointer"
                : "text-gray-300 cursor-not-allowed opacity-50"
            }`}
          >
            <RiArrowRightSLine size={20} />
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-col gap-6 md:flex-row md:gap-6 md:overflow-x-auto md:pb-4 scrollbar-hide"
        >
          {activeBookings.map((booking) => (
            <div
              key={booking.id}
              className="w-full md:shrink-0 md:w-85 bg-white border border-eb-strokes rounded-2xl p-4 md:p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-3 pb-4 border-b border-eb-strokes mb-3">
                <Image
                  src={booking.image}
                  alt={booking.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-manrope font-medium text-base text-primary-grey truncate">
                    {booking.title}
                  </h3>
                  <p className="font-inter text-sm text-secondary-text mb-1">
                    {booking.location}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-inter font-medium text-sm text-primary-grey">
                      {booking.rating}
                    </span>
                    <Image
                      src="/icons/star.svg"
                      alt="Star"
                      width={12}
                      height={12}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-manrope text-base text-primary-grey font-medium">
                    Status
                  </span>
                  <span
                    className={`font-inter text-sm font-semibold ${booking.statusColor}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-manrope text-base text-primary-grey font-medium">
                    Check-in
                  </span>
                  <span className="font-inter text-sm text-secondary-text">
                    {booking.checkIn}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-manrope text-base text-primary-grey font-medium">
                    Check-out
                  </span>
                  <span className="font-inter text-sm text-secondary-text">
                    {booking.checkOut}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-manrope text-base text-primary-grey font-medium">
                    Guests
                  </span>
                  <span className="font-inter text-sm text-secondary-text">
                    {booking.guests}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-eb-strokes">
                  <span className="font-manrope text-base text-primary-grey font-semibold">
                    Amount
                  </span>
                  <span className="font-manrope text-base font-semibold text-primary-grey">
                    {booking.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div className="h-20 md:h-0"></div>

      <FooterLanding />
    </div>
  );
};

export default BookingsPage;
