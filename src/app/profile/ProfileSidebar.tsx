"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import {
  UserIcon,
  LockIcon,
  NotificationIcon,
  QuestionIcon,
  FileTextIcon,
  ShieldIcon,
  ArrowRightIcon,
  LogoutIcon,
} from "@/components/common/SVGIcons";
import { RiPencilFill } from "@remixicon/react";
import {
  clearAllAuthData,
  setCurrentUser,
  upsertUser,
} from "@/store/authStore";
import { useAuth } from "@/hooks/auth/useAuth";
import Avatar from "@/components/common/Avatar";
import toast from "react-hot-toast";

const menuItems = [
  {
    id: "personal-information",
    label: "Personal Information",
    icon: UserIcon,
    href: "/profile/personal-information",
  },
  {
    id: "login-privacy",
    label: "Login & Privacy",
    icon: LockIcon,
    href: "/profile/login-privacy",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: NotificationIcon,
    href: "/profile/notifications",
  },
  {
    id: "help-center",
    label: "Help Center",
    icon: QuestionIcon,
    href: "/profile/help-center",
  },
  {
    id: "terms",
    label: "Terms of Services",
    icon: FileTextIcon,
    href: "/profile/terms",
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    icon: ShieldIcon,
    href: "/profile/privacy-policy",
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAuth();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleLogout = () => {
    clearAllAuthData();
    router.push("/");
  };

  const handlePickAvatar = () => {
    fileRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file only.");
      return;
    }
    if (!currentUser) {
      toast.error("Please log in first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (!result) {
        toast.error("Failed to read image. Please try again.");
        return;
      }
      const updated = { ...currentUser, avatarUrl: result };
      upsertUser(updated);
      setCurrentUser(updated);
      toast.success("Profile photo updated.");
    };
    reader.onerror = () => {
      toast.error("Failed to read image. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <aside className="hidden md:block w-64 lg:w-72 shrink-0">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  font-manrope font-medium text-base transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "bg-gray-100 text-primary-grey"
                      : "text-[#666666] hover:bg-gray-50"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-left">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="md:hidden">
        <h1 className="text-2xl font-bold font-manrope text-primary-grey mb-6">
          Profile
        </h1>

        <div className="bg-white border border-eb-strokes rounded-2xl p-4 shadow-sm flex items-center gap-4 mb-8">
          <div className="relative shrink-0">
            <Avatar
              name={currentUser?.fullName}
              src={currentUser?.avatarUrl ?? null}
              size={64}
              className="w-16 h-16 rounded-xl object-cover border-2 border-[#2c2c2e] text-2xl"
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handlePickAvatar}
              className="absolute -top-1.5 -right-1.5 size-5 bg-primary-grey rounded-full flex items-center justify-center cursor-pointer shadow-md"
              aria-label="Change profile photo"
            >
              <RiPencilFill className="size-3 text-white" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-manrope font-semibold text-base text-primary-grey leading-none">
              {currentUser?.fullName ?? "User"}
            </h3>
            <p className="font-inter text-xs font-normal text-secondary-text leading-3">
              {currentUser?.email ?? ""}
            </p>
          </div>
        </div>

        <div className="space-y-1 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  w-full flex items-center gap-4 px-2 py-4 transition-all duration-200 cursor-pointer
                  hover:bg-gray-50 active:bg-gray-100 rounded-xl
                `}
              >
                <Icon className="w-5 h-5 text-primary-grey shrink-0" />
                <span className="flex-1 text-left font-manrope font-medium text-base text-primary-grey">
                  {item.label}
                </span>
                <ArrowRightIcon className="w-5 h-5 text-secondary-text" />
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-2 py-4 mt-2 transition-all duration-200 cursor-pointer hover:bg-red-50 active:bg-red-100 rounded-xl group"
          >
            <LogoutIcon className="w-5 h-5 text-[#D14F4F] shrink-0" />
            <span className="flex-1 text-left font-manrope font-medium text-base text-[#D14F4F]">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
