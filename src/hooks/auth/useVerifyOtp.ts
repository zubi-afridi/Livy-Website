"use client";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "@/lib/axios/authApi";
import { getOtpFlowContext } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useVerifyOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success("OTP verified successfully!");
      const ctx = getOtpFlowContext();
      if (ctx?.flow === "forgotPassword") {
        router.push("/reset-password");
      } else {
        router.push("/login");
      }
    },
    onError: (error: Error) => {
      const message = error.message || "OTP verification failed.";
      toast.error(message);
    },
  });
};
