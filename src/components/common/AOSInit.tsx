"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 120,
      delay: 0,
      anchorPlacement: "top-bottom",
    });

    AOS.refresh();
  }, []);

  return null;
};

export default AOSInit;
