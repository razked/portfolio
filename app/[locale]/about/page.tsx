import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Monitor, Server, Cloud, Wrench } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  const skillCategories = ["frontend", "backend", "devops", "tools"] as const;

  const skills = {
    frontend: t.raw("skills.list.frontend") as string[],
    backend: t.raw("skills.list.backend") as string[],
    devops: t.raw("skills.list.devops") as string[],
    tools: t.raw("skills.list.tools") as string[],
  };

  const categoryIcons = {
    frontend: Monitor,
    backend: Server,
    devops: Cloud,
    tools: Wrench,
  };

  const categoryColors = {
    frontend: {
      color: "hsl(var(--primary))",
      bg: "hsl(var(--primary) / 0.1)",
      gradient:
        "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent",
    },
    backend: {
      color: "oklch(0.587 0.2158 281.66)",
      bg: "oklch(0.587 0.2158 281.66 / 0.1)",
      gradientFrom: "oklch(0.587 0.2158 281.66)",
      gradientTo: "oklch(0.587 0.2158 281.66 / 0.6)",
    },
    devops: {
      color: "oklch(0.7534 0.1349 67.6)",
      bg: "oklch(0.7534 0.1349 67.6 / 0.1)",
      gradientFrom: "oklch(0.7534 0.1349 67.6)",
      gradientTo: "oklch(0.7534 0.1349 67.6 / 0.6)",
    },
    tools: {
      color: "oklch(0.7398 0.1621 6.01)",
      bg: "oklch(0.7398 0.1621 6.01 / 0.1)",
      gradientFrom: "oklch(0.7398 0.1621 6.01)",
      gradientTo: "oklch(0.7398 0.1621 6.01 / 0.6)",
    },
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
            <div className="flex-shrink-0">
              <div className="relative rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg shadow-white/20 sm:p-3 lg:p-4">
                <Image
                  src="/about.png"
                  alt="Avatar"
                  width={192}
                  height={192}
                  className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mb-2 text-xl text-muted-foreground">
                {t("subtitle")}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("skills.title")}
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2">
            {skillCategories.map((category) => {
              const Icon = categoryIcons[category];
              const categoryColor = categoryColors[category];
              const { color, bg } = categoryColor;

              let titleClassName = "text-2xl";
              let titleStyle: React.CSSProperties | undefined = undefined;

              if (category === "frontend") {
                const frontendColor =
                  categoryColor as typeof categoryColors.frontend;
                titleClassName = `text-2xl ${frontendColor.gradient}`;
              } else {
                const otherColor = categoryColor as {
                  gradientFrom: string;
                  gradientTo: string;
                };
                titleStyle = {
                  background: `linear-gradient(to right, ${otherColor.gradientFrom}, ${otherColor.gradientTo})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                };
              }

              return (
                <Card key={category} className="border-border/40">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {category === "frontend" ? (
                        <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      ) : (
                        <div
                          className="flex items-center justify-center rounded-lg p-2"
                          style={{ backgroundColor: bg }}
                        >
                          <Icon className="h-6 w-6" style={{ color: color }} />
                        </div>
                      )}
                      <CardTitle className={titleClassName} style={titleStyle}>
                        {t(`skills.categories.${category}`)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills[category].map((skill: string) => (
                        <Badge
                          key={skill}
                          variant="default"
                          className="text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
