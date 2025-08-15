"use client";

import { Button } from "@/components/button/Button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { usePageLoaded } from "@/hooks/usePageLoaded";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX
} from "@tabler/icons-react";
import Link from "next/link";
import { Text } from "../text/Text";

export function FormNextToSection({
  heading,
  sub_heading,
  form,
  section,
  social_media_icon_links
}: {
  heading: string;
  sub_heading: string;
  form: any;
  section: any;
  social_media_icon_links: any;
}) {
  const { isPageLoaded } = usePageLoaded();

  const socials = [
    {
      title: "twitter",
      href: "https://twitter.com/strapijs",
      icon: <IconBrandX className="w-5 h-5 text-muted hover:text-neutral-100" />
    },
    {
      title: "github",
      href: "https://github.com/strapi",
      icon: (
        <IconBrandGithub className="w-5 h-5 text-muted hover:text-neutral-100" />
      )
    },
    {
      title: "linkedin",
      href: "https://linkedin.com/strapi",
      icon: (
        <IconBrandLinkedin className="w-5 h-5 text-muted hover:text-neutral-100" />
      )
    }
  ];

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 w-full min-h-screen overflow-hidden">
      <div className="z-20 relative flex lg:flex-none justify-center items-center px-4 sm:px-6 lg:px-20 xl:px-24 py-4 lg:py-40 w-full">
        <div
          className={cn(
            "mx-auto w-full max-w-md transition-all duration-700 ease-out transform",
            isPageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          <div>
            <Text as="title" content={heading} />

            <Text
              className="mt-4 max-w-sm text-foreground/60"
              content={sub_heading}
            />
          </div>

          <div className="py-10">
            <div>
              <form className="space-y-6">
                {form &&
                  form?.inputs?.map((input: any) => (
                    <div className="mt-4">
                      {input.type !== "submit" && (
                        <label
                          htmlFor="name"
                          className="block mb-2 font-medium text-foreground/60"
                        >
                          {input.name}
                        </label>
                      )}

                      {input.type === "textarea" ? (
                        <textarea
                          rows={5}
                          id="message"
                          placeholder={input.placeholder}
                          className="block bg-card shadow-aceternity px-4 py-2.5 border border-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground w-full text-foreground placeholder:text-foreground/40 sm:text-sm sm:leading-6"
                        />
                      ) : input.type === "submit" ? (
                        <div className="flex justify-end items-center">
                          <Button className="mt-6" label={input.name} />
                        </div>
                      ) : (
                        <input
                          id="name"
                          type={input.type}
                          placeholder={input.placeholder}
                          className="block bg-card shadow-aceternity px-4 py-2.5 border border-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground w-full text-foreground placeholder:text-foreground/40 sm:text-sm sm:leading-6"
                        />
                      )}
                    </div>
                  ))}
              </form>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4 py-4">
            {socials.map((social) => (
              <Link href={social.href} target="_blank" key={social.title}>
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden z-20 relative md:flex justify-center items-center bg-background border-border border-l w-full overflow-hidden">
        {/* <StarBackground />
        <ShootingStars /> */}
        <div className="mx-auto max-w-sm">
          <div className="flex flex-row justify-center items-center mb-10 w-full">
            <AnimatedTooltip items={section.users} />
          </div>
          <p
            className={
              "font-semibold text-xl text-center  text-foreground/90 text-balance"
            }
          >
            {section.heading}
          </p>
          <p
            className={
              "font-normal text-base text-center text-foreground/60  mt-8 text-balance"
            }
          >
            {section.sub_heading}
          </p>
        </div>
      </div>
    </div>
  );
}
