import type { Metadata } from "next";
import { Space_Grotesk, Anton } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import "../globals.css";
import { routing } from "@/i18n/routing";

import SmoothScroll from "../components/animation/SmoothScroll";
import AmbientParticles from "../components/animation/AmbientParticles";
import Wrapper from "../components/Wrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import Preloader from "../components/animation/Preloader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://ahmedalamin.com"),
    title: {
  default: t("title"),
  template: locale === "ar" ? "%s | أحمد محمد" : "%s | Ahmed Mohamed",
},
    description: t("description"),
    keywords: ["Ahmed Mohamed", "Full-Stack Developer", "Next.js", "Portfolio"],
    authors: [{ name: "Ahmed Mohamed" }],
    creator: "Ahmed Mohamed",

    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },

     openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://ahmedalamin.com/${locale}`,
      siteName: "Ahmed Mohamed",
      images: [{ url: "/banner.png", width: 1200, height: 630 }],
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/banner.png"],
    },

    icons: {
      icon: "/Logo.png",
      shortcut: "/Logo.png",
      apple: "/Logo.png",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`
        ${spaceGrotesk.variable}
        ${anton.variable}
        h-full antialiased
      `}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Preloader/>
          <SmoothScroll>
            <AmbientParticles />
            
            <Wrapper>
              {children}
            </Wrapper>
          </SmoothScroll>
          
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}