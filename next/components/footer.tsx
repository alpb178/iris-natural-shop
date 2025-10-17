"use client";

import { Logo } from "@/components/logo";
import { Link } from "next-view-transitions";
import { socials } from "./dynamic-zone/socials";
import { useAppMode } from "@/hooks/useAppMode";

export const Footer = ({ data, locale }: { data: any; locale: string }) => {
  const { isDark } = useAppMode();
  const logoIcon = !isDark ? data?.logo?.imageDark : data?.logo?.image;
  return (
    <div className="relative">
      <div className="relative bg-card flex flex-col px-10  pt-10 pb-10 border-t border-border gap-4  justify-center text-xs sm:text-sm md:px-36">
        <div className="flex flex-col sm:flex-row justify-between gap-4  w-full mb-4">
          <div>
            <div className="md:flex mr-4 mb-4">
              {data?.logo?.image && <Logo image={logoIcon} />}
            </div>
            <div className="max-w-96">{data?.description}</div>
          </div>

          <LinkSection links={data?.internal_links} locale={locale} />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
          {data?.social_networks && (
            <div className="flex flex-row gap-4 ">
              {data?.social_networks.map((social: any) => (
                <Link
                  href={social.link.URL}
                  target="_blank"
                  key={social.alias}
                  className="text-primary"
                >
                  {socials[social.name as keyof typeof socials]?.icon}
                </Link>
              ))}
            </div>
          )}
          {data?.copyright} - {data?.designed_developed_by}
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
  <div className="flex flex-col  space-y-4 ">
    {links &&
      links.length > 0 &&
      links.map((link) => (
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
