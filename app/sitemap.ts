import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

// Ensure URL has protocol
function normalizeUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = normalizeUrl(siteConfig.url);
  const routes = ["", "/about", "/experience"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each locale and route
  // Note: next-intl always uses locale prefix in URLs (app/[locale]/ structure)
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const path = `/${locale}${route}`;
      const url = `${baseUrl}${path}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => {
              const locPath = `/${loc}${route}`;
              return [loc, normalizeUrl(`${baseUrl}${locPath}`)];
            })
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
