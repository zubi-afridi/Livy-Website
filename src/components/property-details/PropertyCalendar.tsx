import React from "react";
import { DateRangeCalendar, Range } from "@/components/common/Calendar";

interface PropertyCalendarProps {
  anchorMonth: Date;
  range: Range;
  onPrev: () => void;
  onNext: () => void;
  onPick: (d: Date) => void;
}

const PropertyCalendar: React.FC<PropertyCalendarProps> = ({
  anchorMonth,
  range,
  onPrev,
  onNext,
  onPick,
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6 font-manrope">
        Check-in Check-out
      </h2>
      <DateRangeCalendar
        anchorMonth={anchorMonth}
        onPrev={onPrev}
        onNext={onNext}
        range={range}
        onPick={onPick}
      />
    </div>
  );
};

export default PropertyCalendar;
