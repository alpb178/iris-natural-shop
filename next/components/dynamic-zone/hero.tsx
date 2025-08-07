"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cover } from "../decorations/cover";
import ShootingStars from "../decorations/shooting-star";
import StarBackground from "../decorations/star-background";
import { Button } from "../elements/button";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";

export const Hero = ({
  heading,
  sub_heading,
  CTAs,
  locale
}: {
  heading: string;
  sub_heading: string;
  CTAs: any[];
  locale: string;
}) => {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <StarBackground />
        <ShootingStars />
      </motion.div>
      <Heading
        as="h1"
        className="z-10 relative mx-auto mt-6 py-6 max-w-7xl font-semibold text-4xl md:text-4xl lg:text-8xl text-center"
      >
        {heading.substring(0, heading.lastIndexOf(" "))}{" "}
        <Cover>{heading.split(" ").pop()}</Cover>
      </Heading>
      <Subheading className="z-10 relative mx-auto mt-2 md:mt-6 max-w-3xl text-muted-foreground text-base md:text-xl text-center">
        {sub_heading}
      </Subheading>
      <div className="flex items-center space-x-2 mt-8">
        {CTAs &&
          CTAs.map((cta) => (
            <Button
              key={cta?.id}
              as={Link}
              href={`/${locale}${cta.URL}`}
              {...(cta.variant && { variant: cta.variant })}
            >
              {cta.text}
            </Button>
          ))}
      </div>
      <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-background to-transparent w-full h-80" />
    </div>
  );
};
