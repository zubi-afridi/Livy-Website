"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getIsLoggedIn,
  clearAllAuthData,
  type StoredUser,
} from "@/store/authStore";

export const useAuth = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loggedIn = getIsLoggedIn();
    const user = getCurrentUser();
    setIsLoggedIn(loggedIn);
    setCurrentUser(user);
    setIsLoading(false);
  }, []);
  const logout = useCallback(() => {
    clearAllAuthData();
    setIsLoggedIn(false);
    setCurrentUser(null);
    router.push("/");
  }, [router]);
  return { isLoggedIn, currentUser, isLoading, logout };
};
