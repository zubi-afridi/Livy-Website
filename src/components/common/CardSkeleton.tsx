import React from "react";

const CardSkeleton = () => {
  return (
    <div className="w-65 md:w-full">
      {/* Image Container with Shimmer */}
      <div className="relative h-49.75 md:h-59.75 overflow-hidden rounded-2xl bg-gray-200">
        <div className="h-full w-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[200%_100%] animate-shimmer" />

        {/* Floating Heart Icon Placeholder */}
        <div className="absolute right-3 top-3">
          <div className="w-5 h-5 bg-gray-300/50 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%] animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Info Section - Matches mt-3 flex justify-between items-start */}
      <div className="mt-3 flex justify-between items-start">
        <div className="min-w-0 flex-1">
          {/* Title Placeholder - Uses relative width for better scaling */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%] animate-shimmer" />
          </div>

          {/* Subtitle Placeholder - Uses relative width for better scaling */}
          <div className="h-3.5 bg-gray-200 rounded w-1/2 mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%] animate-shimmer" />
          </div>

          {/* Price Section - Matches font-medium text-lg md:text-[20px] lg:text-[24px] */}
          <div className="mt-1 flex items-baseline gap-2">
            <div className="h-5 md:h-6 bg-gray-200 rounded w-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%] animate-shimmer" />
            </div>
            {/* "/ night" Placeholder */}
            <div className="h-3.5 bg-gray-200 rounded w-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%] animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Rating Section - Matches text-sm font-medium font-inter */}
        <div className="flex items-center gap-1 shrink-0 ml-4">
          <div className="h-3.5 bg-gray-200 rounded w-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%] animate-shimmer" />
          </div>
          {/* Star Icon Placeholder */}
          <div className="w-4 h-4 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%] animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
