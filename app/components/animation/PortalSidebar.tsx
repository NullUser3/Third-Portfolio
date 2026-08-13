"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Circle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isRtlLocale } from "@/lib/rtl";

const OPEN_EASE = [0.22, 1, 0.36, 1] as const;

const colorClasses = {
  yellow: "fill-yellow stroke-yellow",
  blue: "fill-blue stroke-blue",
  red: "fill-red stroke-red",
  purple: "fill-purple stroke-purple",
} as const;

const linkItems = [
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/ahmed-moham3d/",
  },
  {
    key: "github",
    href: "https://github.com/NullUser3",
  },
  {
    key: "email",
    href: "mailto:ahmed.dev37@gmail.com",
  },
  {
    key: "resume",
    href: "Ahmed_Mohamed_CV.pdf",
  },
] as const;

const listVariants: Variants = {
  open: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.12,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

export default function PortalSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const locale = useLocale();
  const isRTL = isRtlLocale(locale);

  const tNav = useTranslations("nav");
  const tLinks = useTranslations("links");

  const navItems = [
    {
      key: "home",
      href: { pathname: "/", hash: "home" },
      color: "yellow",
    },
    {
      key: "about",
      href: { pathname: "/", hash: "about" },
      color: "blue",
    },
    {
      key: "skills",
      href: { pathname: "/", hash: "skills" },
      color: "purple",
    },
    {
      key: "projects",
      href: { pathname: "/", hash: "projects" },
      color: "red",
    },
  ] as const;

  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = useMemo(
    () => ({
      open: {
        opacity: 1,
        x: 0,
      },
      closed: {
        opacity: 0,
        x: isRTL ? -12 : 12,
      },
    }),
    [isRTL]
  );

  return (
    <>
      {/* Backdrop */}
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.1 : 0.3,
          ease: OPEN_EASE,
        }}
        style={{
          pointerEvents: open ? "auto" : "none",
        }}
        className="fixed inset-0 z-50 bg-background/80"
      />

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: open ? 0 : isRTL ? "-100%" : "100%",
        }}
        transition={
          shouldReduceMotion
            ? {
                duration: 0.1,
              }
            : {
                duration: 0.45,
                ease: OPEN_EASE,
              }
        }
        className="
          fixed
          end-0
          top-0
          z-50
          font-space
          h-svh
          w-3/4
          sm:w-96
          overflow-hidden
          pointer-events-none
        "
      >
        <div className="absolute inset-0 pointer-events-auto bg-background">
          <div className="absolute inset-0 bg-foreground/10 z-0" />

          <motion.nav
            aria-hidden={!open}
            initial={false}
            animate={open ? "open" : "closed"}
            variants={listVariants}
            className="
              flex
              flex-col
              h-full
              justify-between
              text-foreground
              bg-background/80
              max-w-3/4
              mx-auto
              w-full
              text-lg
            "
          >
            {/* Top */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                h-2/3
                sm:items-center
                mt-10
                sm:gap-0
                gap-12
                sm:mt-0
                sm:justify-between
                w-full
              "
            >
              <div className="flex flex-col gap-4 z-10">
                <span className="text-body-text text-base">
                  {tNav("sectionTitle")}
                </span>

                {navItems.map(({ key, href, color }) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    transition={{
                      duration: 0.3,
                      ease: OPEN_EASE,
                    }}
                  >
                    <Link
                      className="
                        flex
                        hover:underline
                        items-center
                        text-lg
                        sm:text-xl
                        justify-items-start
                        gap-2
                        cursor-pointer
                      "
                      href={href}
                      onClick={() => onClose?.()}
                      tabIndex={open ? 0 : -1}
                    >
                      <Circle
                        className={`w-2 h-2 ${colorClasses[color]}`}
                      />

                      {tNav(key)}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-4 z-10">
                <span className="text-body-text text-base">
                  {tLinks("sectionTitle")}
                </span>

                {linkItems.map(({ key, href }) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    transition={{
                      duration: 0.3,
                      ease: OPEN_EASE,
                    }}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        hover:underline
                        items-center
                        text-lg
                        sm:text-xl
                        justify-items-start
                        gap-2
                      "
                      href={href}
                      tabIndex={open ? 0 : -1}
                    >
                      {tLinks(key)}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <motion.div
              variants={itemVariants}
              transition={{
                duration: 0.3,
                ease: OPEN_EASE,
              }}
              className="
                flex
                w-full
                h-1/3
                items-center
                justify-center
                z-10
              "
            >
              <span className="text-foreground/70 text-base">
                {tNav("createdUsing")}
              </span>
            </motion.div>
          </motion.nav>
        </div>
      </motion.aside>
    </>
  );
}