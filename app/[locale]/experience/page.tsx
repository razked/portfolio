import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  achievements: string[];
};

export default function ExperiencePage() {
  const t = useTranslations("experience");

  const experience = t.raw("items") as ExperienceItem[];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("years")}</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            {experience.map((item: ExperienceItem, index: number) => (
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
                      {item.achievements.map(
                        (achievement: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                            <span className="text-muted-foreground">
                              {achievement}
                            </span>
                          </li>
                        )
                      )}
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
