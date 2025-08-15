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
            {data?.social_networks && (
              <LinkSection links={data?.social_networks} locale={locale} />
            )}
            {/* <div className="mt-10">
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
            </div> */}
          </div>
          <div className="items-start gap-10 grid grid-cols-2 mt-10 md:mt-0">
            <LinkSection links={data?.internal_links} locale={locale} />
            <LinkSection links={data?.policy_links} locale={locale} />
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
        className="text-foreground/80 hover:text-primary text-xs sm:text-sm transition-colors"
        href={`${link.URL.startsWith("http") ? "" : `/${locale}`}${link.URL}`}
      >
        {link.text}
      </Link>
    ))}
  </div>
);
