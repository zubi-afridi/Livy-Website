"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

const notificationSettings = [
  {
    id: "booking-updates",
    title: "Booking Updates",
    description: "Get alerts for new reservations, changes, or cancellations.",
  },
  {
    id: "payment-receipts",
    title: "Payment Receipts",
    description: "Receive confirmation after every successful payment.",
  },
  {
    id: "check-in-reminders",
    title: "Check-In Reminders",
    description:
      "We'll remind you when it's time to check in or unlock your door.",
  },
  {
    id: "door-status-alerts",
    title: "Door Status Alerts",
    description:
      "Get notified if your door stays open for too long or if there's unusual activity.",
  },
  {
    id: "early-check-in-status",
    title: "Early Check-In Status",
    description:
      "Receive approval or rejection updates for your early check-in requests.",
  },
  {
    id: "service-messages",
    title: "Service Messages",
    description:
      "Important system updates related to your account or app performance.",
  },
];

export default function NotificationsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "booking-updates": true,
    "payment-receipts": true,
    "check-in-reminders": true,
    "door-status-alerts": true,
    "early-check-in-status": true,
    "service-messages": true,
  });

  const handleToggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
          Notifications
        </h2>
      </div>

      <h2 className="hidden md:block text-2xl font-semibold font-manrope text-primary-grey leading-none mb-6">
        Notifications
      </h2>

      <div className="bg-white border border-eb-strokes rounded-2xl p-4 md:p-6 mb-8">
        <div className="space-y-8">
          {notificationSettings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="font-manrope font-semibold text-base text-primary-grey mb-1">
                  {setting.title}
                </h3>
                <p className="font-inter text-sm font-normal text-secondary-text max-w-sm md:max-w-md">
                  {setting.description}
                </p>
              </div>
              <button
                onClick={() => handleToggle(setting.id)}
                className={`
                  relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                  ${toggles[setting.id] ? "bg-primary shadow-sm" : "bg-eb-strokes"}
                `}
                role="switch"
                aria-checked={toggles[setting.id]}
              >
                <span
                  aria-hidden="true"
                  className={`
                    pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${toggles[setting.id] ? "translate-x-5" : "translate-x-0"}
                  `}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
