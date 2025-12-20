"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Linkedin, Menu } from "lucide-react";
import { socialLinks } from "@/config/social-links";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const tContact = useTranslations("contact");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const isRTL = locale === "he";

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navigation = [
    { name: t("home"), href: `/${locale}` },
    { name: t("about"), href: `/${locale}/about` },
    { name: t("experience"), href: `/${locale}/experience` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8 relative">
        <Logo locale={locale} size="sm" />

        <nav className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className="text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isActive(item.href) ? "bg-primary" : "bg-transparent"
                  }`}
                ></span>
                <span>{item.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-transparent"></span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="relative cursor-pointer [&_svg]:text-white"
            asChild
          >
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="[&_svg]:text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? "left" : "right"}
                className={`flex flex-col h-full p-6 ${
                  isRTL ? "[&>button]:left-4 [&>button]:right-auto" : ""
                }`}
              >
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="mb-6">
                    <Logo locale={locale} size="lg" />
                  </div>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto -mx-6 px-6">
                  <nav className="flex flex-col gap-2">
                    {navigation.map((item) => (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className="w-full justify-start cursor-pointer"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-2"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              isActive(item.href)
                                ? "bg-primary"
                                : "bg-transparent"
                            }`}
                          ></span>
                          <span>{item.name}</span>
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 space-y-4 pb-6">
                  <h3 className="text-lg font-semibold">Let's Work Together</h3>
                  <p className="text-sm text-muted-foreground">
                    Have a project in mind? Let's discuss how I can help bring
                    your ideas to life.
                  </p>
                  <Button
                    className="w-full cursor-pointer"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={`/${locale}#contact`}>Get in Touch</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
