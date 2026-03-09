import React from "react";

interface Amenity {
  icon: React.ReactNode;
  label: string;
}

interface PropertyAmenitiesProps {
  amenities: Amenity[];
}

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities }) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6 font-manrope">
        What this place offers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
        {amenities.map((amenity, i) => (
          <div key={i} className="flex items-center gap-4 text-gray-700">
            {amenity.icon}
            <span className="text-base font-inter">{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;
