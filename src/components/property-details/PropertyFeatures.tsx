import React from "react";

interface Feature {
  icon: React.ReactNode;
  label: string;
}

interface PropertyFeaturesProps {
  features: Feature[];
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features }) => {
  return (
    <div className="flex flex-wrap gap-8 py-6 border-y border-gray-100 mb-8">
      {features.map((feat, i) => (
        <div
          key={i}
          className="flex items-center gap-2 text-gray-600 font-medium"
        >
          {feat.icon}
          <span className="text-sm">{feat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PropertyFeatures;
