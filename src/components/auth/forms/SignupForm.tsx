"use client";

import { useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "@remixicon/react";
import Link from "next/link";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupFormValues,
} from "@/validations/auth.validations";
import { useSignup } from "@/hooks/auth/useSignup";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const { mutate: signup, isPending } = useSignup();

  const onSubmit = (data: SignupFormValues) => {
    signup(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 lg:space-y-2.5 flex flex-col">
        <label className="text-[14px] text-primary-grey">Full Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          {...register("fullName")}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-primary transition-all ${
            errors.fullName ? "border-red-500" : "border-eb-strokes"
          }`}
        />
        {errors.fullName && (
          <span className="text-xs text-red-500">
            {errors.fullName.message}
          </span>
        )}
      </div>

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

      <div className="phone-input-container space-y-1 lg:space-y-2.5 flex flex-col">
        <label
          htmlFor="signup-phone-input"
          className="text-[14px] text-primary-grey cursor-pointer"
        >
          Phone Number
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              defaultCountry="br"
              value={field.value}
              onChange={field.onChange}
              disableDialCodeAndPrefix={true}
              disableFormatting={true}
              className="w-full flex gap-3"
              inputProps={{ id: "signup-phone-input" }}
              inputClassName={`!flex-1 !min-w-0 !h-auto !px-3 !py-2.5 !border !rounded-lg !text-sm !text-primary-grey !outline-none focus:!border-primary !transition-all ${
                errors.phone ? "!border-red-500" : "!border-eb-strokes"
              }`}
              countrySelectorStyleProps={{
                buttonClassName:
                  "!h-[40px] !px-2 !py-2.5 !border !border-eb-strokes !rounded-lg !bg-transparent !transition-all !flex !items-center !justify-center !gap-2 !w-20 !cursor-pointer",
                buttonContentWrapperClassName: "!flex !items-center !gap-1.5",
                flagClassName: "!size-5 !rounded-sm",
              }}
            />
          )}
        />
        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div className="space-y-1 lg:space-y-2.5 flex flex-col">
        <label className="text-[14px] text-primary-grey">Password</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            {...register("password")}
            className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary transition-all ${
              errors.password ? "border-red-500" : "border-eb-strokes"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-unmenu hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <RiEyeLine className="w-5 h-5" />
            ) : (
              <RiEyeCloseLine className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-lg bg-primary py-2.5 text-base font-semibold text-white hover:opacity-95 active:opacity-90 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
      >
        {isPending ? "Creating account..." : "Sign Up"}
      </button>

      <p className="pt-2 text-center text-[14px] text-secondary-text">
        Already have an account?
        <Link href="/login" className="ml-1 text-primary cursor-pointer">
          Login
        </Link>
      </p>
    </form>
  );
}
