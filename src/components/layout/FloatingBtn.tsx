"use client";
import { useState } from "react";
import Image from "next/image";
import SupportModal from "./SupportModal";

const FloatingBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="fixed md:bottom-6 bottom-22 md:right-6 right-5 z-20 cursor-pointer hover:scale-110 hover:-translate-y-2 transition-all ease-in-out duration-300 active:scale-100"
      >
        <Image
          src={"/images/Floating button.svg"}
          alt="Floating Button"
          width={100}
          height={100}
          className="size-16 sm:size-18 md:size-20 "
        />
      </div>

      <SupportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FloatingBtn;
