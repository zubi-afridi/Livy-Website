"use client";

import { useState } from "react";
import OpenEye from "@/assets/icons/open-eye.svg";
import ClosedEye from "@/assets/icons/closed-eye.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/validations/auth.validations";
import {
  getCurrentUser,
  updateUserPassword,
  setCurrentUser,
} from "@/store/authStore";
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    const user = getCurrentUser();
    if (!user) {
      toast.error("Please log in first.");
      return;
    }

    if (user.password !== data.currentPassword) {
      setError("currentPassword", {
        type: "manual",
        message: "Current password is incorrect",
      });
      toast.error("Current password is incorrect");
      return;
    }

    const updated = updateUserPassword(user.email, data.newPassword);
    if (!updated) {
      toast.error("Failed to update password. Please try again.");
      return;
    }

    const refreshedUser = { ...user, password: data.newPassword };
    setCurrentUser(refreshedUser);

    toast.success("Password updated successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="bg-white border border-eb-strokes rounded-2xl p-4 md:p-6 mb-6">
        <div className="space-y-6">
          {/* Current Password */}
          <div>
            <label
              htmlFor="current-password"
              className="block font-inter font-normal text-sm text-primary-grey leading-3 mb-2 cursor-pointer"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter Current Password"
                {...register("currentPassword")}
                className={`w-full px-4 py-3 border rounded-xl font-inter text-base text-primary-grey placeholder:text-secondary-text/50 focus:outline-none transition-all pr-12 ${
                  errors.currentPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-eb-strokes focus:border-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-grey/50 hover:text-primary-grey transition-colors cursor-pointer"
              >
                {showCurrentPassword ? (
                  <OpenEye className="size-5" />
                ) : (
                  <ClosedEye className="size-5" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="new-password"
              className="block font-inter font-normal text-sm text-primary-grey leading-3 mb-2 cursor-pointer"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Set new Password"
                {...register("newPassword")}
                className={`w-full px-4 py-3 border rounded-xl font-inter text-base text-primary-grey placeholder:text-secondary-text/50 focus:outline-none transition-all pr-12 ${
                  errors.newPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-eb-strokes focus:border-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-grey/50 hover:text-primary-grey transition-colors cursor-pointer"
              >
                {showNewPassword ? (
                  <OpenEye className="size-5" />
                ) : (
                  <ClosedEye className="size-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block font-inter font-normal text-sm text-primary-grey leading-3 mb-2 cursor-pointer"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Renter Password"
                {...register("confirmNewPassword")}
                className={`w-full px-4 py-3 border rounded-xl font-inter text-base text-primary-grey placeholder:text-secondary-text/50 focus:outline-none transition-all pr-12 ${
                  errors.confirmNewPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-eb-strokes focus:border-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-grey/50 hover:text-primary-grey transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <OpenEye className="size-5" />
                ) : (
                  <ClosedEye className="size-5" />
                )}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 py-4 bg-primary text-white font-inter font-semibold text-base leading-none rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
