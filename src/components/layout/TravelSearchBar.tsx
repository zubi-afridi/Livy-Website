"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  HiChevronLeft,
  HiChevronRight,
  HiMinus,
  HiPlus,
  HiMagnifyingGlass,
  HiXMark,
  HiAdjustmentsHorizontal,
} from "react-icons/hi2";
import Link from "next/link";
import FilterModal from "./FilterModal";

import {
  DateRangeCalendar,
  Range,
  startOfMonth,
  addMonths,
  isBeforeDay,
  formatShort,
} from "@/components/common/Calendar";

const TravelSearchBar = ({
  showFilters = false,
}: {
  showFilters?: boolean;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const guestsWrapRef = useRef<HTMLDivElement>(null);

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const [dateOpen, setDateOpen] = useState(false);
  const calendarWrapRef = useRef<HTMLDivElement>(null);

  const [guestsOpen, setGuestsOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [range, setRange] = useState<Range>({ start: null, end: null });
  const [anchorMonth, setAnchorMonth] = useState<Date>(
    startOfMonth(new Date()),
  );

  const items = useMemo(
    () => [
      { label: "Nearby", type: "nearby", iconPath: "/icons/Nearby.svg" },
      { label: "Tokyo", type: "place", iconPath: "/icons/Location.svg" },
      { label: "Bali", type: "place", iconPath: "/icons/Location.svg" },
      { label: "Santorini", type: "place", iconPath: "/icons/Location.svg" },
      { label: "Barcelona", type: "place", iconPath: "/icons/Location.svg" },
      { label: "Marrakech", type: "place", iconPath: "/icons/Location.svg" },
      { label: "Tokyo", type: "place", iconPath: "/icons/Location.svg" },
      { label: "Queenstown", type: "place", iconPath: "/icons/Location.svg" },
    ],
    [],
  );

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (wrapRef.current && !wrapRef.current.contains(target)) {
        setOpen(false);
      }

      if (
        calendarWrapRef.current &&
        !calendarWrapRef.current.contains(target)
      ) {
        setDateOpen(false);
      }

      if (guestsWrapRef.current && !guestsWrapRef.current.contains(target)) {
        setGuestsOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDateOpen(false);
        setGuestsOpen(false);
        setIsMobileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileModalOpen]);

  const handlePick = (item: {
    label: string;
    type: string;
    iconPath: string;
  }) => {
    if (item.type !== "nearby") {
      setDestination(item.label);
      setOpen(false);
    } else {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    setActiveIndex(-1);
  };

  const onPickDate = (d: Date) => {
    setRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: d, end: null };
      }

      if (isBeforeDay(d, prev.start)) {
        return { start: d, end: null };
      }

      const next = { start: prev.start, end: d };
      setDateOpen(false);
      return next;
    });
  };

  const dateLabel =
    range.start && range.end
      ? `${formatShort(range.start)} — ${formatShort(range.end)}`
      : "Check-in — Checkout";

  const totalGuests = adults + children + infants;
  const guestLabel =
    totalGuests > 0
      ? `${totalGuests} Guest${totalGuests > 1 ? "s" : ""}`
      : "Add number of Guests";

  return (
    <>
      <div
        className="absolute z-10 w-full bg-gray-50 sm:py-10 py-5 block md:hidden font-inter"
        data-aos="zoom-in"
        data-aos-duration="800"
        data-aos-delay="100"
      >
        <div className="mx-auto w-full px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileModalOpen(true)}
              className="flex-1"
            >
              <div className="w-full rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-1 ring-gray-200 px-6 py-3">
                <div className="flex items-center gap-3 justify-center">
                  <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
                  <span className="text-base font-medium text-gray-700">
                    Start Searching
                  </span>
                </div>
              </div>
            </button>
            {showFilters && (
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="w-12 h-12 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-1 ring-gray-200 flex items-center justify-center transition hover:bg-gray-50 active:scale-95"
              >
                <HiAdjustmentsHorizontal className="h-6 w-6 text-gray-700" />
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden overflow-y-auto">
          <div className="min-h-screen flex flex-col">
            <div className="flex items-center justify-end p-4 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Close"
              >
                <HiXMark className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <button
                  type="button"
                  onClick={() => setOpen((s) => !s)}
                  className="w-full text-left"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-primary font-manrope">
                      Where to?
                    </label>
                    <span className="text-sm text-gray-500 font-inter">
                      {destination || "Search destination"}
                    </span>
                  </div>
                </button>

                {open && (
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full rounded-lg border border-primary px-4 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      {items.map((item, idx) => (
                        <button
                          key={`${item.label}-${idx}`}
                          type="button"
                          onClick={() => {
                            setDestination(item.label);
                            setOpen(false);
                          }}
                          className="w-full flex items-center gap-3  py-2 hover:bg-gray-50 rounded-lg transition"
                        >
                          <div>
                            <Image
                              src={item.iconPath}
                              alt={item.label}
                              width={32}
                              height={32}
                            />
                          </div>
                          <span className="font-inter text-base font-normal text-gray-700">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <button
                  type="button"
                  onClick={() => setDateOpen((s) => !s)}
                  className="w-full text-left"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-primary font-manrope">
                      Dates?
                    </label>
                    <span className="text-sm text-gray-500 font-inter">
                      {dateLabel}
                    </span>
                  </div>
                </button>

                {dateOpen && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="w-full">
                      <DateRangeCalendar
                        anchorMonth={anchorMonth}
                        onPrev={() => setAnchorMonth((m) => addMonths(m, -1))}
                        onNext={() => setAnchorMonth((m) => addMonths(m, 1))}
                        range={range}
                        onPick={onPickDate}
                        isMobile={true}
                        setAnchorMonth={setAnchorMonth}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <button
                  type="button"
                  onClick={() => setGuestsOpen((s) => !s)}
                  className="w-full text-left"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-primary font-manrope">
                      Guests
                    </label>
                    <span className="text-sm text-gray-500 font-inter">
                      {guestLabel}
                    </span>
                  </div>
                </button>

                {guestsOpen && (
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="font-manrope text-sm font-medium text-gray-900">
                          Adults
                        </div>
                        <div className="font-manrope text-xs text-gray-500">
                          Ages 14 or above
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults((a) => Math.max(0, a - 1))}
                          className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                          disabled={adults === 0}
                        >
                          <HiMinus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="w-6 text-center font-inter text-sm text-gray-900">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults((a) => a + 1)}
                          className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                        >
                          <HiPlus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="font-manrope text-sm font-medium text-gray-900">
                          Children
                        </div>
                        <div className="font-manrope text-xs text-gray-500">
                          Age 0 to 13
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildren((c) => Math.max(0, c - 1))}
                          className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                          disabled={children === 0}
                        >
                          <HiMinus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="w-6 text-center font-inter text-sm text-gray-900">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildren((c) => c + 1)}
                          className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                        >
                          <HiPlus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="font-manrope text-sm font-medium text-gray-900">
                          Infants
                        </div>
                        <div className="font-manrope text-xs text-gray-500">
                          Under 2
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setInfants((i) => Math.max(0, i - 1))}
                          className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                          disabled={infants === 0}
                        >
                          <HiMinus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="w-6 text-center font-inter text-sm text-gray-900">
                          {infants}
                        </span>
                        <button
                          type="button"
                          onClick={() => setInfants((i) => i + 1)}
                          className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                        >
                          <HiPlus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDestination("");
                    setRange({ start: null, end: null });
                    setAdults(0);
                    setChildren(0);
                    setInfants(0);
                  }}
                  className="flex-1 px-6 py-3 font-inter text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition border border-gray-300"
                >
                  Clear all
                </button>
                <Link
                  href="/search"
                  className="flex-1 px-6 py-3 font-inter text-base font-medium text-white bg-primary hover:bg-[#963333] rounded-lg transition text-center"
                  onClick={() => setIsMobileModalOpen(false)}
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="absolute z-10 w-full bg-gray-50 font-sans pb-5 hidden md:block"
        data-aos="zoom-in"
        data-aos-duration="800"
        data-aos-delay="100"
      >
        <div className="mx-auto w-full max-w-241.25 px-4">
          <div className="flex items-center gap-4">
            <div className={`relative flex-1 ${showFilters ? "" : "w-full"}`}>
              <div
                className="
                  w-full rounded-xl bg-white
                  shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                  ring-1 ring-eb-strokes
                  px-3 py-3 
                "
              >
                <div className="flex items-stretch gap-3 md:gap-0">
                  <div
                    ref={wrapRef}
                    className={[
                      "relative flex-1 px-5 py-2",
                      "cursor-pointer transition-all",
                      open
                        ? "z-20 bg-gray-50 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/10"
                        : "hover:bg-gray-50 hover:rounded-lg hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:ring-1 hover:ring-black/5",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen((s) => !s)}
                      className="w-full text-left"
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-base font-medium leading-none tracking-normal font-[Manrope] text-primary">
                          Where to?
                        </label>
                        <span className="truncate text-sm font-normal leading-none tracking-normal font-manrope text-secondary-text">
                          {destination || "Search destination"}
                        </span>
                      </div>
                    </button>

                    <div className="absolute right-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-eb-strokes md:block" />

                    {open && (
                      <div
                        className="
                        absolute left-0 top-full mt-4
                        w-[320px]
                        rounded-xl bg-white
                        shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                        ring-1 ring-black/5
                        overflow-hidden
                      "
                      >
                        <ul className="py-2">
                          {items.map((item, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                              <li key={`${item.label}-${idx}`}>
                                <button
                                  type="button"
                                  onMouseEnter={() => setActiveIndex(idx)}
                                  onMouseLeave={() => setActiveIndex(-1)}
                                  onClick={() => handlePick(item)}
                                  className={`
                                  w-full flex items-center gap-3
                                  px-4 py-3 text-left
                                  transition-colors duration-200
                                  ${isActive ? "bg-gray-50" : "bg-white hover:bg-gray-50"}
                                  ${item.type !== "nearby" && "cursor-pointer"}
                                `}
                                >
                                  <div className="shrink-0">
                                    <Image
                                      src={item.iconPath}
                                      alt={item.label}
                                      width={32}
                                      height={32}
                                      className="h-8 w-8 text-primary"
                                    />
                                  </div>

                                  <span className="text-base font-normal leading-[100%] tracking-normal font-inter text-primary-grey">
                                    {item.label}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div
                    ref={calendarWrapRef}
                    className={[
                      "relative flex-1 px-5 py-2",
                      "cursor-pointer transition-all",
                      dateOpen
                        ? "z-20 bg-gray-50 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/10"
                        : "hover:bg-gray-50 hover:rounded-lg hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:ring-1 hover:ring-black/5",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      onClick={() => setDateOpen((s) => !s)}
                      className="w-full text-left"
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-base font-medium leading-none tracking-normal font-[Manrope] text-primary">
                          Dates?
                        </label>
                        <span className="truncate text-sm font-normal leading-none tracking-normal font-manrope text-secondary-text">
                          {dateLabel}
                        </span>
                      </div>
                    </button>

                    <div className="absolute right-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-eb-strokes md:block" />

                    {dateOpen && (
                      <div className="absolute left-0 lg:left-1/2 top-full mt-4 translate-x-0 lg:-translate-x-1/2 z-50">
                        <DateRangeCalendar
                          anchorMonth={anchorMonth}
                          onPrev={() => setAnchorMonth((m) => addMonths(m, -1))}
                          onNext={() => setAnchorMonth((m) => addMonths(m, 1))}
                          range={range}
                          onPick={onPickDate}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    ref={guestsWrapRef}
                    className={[
                      "relative flex-1 px-5 py-2",
                      "cursor-pointer transition-all",
                      guestsOpen
                        ? "z-20 bg-gray-50 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/10"
                        : "hover:bg-gray-50 hover:rounded-lg hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:ring-1 hover:ring-black/5",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      onClick={() => setGuestsOpen((s) => !s)}
                      className="w-full text-left"
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-base font-medium leading-none tracking-normal font-[Manrope] text-primary">
                          Guests
                        </label>
                        <span className="truncate text-sm font-normal leading-none tracking-normal font-manrope text-secondary-text">
                          {guestLabel}
                        </span>
                      </div>
                    </button>

                    {guestsOpen && (
                      <div className="absolute left-0 top-full mt-4 w-[320px] rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/5 p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <div className="font-manrope text-base font-medium leading-[100%] tracking-[0%] text-gray-900">
                                Adults
                              </div>
                              <div className="font-manrope text-sm font-normal leading-[100%] tracking-[0%] text-gray-500">
                                Ages 14 or above
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setAdults((a) => Math.max(0, a - 1))
                                }
                                className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                                disabled={adults === 0}
                              >
                                <HiMinus className="h-4 w-4 text-gray-600" />
                              </button>
                              <span className="w-8 text-center font-inter text-base font-light leading-6 tracking-[0%] text-gray-900">
                                {adults}
                              </span>
                              <button
                                type="button"
                                onClick={() => setAdults((a) => a + 1)}
                                className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                              >
                                <HiPlus className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <div className="font-manrope text-base font-medium leading-[100%] tracking-[0%] text-gray-900">
                                Children
                              </div>
                              <div className="font-manrope text-sm font-normal leading-[100%] tracking-[0%] text-gray-500">
                                Age 0 to 13
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setChildren((c) => Math.max(0, c - 1))
                                }
                                className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                                disabled={children === 0}
                              >
                                <HiMinus className="h-4 w-4 text-gray-600" />
                              </button>
                              <span className="w-8 text-center font-inter text-base font-light leading-6 tracking-[0%] text-gray-900">
                                {children}
                              </span>
                              <button
                                type="button"
                                onClick={() => setChildren((c) => c + 1)}
                                className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border gray-400 transition"
                              >
                                <HiPlus className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <div className="font-manrope text-base font-medium leading-[100%] tracking-[0%] text-gray-900">
                                Infants
                              </div>
                              <div className="font-manrope text-sm font-normal leading-[100%] tracking-[0%] text-gray-500">
                                Under 2
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setInfants((i) => Math.max(0, i - 1))
                                }
                                className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                                disabled={infants === 0}
                              >
                                <HiMinus className="h-4 w-4 text-gray-600" />
                              </button>
                              <span className="w-8 text-center font-inter text-base font-light leading-6 tracking-[0%] text-gray-900">
                                {infants}
                              </span>
                              <button
                                type="button"
                                onClick={() => setInfants((i) => i + 1)}
                                className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                              >
                                <HiPlus className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center pl-2 pr-1">
                    <Link
                      href="/search"
                      className="
                      rounded-xl bg-primary
                      px-8 py-4
                      text-base font-medium leading-none tracking-normal font-inter text-white
                      shadow-lg transition-colors
                      active:scale-95 hover:bg-[#963333]
                      cursor-pointer h-full flex items-center justify-center
                    "
                    >
                      Search
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {showFilters && (
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="
                  flex items-center gap-2
                  rounded-xl bg-white 
                  px-6 py-5
                  shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                  ring-1 ring-eb-strokes 
                  transition hover:bg-gray-50 
                  active:scale-95 
                  self-stretch cursor-pointer
                "
              >
                <HiAdjustmentsHorizontal className="h-6 w-6 text-gray-700" />
                <span className="text-base font-medium font-inter text-primary-grey ">
                  Filters
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
};

export default TravelSearchBar;
