"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Experience = () => {
  const container = useRef<HTMLDivElement>(null);
  const t = useTranslations("experience");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 639px)", isDesktop: "(min-width: 640px)" },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "experience-in",
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
              id: "experience-out",
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
      id="experience"
      className="w-full font-space max-w-6xl mx-auto px-6 py-8 md:px-8 relative z-40"
    >
      <div className="w-full" ref={container}>
        <div className="slide-up-and-fade">
          <h2 className="font-medium mt-32 max-w-6xl w-full text-body-text">
            {t("title")}
          </h2>
          <div className="h-px max-w-6xl w-full bg-body-text mt-2" />
        </div>

        <div className="max-w-6xl mt-4 w-full">
          {/* Experience */}
          <div className=" sm:flex sm:justify-between">
            <div className="slide-up-and-fade sm:w-1/2 flex-col gap-1 flex">
              <span className="text-primary text-sm">
                {t("freelance.company")}
              </span>
              <h3 className="tracking-wide font-anton text-2xl sm:text-3xl">
                {t("freelance.role")}
              </h3>
              <span className="text-foreground/40 font-sora">
                {t("freelance.period")}
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:w-1/2">
              <p className="slide-up-and-fade text-foreground/80 mt-4 sm:mt-0">
                {t("freelance.description1")}
              </p>
              <p className="slide-up-and-fade text-foreground/80">
                {t("freelance.description2")}
              </p>
              <p className="slide-up-and-fade text-foreground/80">
                {t("freelance.description3")}
              </p>
            </div>
          </div>

          {/* Education */}
          <div className=" sm:flex sm:justify-between mt-21">
            <div className="slide-up-and-fade sm:w-1/2 flex flex-col gap-1">
              <span className="text-primary text-sm">
                {t("education.school")}
              </span>
              <h3 className="tracking-wide font-anton text-2xl sm:text-3xl">
                {t("education.degree")}
              </h3>
              <span className="text-foreground/40 font-sora">
                {t("education.period")}
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:w-1/2 mt-4 sm:mt-0">
              <p className="slide-up-and-fade text-foreground/80">{t("education.summary")}</p>
              <p className="slide-up-and-fade text-foreground/80">
                {t("education.coursework")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;