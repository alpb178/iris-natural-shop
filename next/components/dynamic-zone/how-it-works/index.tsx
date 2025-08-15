"use client";
import { Text } from "@/components/text/Text";
import {
  entranceAnimationVariants,
  useEntranceAnimation
} from "@/hooks/useEntranceAnimation";
import { motion } from "framer-motion";
import { FlowerIcon } from "lucide-react";
import { Container } from "../../container";
import { Subheading } from "../../elements/subheading";
import { FeatureIconContainer } from "../features/feature-icon-container";
import { Card } from "./card";

export const HowItWorks = ({
  heading,
  sub_heading,
  steps
}: {
  heading: string;
  sub_heading: string;
  steps: any;
}) => {
  const { ref, isInView } = useEntranceAnimation();

  return (
    <motion.div
      ref={ref}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={entranceAnimationVariants.item}>
        <Container className="z-40 relative mx-auto py-20 max-w-7xl">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <FlowerIcon className="w-6 h-6 text-foreground" />
          </FeatureIconContainer>

          <Text as="title" className="pt-4 text-center" content={heading} />
          <Subheading className="mx-auto max-w-3xl">{sub_heading}</Subheading>

          {steps &&
            steps.map(
              (item: { title: string; description: string }, index: number) => (
                <Card
                  title={item.title}
                  description={item.description}
                  index={index + 1}
                  key={"card" + index}
                />
              )
            )}
        </Container>
      </motion.div>
    </motion.div>
  );
};
