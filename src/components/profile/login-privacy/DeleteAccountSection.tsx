"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteAccountModal from "@/components/common/DeleteAccountModal";
import {
  getCurrentUser,
  deleteUser,
  clearAllAuthData,
} from "@/store/authStore";
import toast from "react-hot-toast";

const DeleteAccountSection = () => {
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
    <>
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
    </>
  );
};

export default DeleteAccountSection;
