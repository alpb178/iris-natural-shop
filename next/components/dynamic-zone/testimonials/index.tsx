"use client";
import { TbLocationBolt } from "react-icons/tb";
import { AmbientColor } from "../../decorations/ambient-color";
import { Subheading } from "../../elements/subheading";
import { Text } from "../../text/Text";
import { FeatureIconContainer } from "../features/feature-icon-container";
import { TestimonialsSlider } from "./slider";
import { TestimonialsMarquee } from "./testimonials-marquee";

export const Testimonials = ({
  heading,
  sub_heading,
  testimonials
}: {
  heading: string;
  sub_heading: string;
  testimonials: object;
}) => {
  return (
    <div className="relative">
      <AmbientColor />
      <div className="pb-20">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <TbLocationBolt className="w-6 h-6 text-foreground" />
        </FeatureIconContainer>
        <Text as="title" className="pt-4 text-center" content={heading} />
        <Subheading>{sub_heading}</Subheading>
      </div>

      {testimonials && (
        <div className="relative md:py-20 pb-20">
          <TestimonialsSlider testimonials={testimonials} />
          <div className="mt-20 w-full h-full">
            <TestimonialsMarquee testimonials={testimonials} />
          </div>
        </div>
      )}

      <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-background to-transparent w-full h-40"></div>
    </div>
  );
};
