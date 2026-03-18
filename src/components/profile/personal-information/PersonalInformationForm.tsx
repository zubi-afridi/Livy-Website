"use client";

import { useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useAuth } from "@/hooks/auth/useAuth";
import { setCurrentUser, upsertUser } from "@/store/authStore";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  address: z.string().optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

const PersonalInformationForm = () => {
  const { currentUser } = useAuth();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="bg-white border border-eb-strokes rounded-2xl p-4 md:p-6">
        <div className="space-y-6 max-w-none">
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Phone Number */}
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

          {/* Address */}
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
              className="w-full px-4 py-3 border border-eb-strokes rounded-xl font-inter text-base placeholder:text-[#999999] focus:outline-none focus:border-primary transition-all"
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
  );
};

export default PersonalInformationForm;
