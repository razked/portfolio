import { NotFoundContent } from "@/components/not-found-content";
import { NextIntlClientProvider } from "next-intl";
import "./[locale]/globals.css";

export default async function GlobalNotFound() {
  // Load English messages as fallback
  const messages = (await import("../messages/en.json")).default;

  return (
    <html lang="en" className="light">
      <body className="bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages} locale="en">
          <NotFoundContent locale="en" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
