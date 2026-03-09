"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/axios/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(
        "Password reset successfully! Please log in with your new password.",
      );
      // OTP flow context is cleared inside resetPassword()
      router.push("/login");
    },
    onError: (error: Error) => {
      const message =
        error.message || "Failed to reset password. Please try again.";
      toast.error(message);
    },
  });
};
