"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/validations/auth.validations";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: sendOtp, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormValues) => {
    sendOtp(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 lg:space-y-2.5 flex flex-col">
        <label className="text-[14px] text-primary-grey">Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          {...register("email")}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-primary transition-all ${
            errors.email ? "border-red-500" : "border-eb-strokes"
          }`}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-lg bg-primary py-2.5 text-base font-semibold text-white hover:opacity-95 active:opacity-90 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
      >
        {isPending ? "Sending..." : "Send OTP"}
      </button>

      <p className="pt-2 text-center text-[14px] text-secondary-text">
        Back to
        <Link href="/login" className="ml-1 text-primary cursor-pointer">
          Login
        </Link>
      </p>
    </form>
  );
}
