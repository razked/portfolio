import { siteConfig } from "@/config/site";

interface StructuredDataProps {
  type: "Person" | "Website" | "BreadcrumbList";
  data?: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "Person":
        return {
          ...baseData,
          "@type": "Person",
          name: siteConfig.author.name,
          jobTitle: siteConfig.author.jobTitle,
          description: siteConfig.description,
          url: siteConfig.url,
          image: `${siteConfig.url}${siteConfig.ogImage}`,
          sameAs: [
            siteConfig.links.github,
            siteConfig.links.linkedin,
          ],
          knowsAbout: [
            "Full Stack Development",
            "React",
            "Next.js",
            "TypeScript",
            "Web Development",
            "Software Engineering",
            "Frontend Development",
            "Backend Development",
          ],
          alumniOf: {
            "@type": "Organization",
            name: "Software Engineering",
          },
        };

      case "Website":
        return {
          ...baseData,
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          author: {
            "@type": "Person",
            name: siteConfig.author.name,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };

      case "BreadcrumbList":
        if (!data?.items) return null;
        return {
          ...baseData,
          "@type": "BreadcrumbList",
          itemListElement: (data.items as Array<{ name: string; url: string; position: number }>).map(
            (item) => ({
              "@type": "ListItem",
              position: item.position,
              name: item.name,
              item: `${siteConfig.url}${item.url}`,
            })
          ),
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}


