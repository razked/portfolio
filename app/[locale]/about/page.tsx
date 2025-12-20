import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AvatarVideo } from "@/components/avatar-video";

export default function AboutPage() {
  const t = useTranslations("about");

  const skills = {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vue.js",
      "Redux",
      "React Query",
      "Framer Motion",
    ],
    backend: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "REST APIs",
      "Microservices",
    ],
    devops: [
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "GitHub Actions",
      "Terraform",
      "Vercel",
      "Nginx",
    ],
    tools: [
      "Git",
      "Agile/Scrum",
      "TDD",
      "System Design",
      "Code Review",
      "Mentoring",
      "Documentation",
      "Performance Optimization",
    ],
  };

  const experience = [
    {
      period: "2020 - Present",
      role: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      achievements: [
        "Led development of enterprise SaaS platform serving 10,000+ users",
        "Reduced application load time by 60% through optimization",
        "Mentored team of 5 junior developers",
      ],
    },
    {
      period: "2018 - 2020",
      role: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      achievements: [
        "Built and deployed 15+ client projects",
        "Implemented CI/CD pipeline reducing deployment time by 75%",
        "Introduced TypeScript and modern development practices",
      ],
    },
    {
      period: "2015 - 2018",
      role: "Frontend Developer",
      company: "Creative Agency",
      achievements: [
        "Developed responsive web applications for major brands",
        "Improved accessibility scores to AAA standard",
        "Created reusable component library",
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
            <div className="flex-shrink-0">
              <AvatarVideo className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40 lg:h-48 lg:w-48" />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mb-2 text-xl text-muted-foreground">
                {t("subtitle")}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="border-b border-border/40 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("skills.title")}
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("skills.categories.frontend")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <Badge key={skill} variant="default" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("skills.categories.backend")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <Badge key={skill} variant="default" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("skills.categories.devops")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.devops.map((skill) => (
                    <Badge key={skill} variant="default" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("skills.categories.tools")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} variant="default" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("experience.title")}
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              {t("experience.years")}
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-8">
            {experience.map((item, index) => (
              <div key={index}>
                <Card className="border-border/40">
                  <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-2xl">{item.role}</CardTitle>
                        <p className="mt-1 text-lg text-muted-foreground">
                          {item.company}
                        </p>
                      </div>
                      <Badge variant="outline" className="self-start text-sm">
                        {item.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span className="text-muted-foreground">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                {index < experience.length - 1 && (
                  <Separator className="my-8 w-1/2 mx-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
