"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function ShootingStarScrollbar() {
  const { scrollYProgress } = useScroll();
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);

  // Measure the track and keep it in sync across resizes
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => setTrackHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="
        fixed
        end-3
        top-1/2
        -translate-y-1/2
        rounded-full
        h-[20vh]
        w-[2px]
        pointer-events-none
        bg-foreground/5
        overflow-hidden
        z-40
        xl:end-6
      "
    >
      {/* Scroll progress */}
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