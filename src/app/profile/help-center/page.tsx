import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

export default function HelpCenterPage() {
  return (
    <div>
      <div className="md:hidden flex flex-col gap-6 mb-8 mt-2">
        <Link
          href="/profile"
          className="size-10 bg-white border border-eb-strokes rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <RiArrowLeftLine className="size-6 text-primary-grey" />
        </Link>
        <h2 className="text-2xl font-bold font-manrope text-primary-grey leading-none">
          Help Center
        </h2>
      </div>

      <h2 className="hidden md:block text-[22px] font-semibold font-manrope text-primary-grey leading-none mb-6">
        Help Center
      </h2>

      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 font-inter text-lg">
          Help Center - Coming Soon
        </p>
      </div>
    </div>
  );
}
