import React from "react";
import { Share, Heart } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  location: string;
  liked: boolean;
  onLikeToggle: () => void;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  title,
  location,
  liked,
  onLikeToggle,
}) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary-grey mb-2">
          {title}
        </h1>
        <p className="text-gray-500 font-medium">{location}</p>
      </div>
      <div className="flex gap-4">
        <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
          <Share className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={onLikeToggle}
          className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : "text-gray-700"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PropertyHeader;
