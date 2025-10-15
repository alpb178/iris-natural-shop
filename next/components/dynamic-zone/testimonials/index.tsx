"use client";

import {
  entranceAnimationVariants,
  useEntranceAnimation
} from "@/hooks/useEntranceAnimation";
import { usePageLoaded } from "@/hooks/usePageLoaded";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/definitions/Testimonial";
import { motion } from "framer-motion";
import { Subheading } from "../../elements/subheading";
import { Text } from "../../text/Text";

import { TestimonialsSlider } from "./slider";
import { TestimonialsMarquee } from "./testimonials-marquee";

export const Testimonials = ({
  heading,
  sub_heading,
  testimonials
}: {
  heading: string;
  sub_heading: string;
  testimonials: Testimonial[];
}) => {
  const { isPageLoaded } = usePageLoaded();
  const { ref, isInView } = useEntranceAnimation();

  console.log("testimonials - testimonials", testimonials);

  return (
    <motion.div
      ref={ref}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "relative",
        isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <div className="mt-20 pb-20">
        <motion.div variants={entranceAnimationVariants.item}>
          <Text as="title" className="pt-4 text-center" content={heading} />

          <Subheading>{sub_heading}</Subheading>
        </motion.div>
      </div>

      {testimonials && (
        <motion.div
          variants={entranceAnimationVariants.content}
          className="relative md:py-20 pb-20"
        >
          <div className="mt-20 w-full h-full">
            <TestimonialsSlider testimonials={testimonials} />
          </div>

          <div className="mt-20 w-full h-full">
            <TestimonialsMarquee testimonials={testimonials} />
          </div>
        </motion.div>
      )}

      <motion.div
        variants={entranceAnimationVariants.item}
        className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-background to-transparent w-full h-40"
      />
    </motion.div>
  );
};
