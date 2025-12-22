import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = siteConfig.url;
  const currentPath = locale === siteConfig.defaultLocale ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${currentPath}`;

  // Generate alternate language URLs
  const alternates: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path = loc === siteConfig.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${baseUrl}${path}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : siteConfig.locale,
      url: canonicalUrl,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${baseUrl}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.author.jobTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${baseUrl}${siteConfig.ogImage}`],
      creator: siteConfig.links.github,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
    manifest: "/manifest.json",
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} antialiased font-sans`}
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        <StructuredData type="Person" />
        <StructuredData type="Website" />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NextIntlClientProvider messages={messages}>
            <div className="flex min-h-screen flex-col">
              <Header locale={locale} />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
