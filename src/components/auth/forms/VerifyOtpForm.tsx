"use client";

import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from "@/validations/auth.validations";
import { useVerifyOtp } from "@/hooks/auth/useVerifyOtp";

export default function VerifyOtpForm() {
  const [timeLeft, setTimeLeft] = useState(59);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: verify, isPending } = useVerifyOtp();

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const onSubmit = (data: VerifyOtpFormValues) => {
    verify(data);
  };

  const handleResend = () => {
    setTimeLeft(59);
    toast.success("New verify OTP has been sent to your email");
  };

  // Format time as 00:SS
  const formatTime = (seconds: number) => {
    return `00:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col items-center">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
              shouldAutoFocus
              inputType="tel"
              numInputs={4}
              renderSeparator={<span className="mx-2"></span>}
              inputStyle={{
                width: "3rem",
                height: "3rem",
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  className={`
                    rounded-lg
                    border
                    text-center
                    text-base
                    outline-none
                    focus:border-primary
                    focus:ring-1
                    focus:ring-primary/40
                    transition
                    ${errors.otp ? "border-red-500" : "border-eb-strokes"}
                  `}
                />
              )}
            />
          )}
        />
        {errors.otp && (
          <span className="mt-2 text-xs text-red-500">
            {errors.otp.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-primary py-2.5 text-base font-semibold text-white hover:opacity-95 active:opacity-90 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
      >
        {isPending ? "Verifying..." : "Verify OTP"}
      </button>

      <div className="text-center text-xs text-secondary-text">
        {formatTime(timeLeft)}
        <button
          type="button"
          onClick={handleResend}
          className="text-primary ml-1 cursor-pointer font-medium hover:opacity-80"
        >
          Resend
        </button>
      </div>
    </form>
  );
}
