"use client";

import { useState, useRef, useCallback } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Booking } from "./types";
import BookingCard from "./BookingCard";

interface BookingListProps {
  bookings: Booking[];
}

const BookingList = ({ bookings }: BookingListProps) => {
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

  return (
    <>
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
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};

export default BookingList;
