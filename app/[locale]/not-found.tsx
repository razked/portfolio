import { NotFoundContent } from "@/components/not-found-content";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleNotFound() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NotFoundContent />
    </NextIntlClientProvider>
  );
}
