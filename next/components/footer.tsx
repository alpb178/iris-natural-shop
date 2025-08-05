import { Logo } from "@/components/logo";
import { Link } from "next-view-transitions";

export const Footer = async ({
  data,
  locale
}: {
  data: any;
  locale: string;
}) => {
  return (
    <div className="relative">
      <div className="relative bg-card px-8 pt-20 pb-32 border-t border-border">
        <div className="flex sm:flex-row flex-col justify-between items-start mx-auto px-4 max-w-7xl text-muted-foreground text-sm">
          <div>
            <div className="md:flex mr-4 mb-4">
              {data?.logo?.image && <Logo image={data?.logo?.image} />}
            </div>
            <div className="max-w-xs">{data?.description}</div>
            <div className="mt-4">{data?.copyright}</div>
            <div className="mt-10">
              Designed and Developed by{" "}
              <a
                className="text-foreground underline"
                href="https://aceternity.com"
              >
                Aceternity
              </a>{" "}
              &{" "}
              <a className="text-foreground underline" href="https://strapi.io">
                Strapi
              </a>
            </div>
            <div className="mt-2">
              built with{" "}
              <a className="text-foreground underline" href="https://strapi.io">
                Strapi
              </a>
              ,{" "}
              <a
                className="text-foreground underline"
                href="https://nextjs.org"
              >
                Next.js
              </a>
              ,{" "}
              <a
                className="text-foreground underline"
                href="https://tailwindcss.com"
              >
                Tailwind CSS
              </a>
              ,{" "}
              <a
                className="text-foreground underline"
                href="https://framer.com/motion"
              >
                Motion Animation Lib
              </a>
              , and{" "}
              <a
                className="text-foreground underline"
                href="https://ui.aceternity.com"
              >
                Aceternity UI
              </a>
            </div>
          </div>
          <div className="items-start gap-10 grid grid-cols-3 mt-10 md:mt-0">
            <LinkSection links={data?.internal_links} locale={locale} />
            <LinkSection links={data?.policy_links} locale={locale} />
            <LinkSection links={data?.social_media_links} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkSection = ({
  links,
  locale
}: {
  links: { text: string; URL: never | string }[];
  locale: string;
}) => (
  <div className="flex flex-col justify-center space-y-4 mt-4">
    {links.map((link) => (
      <Link
        key={link.text}
        className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors"
        href={`${link.URL.startsWith("http") ? "" : `/${locale}`}${link.URL}`}
      >
        {link.text}
      </Link>
    ))}
  </div>
);
