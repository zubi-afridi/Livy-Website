"use client";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/axios/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(`Welcome, ${data.user.fullName}!`);
      router.push("/");
    },
    onError: (error: Error) => {
      const message = error.message || "Login failed. Please try again.";
      toast.error(message);
    },
  });
};
