"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const REVEAL_START = "top 100%";
  const REVEAL_END = "bottom 0%";

  useGSAP(
    () => {
      // Grouped stagger sets, e.g. the skill-icon grid — one shared
      // timeline per group, items cascade in together, group fades
      // out as a single block (matches the original repo's Skills.tsx)
      const groups = containerRef.current?.querySelectorAll(".stagger-group");
      groups?.forEach((group) => {
        const staggerItems = group.querySelectorAll(".stagger-item");
        if (!staggerItems.length) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: group,
              start: REVEAL_START,
              end: REVEAL_END,
              scrub: 0.5,
            },
          })
          .fromTo(
            staggerItems,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "none", stagger: 0.15, duration: 1 },
          )
          .to(group, { y: -40, ease: "none", duration: 0.6 })
.to(group, { opacity: 0, ease: "none", duration: 0.6 }, "-=0.2")
      });

      // Independent leaf reveals — unchanged
      const items = containerRef.current?.querySelectorAll(".reveal");
      items?.forEach((el) => {
        gsap
          .timeline({
  scrollTrigger: {
    trigger: el,
    start: REVEAL_START,
    end: REVEAL_END,
    scrub: 0.5,
  },
})
          .fromTo(
            el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "none", duration: 1 },
          )
          .to(el, { y: -40, ease: "none", duration: 0.6 })
.to(el, { opacity: 0, ease: "none", duration: 0.6 }, "-=0.2")
      });
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
