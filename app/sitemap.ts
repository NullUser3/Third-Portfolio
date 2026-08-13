import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { content } from "./components/hooks/content"; // ← adjust this path to match your actual file

const baseUrl = "https://ahmedalamin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [""]; // homepage — add "/about" etc. here later

  const projectRoutes = content.projects.map((p) => `/projects/${p.slug}`);

  const allRoutes = [...staticRoutes, ...projectRoutes];

  return allRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );
}