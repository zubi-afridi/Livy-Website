"use client";

import { useMutation } from "@tanstack/react-query";
import { signupUser } from "@/lib/axios/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("Account created! Please verify your OTP.");
      // OTP flow context is already set to "signup" inside signupUser()
      router.push("/verify-otp");
    },
    onError: (error: Error) => {
      const message = error.message || "Signup failed. Please try again.";
      toast.error(message);
    },
  });
};
