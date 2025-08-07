"use client";
import { IconSettings } from "@tabler/icons-react";
import { Container } from "../../container";
import { Heading } from "../../elements/heading";
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
  return (
    <div>
      <Container className="z-40 relative mx-auto py-20 max-w-7xl">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconSettings className="w-6 h-6 text-foreground" />
        </FeatureIconContainer>
        <Heading className="pt-4">{heading}</Heading>
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
    </div>
  );
};
