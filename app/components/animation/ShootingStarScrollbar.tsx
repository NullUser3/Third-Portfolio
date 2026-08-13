"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function ShootingStarScrollbar() {
  const { scrollYProgress } = useScroll();

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div
      aria-hidden="true"
      className="
        fixed
        end-3
        top-[50svh]
        -translate-y-1/2
        rounded-full
        h-40
        w-[2px]
        pointer-events-none
        bg-foreground/5
        overflow-hidden
        z-40
        xl:end-6
      "
    >
      <motion.div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[2px]
          bg-primary
          shadow-[0_0_12px_theme(colors.primary)]
        "
        style={{ height: progressHeight }}
      />
    </div>
  );
}