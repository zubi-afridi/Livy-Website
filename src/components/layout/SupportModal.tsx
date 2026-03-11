"use client";

import React, { useEffect } from "react";
import { X, Headset, Settings, Clock } from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
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
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 font-inter">
      <div
        className="relative w-full max-w-112.5 bg-white rounded-3xl md:rounded-4xl shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 border-b border-gray-50 shrink-0">
          <h2 className="text-[20px] md:text-[22px] min-[1440px]:text-[24px] font-bold text-primary-grey font-manrope">
            Choose Support Type
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-primary-grey" />
          </button>
        </div>
        <div className="px-6 py-5 md:px-8 md:py-6 space-y-4 md:space-y-6 overflow-y-auto scrollbar-hide">
          <div className="space-y-2 md:space-y-4 mb-2 md:mb-4">
            <h3 className="text-[16px] md:text-[17px] min-[1440px]:text-[18px] font-semibold text-primary-grey font-manrope">
              Our team is available to assist you 24/7
            </h3>
            <div className="flex items-center gap-4 text-secondary-text text-[12px] md:text-[14px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#34C759]" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Avg. response: &lt; 5 min</span>
              </div>
            </div>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="bg-[#FFF1F1] rounded-2xl md:rounded-3xl p-4 md:p-6 space-y-3 md:space-y-4 border border-transparent hover:border-primary/10 transition-colors">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-[#B63E41] p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg shadow-primary/20">
                  <Headset className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h4 className="text-[16px] md:text-[17px] min-[1440px]:text-[18px] font-bold text-primary-grey font-manrope">
                  General Support
                </h4>
              </div>
              <p className="text-secondary-text text-[12px] md:text-[13px] min-[1440px]:text-[14px] leading-relaxed">
                Bookings, Payments, Property info and general questions
              </p>
              <button className="w-full bg-[#B63E41] text-white font-bold py-2.5 md:py-3.5 rounded-lg md:rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/20 text-center text-[14px] md:text-[16px]">
                Open WhatsApp
              </button>
            </div>
            <div className="bg-[#FFF1F1] rounded-2xl md:rounded-3xl p-4 md:p-6 space-y-3 md:space-y-4 border border-transparent hover:border-primary/10 transition-colors">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-[#B63E41] p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg shadow-primary/20">
                  <Settings className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h4 className="text-[16px] md:text-[17px] min-[1440px]:text-[18px] font-bold text-primary-grey font-manrope">
                  Technical Support
                </h4>
              </div>
              <p className="text-secondary-text text-[12px] md:text-[13px] min-[1440px]:text-[14px] leading-relaxed">
                Smart Lock, app issues, and technical Problems
              </p>
              <button className="w-full bg-[#B63E41] text-white font-bold py-2.5 md:py-3.5 rounded-lg md:rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/20 text-center text-[14px] md:text-[16px]">
                Open WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
