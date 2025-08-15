"use client";

import { Text } from "@/components/text/Text";
import { StickyScroll } from "@/components/ui/sticky-scroll";
import {
  entranceAnimationVariants,
  useEntranceAnimation
} from "@/hooks/useEntranceAnimation";
import { IconRocket } from "@tabler/icons-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { Subheading } from "../elements/subheading";
import { FeatureIconContainer } from "./features/feature-icon-container";

export const Launches = ({
  heading,
  sub_heading,
  launches
}: {
  heading: string;
  sub_heading: string;
  launches: any[];
}) => {
  const { ref: animationRef, isInView } = useEntranceAnimation();

  const launchesWithDecoration = launches.map((entry) => ({
    ...entry,
    icon: <IconRocket className="w-8 h-8 text-secondary" />,
    content: (
      <p className="font-bold text-neutral-800 text-4xl md:text-7xl">
        {entry.mission_number}
      </p>
    )
  }));

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const backgrounds = [
    "var(--background)",
    "var(--primary)",
    "var(--background)"
  ];

  const [gradient, setGradient] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = launches.map(
      (_, index) => index / launches.length
    );
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length]);
  });

  return (
    <motion.div
      ref={animationRef}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="px-6">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconRocket className="w-6 h-6 text-foreground" />
        </FeatureIconContainer>
        <Text as="title" className="mt-4 text-center" content={heading} />
        <Subheading>{sub_heading}</Subheading>
      </div>
      <StickyScroll content={launchesWithDecoration} />
    </motion.div>
  );
};
