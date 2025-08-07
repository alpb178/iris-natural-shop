"use client";

import ShootingStars from "@/components/decorations/shooting-star";
import StarBackground from "@/components/decorations/star-background";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX
} from "@tabler/icons-react";
import Link from "next/link";

import { Button } from "../elements/button";

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
        <div className="mx-auto w-full max-w-md">
          <div>
            <h1 className="mt-8 font-bold text-foreground text-2xl leading-9 tracking-tight">
              {heading}
            </h1>
            <p className="mt-4 max-w-sm text-muted text-sm">{sub_heading}</p>
          </div>

          <div className="py-10">
            <div>
              <form className="space-y-4">
                {form &&
                  form?.inputs?.map((input: any) => (
                    <>
                      {input.type !== "submit" && (
                        <label
                          htmlFor="name"
                          className="block font-medium text-neutral-400 text-sm leading-6"
                        >
                          {input.name}
                        </label>
                      )}

                      <div className="mt-2">
                        {input.type === "textarea" ? (
                          <textarea
                            rows={5}
                            id="message"
                            placeholder={input.placeholder}
                            className="block bg-neutral-900 shadow-aceternity px-4 py-1.5 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400 w-full text-neutral-100 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        ) : input.type === "submit" ? (
                          <div>
                            <Button className="mt-6 w-full">
                              {input.name}
                            </Button>
                          </div>
                        ) : (
                          <input
                            id="name"
                            type={input.type}
                            placeholder={input.placeholder}
                            className="block bg-neutral-900 shadow-aceternity px-4 py-1.5 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400 w-full text-neutral-100 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        )}
                      </div>
                    </>
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
      <div className="hidden z-20 relative md:flex justify-center items-center bg-neutral-900 border-background border-l w-full overflow-hidden">
        <StarBackground />
        <ShootingStars />
        <div className="mx-auto max-w-sm">
          <div className="flex flex-row justify-center items-center mb-10 w-full">
            <AnimatedTooltip items={section.users} />
          </div>
          <p
            className={
              "font-semibold text-xl text-center  text-muted text-balance"
            }
          >
            {section.heading}
          </p>
          <p
            className={
              "font-normal text-base text-center text-neutral-500  mt-8 text-balance"
            }
          >
            {section.sub_heading}
          </p>
        </div>
      </div>
    </div>
  );
}
