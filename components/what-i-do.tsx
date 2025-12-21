"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Monitor,
  Server,
  Database,
  Shield,
  Cloud,
  ArrowLeftRight,
  type LucideIcon,
} from "lucide-react";
import {
  ChevronsRightIcon,
  type ChevronsRightIconHandle,
} from "@/components/ChevronsRightIcon";
import { useRef } from "react";
import { motion } from "motion/react";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Database,
  Shield,
  Cloud,
  ArrowLeftRight,
};

const iconColorMap = {
  Monitor: { color: "var(--primary)" },
  Server: { color: "var(--purple)" },
  Database: { color: "var(--icon-database)" },
  Shield: { color: "var(--red)" },
  Cloud: { color: "var(--orange)" },
  ArrowLeftRight: { color: "oklch(0.78 0.145 165.77)" },
};

export function WhatIDoGrid() {
  const t = useTranslations("home.projects");
  const items = t.raw("items") as Array<{ title: string; icon: string }>;
  const buttonIconRef = useRef<ChevronsRightIconHandle>(null);

  return (
    <section
      id="what-i-do"
      className="relative py-24 sm:py-32 bg-background section-border-bottom"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="mx-auto max-w-2xl text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        {/* Grid */}
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="
              grid grid-cols-2
              gap-4
              sm:grid-cols-3
              
            "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {items.map((item, index) => {
              const Icon = iconMap[item.icon];
              const colors =
                iconColorMap[item.icon as keyof typeof iconColorMap];

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Card className="h-full p-6 flex flex-col items-center justify-center text-center gap-4">
                    <Icon className="h-6 w-6" style={{ color: colors.color }} />
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button
            size="lg"
            variant="outline"
            asChild
            className="group"
            onMouseEnter={() => buttonIconRef.current?.startAnimation()}
            onMouseLeave={() => buttonIconRef.current?.stopAnimation()}
          >
            <Link href="/experience" className="group">
              {t("viewAll")}
              <ChevronsRightIcon
                ref={buttonIconRef}
                size={20}
                isAnimated={false}
              />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
