"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A scalable multi-vendor marketplace with real-time inventory management, payment processing, and advanced analytics dashboard.",
      category: "web",
      tags: ["Next.js", "PostgreSQL", "Redis", "Stripe", "Docker"],
      image: "🛍️",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time data visualization platform processing millions of events per day with custom charting and export capabilities.",
      category: "web",
      tags: ["React", "D3.js", "Node.js", "MongoDB", "WebSockets"],
      image: "📊",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "AI Content Generator",
      description:
        "Intelligent content creation tool powered by machine learning algorithms for generating marketing copy and blog posts.",
      category: "web",
      tags: ["Python", "OpenAI", "FastAPI", "Redis", "React"],
      image: "🤖",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Mobile Fitness App",
      description:
        "Cross-platform mobile application for workout tracking, nutrition planning, and community challenges.",
      category: "mobile",
      tags: ["React Native", "Firebase", "Redux", "TypeScript"],
      image: "💪",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Task Management System",
      description:
        "Collaborative project management tool with kanban boards, time tracking, and team collaboration features.",
      category: "web",
      tags: ["Vue.js", "Node.js", "PostgreSQL", "Socket.io"],
      image: "📋",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Open Source UI Library",
      description:
        "Comprehensive component library with 50+ customizable components, built with accessibility in mind.",
      category: "open-source",
      tags: ["React", "TypeScript", "Storybook", "CSS-in-JS"],
      image: "🎨",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Real Estate Platform",
      description:
        "Property listing and management platform with virtual tours, mortgage calculator, and agent matching.",
      category: "web",
      tags: ["Next.js", "Prisma", "PostgreSQL", "AWS S3"],
      image: "🏠",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Social Media Scheduler",
      description:
        "Multi-platform social media scheduling tool with analytics, content calendar, and team collaboration.",
      category: "web",
      tags: ["React", "Node.js", "MongoDB", "Bull Queue"],
      image: "📱",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Markdown Editor",
      description:
        "Minimalist markdown editor with live preview, syntax highlighting, and export to multiple formats.",
      category: "open-source",
      tags: ["React", "TypeScript", "Monaco Editor", "Electron"],
      image: "✍️",
      github: "https://github.com",
      demo: "https://demo.com",
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="mb-12 flex justify-center">
            <Tabs
              value={filter}
              onValueChange={setFilter}
              className="w-full max-w-md"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">{t("filters.all")}</TabsTrigger>
                <TabsTrigger value="web">{t("filters.web")}</TabsTrigger>
                <TabsTrigger value="mobile">{t("filters.mobile")}</TabsTrigger>
                <TabsTrigger value="open-source">
                  {t("filters.open-source")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="group flex flex-col overflow-hidden border-border/40 transition-all hover:shadow-xl hover:-translate-y-2"
              >
                <CardHeader className="flex-1">
                  <div className="mb-4 text-6xl">{project.image}</div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
