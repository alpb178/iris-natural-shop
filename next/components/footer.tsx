"use client";

import { Logo } from "@/components/logo";
import { Link } from "next-view-transitions";
import { socials } from "./dynamic-zone/socials";

export const Footer = ({ data, locale }: { data: any; locale: string }) => {
  return (
    <div className="relative">
      <div className="relative bg-card px-4 xs:px-8 pt-20 pb-24 border-t border-border">
        <div className="flex sm:flex-row flex-col justify-between items-start mx-auto px-4 max-w-7xl text-muted-foreground text-sm">
          <div>
            <div className="md:flex mr-4 mb-4">
              {data?.logo?.image && <Logo image={data?.logo?.image} />}
            </div>
            <div className="max-w-xs">{data?.description}</div>
            <div className="mt-4">{`Copyright © ${new Date().getFullYear()} Iris Natural Shop`}</div>

            {data?.social_networks && (
              <div className="flex flex-row gap-4 mt-12">
                {data?.social_networks.map((social: any) => (
                  <Link
                    href={social.link.URL}
                    target="_blank"
                    key={social.alias}
                  >
                    {socials[social.name as keyof typeof socials]?.icon}
                  </Link>
                ))}
              </div>
            )}
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
