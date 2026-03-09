"use client";

import React, { useState, useEffect, useRef } from "react";
import { HiXMark, HiMinus, HiPlus } from "react-icons/hi2";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const amenitiesOptions = [
  "WiFi",
  "Kitchen",
  "Air Conditioning",
  "Heating",
  "Laundry",
  "TV",
  "Free Parking",
  "Suitable for Events",
  "Fireplace",
  "Smoking Allowed",
  "Elevator in Building",
  "Pet Friendly",
  "Pool",
  "Gym",
];

const propertyTypeOptions = ["House", "Apartment", "Guesthouse", "Hotel"];

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  const [minPrice, setMinPrice] = useState(40);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    [],
  );

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearAll = () => {
    setMinPrice(40);
    setMaxPrice(1000);
    setBedrooms(0);
    setBathrooms(0);
    setSelectedAmenities([]);
    setSelectedPropertyTypes([]);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Slider Logic
  const min = 0;
  const max = 1200;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 100);
    setMaxPrice(value);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 font-inter">
      <div
        className="relative w-full max-w-225 max-h-[95vh] overflow-y-auto rounded-lg md:rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300 scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 sm:px-10 py-3 sm:py-6">
          <h2 className="text-2xl font-bold text-primary-grey font-manrope">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <HiXMark className="h-6 w-6 text-primary-grey" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-10 pb-4 sm:pb-8 space-y-6 sm:space-y-12">
          {/* Price Range */}
          <section>
            <h3 className="text-xl font-bold text-primary-grey mb-10 font-manrope">
              Price Range
            </h3>

            <div className="flex items-center justify-between mb-12">
              <div className="w-31 rounded-2xl border border-eb-strokes px-6 py-4 flex items-center justify-center">
                <span className="text-base font-normal text-secondary-text font-inter">
                  ${minPrice}
                </span>
              </div>
              <div className="w-31 rounded-2xl border border-eb-strokes px-6 py-4 flex items-center justify-center">
                <span className="text-base font-normal text-secondary-text font-inter">
                  ${maxPrice}
                  {maxPrice >= 1000 ? "+" : ""}
                </span>
              </div>
            </div>

            <div className="relative w-full h-8 flex items-center mb-6">
              {/* Slider Track */}
              <div className="absolute w-full h-0.75 bg-gray-100 rounded-full" />

              {/* Slider Active Track */}
              <div
                className="absolute h-0.75 bg-primary rounded-full transition-all"
                style={{
                  left: `${((minPrice - min) / (max - min)) * 100}%`,
                  width: `${((maxPrice - minPrice) / (max - min)) * 100}%`,
                }}
              />

              {/* Range Inputs */}
              <input
                type="range"
                min={min}
                max={max}
                value={minPrice}
                onChange={handleMinChange}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-20
                  [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_4px_10px_rgba(0,0,0,0.15)]
                  [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative"
              />
              <input
                type="range"
                min={min}
                max={max}
                value={maxPrice}
                onChange={handleMaxChange}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-20
                  [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_4px_10px_rgba(0,0,0,0.15)]
                  [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative"
              />
            </div>
          </section>

          <hr className="border-t border-eb-strokes" />

          {/* Bedrooms and Bathrooms */}
          <section>
            <h3 className="text-xl font-bold text-primary-grey mb-8 font-manrope">
              Bedrooms and bathrooms
            </h3>
            <div className="space-y-6">
              {[
                { label: "Bedrooms", value: bedrooms, setter: setBedrooms },
                { label: "Bathrooms", value: bathrooms, setter: setBathrooms },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-primary-grey font-manrope">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => item.setter(Math.max(0, item.value - 1))}
                      className="w-10 h-10 rounded-full border border-eb-strokes flex items-center justify-center text-secondary-text hover:bg-gray-50 transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                      disabled={item.value === 0}
                    >
                      <HiMinus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-primary-grey text-lg font-medium">
                      {item.value}
                    </span>
                    <button
                      onClick={() => item.setter(item.value + 1)}
                      className="w-10 h-10 rounded-full border border-eb-strokes flex items-center justify-center text-secondary-text hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <HiPlus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-t border-eb-strokes" />

          {/* Amenities */}
          <section>
            <h3 className="text-xl font-bold text-primary-grey mb-8 font-manrope">
              Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
              {amenitiesOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`
                    size-5 rounded border-2 flex items-center justify-center transition-all
                    ${selectedAmenities.includes(amenity) ? "bg-primary border-primary" : "border-primary"}
                  `}
                  >
                    {selectedAmenities.includes(amenity) && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span className="text-base text-secondary-text font-inter truncate">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <hr className="border-t border-eb-strokes" />

          {/* Property Type */}
          <section>
            <h3 className="text-xl font-bold text-primary-grey mb-8 font-manrope">
              Property Type
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 pb-10">
              {propertyTypeOptions.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`
                    size-5 rounded border-2 flex items-center justify-center transition-all
                    ${selectedPropertyTypes.includes(type) ? "bg-primary border-primary" : "border-primary"}
                  `}
                  >
                    {selectedPropertyTypes.includes(type) && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedPropertyTypes.includes(type)}
                    onChange={() => togglePropertyType(type)}
                  />
                  <span className="text-base text-secondary-text font-inter truncate">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-between border-t border-eb-strokes bg-white px-4 py-3 sm:px-10 sm:py-6">
          <button
            onClick={handleClearAll}
            className="text-lg font-semibold sm:font-bold text-primary-grey hover:opacity-80 transition-opacity font-manrope cursor-pointer"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-primary px-3 sm:px-9 py-2 sm:py-3 text-base sm:text-lg font-semibold sm:font-bold text-white hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-primary/20 font-manrope cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
