"use client";

import { useTranslations } from "next-intl";
import React from "react";

const Footer = () => {
  const t = useTranslations("contact");

  return (
    <footer
      dir="auto"
      className="w-full font-space max-w-3xl mx-auto mb-12 px-6 py-8 md:px-8 relative z-40"
    >
      <div className="w-full text-foreground gap-4 flex flex-col items-center justify-center mt-28">
        <h2 className="font-semibold text-body-text text-lg">
          {t("getInTouch")}
        </h2>

        <a
          href="mailto:ahmed.dev37@gmail.com"
          dir="ltr"
          className="font-anton text-foreground/90 hover:underline text-2xl sm:text-4xl"
        >
          ahmed.dev37@gmail.com
        </a>

        <div className="max-w-72 sm:max-w-sm mx-auto flex">
          <span
            dir="auto"
            className="text-foreground/70 text-sm text-center mt-4 w-full"
          >
            {t("createdBy")}{" "}
            <a
              href="https://github.com/Tajmirul/portfolio-2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline transition-colors"
            >
              {t("inspiredBy")}
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;