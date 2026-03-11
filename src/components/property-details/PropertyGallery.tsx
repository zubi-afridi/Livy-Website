"use client";
import Image from "next/image";
import Container from "../common/Container";
const PropertyGallery = () => {
  return (
    <Container className="mt-8 mb-12">
      <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 h-64 sm:h-100 md:h-125 lg:h-150 relative">
        <div className="col-span-12 sm:col-span-5 relative h-full">
          <Image
            src="/images/bedroom-1.png"
            alt="Property Main View"
            fill
            className="rounded-2xl sm:rounded-3xl object-cover"
            priority
          />
        </div>
        <div className="hidden sm:flex col-span-3 flex-col gap-3 md:gap-4 h-full">
          <div className="relative flex-1">
            <Image
              src="/images/bedroom-2.png"
              alt="Bedroom View"
              fill
              className="rounded-3xl object-cover"
            />
          </div>
          <div className="relative flex-1">
            <Image
              src="/images/bedroom-2.png"
              alt="Living Room"
              fill
              className="rounded-3xl object-cover"
            />
          </div>
        </div>
        <div className="hidden sm:block col-span-4 relative h-full">
          <Image
            src="/images/bedroom-4.png"
            alt="Window View"
            fill
            className="rounded-3xl object-cover"
          />
        </div>
      </div>
    </Container>
  );
};

export default PropertyGallery;
