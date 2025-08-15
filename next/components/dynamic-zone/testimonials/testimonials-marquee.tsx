"use client";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { Card } from "../../card/Card";

export const TestimonialsMarquee = ({
  testimonials
}: {
  testimonials: any;
}) => {
  const levelOne = testimonials.slice(0, 8);
  const levelTwo = testimonials.slice(8, 16);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative flex h-full">
        <div className="left-0 z-30 absolute inset-y-0 bg-gradient-to-r from-background to-transparent w-20 h-full" />
        <div className="right-0 z-30 absolute inset-y-0 bg-gradient-to-l from-background to-transparent w-20 h-full" />
        <Marquee>
          {levelOne.map((testimonial: any, index: any) => (
            <Card
              key={`testimonial-${testimonial.id}-${index}`}
              className="mx-4 max-w-xl h-60"
            >
              <Quote>{testimonial?.text}</Quote>
              <div className="flex items-center gap-2 mt-8">
                <Image
                  src={strapiImage(testimonial?.user?.image?.url)}
                  alt={`${testimonial.user.firstname} ${testimonial.user.lastname}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <QuoteDescription className="text-foreground/80">
                    {`${testimonial.user.firstname} ${testimonial.user.lastname}`}
                  </QuoteDescription>
                  <QuoteDescription className="text-foreground/60">
                    {testimonial.user.job}
                  </QuoteDescription>
                </div>
              </div>
            </Card>
          ))}
        </Marquee>
      </div>
      <div className="relative flex mt-8 h-full">
        <div className="left-0 z-30 absolute inset-y-0 bg-gradient-to-r from-background to-transparent w-20 h-full" />
        <div className="right-0 z-30 absolute inset-y-0 bg-gradient-to-l from-background to-transparent w-20 h-full" />
        <Marquee direction="right" speed={20}>
          {levelTwo.map((testimonial: any, index: any) => (
            <Card
              key={`testimonial-${testimonial.id}-${index}`}
              className="mx-4 max-w-xl h-60"
            >
              <Quote>{testimonial.text}</Quote>
              <div className="flex items-center gap-2 mt-8">
                <Image
                  src={strapiImage(testimonial?.user?.image?.url)}
                  alt={`${testimonial.user.firstname} ${testimonial.user.lastname}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <QuoteDescription className="text-neutral-300">
                    {`${testimonial.user.firstname} ${testimonial.user.lastname}`}
                  </QuoteDescription>
                  <QuoteDescription className="text-neutral-400">
                    {testimonial.user.job}
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
        "py-2 font-libre font-medium text-foreground text-base",
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
