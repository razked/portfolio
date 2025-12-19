"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/mode-toggle";
import { GithubIcon, LinkedinIcon, EmailIcon } from "@/components/social-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useParams } from "next/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const socialLinks = [
    { name: "GitHub", icon: GithubIcon, href: "https://github.com" },
    { name: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
    { name: "Email", icon: EmailIcon, href: "mailto:hello@example.com" },
  ];

  return (
    <footer className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
              {socialLinks.map((link) => (
                <Button key={link.name} variant="ghost" size="icon" asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="cursor-pointer"
                  >
                    <link.icon
                      className={`h-5 w-5 ${
                        link.name === "Email" ? "text-primary" : ""
                      }`}
                    />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t("theme")}</h3>
            <ModeToggle />
          </div>
        </div>

        <div className="relative my-8 w-full section-border-bottom"></div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row pt-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Raz Kedem. {t("rights")}
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
