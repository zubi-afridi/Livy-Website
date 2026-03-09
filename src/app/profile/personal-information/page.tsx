"use client";

import { useState } from "react";
import Image from "next/image";
import { RiPencilFill } from "@remixicon/react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";

export default function PersonalInformationPage() {
  const [phone, setPhone] = useState("");

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
            <Image
              src="/images/profile.png"
              alt="Alex Costa"
              width={120}
              height={120}
              className="size-15 rounded-xl object-cover border-2 border-primary-grey"
            />
            <div className="absolute -right-2 -top-2 size-5 bg-primary-grey rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3a3a3c] transition-colors shadow-md">
              <RiPencilFill className="size-3 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-manrope font-semibold text-xl text-primary-grey leading-none">
              Alex Costa
            </h3>
            <p className="font-inter text-sm font-normal text-secondary-text leading-3">
              abc123@gmail.com
            </p>
          </div>
        </div>
      </div>

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
              defaultValue="Alex Costa"
              className="w-full px-4 py-3 border border-eb-strokes rounded-xl font-inter text-base text-primary-grey focus:outline-none focus:border-primary transition-all"
            />
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
              defaultValue="abc123@gmail.com"
              className="w-full px-4 py-3 border border-eb-strokes rounded-xl font-inter text-base text-primary-grey focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="phone-input-container">
            <label
              htmlFor="phone-input"
              className="block font-inter font-normal text-sm text-primary-grey leading-3 mb-2 cursor-pointer"
            >
              Phone Number
            </label>
            <PhoneInput
              defaultCountry="br"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              disableDialCodeAndPrefix={true}
              disableFormatting={true}
              className="w-full flex gap-3"
              inputProps={{
                id: "phone-input",
              }}
              inputClassName="!flex-1 !min-w-0 !h-auto !px-4 !py-3 !border !border-eb-strokes !rounded-xl !font-inter !text-base !text-primary-grey !focus:outline-none !focus:border-primary !transition-all"
              countrySelectorStyleProps={{
                buttonClassName:
                  "!h-[48px] !px-2 !py-3 !border !border-eb-strokes !rounded-xl !bg-transparent !focus:border-primary !transition-all !flex !items-center !justify-center !gap-2 !w-20 !cursor-pointer",
                buttonContentWrapperClassName: "!flex !items-center !gap-1.5",
                flagClassName: "!size-6 !rounded-sm",
              }}
            />
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
              className="w-full px-4 py-3 border border-eb-strokes rounded-xl font-inter text-base text-[#999999] placeholder:text-[#999999] focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button className="px-12 py-4 bg-primary text-white font-inter font-semibold text-base leading-none rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-md active:scale-[0.98] cursor-pointer">
          Save changes
        </button>
      </div>
    </div>
  );
}
