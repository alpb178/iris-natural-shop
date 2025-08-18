"use client";

import {
  entranceAnimationVariants,
  useEntranceAnimation
} from "@/hooks/useEntranceAnimation";
import { BookAppointmentModal } from "@/ui/appointments/BookAppointmentModal";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../button/Button";
import { Container } from "../container";
import { AmbientColor } from "../decorations/ambient-color";
import { Text } from "../text/Text";

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
  const { ref: animationRef, isInView } = useEntranceAnimation();
  return (
    <motion.div
      ref={animationRef}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <AmbientColor />
      <motion.div
        variants={entranceAnimationVariants.item}
        className="relative py-40"
      >
        <Container className="flex md:flex-row flex-col justify-between items-center px-8 w-full">
          <div className="flex flex-col">
            <Text
              as="heading"
              className="mx-auto md:mx-0 max-w-xl font-bold text-foreground text-xl md:text-3xl md:text-left text-center"
              content={heading}
            />
            <p className="mx-auto md:mx-0 mt-8 max-w-md text-foreground/80 text-sm md:text-base md:text-left text-center">
              {sub_heading}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {CTAs &&
              CTAs.map((cta, index) =>
                cta.target === "_self" ? (
                  <BookAppointmentModal key={cta.text} />
                ) : (
                  <Button
                    as={Link}
                    key={index}
                    href={cta.URL}
                    variant={cta.variant}
                    label={cta.text}
                  />
                )
              )}
          </div>
        </Container>
      </motion.div>
    </motion.div>
  );
};
