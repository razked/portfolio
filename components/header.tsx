"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ContactForm } from "@/components/contact-form";

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
    { name: t("projects"), href: `/${locale}/projects` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`;
    }
    return pathname?.startsWith(href);
  };

  const switchLocale = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    window.location.href = path;
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            RK
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="text-sm font-medium"
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => switchLocale("en")}
                className={locale === "en" ? "bg-accent" : ""}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchLocale("he")}
                className={locale === "he" ? "bg-accent" : ""}
              >
                עברית
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col h-full">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle>{tContact("title")}</SheetTitle>
                  <SheetDescription>{tContact("subtitle")}</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto mt-6 space-y-6 pr-2">
                  <nav className="flex flex-col gap-2">
                    {navigation.map((item) => (
                      <Button
                        key={item.name}
                        variant={isActive(item.href) ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={item.href}>{item.name}</Link>
                      </Button>
                    ))}
                  </nav>
                  <div className="pt-4 border-t">
                    <ContactForm onSuccess={() => setIsOpen(false)} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
