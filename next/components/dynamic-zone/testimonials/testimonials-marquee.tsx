"use client";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn } from "@/lib/utils";
import { useAppMode } from "@/hooks/useAppMode";
import { Testimonial } from "@/definitions/Testimonial";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { Card } from "../../card/Card";

export const TestimonialsMarquee = ({
  testimonials
}: {
  testimonials: Testimonial[];
}) => {
  const { isDark } = useAppMode();

  console.log("TestimonialsMarquee - testimonials:", testimonials);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative flex h-full">
        <Marquee>
          {testimonials.map((testimonial: any, index: any) => (
            <Card
              key={`testimonial-${testimonial.id}-${index}`}
              className="mx-4 max-w-xl h-60 border-2 border-primary rounded-lg"
            >
              <div className="flex items-center gap-2 ">
                <Image
                  src={strapiImage(
                    !isDark
                      ? testimonial?.ImageDark?.url
                      : testimonial?.Image?.url
                  )}
                  alt={`${testimonial.title} `}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <QuoteDescription className="text-foreground/80">
                    {`${testimonial.title} `}
                  </QuoteDescription>
                  <QuoteDescription className="text-foreground/60">
                    {testimonial?.description}
                  </QuoteDescription>
                </div>
              </div>
            </Card>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export const Quote = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "py-2 font-libre font-medium text-foreground border-2 border-primary rounded-lg text-base",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn("max-w-sm font-normal text-foreground text-sm", className)}
    >
      {children}
    </p>
  );
};
