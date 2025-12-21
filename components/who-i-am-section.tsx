"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Palette } from "lucide-react";
import {
  ChevronsRightIcon,
  type ChevronsRightIconHandle,
} from "@/components/ChevronsRightIcon";
import { useRef } from "react";
import { motion } from "motion/react";

const APPROACH_BULLET_CONFIGS = [
  {
    icon: Sparkles,
    color: "oklch(0.6856 0.1638 261.29)",
    bg: "oklch(0.6856 0.1638 261.29 / 0.1)",
    gradientFrom: "oklch(0.6856 0.1638 261.29)",
    gradientTo: "oklch(0.6856 0.1638 261.29 / 0.6)",
  },
  {
    icon: Zap,
    color: "oklch(0.78 0.145 165.77)",
    bg: "oklch(0.796 0.1282 127.7 / 0.1)",
    gradientFrom: "oklch(0.78 0.145 165.77)",
    gradientTo: "oklch(0.78 0.145 165.77 / 0.6)",
  },
  {
    icon: Palette,
    color: "oklch(0.587 0.2158 281.66)",
    bg: "oklch(0.587 0.2158 281.66 / 0.1)",
    gradientFrom: "oklch(0.587 0.2158 281.66)",
    gradientTo: "oklch(0.587 0.2158 281.66 / 0.6)",
  },
] as const;

export function WhoIAmSection() {
  const t = useTranslations("home");
  const desktopIconRef = useRef<ChevronsRightIconHandle>(null);
  const mobileIconRef = useRef<ChevronsRightIconHandle>(null);

  const bullets = t.raw("approach.bullets") as string[];
  const descriptions = t.raw("approach.descriptions") as string[];

  const handleDesktopMouseEnter = () =>
    desktopIconRef.current?.startAnimation();
  const handleDesktopMouseLeave = () => desktopIconRef.current?.stopAnimation();
  const handleMobileMouseEnter = () => mobileIconRef.current?.startAnimation();
  const handleMobileMouseLeave = () => mobileIconRef.current?.stopAnimation();

  return (
    <section
      id="who-am-i"
      className="relative py-16 sm:py-20 bg-background section-border-bottom"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left side - Text */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("approach.title")}
            </h2>
            <div className="mb-8 space-y-2 text-lg text-muted-foreground">
              <p>{t("approach.subtitle1")}</p>
              <p>{t("approach.subtitle2")}</p>
            </div>
            <div className="hidden lg:flex lg:justify-start">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group"
                onMouseEnter={handleDesktopMouseEnter}
                onMouseLeave={handleDesktopMouseLeave}
              >
                <Link href="/about" className="group">
                  {t("approach.cta")}
                  <ChevronsRightIcon
                    ref={desktopIconRef}
                    size={20}
                    isAnimated={false}
                  />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right side - Bullet Blocks */}
          <div className="space-y-3">
            {bullets.map((bullet: string, index: number) => {
              const config = APPROACH_BULLET_CONFIGS[index];
              const Icon = config.icon;
              const isPrimary = index === 0;

              const gradientStyle = isPrimary
                ? undefined
                : {
                    backgroundImage: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  };
              const gradientClassName = isPrimary
                ? "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                : "";

              return (
                <motion.div
                  key={`item-${index}`}
                  className="flex items-start gap-3 p-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-start justify-center rounded-lg pt-1"
                    style={{
                      backgroundColor: `${config.color}15`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`mb-1 text-base font-bold ${gradientClassName}`}
                      style={gradientStyle}
                    >
                      {bullet}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {descriptions[index]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            {/* Mobile CTA Button */}
            <div className="flex justify-center pt-4 lg:hidden">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group"
                onMouseEnter={handleMobileMouseEnter}
                onMouseLeave={handleMobileMouseLeave}
              >
                <Link href="/about" className="group">
                  {t("approach.cta")}
                  <ChevronsRightIcon
                    ref={mobileIconRef}
                    size={20}
                    isAnimated={false}
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
