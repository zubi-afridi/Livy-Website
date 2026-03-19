"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Container from "@/components/common/Container";
import FooterLanding from "@/components/layout/FooterLanding";
import { Booking } from "@/components/bookings/types";
import BookingTabs from "@/components/bookings/BookingTabs";
import BookingList from "@/components/bookings/BookingList";

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

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
      <Header />

      <div className="h-16 md:h-0 mt-0 md:mt-14"></div>

      <Container className="flex-1 py-6 md:py-12">
        <h1 className="text-xl lg:text-3xl font-bold font-manrope text-primary-grey md:text-3xl mb-6 md:mb-8">
          Bookings
        </h1>

        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <BookingList bookings={activeBookings} />
      </Container>

      <div className="h-20 md:h-0"></div>

      <FooterLanding />
    </div>
  );
};

export default BookingsPage;
