"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getIsLoggedIn,
  clearAllAuthData,
  getAuthChangedEventName,
  type StoredUser,
} from "@/store/authStore";

export const useAuth = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const sync = () => {
      const loggedIn = getIsLoggedIn();
      const user = getCurrentUser();
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);
      setIsLoading(false);
    };

    sync();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "livy_isLoggedIn" || e.key === "livy_current_user") {
        sync();
      }
    };
    window.addEventListener("storage", onStorage);

    const evtName = getAuthChangedEventName();
    window.addEventListener(evtName, sync);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(evtName, sync);
    };
  }, []);
  const logout = useCallback(() => {
    clearAllAuthData();
    setIsLoggedIn(false);
    setCurrentUser(null);
    router.push("/");
  }, [router]);
  return { isLoggedIn, currentUser, isLoading, logout };
};
