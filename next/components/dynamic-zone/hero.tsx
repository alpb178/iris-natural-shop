"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button/Button";
import { Cover } from "../decorations/cover";
import ShootingStars from "../decorations/shooting-star";
import StarBackground from "../decorations/star-background";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";

interface BackgroundMedia {
  id: number;
  url: string;
  mime: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export const Hero = ({
  heading,
  sub_heading,
  backgroundMedia,
  CTAs,
  locale
}: {
  heading: string;
  sub_heading: string;
  backgroundMedia?: BackgroundMedia;
  CTAs: any[];
  locale: string;
}) => {
  const isVideo = backgroundMedia?.mime?.startsWith("video/");
  const isImage = backgroundMedia?.mime?.startsWith("image/");

  return (
    <div className="relative flex flex-col justify-center items-center mb-20 h-screen overflow-hidden">
      {/* Background Media */}
      {backgroundMedia && (
        <div className="absolute inset-0 w-full h-full">
          {isVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster={backgroundMedia.url}
            >
              <source src={backgroundMedia.url} type={backgroundMedia.mime} />
              Your browser does not support the video tag.
            </video>
          ) : isImage ? (
            <Image
              src={backgroundMedia.url}
              alt={backgroundMedia.alternativeText || "Hero background"}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          ) : null}

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/5" />
        </div>
      )}

      {/* Fallback to star background if no media */}
      {!backgroundMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <StarBackground />
          <ShootingStars />
        </motion.div>
      )}

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
              label={cta.text}
            />
          ))}
      </div>
      <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-black/50 to-transparent w-full h-80" />
    </div>
  );
};
