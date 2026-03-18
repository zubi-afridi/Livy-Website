import React from "react";
import Loader from "@/components/common/Loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 bg-white pointer-events-none">
      <Loader />
    </div>
  );
}
