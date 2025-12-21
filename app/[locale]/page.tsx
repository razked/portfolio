"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact-form";
import { AvatarVideo } from "@/components/avatar-video";
import {
  ChevronsRightIcon,
  type ChevronsRightIconHandle,
} from "@/components/ChevronsRightIcon";
import { WhoIAmSection } from "@/components/who-i-am-section";
import { useRef } from "react";
import { motion } from "motion/react";

export default function Home() {
  const t = useTranslations("home");
  const tContact = useTranslations("contact");
  const ctaIconRef = useRef<ChevronsRightIconHandle>(null);
  const projectsIconRef = useRef<ChevronsRightIconHandle>(null);

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      description:
        "A scalable multi-vendor marketplace with real-time inventory management",
      tags: ["Next.js", "PostgreSQL", "Redis", "Stripe"],
      image: "🛍️",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time data visualization platform processing millions of events",
      tags: ["React", "D3.js", "Node.js", "MongoDB"],
      image: "📊",
    },
    {
      title: "AI Content Generator",
      description:
        "Intelligent content creation tool powered by machine learning",
      tags: ["Python", "OpenAI", "FastAPI", "Redis"],
      image: "🤖",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-border-bottom h-[100dvh] flex items-center -mt-16 pt-16 hero-grid">
        <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <AvatarVideo className="h-32 w-32 rounded-full object-cover sm:h-50 sm:w-50 lg:h-48 lg:w-48 avatar-shadow" />
            </motion.div>
            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <span className="block">{t("hero.name")}</span>
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
            </motion.h1>

            <motion.p
              className="mb-10 text-lg text-muted-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <Button
                size="lg"
                asChild
                className="group"
                onMouseEnter={() => ctaIconRef.current?.startAnimation()}
                onMouseLeave={() => ctaIconRef.current?.stopAnimation()}
              >
                <Link href="#who-am-i" className="group">
                  {t("hero.cta")}
                  <ChevronsRightIcon
                    ref={ctaIconRef}
                    size={20}
                    isAnimated={false}
                  />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">{t("hero.contact")}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <WhoIAmSection />

      {/* Experience Section */}
      <section
        id="experience"
        className="relative py-24 sm:py-32 bg-background section-border-bottom"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("projects.title")}
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              {t("projects.subtitle")}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="mb-4 text-6xl">{project.image}</div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group"
              onMouseEnter={() => projectsIconRef.current?.startAnimation()}
              onMouseLeave={() => projectsIconRef.current?.stopAnimation()}
            >
              <Link href="/experience" className="group">
                {t("projects.viewAll")}
                <ChevronsRightIcon
                  ref={projectsIconRef}
                  size={20}
                  isAnimated={false}
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="relative bg-background py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {tContact("title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {tContact("subtitle")}
              </p>
            </div>
            <Card className="relative overflow-hidden bg-card/95 backdrop-blur-sm">
              {/* Wave Background */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <svg
                  className="absolute top-0 right-0 h-full w-[100%]"
                  preserveAspectRatio="none"
                  viewBox="0 0 600 600"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M800,0 L800,280 Q600,180 400,280 Q200,380 0,280 L0,800 L800,800 L800,0 Z"
                    fill="oklch(0.3556 0.0431 283.99)"
                    className="opacity-60 dark:opacity-30"
                  />
                </svg>
              </div>
              <CardContent className="relative z-10 pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
