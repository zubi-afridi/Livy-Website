"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/axios/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("OTP sent! Please check your email.");
      // OTP flow context is already set to "forgotPassword" inside forgotPassword()
      router.push("/verify-otp");
    },
    onError: (error: Error) => {
      const message = error.message || "Failed to send OTP. Please try again.";
      toast.error(message);
    },
  });
};
