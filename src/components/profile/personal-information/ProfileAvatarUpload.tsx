"use client";

import { useRef } from "react";
import { RiPencilFill } from "@remixicon/react";
import Avatar from "@/components/common/Avatar";
import { useAuth } from "@/hooks/auth/useAuth";
import { setCurrentUser, upsertUser } from "@/store/authStore";
import toast from "react-hot-toast";

const ProfileAvatarUpload = () => {
  const { currentUser } = useAuth();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handlePickAvatar = () => {
    fileRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file only.");
      return;
    }
    if (!currentUser) {
      toast.error("Please log in first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (!result) {
        toast.error("Failed to read image. Please try again.");
        return;
      }
      const updated = { ...currentUser, avatarUrl: result };
      upsertUser(updated);
      setCurrentUser(updated);
      toast.success("Profile photo updated.");
    };
    reader.onerror = () => {
      toast.error("Failed to read image. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white border border-eb-strokes rounded-2xl p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="relative inline-block">
          <Avatar
            name={currentUser?.fullName}
            src={currentUser?.avatarUrl ?? null}
            size={60}
            className="size-15 rounded-xl object-cover border-2 border-primary-grey text-2xl"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handlePickAvatar}
            className="absolute -right-2 -top-2 size-5 bg-primary-grey rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3a3a3c] transition-colors shadow-md"
            aria-label="Change profile photo"
          >
            <RiPencilFill className="size-3 text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-manrope font-semibold text-xl text-primary-grey leading-none">
            {currentUser?.fullName ?? "User"}
          </h3>
          <p className="font-inter text-sm font-normal text-secondary-text leading-3">
            {currentUser?.email ?? ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatarUpload;
