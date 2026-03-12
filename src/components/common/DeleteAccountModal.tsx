"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-60 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] md:w-[95%] max-w-125 max-h-[90dvh] bg-white z-70 rounded-[20px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col">
        <div className="shrink-0 flex items-center justify-between px-5 md:px-6 py-3 md:py-3 border-b border-[#F2F2F2]">
          <h2 className="text-[18px] md:text-[24px] font-semibold font-manrope text-[#262626]">
            Delete your account
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors group cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-[#262626]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 min-[400px]:py-6 md:px-8 md:py-6 flex flex-col items-center text-center">
          <div className="mb-3 min-[400px]:mb-4 md:mb-2">
            <Image
              src="/icons/delete-icon.svg"
              alt="Delete Account"
              width={140}
              height={140}
              className="w-15 h-15 min-[400px]:w-20 min-[400px]:h-20 md:size-25"
            />
          </div>

          <h3 className="text-[16px] min-[400px]:text-[18px] md:text-[24px] font-bold font-manrope text-primary-grey  tracking-[0] mb-2 md:mb-4">
            Are You Sure You Want to Delete Your Account?
          </h3>

          <div className="space-y-1.5 md:space-y-3 mb-4 min-[400px]:mb-6 md:mb-12 max-w-105">
            <p className="text-[13px] min-[400px]:text-[14px] md:text-[16px] font-medium font-inter text-secondary-text leading-5 tracking-[0]">
              This will permanently Delete your account.
            </p>
            <p className="text-[11px] min-[400px]:text-[12px] md:text-[14px] font-normal font-inter text-secondary-text leading-5 tracking-[0]">
              You won&apos;t be able to access past reservations, check-in
              details, or any saved information. Once you confirm, the process
              can&apos;t be reversed.
            </p>
          </div>

          <div className="flex flex-row gap-2 md:gap-3 w-full mt-auto justify-center items-center">
            <button
              onClick={onClose}
              className="flex-1 md:flex-1 px-3 py-2.5 min-[400px]:py-3 md:py-4 border border-primary rounded-lg md:rounded-lg text-primary font-semibold font-inter leading-none tracking-[0] transition-colors hover:bg-[#b63e41]/5 text-[13px] min-[400px]:text-[13px] md:text-[14px] cursor-pointer active:scale-[0.98] whitespace-nowrap"
            >
              <span className="md:hidden">Cancel</span>
              <span className="hidden md:inline">No, Keep My Account</span>
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 md:flex-1 px-3 py-2.5 min-[400px]:py-3 md:py-4 bg-primary border border-primary rounded-lg md:rounded-lg text-white font-semibold font-inter leading-none tracking-[0] transition-colors hover:bg-primary/90 text-[13px] min-[400px]:text-[13px] md:text-[14px] cursor-pointer active:scale-[0.98] whitespace-nowrap"
            >
              <span className="md:hidden">Yes, Delete</span>
              <span className="hidden md:inline">Yes, Delete My Account</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountModal;
