"use client";

import { useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "@remixicon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/validations/auth.validations";
import { useResetPassword } from "@/hooks/auth/useResetPassword";

export default function ResetPasswordForm() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: reset, isPending } = useResetPassword();

  const onSubmit = (data: ResetPasswordFormValues) => {
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1 lg:space-y-2.5 flex flex-col">
        <label className="text-[14px] text-primary-grey">New Password</label>

        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="Enter Your Password"
            {...register("newPassword")}
            className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary transition-all ${
              errors.newPassword ? "border-red-500" : "border-eb-strokes"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowNew((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-unmenu hover:text-primary transition-colors"
            aria-label="Toggle new password visibility"
          >
            {showNew ? (
              <RiEyeLine className="w-5 h-5" />
            ) : (
              <RiEyeCloseLine className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.newPassword && (
          <span className="text-xs text-red-500">
            {errors.newPassword.message}
          </span>
        )}
      </div>

      <div className="space-y-1 lg:space-y-2.5 flex flex-col">
        <label className="text-[14px] text-primary-grey">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter Your Password"
            {...register("confirmPassword")}
            className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary transition-all ${
              errors.confirmPassword ? "border-red-500" : "border-eb-strokes"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-unmenu hover:text-primary transition-colors"
            aria-label="Toggle confirm password visibility"
          >
            {showConfirm ? (
              <RiEyeLine className="w-5 h-5" />
            ) : (
              <RiEyeCloseLine className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-lg bg-primary py-2.5 text-base font-semibold text-white hover:opacity-95 active:opacity-90 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
      >
        {isPending ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
