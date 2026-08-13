
"use client";

import { motion } from "motion/react";
import { useLocale } from "next-intl";
import { isRtlLocale } from "@/lib/rtl";

// Keep in sync with PortalSidebar's ORIGIN_INSET so the button
// sits exactly at the circle's expansion origin.
const ORIGIN_INSET = 48;
const BUTTON_SIZE = 48; // h-12 w-12

const EASE = [0.65, 0, 0.35, 1] as const;

// Container is 12px tall, each line is 2px thick,
// so the vertical-center rest position is (12 - 2) / 2 = 5px.
const LINE_TOP = 5;
const OFFSET = 5; // how far each line sits from center when closed

export default function MenuToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const locale = useLocale();
  const isRtl = isRtlLocale(locale);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={`
        fixed
        z-[60]
        flex
        h-12
        w-12
        group
        items-center
        cursor-pointer
        justify-center
        rounded-full
        text-foreground
        transition-colors
        hover:border-primary/60
        ${isRtl ? "left-[5%]" : "right-[5%]"}
      `}
      style={{
        top: ORIGIN_INSET - BUTTON_SIZE / 2,
      }}
    >
      <span className="relative block h-[12px] w-6">
        {/* top line */}
        <motion.span
          className="absolute left-0 h-0.5 transition-colors duration-300 group-hover:bg-primary w-6 rounded-full bg-current"
          style={{ top: LINE_TOP, willChange: "transform" }}
          animate={
            open
              ? { y: 0, rotate: 45 }
              : { y: -OFFSET, rotate: 0 }
          }
          transition={{ duration: 0.35, ease: EASE }}
        />

        {/* bottom line */}
        <motion.span
          className="absolute left-0 h-0.5 w-6 transition-colors duration-300 group-hover:bg-primary rounded-full bg-current"
          style={{ top: LINE_TOP, willChange: "transform" }}
          animate={
            open
              ? { y: 0, rotate: -45 }
              : { y: OFFSET, rotate: 0 }
          }
          transition={{ duration: 0.35, ease: EASE }}
        />
      </span>
    </button>
  );
}

