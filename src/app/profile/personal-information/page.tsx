"use client";

import { useEffect, useRef, useState } from "react";
import { RiPencilFill } from "@remixicon/react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth";
import Avatar from "@/components/common/Avatar";
import { setCurrentUser, upsertUser } from "@/store/authStore";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  address: z.string().optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInformationPage() {
  const { currentUser } = useAuth();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      setValue("fullName", currentUser.fullName || "");
      setValue("email", currentUser.email || "");
      setValue("phone", currentUser.phone || "");
      setValue("address", (currentUser as any).address || "");
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: PersonalInfoFormValues) => {
    if (!currentUser) {
      toast.error("Please log in first.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      ...data,
    };

    upsertUser(updatedUser);
    setCurrentUser(updatedUser);
    toast.success("Profile updated successfully!");
  };

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
    <div>
      <div className="md:hidden flex flex-col gap-6 mb-8 mt-2">
        <Link
          href="/profile"
          className="size-10 bg-white border border-eb-strokes rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <RiArrowLeftLine className="size-6 text-primary-grey" />
        </Link>
        <h2 className="text-2xl font-bold font-manrope text-primary-grey leading-none">
          Personal Information
        </h2>
      </div>

      <h2 className="hidden md:block text-[22px] font-semibold font-manrope text-primary-grey leading-none mb-6">
        Personal Information
      </h2>

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

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="bg-white border border-eb-strokes rounded-2xl p-4 md:p-6">
          <div className="space-y-6 max-w-none">
            <div>
              <label
                htmlFor="full-name"
                className="block font-inter font-normal text-sm text-primary-grey leading-3 mb-2 cursor-pointer"
              >
                Full Name
              </label>
              <input
                id="full-name"
                type="text"
                {...register("fullName")}
                className={`w-full px-4 py-3 border rounded-xl font-inter text-base text-primary-grey focus:outline-none transition-all ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500"
                    : "border-eb-strokes focus:border-primary"
                }`}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-inter font-normal text-sm text-primary-grey leading-3 mb-2 cursor-pointer"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 border rounded-xl font-inter text-base text-primary-grey focus:outline-none transition-all ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-eb-strokes focus:border-primary"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="phone-input-container">
              <label
                htmlFor="phone-input"
                className="block font-inter font-normal text-sm text-primary-grey leading-3 mb-2 cursor-pointer"
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
                    inputProps={{
                      id: "phone-input",
                    }}
                    inputClassName={`!flex-1 !min-w-0 !h-auto !px-4 !py-3 !border !rounded-xl !font-inter !text-base !text-primary-grey !focus:outline-none !transition-all ${
                      errors.phone
                        ? "!border-red-500 !focus:border-red-500"
                        : "!border-eb-strokes !focus:border-primary"
                    }`}
                    countrySelectorStyleProps={{
                      buttonClassName:
                        "!h-[48px] !px-2 !py-3 !border !border-eb-strokes !rounded-xl !bg-transparent !focus:border-primary !transition-all !flex !items-center !justify-center !gap-2 !w-20 !cursor-pointer",
                      buttonContentWrapperClassName:
                        "!flex !items-center !gap-1.5",
                      flagClassName: "!size-6 !rounded-sm",
                    }}
                  />
                )}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block font-inter font-normal text-sm text-primary-grey leading-3 mb-2 cursor-pointer"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Add address"
                {...register("address")}
                className="w-full px-4 py-3 border border-eb-strokes rounded-xl font-inter text-base  placeholder:text-[#999999] focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 bg-primary text-white font-inter font-semibold text-base leading-none rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
