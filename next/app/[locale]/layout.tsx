import "@/styles/globals.scss";

import { libreFranklin, merriweatherGaramond } from "@/components/fonts";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { generateMetadataObject } from "@/lib/shared/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { Providers } from "../providers";

// Default Global SEO for pages without them
export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "global",
    {
      filters: { locale: params.locale },
      populate: "seo.metaImage"
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  const { locale } = await params;

  const pageData = await fetchContentType(
    "global",
    { filters: { locale } },
    true
  );

  return (
    <html lang={locale}>
      <body
        className={cn(
          merriweatherGaramond.variable,
          libreFranklin.variable,
          "bg-background text-foreground antialiased h-full w-full"
        )}
      >
        <Providers locale={locale} messages={messages}>
          <Navbar data={pageData.navbar} locale={locale} />
          {children}
          <Footer data={pageData.footer} locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
