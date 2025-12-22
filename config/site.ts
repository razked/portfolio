/**
 * Site configuration for SEO and metadata
 * Update the siteUrl with your actual domain when deploying
 */
import { socialLinks } from "./social-links";

export const siteConfig = {
  name: "Raz Kedem",
  title: "Raz Kedem | Senior Full Stack Developer",
  description:
    "Senior Full Stack Developer with 10+ years of experience building production web applications. Specializing in React, Next.js, TypeScript, and scalable backend systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://razkedem.dev", // Update with your actual domain
  ogImage: "/about.png", // Open Graph image
  links: {
    github: socialLinks.github,
    linkedin: socialLinks.linkedin,
  },
  author: {
    name: "Raz Kedem",
    jobTitle: "Senior Full Stack Developer",
  },
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
    "Raz Kedem",
  ],
  locale: "en_US",
  locales: ["en"],
  defaultLocale: "en",
} as const;
