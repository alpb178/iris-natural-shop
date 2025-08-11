"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../button/Button";
import { Container } from "../container";
import { AmbientColor } from "../decorations/ambient-color";

export const CTA = ({
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
    <div className="relative py-40">
      <AmbientColor />
      <Container className="flex md:flex-row flex-col justify-between items-center px-8 w-full">
        <div className="flex flex-col">
          <motion.h2 className="mx-auto md:mx-0 max-w-xl font-bold text-foreground text-xl md:text-3xl md:text-left text-center">
            {heading}
          </motion.h2>
          <p className="mx-auto md:mx-0 mt-8 max-w-md text-neutral-400 text-sm md:text-base md:text-left text-center">
            {sub_heading}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {CTAs &&
            CTAs.map((cta, index) => (
              <Button
                as={Link}
                key={index}
                href={`/${locale}${cta.URL}`}
                variant={cta.variant}
                label={cta.text}
              />
            ))}
        </div>
      </Container>
    </div>
  );
};
