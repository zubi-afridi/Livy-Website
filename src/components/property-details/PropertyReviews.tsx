import React from "react";
import { Star } from "lucide-react";

interface Review {
  name: string;
  date: string;
  comment: string;
  avatar: string;
}

interface PropertyReviewsProps {
  reviews: Review[];
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ reviews }) => {
  return (
    <div className="mt-20 pt-20 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 font-manrope">
        Our Guests Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
        {reviews.map((rev, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 shadow-sm border border-gray-200 overflow-hidden">
                <img
                  src={`https://i.pravatar.cc/150?u=${rev.name}`}
                  alt={rev.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm font-manrope">
                  {rev.name}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-black text-black" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium font-inter">
                    {rev.date}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed font-inter line-clamp-4">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyReviews;
