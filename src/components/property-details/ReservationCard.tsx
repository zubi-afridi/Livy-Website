import React from "react";
import { ChevronRight } from "lucide-react";
import { Range, formatShort } from "@/components/common/Calendar";

interface ReservationCardProps {
  title: string;
  location: string;
  price: number;
  range: Range;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  title,
  location,
  price,
  range,
}) => {
  return (
    <div className="sticky top-32 bg-white border border-gray-100 shadow-xl rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary-grey mb-1 font-manrope">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{location}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-manrope">${price}</span>
          <span className="text-gray-500 text-sm font-inter">For 2 nights</span>
        </div>
      </div>

      <div className="border border-secondary-text rounded-xl overflow-hidden mb-6">
        <div className="flex border-b border-secondary-text">
          <div className="flex-1 p-3 border-r border-secondary-text cursor-pointer hover:bg-gray-50 transition-colors">
            <label className="block font-medium text-primary-grey mb-1 font-inter">
              Check In
            </label>
            <span className="text-sm font-inter text-gray-600">
              {range.start ? formatShort(range.start) : "Add date"}
            </span>
          </div>
          <div className="flex-1 p-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <label className="block font-medium text-primary-grey mb-1 font-inter">
              Check Out
            </label>
            <span className="text-sm font-inter text-gray-600">
              {range.end ? formatShort(range.end) : "Add date"}
            </span>
          </div>
        </div>
        <div className="p-3 cursor-pointer hover:bg-gray-50 transition-colors relative">
          <label className="block font-medium text-primary-grey mb-1 font-inter">
            Guests
          </label>
          <div className="flex justify-between items-center">
            <span className="text-sm font-inter text-gray-600">2 Guests</span>
            <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
          </div>
        </div>
      </div>

      <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg mb-4 hover:bg-[#963333] transition-colors shadow-lg shadow-red-100 active:scale-[0.98]">
        Reserve
      </button>
      <p className="text-center text-sm text-gray-400 font-inter">
        You will not be charged yet
      </p>
    </div>
  );
};

export default ReservationCard;
