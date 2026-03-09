"use client";

import { useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "@remixicon/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormValues,
} from "@/validations/auth.validations";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 lg:space-y-2.5 flex flex-col">
        <label
          htmlFor="email"
          className="text-[14px] text-primary-grey hover:text-primary-grey/70 transition-colors ease-in-out duration-200 cursor-pointer"
        >
          Email
        </label>
        <input
          id="email"
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

      <div className="space-y-1 lg:space-y-2.5 flex flex-col">
        <label
          htmlFor="password"
          className="text-[14px] text-primary-grey hover:text-primary-grey/70 transition-colors ease-in-out duration-200 cursor-pointer"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            {...register("password")}
            className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary transition-all ${
              errors.password ? "border-red-500" : "border-eb-strokes"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
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

      <div className="flex items-center justify-between pt-1">
        <label
          htmlFor="remember"
          className="flex items-center gap-3 text-[14px] text-secondary-text cursor-pointer"
        >
          <input
            id="remember"
            type="checkbox"
            {...register("rememberMe")}
            className="h-4 w-4 rounded accent-primary cursor-pointer"
          />
          Remember me
        </label>

        <Link
          href="/forgot-password"
          className="text-[14px] text-primary cursor-pointer hover:text-primary/80 transition-colors  ease-in-out duration-75 "
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-lg bg-primary py-2.5 text-base font-semibold text-white hover:opacity-90 active:opacity-90 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <p className="pt-2 text-center text-[14px] text-secondary-text">
        New to Livy?
        <Link
          href="/signup"
          className="ml-1 text-primary cursor-pointer hover:text-primary/80 transition-colors ease-in-out duration-800  inline-flex items-center gap-3"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
