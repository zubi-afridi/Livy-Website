"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import Container from "../common/Container";
import Button from "../common/Button";
import {
  HomeIcon,
  FavoritesIcon,
  BookingsIcon,
  ProfileIcon,
} from "../common/SVGIcons";
import NotificationsModal from "../common/NotificationsModal";
import {
  clearAllAuthData,
  getCurrentUser,
  getAuthChangedEventName,
  type StoredUser,
} from "@/store/authStore";
import Avatar from "@/components/common/Avatar";

type Lang = {
  label: string;
  code: string;
  icon: string;
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState<Lang>({
    label: "English",
    code: "EN",
    icon: "/icons/Americal-flag.svg",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const langRef = useRef<HTMLLIElement>(null);
  const menuRef = useRef<HTMLLIElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const readAuth = () => {
      const v =
        typeof window !== "undefined"
          ? localStorage.getItem("livy_isLoggedIn")
          : null;
      setIsLoggedIn(v === "1");
      setCurrentUser(getCurrentUser());
    };
    readAuth();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "livy_isLoggedIn" || e.key === "livy_current_user") {
        readAuth();
      }
    };
    window.addEventListener("storage", onStorage);
    const evtName = getAuthChangedEventName();
    window.addEventListener(evtName, readAuth);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(evtName, readAuth);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideLangDesktop =
        !!langRef.current && langRef.current.contains(target);
      const clickedInsideLangMobile =
        !!mobileLangRef.current && mobileLangRef.current.contains(target);
      const clickedInsideMenu =
        !!menuRef.current && menuRef.current.contains(target);

      if (!clickedInsideLangDesktop && !clickedInsideLangMobile) {
        setIsLangOpen(false);
      }
      if (!clickedInsideMenu) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconButtonClasses =
    "flex items-center justify-center rounded-full bg-white shadow-sm " +
    "h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 " +
    "cursor-pointer select-none " +
    "transition-all duration-200 " +
    "hover:shadow-md hover:-translate-y-[1px] hover:bg-gray-50 " +
    "active:translate-y-0 active:shadow-sm active:scale-95 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2";

  const dropdownItemClasses =
    "group flex w-full items-center gap-3 md:gap-4 px-3 md:px-5 py-2.5 md:py-3 " +
    "cursor-pointer select-none transition-all duration-200 " +
    "hover:bg-gray-50 active:bg-gray-100 active:scale-[0.99] " +
    "focus:outline-none focus-visible:bg-gray-50";

  const languages: Lang[] = [
    { label: "English", code: "EN", icon: "/icons/Americal-flag.svg" },
    {
      label: "Portuguese (BR)",
      code: "pt-BR",
      icon: "/icons/portagal-flag.svg",
    },
  ];

  const menuItems = isLoggedIn
    ? [
        {
          label: "Favorite",
          icon: "/icons/favourite-icon.svg",
          color: "text-primary-grey",
        },
        {
          label: "Bookings",
          icon: "/icons/booking-icon.svg",
          color: "text-primary-grey",
        },
        {
          label: "Profile",
          icon: "/icons/profile-icon.svg",
          color: "text-primary-grey",
        },
        {
          label: "Notifications",
          icon: "/icons/notification.svg",
          color: "text-primary-grey",
        },
        {
          label: "Logout",
          icon: "/icons/logout-icon.svg",
          color: "text-primary",
        },
      ]
    : [
        {
          label: "Favorite",
          icon: "/icons/favourite-icon.svg",
          color: "text-primary-grey",
        },
        {
          label: "Bookings",
          icon: "/icons/booking-icon.svg",
          color: "text-primary-grey",
        },
        {
          label: "Profile",
          icon: "/icons/profile-icon.svg",
          color: "text-primary-grey",
        },
        {
          label: "Notifications",
          icon: "/icons/notification.svg",
          color: "text-primary-grey",
        },
      ];

  const bottomNavItems = [
    { label: "Home", href: "/", Icon: HomeIcon },
    { label: "Favorites", href: "/favorites", Icon: FavoritesIcon },
    { label: "Bookings", href: "/bookings", Icon: BookingsIcon },
    {
      label: "Profile",
      href: "/profile",
      Icon: ProfileIcon,
    },
  ];

  const doLogout = () => {
    clearAllAuthData();
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleLogout = async () => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

    if (!isDesktop) {
      doLogout();
      return;
    }

    const result = await Swal.fire({
      title: "Log out of Livy?",
      text: "You can log back in anytime to continue where you left off.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
      confirmButtonColor: "#B63E41",
    });

    if (result.isConfirmed) {
      doLogout();

      await Swal.fire({
        title: "Logged out successfully!",
        text: "See you again soon",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#B63E41",
      });
    }
  };

  return (
    <>
      <header className="absolute z-20 w-full hidden md:block">
        <Container className="flex items-center justify-between py-3 md:py-4 xl:py-6">
          <Link
            href="/"
            className="cursor-pointer"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <Image
              src="/icons/logo.svg"
              alt="nav logo"
              width={100}
              height={100}
              className="w-20 cursor-pointer object-contain md:w-25 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              priority
            />
          </Link>

          <nav
            data-aos="fade-down"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            <ul className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
              <li className="relative" ref={langRef}>
                <button
                  onClick={() => {
                    setIsLangOpen((v) => !v);
                    setIsMenuOpen(false);
                  }}
                  className={iconButtonClasses}
                  aria-label="Select language"
                  type="button"
                >
                  <Image
                    src="/icons/lang.svg"
                    alt="Select Language"
                    width={25}
                    height={25}
                    className="h-5 w-5 md:h-6 md:w-6"
                  />
                </button>

                {isLangOpen && (
                  <div
                    className="
                      absolute right-0 mt-2
                      w-48 md:w-56
                      rounded-2xl border border-gray-50 bg-white
                      py-3 md:py-3
                      shadow-xl
                      z-50
                    "
                  >
                    <ul className="flex flex-col">
                      {languages.map((lang, index) => {
                        const isSelected = selectedLang.label === lang.label;

                        return (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedLang(lang);
                                setIsLangOpen(false);
                              }}
                              className="
                                group
                                flex w-full items-center justify-between
                                px-3 md:px-4
                                py-2.5 md:py-2
                                cursor-pointer select-none
                                transition-all duration-200
                                hover:bg-gray-50 active:bg-gray-100 active:scale-[0.99]
                                focus:outline-none focus-visible:bg-gray-50
                              "
                            >
                              <div className="flex items-center gap-2">
                                <Image
                                  src={lang.icon}
                                  alt={`${lang.label} flag`}
                                  width={30}
                                  height={30}
                                  className="h-5 w-5 rounded-full shadow-sm sm:h-6 sm:w-6 md:h-7.5 md:w-7.5 transition-transform duration-200 group-hover:scale-110"
                                />

                                <span className="font-manrope font-medium text-primary-grey transition-all duration-200 group-hover:text-gray-900 group-hover:scale-105">
                                  <span className="text-sm md:hidden">
                                    {lang.code}
                                  </span>
                                  <span className="hidden md:inline md:text-[16px]">
                                    {lang.label}
                                  </span>
                                </span>
                              </div>

                              {isSelected && (
                                <svg
                                  className="h-4 w-4 md:h-5 md:w-5"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M16.6666 5L7.49992 14.1667L3.33325 10"
                                    stroke="#22C55E"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>

              {isLoggedIn ? (
                <li>
                  <Link
                    href="/profile/personal-information"
                    className="cursor-pointer"
                  >
                    <Avatar
                      name={currentUser?.fullName}
                      src={currentUser?.avatarUrl ?? null}
                      size={40}
                      className="
                        h-7! w-7! sm:h-8! sm:w-8! md:h-10! md:w-10!
                        rounded-full shadow-sm object-cover object-center
                        cursor-pointer select-none
                        transition-transform duration-200
                        hover:scale-[1.04] active:scale-[0.96]
                        text-base font-semibold md:text-lg
                      "
                    />
                  </Link>
                </li>
              ) : (
                <li className="flex items-center gap-2 md:gap-3">
                  <Button
                    to="/login"
                    label="Login"
                    classname="
                      bg-primary text-white hover:bg-primary/80 hover:border-primary/80
                      px-4 py-1.5 text-sm rounded-lg
                      md:px-8 md:py-2 md:text-base md:rounded-xl
                      transition-all duration-200
                      hover:-translate-y-px hover:shadow-md
                      active:translate-y-0 active:shadow-sm active:scale-[0.98]
                      cursor-pointer
                    "
                  />

                  <Button
                    to="/signup"
                    label="Sign Up"
                    classname="
                      text-primary hover:bg-primary hover:text-white
                      px-4 py-1.5 text-sm rounded-lg
                      md:px-8 md:py-2 md:text-base md:rounded-xl
                      transition-all duration-200
                      hover:-translate-y-px hover:shadow-md
                      active:translate-y-0 active:shadow-sm active:scale-[0.98]
                      cursor-pointer
                    "
                  />
                </li>
              )}

              <li className="relative" ref={menuRef}>
                <button
                  onClick={() => {
                    setIsMenuOpen((v) => !v);
                    setIsLangOpen(false);
                  }}
                  className={iconButtonClasses}
                  aria-label="Open menu"
                  type="button"
                >
                  <Image
                    src="/icons/menu.svg"
                    alt="Menu"
                    width={25}
                    height={25}
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                </button>

                {isMenuOpen && (
                  <div
                    className="
                      absolute right-0 mt-2
                      w-48 md:w-56
                      rounded-2xl border border-gray-50 bg-white
                      py-2
                      shadow-xl
                      z-50
                    "
                  >
                    <ul className="flex flex-col">
                      {menuItems.map((item, index) => {
                        const getItemPath = (label: string) => {
                          if (label === "Favorite") return "/favorites";
                          if (label === "Bookings") return "/bookings";
                          if (label === "Profile") return "/profile";
                          return null;
                        };

                        const itemPath = getItemPath(item.label);
                        const isActive = itemPath && pathname === itemPath;

                        return (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={() => {
                                if (item.label === "Logout") {
                                  handleLogout();
                                } else if (!isLoggedIn) {
                                  router.push("/login");
                                  setIsMenuOpen(false);
                                } else {
                                  // Handle navigation for logged-in users
                                  if (item.label === "Favorite") {
                                    router.push("/favorites");
                                    setIsMenuOpen(false);
                                  } else if (item.label === "Bookings") {
                                    router.push("/bookings");
                                    setIsMenuOpen(false);
                                  } else if (item.label === "Profile") {
                                    router.push(
                                      "/profile/personal-information",
                                    );
                                    setIsMenuOpen(false);
                                  } else if (item.label === "Notifications") {
                                    setIsNotificationsOpen(true);
                                    setIsMenuOpen(false);
                                  }
                                }
                              }}
                              className={`
                                group flex w-full items-center gap-3 md:gap-4 px-3 md:px-5 py-2.5 md:py-3
                                cursor-pointer select-none transition-all duration-200
                                focus:outline-none focus-visible:bg-gray-50
                                ${
                                  isActive
                                    ? "bg-gray-100 hover:bg-gray-100"
                                    : "hover:bg-gray-50 active:bg-gray-100 active:scale-[0.99]"
                                }
                              `}
                            >
                              <Image
                                src={item.icon}
                                alt={item.label}
                                width={20}
                                height={20}
                                className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-200 group-hover:scale-110"
                              />
                              <span
                                className={`font-manrope font-medium ${item.color} text-sm md:text-[16px] ${
                                  isActive ? "font-semibold" : ""
                                }`}
                              >
                                {item.label}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </Container>
      </header>

      <header className="absolute z-20 w-full md:hidden">
        <Container className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="cursor-pointer"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <Image
              src="/icons/logo.svg"
              alt="Livy Logo"
              width={80}
              height={80}
              className="w-16 cursor-pointer object-contain transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              priority
            />
          </Link>

          <div
            className="flex items-center gap-2"
            data-aos="fade-down"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="
                flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm
                cursor-pointer select-none
                transition-all duration-200
                hover:bg-gray-50 hover:shadow-md
                active:scale-95 active:shadow-sm
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
              "
              aria-label="Notifications"
              type="button"
            >
              <Image
                src="/icons/notification.svg"
                alt="Notifications"
                width={18}
                height={18}
                className="h-4.5 w-4.5 transition-transform duration-200 hover:scale-105"
              />
            </button>

            <div className="relative" ref={mobileLangRef}>
              <button
                onClick={() => {
                  setIsLangOpen((v) => !v);
                  setIsMenuOpen(false);
                }}
                className="
                  flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm
                  cursor-pointer select-none
                  transition-all duration-200
                  hover:bg-gray-50 hover:shadow-md
                  active:scale-95 active:shadow-sm
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
                "
                aria-label="Select language"
                type="button"
              >
                <Image
                  src="/icons/lang.svg"
                  alt="Select Language"
                  width={18}
                  height={18}
                  className="h-4.5 w-4.5"
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-gray-50 bg-white py-3 shadow-xl z-50">
                  <ul className="flex flex-col">
                    {languages.map((lang, index) => {
                      const isSelected = selectedLang.label === lang.label;

                      return (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedLang(lang);
                              setIsLangOpen(false);
                            }}
                            className="
                              group
                              flex w-full items-center justify-between px-3 py-2.5
                              cursor-pointer select-none
                              transition-all duration-200
                              hover:bg-gray-50 active:bg-gray-100 active:scale-[0.99]
                              focus:outline-none focus-visible:bg-gray-50
                            "
                          >
                            <div className="flex items-center gap-3">
                              <Image
                                src={lang.icon}
                                alt={`${lang.label} flag`}
                                width={24}
                                height={24}
                                className="h-6 w-6 rounded-full shadow-sm transition-transform duration-200 group-hover:scale-110"
                              />

                              <span className="font-manrope font-medium text-primary-grey text-sm transition-all duration-200 group-hover:text-gray-900 group-hover:scale-105">
                                {lang.code}
                              </span>
                            </div>

                            {isSelected && (
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  d="M16.6666 5L7.49992 14.1667L3.33325 10"
                                  stroke="#22C55E"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg md:hidden">
        <div className="flex items-center justify-around px-2 py-2.5">
          {bottomNavItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                }}
                className={`
                  group flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-1.5
                  cursor-pointer select-none
                  transition-all duration-200
                  active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
                  ${
                    isActive
                      ? "text-[#B63E41]"
                      : "text-[#B6B6B6] hover:text-[#B63E41]"
                  }
                `}
              >
                <item.Icon
                  className={`h-6 w-6 transition-transform duration-200 ${
                    isActive ? "scale-105" : "group-hover:scale-110"
                  }`}
                />
                <span className="text-[11px] font-medium font-manrope">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
};

export default Header;
