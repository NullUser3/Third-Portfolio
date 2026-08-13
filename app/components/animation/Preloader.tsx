"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".preloader-item", {
        y: "100%",
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(preloaderRef.current, { display: "none" });
        },
      });
    },
    { scope: preloaderRef }
  );

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex overflow-hidden pointer-events-none"
    >
      {/* Mobile: 4 panels */}
      <div className="preloader-item h-full w-[calc(100%/4+1px)] bg-second sm:w-[calc(100%/6+1px)] lg:w-[calc(10%+1px)]" />
      <div className="preloader-item -ml-px h-full w-[calc(100%/4+1px)] bg-second sm:w-[calc(100%/6+1px)] lg:w-[calc(10%+1px)]" />
      <div className="preloader-item -ml-px h-full w-[calc(100%/4+1px)] bg-second sm:w-[calc(100%/6+1px)] lg:w-[calc(10%+1px)]" />
      <div className="preloader-item -ml-px h-full w-[calc(100%/4+1px)] bg-second sm:w-[calc(100%/6+1px)] lg:w-[calc(10%+1px)]" />

      {/* Tablet: 2 additional */}
      <div className="preloader-item -ml-px hidden h-full w-[calc(100%/6+1px)] bg-second sm:block lg:w-[calc(10%+1px)]" />
      <div className="preloader-item -ml-px hidden h-full w-[calc(100%/6+1px)] bg-second sm:block lg:w-[calc(10%+1px)]" />

      {/* Desktop: 4 additional */}
      <div className="preloader-item -ml-px hidden h-full w-[calc(10%+1px)] bg-second lg:block" />
      <div className="preloader-item -ml-px hidden h-full w-[calc(10%+1px)] bg-second lg:block" />
      <div className="preloader-item -ml-px hidden h-full w-[calc(10%+1px)] bg-second lg:block" />
      <div className="preloader-item -ml-px hidden h-full w-[calc(10%+1px)] bg-second lg:block" />
    </div>
  );
};
export default Preloader;