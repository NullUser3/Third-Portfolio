"use client";

import { categories } from "../hooks/content";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
  const container = useRef<HTMLDivElement>(null);
  const t = useTranslations("skills");

  const translatedCategories = [
    { key: "frontend", title: t("categories.frontend"), items: categories[0].items },
    { key: "backend", title: t("categories.backend"), items: categories[1].items },
    { key: "databasesTools", title: t("categories.databasesTools"), items: categories[2].items },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 639px)", isDesktop: "(min-width: 640px)" },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "skills-in",
              trigger: container.current,
              start: isMobile ? "top 95%" : "top 70%",
              end: "bottom bottom",
              scrub: 0.5,
            },
          });

          tl.from(".slide-up-and-fade", {
            y: 150,
            opacity: 0,
            stagger: isMobile ? 0.03 : 0.05,
            // duration: 2,
          });
        }
      );

      return () => mm.revert();
    },
    { scope: container }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 639px)", isDesktop: "(min-width: 640px)" },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "skills-out",
              trigger: container.current,
              start: isMobile ? "bottom 50%" : "bottom 50%",
end: isMobile ? "bottom -12.5%" : "bottom 10%",
              scrub: 0.5,
            },
          });

          tl.to(".slide-up-and-fade", {
            y: -150,
            opacity: 0,
            stagger: isMobile ? 0.01 : 0.02,
          });
        }
      );

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      id="skills"
      className="w-full font-space max-w-6xl mx-auto px-6 py-8 md:px-8 relative z-40"
    >
      <div className="w-full" ref={container}>
        <div className="slide-up-and-fade">
          <h2 className="mt-32 font-medium max-w-6xl w-full text-body-text">
            {t("title")}
          </h2>
          <div className="h-px max-w-6xl w-full bg-body-text mt-2" />
        </div>

        <div className="max-w-6xl mt-4 w-full">
          <div className="flex flex-col gap-30">
            {translatedCategories.map((category) => (
              <div
                key={category.key}
                className="flex sm:flex-row gap-4 sm:gap-0 flex-col w-full"
              >
                <h3 className="slide-up-and-fade tracking-wide font-anton text-foreground uppercase text-2xl sm:text-4xl">
                  {category.title}
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 sm:rtl:mr-auto sm:w-1/2 sm:ml-auto">
                  {category.items.map((stack) => (
                    <div
                      className="slide-up-and-fade flex items-center gap-4 h-9"
                      key={stack.name}
                    >
                      <span className="sm:size-9 size-7 flex items-center justify-center">
                        {stack.svg}
                      </span>
                      <span>{stack.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;