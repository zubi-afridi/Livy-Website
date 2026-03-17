"use client";
import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export type Range = { start: Date | null; end: Date | null };

export function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addMonths(d: Date, months: number) {
  return new Date(d.getFullYear(), d.getMonth() + months, 1);
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBeforeDay(a: Date, b: Date) {
  const aa = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const bb = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return aa < bb;
}

export function isAfterDay(a: Date, b: Date) {
  const aa = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const bb = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return aa > bb;
}

export function clampToDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function formatShort(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function formatMonthTitle(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function buildMonthGrid(month: Date) {
  const first = startOfMonth(month);
  const startDay = first.getDay();
  const daysInMonth = new Date(
    first.getFullYear(),
    first.getMonth() + 1,
    0,
  ).getDate();

  const cells: Array<{ date: Date | null }> = [];
  for (let i = 0; i < startDay; i++) cells.push({ date: null });
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(first.getFullYear(), first.getMonth(), day) });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null });
  return cells;
}

export function DateRangeCalendar({
  anchorMonth,
  onPrev,
  onNext,
  range,
  onPick,
  isMobile = false,
  setAnchorMonth,
}: {
  anchorMonth: Date;
  onPrev: () => void;
  onNext: () => void;
  range: Range;
  onPick: (d: Date) => void;
  isMobile?: boolean;
  setAnchorMonth?: (d: Date) => void;
}) {
  const m1 = startOfMonth(anchorMonth);
  const m2 = startOfMonth(addMonths(anchorMonth, 1));
  const currentMonth = startOfMonth(new Date());

  const canGoPrev = m1.getTime() > currentMonth.getTime();

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const [showPicker, setShowPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(anchorMonth.getFullYear());

  const renderMonth = (month: Date, showPrev: boolean, showNext: boolean) => {
    const cells = buildMonthGrid(month);
    const today = clampToDay(new Date());

    return (
      <div className="w-full">
        <div className="flex items-center justify-between px-2 pb-3">
          {showPrev && !isMobile ? (
            <button
              type="button"
              onClick={onPrev}
              className="rounded-md px-2 py-1 text-sm hover:bg-gray-100"
              aria-label="Previous month"
            >
              <HiChevronLeft className="h-4 w-4" />
            </button>
          ) : !isMobile ? (
            <span className="w-7" />
          ) : null}

          <button
            type="button"
            onClick={() => isMobile && setShowPicker(true)}
            className={[
              "font-inter text-base sm:text-[20px] font-medium leading-tight sm:leading-6.5 tracking-[0px] text-gray-900 w-full text-center",
              isMobile
                ? "hover:bg-gray-50 rounded-lg py-1 transition-colors"
                : "",
            ].join(" ")}
          >
            {formatMonthTitle(month)}
          </button>

          {showNext && !isMobile ? (
            <button
              type="button"
              onClick={onNext}
              className="rounded-md px-2 py-1 text-sm hover:bg-gray-100"
              aria-label="Next month"
            >
              <HiChevronRight className="h-4 w-4" />
            </button>
          ) : !isMobile ? (
            <span className="w-7" />
          ) : null}
        </div>

        <div className="grid grid-cols-7 gap-1 px-2 pb-1">
          {weekdays.map((w) => (
            <div
              key={w}
              className="font-inter text-[10px] sm:text-xs font-normal leading-6.5 tracking-[0.3px] text-center text-gray-500"
            >
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 px-2 pb-6">
          {cells.map((cell, idx) => {
            if (!cell.date) return <div key={idx} className="h-9" />;

            const d = clampToDay(cell.date);
            const disabled = isBeforeDay(d, today);

            const inRange =
              range.start &&
              range.end &&
              (isSameDay(d, range.start) ||
                isSameDay(d, range.end) ||
                (isAfterDay(d, range.start) && isBeforeDay(d, range.end)));

            const isStart = range.start && isSameDay(d, range.start);
            const isEnd = range.end && isSameDay(d, range.end);

            return (
              <button
                key={idx}
                type="button"
                disabled={disabled}
                onClick={() => onPick(d)}
                className={[
                  "h-8 w-8 sm:h-10 sm:w-10 font-inter text-xs sm:text-sm font-semibold leading-6.5 tracking-[0.3px] text-center transition flex items-center justify-center mx-auto",
                  disabled
                    ? "cursor-not-allowed text-gray-300"
                    : "hover:bg-gray-100 text-gray-800",
                  inRange && !isStart && !isEnd ? "bg-gray-100/80" : "",
                  isStart || isEnd
                    ? "bg-primary text-white hover:bg-primary rounded-full"
                    : "rounded-full",
                ].join(" ")}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + i,
  );

  if (showPicker && isMobile) {
    return (
      <div className="w-full bg-white rounded-2xl p-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowPicker(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <HiChevronLeft className="h-6 w-6" />
          </button>
          <div className="font-inter text-lg font-semibold">
            Select Month & Year
          </div>
          <div className="w-10" />
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-3 px-1">
              Year
            </div>
            <div className="grid grid-cols-3 gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setPickerYear(y)}
                  className={[
                    "py-2 rounded-lg text-sm font-medium transition",
                    pickerYear === y
                      ? "bg-[#B23B3B] text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500 mb-3 px-1">
              Month
            </div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((m, idx) => (
                <button
                  key={m}
                  onClick={() => {
                    const newDate = new Date(pickerYear, idx, 1);
                    setAnchorMonth?.(newDate);
                    setShowPicker(false);
                  }}
                  className="py-2 rounded-lg bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    const m3 = addMonths(m2, 1);
    return (
      <div className="w-full bg-white rounded-2xl p-2 max-h-112.5 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-4">
          {renderMonth(m1, false, false)}
          <div className="border-t border-gray-100 my-2" />
          {renderMonth(m2, false, false)}
          <div className="border-t border-gray-100 my-2" />
          {renderMonth(m3, false, false)}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-4xl rounded-3xl bg-white p-4 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start justify-center">
        <div className="w-full lg:min-w-75 flex-1">
          {renderMonth(m1, canGoPrev, false)}
        </div>
        <div className="w-full lg:min-w-75 flex-1">
          {renderMonth(m2, false, true)}
        </div>
      </div>
    </div>
  );
}
