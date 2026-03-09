"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface Notification {
  id: number;
  message: string;
  time: string;
  isUnread: boolean;
}

interface NotificationGroup {
  title: string;
  notifications: Notification[];
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
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

  const notificationGroups: NotificationGroup[] = [
    {
      title: "Today",
      notifications: [
        {
          id: 1,
          message:
            'The door to "Apartamento Luz" has been unlocked for over 30 minutes!',
          time: "2m ago",
          isUnread: true,
        },
        {
          id: 2,
          message:
            'Your check-in for "Pousada Tropical" is now available via the app.',
          time: "2m ago",
          isUnread: true,
        },
        {
          id: 3,
          message:
            'The door to "Apartamento Luz" has been unlocked for over 30 minutes!',
          time: "2m ago",
          isUnread: true,
        },
        {
          id: 4,
          message:
            'You\'ve successfully booked "Pousada Tropical" in Salvador for your stay from Dec 15-20',
          time: "2m ago",
          isUnread: false,
        },
      ],
    },
    {
      title: "Yesterday",
      notifications: [
        {
          id: 5,
          message: 'The door to "Apartamento Luz" is now unlocked!',
          time: "2m ago",
          isUnread: false,
        },
        {
          id: 6,
          message:
            'Your stay at "Apartamento Luz" in São Paulo starts tomorrow!',
          time: "2m ago",
          isUnread: false,
        },
        {
          id: 7,
          message:
            'The door to "Apartamento Luz" has been unlocked for over 30 minutes!',
          time: "2m ago",
          isUnread: false,
        },
        {
          id: 8,
          message:
            'You\'ve successfully booked "Pousada Tropical" in Salvador for your stay from Dec 15-20',
          time: "2m ago",
          isUnread: false,
        },
      ],
    },
    {
      title: "Earlier",
      notifications: [
        {
          id: 9,
          message:
            'The door to "Apartamento Luz" has been unlocked for over 30 minutes!',
          time: "2m ago",
          isUnread: false,
        },
        {
          id: 10,
          message:
            'Your stay at "Apartamento Luz" in São Paulo starts tomorrow!',
          time: "2m ago",
          isUnread: false,
        },
        {
          id: 11,
          message:
            'Your stay at "Apartamento Luz" in São Paulo starts tomorrow!',
          time: "2m ago",
          isUnread: false,
        },
        {
          id: 12,
          message:
            'Your stay at "Apartamento Luz" in São Paulo starts tomorrow!',
          time: "2m ago",
          isUnread: false,
        },
      ],
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-140 md:max-h-[90vh] bg-white z-50 md:rounded-2xl shadow-2xl overflow-hidden">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold font-manrope text-primary-grey">
            Notifications
          </h2>
          <button
            onClick={onClose}
            className="group cursor-pointer"
            aria-label="Close notifications"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-primary   transition-colors duration-200" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-[calc(90vh-80px)] px-6 py-4">
          {notificationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-sm font-bold font-manrope text-gray-900 mb-3">
                {group.title}
              </h3>

              <div className="space-y-1">
                {group.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-primary-grey font-inter leading-relaxed">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-500 font-inter mt-1 inline-block">
                        {notification.time}
                      </span>
                    </div>

                    {notification.isUnread && (
                      <div className=" size-2 md:size-3 bg-primary rounded-full mt-2 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationsModal;
