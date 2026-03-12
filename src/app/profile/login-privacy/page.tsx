"use client";

import { useState } from "react";
import OpenEye from "@/assets/icons/open-eye.svg";
import ClosedEye from "@/assets/icons/closed-eye.svg";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import DeleteAccountModal from "@/components/common/DeleteAccountModal";
import { useRouter } from "next/navigation";
import { getCurrentUser, deleteUser, clearAllAuthData } from "@/store/authStore";
import toast from "react-hot-toast";

export default function LoginPrivacyPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = () => {
    const user = getCurrentUser();
    if (user && user.id) {
      deleteUser(user.id);
    }
    clearAllAuthData();
    setIsDeleteModalOpen(false);
    toast.success("Your account is successfully deleted");
    router.push("/");
  };

  return (
    <div>
      <div className="md:hidden flex flex-col gap-6 mb-8 mt-2">
        <Link
          href="/profile"
          className="size-10 bg-white border border-eb-strokes rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <RiArrowLeftLine className="size-6 text-primary-grey" />
        </Link>
        <h2 className="text-2xl font-bold font-manrope text-primary-grey leading-none">
          Login & Privacy
        </h2>
      </div>

      <h2 className="hidden md:block text-[22px] font-semibold font-manrope text-primary-grey leading-none mb-6">
        Login & Privacy
      </h2>

      <div className="bg-white border border-eb-strokes rounded-2xl p-4 md:p-6 mb-6">
        <div className="space-y-6">
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
                className="w-full px-4 py-3 border border-eb-strokes rounded-xl font-inter text-base text-primary-grey placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-all pr-12"
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
          </div>

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
                className="w-full px-4 py-3 border border-eb-strokes rounded-xl font-inter text-base text-primary-grey placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-all pr-12"
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
          </div>

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
                className="w-full px-4 py-3 border border-eb-strokes rounded-xl font-inter text-base text-primary-grey placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-all pr-12"
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
          </div>

          <div className="flex justify-end pt-4">
            <button className="w-full md:w-auto px-12 py-4 bg-primary text-white font-inter font-semibold text-base leading-none rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-md active:scale-[0.98] cursor-pointer">
              Save changes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-eb-strokes rounded-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-manrope font-semibold text-lg text-primary-grey mb-1">
              Delete your account
            </h3>
            <p className="font-inter text-sm font-normal text-secondary-text">
              This action cannot be undone
            </p>
          </div>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-full md:w-auto px-12 py-3 bg-[#EBEBEB] text-primary-grey font-inter font-semibold text-sm rounded-xl hover:bg-[#E0E0E0] transition-all duration-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
