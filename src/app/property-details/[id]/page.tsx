"use client";
import Header from "@/components/layout/Header";
import TravelSearchBar from "@/components/layout/TravelSearchBar";
import PropertyGallery from "@/components/property-details/PropertyGallery";
import React, { useState } from "react";
import {
  Bed,
  Bath,
  Square,
  Warehouse,
  Wifi,
  Wind,
  DoorOpen,
  Tv,
  Utensils,
  Refrigerator,
  Laptop,
  Table,
  Car,
} from "lucide-react";

import Footer from "@/components/layout/FooterLanding";
import Container from "@/components/common/Container";
import {
  Range,
  addMonths,
  isBeforeDay,
  startOfMonth,
} from "@/components/common/Calendar";

import PropertyHeader from "@/components/property-details/PropertyHeader";
import PropertyFeatures from "@/components/property-details/PropertyFeatures";
import PropertyAbout from "@/components/property-details/PropertyAbout";
import PropertyAmenities from "@/components/property-details/PropertyAmenities";
import PropertyCalendar from "@/components/property-details/PropertyCalendar";
import ReservationCard from "@/components/property-details/ReservationCard";
import PropertyReviews from "@/components/property-details/PropertyReviews";
import PropertyMap from "@/components/property-details/PropertyMap";

const PropertyDetailsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = React.use(params);
  const [liked, setLiked] = useState(false);
  const now = new Date();
  const [range, setRange] = useState<Range>({
    start: now,
    end: addMonths(now, 1),
  });
  const [anchorMonth, setAnchorMonth] = useState<Date>(startOfMonth(now));

  const onPickDate = (d: Date) => {
    setRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: d, end: null };
      }
      if (isBeforeDay(d, prev.start)) {
        return { start: d, end: null };
      }
      return { start: prev.start, end: d };
    });
  };

  const property = {
    title: "Cozy Downtown Studio",
    location: "In vibrant Vila Velha, Brazil",
    price: 56,
    rating: 4.85,
    reviews: 124,
    features: [
      { icon: <Bed className="w-5 h-5" />, label: "Bed: 1" },
      { icon: <Bath className="w-5 h-5" />, label: "Baths: 1" },
      { icon: <Square className="w-5 h-5" />, label: "Sqft: 1150" },
      { icon: <Warehouse className="w-5 h-5" />, label: "Garage: Solo" },
    ],
    amenities: [
      { icon: <Wifi className="w-5 h-5" />, label: "Wifi" },
      { icon: <Wind className="w-5 h-5" />, label: "Heating" },
      { icon: <DoorOpen className="w-5 h-5" />, label: "Auto door lock" },
      { icon: <Tv className="w-5 h-5" />, label: "TV" },
      { icon: <Wind className="w-5 h-5" />, label: "Ceiling Fan" },
      { icon: <Utensils className="w-5 h-5" />, label: "Kitchen" },
      { icon: <Refrigerator className="w-5 h-5" />, label: "Freezer" },
      { icon: <Laptop className="w-5 h-5" />, label: "Workspace" },
      { icon: <Table className="w-5 h-5" />, label: "Terrace" },
      { icon: <Car className="w-5 h-5" />, label: "Free Parking" },
      { icon: <Table className="w-5 h-5" />, label: "Dining Table" },
    ],
    description:
      "This cozy downtown studio is located in the heart of Vila Velha, Brazil. Enjoy easy access to the beach, local restaurants, and vibrant nightlife. Perfect for solo travelers or couples seeking a comfortable and convenient stay.",
  };

  const reviews = [
    {
      name: "Dakota Hayes",
      date: "1 week ago",
      comment:
        "This studio was absolutely perfect for my trip! It was clean, stylish, and had everything I needed. The location was amazing, with easy access to all the best spots in Vila Velha. I especially appreciated the comfortable bed and the well-equipped kitchen. Highly recommend!",
      avatar: "M",
    },
    {
      name: "Finley Scott",
      date: "2 weeks ago",
      comment:
        "I had a fantastic stay! The apartment was spacious and beautifully decorated. The host was very welcoming and provided great recommendations for local restaurants. Will definitely return!",
      avatar: "A",
    },
    {
      name: "Emerson Blake",
      date: "1 month ago",
      comment:
        "Great experience overall! The beach was just a short walk away, and the amenities in the apartment made my vacation so much easier. The outdoor space was a lovely bonus.",
      avatar: "C",
    },
    {
      name: "Rowan Mitchell",
      date: "3 weeks ago",
      comment:
        "This place exceeded my expectations! It was modern and very well maintained. The neighborhood felt safe and vibrant. I loved the coffee shop just around the corner.",
      avatar: "F",
    },
    {
      name: "Parker Collins",
      date: "4 weeks ago",
      comment:
        "I enjoyed my stay here. It was peaceful and perfect for relaxation. The furnishings were comfortable, and the Wi-Fi was fast, which was a plus for working remotely.",
      avatar: "J",
    },
    {
      name: "Logan Carter",
      date: "5 weeks ago",
      comment:
        "Absolutely loved this spot! The view from the balcony was breathtaking, especially during sunsets. The host was attentive and made sure I had everything I needed. Would recommend to friends!",
      avatar: "L",
    },
  ];

  return (
    <>
      <Header />
      <div className="pt-12 sm:pt-8 md:pt-30">
        <TravelSearchBar />
      </div>
      <div className="mt-26 sm:mt-32 md:mt-30">
        <PropertyGallery />
      </div>
      <div className="min-h-screen bg-white font-manrope">
        <div>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <PropertyHeader
                  title={property.title}
                  location={property.location}
                  liked={liked}
                  onLikeToggle={() => setLiked(!liked)}
                />

                <PropertyFeatures features={property.features} />

                <PropertyAbout description={property.description} />

                <PropertyAmenities amenities={property.amenities} />

                <PropertyCalendar
                  anchorMonth={anchorMonth}
                  onPrev={() => setAnchorMonth((m) => addMonths(m, -1))}
                  onNext={() => setAnchorMonth((m) => addMonths(m, 1))}
                  range={range}
                  onPick={onPickDate}
                />
              </div>

              <div className="lg:col-span-1">
                <ReservationCard
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  range={range}
                />
              </div>
            </div>

            <PropertyReviews reviews={reviews} />

            <PropertyMap />
          </Container>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PropertyDetailsPage;
