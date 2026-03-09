import React from "react";

interface PropertyAboutProps {
  description: string;
}

const PropertyAbout: React.FC<PropertyAboutProps> = ({ description }) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4 font-manrope">
        About this place
      </h2>
      <p className="text-gray-600 leading-relaxed max-w-2xl font-inter">
        {description}
      </p>
    </div>
  );
};

export default PropertyAbout;
