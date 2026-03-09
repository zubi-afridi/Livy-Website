import React from "react";

const CardSkeleton = () => {
  return (
    <div className="w-65 md:w-full animate-pulse">
      <div className="relative h-49.75 md:h-59.75 overflow-hidden rounded-2xl bg-gray-200">
        <div className="h-full w-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[200%_100%] animate-shimmer" />

        <div className="absolute right-3 top-3">
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
        </div>
      </div>

      <div className="mt-3 flex justify-between items-start">
        <div className="min-w-0 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />

          <div className="mt-1 flex items-baseline gap-2">
            <div className="h-6 bg-gray-200 rounded w-16" />
            <div className="h-3 bg-gray-200 rounded w-12" />
          </div>
        </div>

        <div className="flex items-center gap-1 ml-2">
          <div className="h-3 bg-gray-200 rounded w-8" />
          <div className="w-4 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
