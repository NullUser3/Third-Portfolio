"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const container = useRef<HTMLDivElement>(null);

  const t = useTranslations('about');
  
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 639px)", isDesktop: "(min-width: 640px)" },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "about-in",
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
              id: "about-out",
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
      id="about"
      className="w-full font-space max-w-6xl mx-auto px-6 py-8 md:px-8 relative z-40"
    >
      <div className="flex flex-col w-full items-center " ref={container}>
        <div className="w-full">
          <div className="slide-up-and-fade">
            <h2 className="mt-12 font-medium max-w-6xl text-body-text w-full">
              {t('title')}
            </h2>
            <div className="h-px max-w-6xl w-full bg-body-text mt-2" />
          </div>

          <div className="mt-4 sm:flex sm:justify-between max-w-6xl text-foreground/80 tracking-wide leading-relaxed">
            <div className="slide-up-and-fade sm:w-1/2 text-foreground text-xl sm:text-2xl font-bold">
              {t('introduction')}
            </div>

            <div className=" sm:w-1/2 font-medium mt-4 sm:mt-0">
              <p className="slide-up-and-fade">
  {t.rich("description", {
    degree: (chunks) => (
      <span className="text-primary">{chunks}</span>
    ),
  })}
</p>

              <p className="slide-up-and-fade mt-4">
  {t("descriptionBottom")}
</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;