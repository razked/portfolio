import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export function generatePageMetadata({
  locale,
  title,
  description,
  path,
  keywords,
}: {
  locale: string;
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const baseUrl = siteConfig.url;
  const currentPath = locale === siteConfig.defaultLocale ? path : `/${locale}${path}`;
  const canonicalUrl = `${baseUrl}${currentPath}`;

  // Generate alternate language URLs
  const alternates: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const locPath = loc === siteConfig.defaultLocale ? path : `/${loc}${path}`;
    alternates[loc] = `${baseUrl}${locPath}`;
  });

  return {
    title,
    description,
    keywords: keywords || siteConfig.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : siteConfig.locale,
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${baseUrl}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${siteConfig.ogImage}`],
    },
  };
}

