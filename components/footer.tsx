"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { GithubIcon, type GithubIconHandle } from "@/components/GithubIcon";
import {
  LinkedInIcon,
  type LinkedInIconHandle,
} from "@/components/LinkedinIcon";
import {
  MessageCircleIcon,
  type MessageCircleIconHandle,
} from "@/components/MessageCircleIcon";
import { socialLinks } from "@/config/social-links";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const githubIconRef = useRef<GithubIconHandle>(null);
  const linkedinIconRef = useRef<LinkedInIconHandle>(null);
  const whatsappIconRef = useRef<MessageCircleIconHandle>(null);

  const footerSocialLinks = [
    {
      name: "GitHub",
      Icon: GithubIcon,
      iconRef: githubIconRef,
      href: socialLinks.github,
    },
    {
      name: "LinkedIn",
      Icon: LinkedInIcon,
      iconRef: linkedinIconRef,
      href: socialLinks.linkedin,
    },
    {
      name: "WhatsApp",
      Icon: MessageCircleIcon,
      iconRef: whatsappIconRef,
      href: socialLinks.whatsapp,
    },
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
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  onMouseEnter={() => link.iconRef.current?.startAnimation()}
                  onMouseLeave={() => link.iconRef.current?.stopAnimation()}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="cursor-pointer"
                  >
                    <link.Icon
                      ref={link.iconRef}
                      size={20}
                      isAnimated={false}
                    />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative my-8 w-full section-border-bottom"></div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row pt-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Raz Kedem. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
