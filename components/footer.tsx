"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useParams } from "next/navigation";
import { Github, Linkedin } from "lucide-react";
import { socialLinks } from "@/config/social-links";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const footerSocialLinks = [
    { name: "GitHub", icon: Github, href: socialLinks.github },
    { name: "LinkedIn", icon: Linkedin, href: socialLinks.linkedin },
  ];

  return (
    <footer className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo locale={locale} size="lg" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Senior Full Stack Developer crafting elegant solutions to complex
              problems.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t("connect")}</h3>
            <div className="flex gap-2">
              {footerSocialLinks.map((link) => (
                <Button key={link.name} variant="ghost" size="icon" asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="cursor-pointer"
                  >
                    <link.icon className="size-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative my-8 w-full section-border-bottom"></div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row pt-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Raz Kedem. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
