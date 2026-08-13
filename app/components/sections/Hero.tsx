"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import ShootingStarScrollbar from "../animation/ShootingStarScrollbar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
const t = useTranslations('hero');

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "hero-in",
          trigger: container.current,
          start: "top 70%",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      tl.from(".slide-up-and-fade", {
        y: 150,
        opacity: 0,
        stagger: 0.05,
      });
    },
    { scope: container },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "hero-out",
          trigger: container.current,
          start: "bottom 50%",
          end: "bottom 10%",
          scrub: 0.5,
        },
      });

      tl.to(".slide-up-and-fade", {
        y: -150,
        opacity: 0,
        stagger: 0.02,
      });
    },
    { scope: container },
  );

  return (
    <section
      id="home"
      className="w-full font-space max-w-6xl mx-auto px-6 md:px-8  z-40"
    >
      <div
  className="
    hidden
    xl:block
    fixed
    left-3
    rtl:left-auto
    rtl:right-3
    top-1/2
    -translate-y-1/2
    z-40
    [writing-mode:vertical-rl]
    rtl:[writing-mode:vertical-lr]
  "
>
  <a
    href="mailto:ahmed.dev37@gmail.com"
    className="
      text-sm
      text-foreground/70
      hover:text-foreground
      transition-colors
    "
  >
    ahmed.dev37@gmail.com
  </a>
</div>

<ShootingStarScrollbar />
      <div
        className=" z-10  justify-center flex min-h-svh flex-col gap-8"
        ref={container}
      >
        <div
  dir="ltr"
  className="
    slide-up-and-fade
    absolute
    flex
    gap-4

    left-[5%]
    top-[5%]

    rtl:left-auto
    rtl:right-[5%]

    md:top-auto
    md:bottom-[10%]
    md:left-1/2
    md:right-auto
    md:-translate-x-1/2

    rtl:md:left-1/2
    rtl:md:right-auto
  "
>
  <LanguageSwitcher />
</div>
        <div className="flex w-full flex-col sm:flex-row justify-start items-center gap-8">
          <div className="flex max-w-6xl flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-8 sm:w-2/3 lg:w-1/2 ">
              <h1 className="slide-up-and-fade font-anton uppercase text-6xl sm:text-[80px] -mt-4 text-left rtl:text-right  leading-none tracking-wide text-foreground">
  <span className="block text-primary">{t('heading.top')}</span>
  <span className="block ml-4 rtl:mr-4">{t('heading.bottom')}</span>
</h1>
              <p className="slide-up-and-fade -mt-4 text-left rtl:text-right text-base text-foreground/70 sm:text-lg">
                {t.rich("description", {
    name: (chunks) => (
      <span className="text-foreground">{chunks}</span>
    ),
  })}
              </p>

              <div className="slide-up-and-fade tracking-wider font-anton flex gap-4 items-center">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    window.lenis?.scrollTo("#projects");
                  }}
                  className="py-2 px-5  bg-primary hover:bg-primary/80 hover:text-background text-background text-base sm:text-lg"
                >
                  {t('actions.myWork')}
                </a>

                <a
                 href="/Ahmed_Mohamed_CV.pdf" target="_blank" rel="noopener noreferrer"
                  className="py-2 px-5  border-2 border-primary hover:bg-primary hover:text-background text-primary text-base sm:text-lg"
                >
                  {t('actions.resume')}
                </a>
              </div>

                    <div className="flex slide-up-and-fade items-center gap-2 mt-3">
  <span className="size-3 rounded-full bg-white flex items-center justify-center">
    <span className="size-2 rounded-full bg-second" />
  </span>

  <span className="text-sm text-body-text">
    {t('availability')}
  </span>
</div>
            </div>

            <div
  className="
    w-full px-6
    md:px-0 md:w-auto
    flex flex-row md:flex-col
    items-center md:items-end
    justify-between md:justify-start
    gap-6 md:gap-8
    absolute bottom-[5%]
    md:bottom-[10%]
    md:right-[6%]
    rtl:md:right-auto
    rtl:md:left-[6%]
  "
>
  <div className="slide-up-and-fade text-center md:text-right rtl:md:text-left rtl:text-right">
    <h5 className="text-3xl font-anton sm:text-3xl md:text-4xl  text-primary mb-1.5">
      2 +
    </h5>
    <p className="text-sm max-w-[80px] sm:max-w-none sm:text-base text-foreground/70">
      {t('stats.experience')}
    </p>
  </div>

  <div className="slide-up-and-fade text-center md:text-right rtl:md:text-left rtl:text-right">
    <h5 className="text-3xl font-anton sm:text-3xl md:text-4xl  text-primary mb-1.5">
      4 +
    </h5>
    <p className="text-sm max-w-[80px] sm:max-w-none sm:text-base text-foreground/70">
      {t('stats.projects')}
    </p>
  </div>

  <div className="slide-up-and-fade text-center md:text-right rtl:md:text-left rtl:text-right">
    <h5 className="text-3xl font-anton sm:text-3xl md:text-4xl  text-primary mb-1.5">
      5K +
    </h5>
    <p className="text-sm max-w-[80px] sm:max-w-none sm:text-base text-foreground/70">
      {t('stats.hours')}
    </p>
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}



 function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: 'en' | 'ar') => {
    router.replace(pathname, {locale: newLocale});
  };

  return (
<>
  <button
    type="button"
    onClick={() => switchLocale("ar")}
    className={`
      transition-colors cursor-pointer duration-300 ease-out
      hover:text-primary
      ${locale === "ar" ? "text-primary" : "text-foreground/70"}
    `}
  >
    عربي
  </button>

  <button
    type="button"
    onClick={() => switchLocale("en")}
    className={`
      transition-colors cursor-pointer duration-300 ease-out
      hover:text-primary
      ${locale === "en" ? "text-primary" : "text-foreground/70"}
    `}
  >
    English
  </button>
</>
  );
}