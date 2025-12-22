import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const routes = ["", "/about", "/experience"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each locale and route
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const path = locale === siteConfig.defaultLocale ? route : `/${locale}${route}`;
      const url = `${baseUrl}${path}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => {
              const locPath = loc === siteConfig.defaultLocale ? route : `/${loc}${route}`;
              return [loc, `${baseUrl}${locPath}`];
            })
          ),
        },
      });
    });
  });

  return sitemapEntries;
}

