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
import { ArrowRight, Sparkles, Zap, Palette } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { AvatarVideo } from "@/components/avatar-video";

const APPROACH_BULLET_CONFIGS = [
  {
    icon: Sparkles,
    color: "var(--primary)",
  },
  {
    icon: Zap,
    color: "oklch(0.587 0.2158 281.66)",
  },
  {
    icon: Palette,
    color: "oklch(0.7534 0.1349 67.6)",
  },
] as const;

export default function Home() {
  const t = useTranslations("home");
  const tContact = useTranslations("contact");

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
      <section className="relative overflow-hidden section-border-bottom h-[100dvh] flex items-center -mt-16 pt-16">
        <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <AvatarVideo className="h-32 w-32 rounded-full object-cover sm:h-50 sm:w-50 lg:h-48 lg:w-48" />
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">{t("hero.name")}</span>
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
            </h1>

            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              {t("hero.description")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="group">
                <Link href="#who-am-i">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">{t("hero.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        {/* <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div> */}
      </section>

      {/* WHO AM I SECTION */}
      <section
        id="who-am-i"
        className="relative py-24 sm:py-32 bg-background section-border-bottom"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("approach.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("approach.subtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {(() => {
                const bullets = t.raw("approach.bullets");
                return bullets.flatMap((bullet: string, index: number) => {
                  const config = APPROACH_BULLET_CONFIGS[index];
                  const Icon = config.icon;

                  return [
                    <div
                      key={`item-${index}`}
                      className="flex items-center gap-2"
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: config.color }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: config.color }}
                      >
                        {bullet}
                      </span>
                    </div>,
                    index < bullets.length - 1 && (
                      <span
                        key={`separator-${index}`}
                        className="text-muted-foreground/50"
                      >
                        •
                      </span>
                    ),
                  ].filter(Boolean);
                });
              })()}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                {t("approach.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section
        id="projects"
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
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                {t("projects.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
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
            <Card>
              <CardContent className="pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
