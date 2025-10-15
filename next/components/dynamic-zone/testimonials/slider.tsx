"use client";

import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn, truncate } from "@/lib/utils";
import { useAppMode } from "@/hooks/useAppMode";
import { Testimonial } from "@/definitions/Testimonial";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import { SparklesCore } from "../../ui/sparkles";

export const TestimonialsSlider = ({
  testimonials
}: {
  testimonials: Testimonial[];
}) => {
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useAppMode();

  const slicedTestimonials = testimonials.slice(0, 3);

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === slicedTestimonials.length ? 0 : (active) => active + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [active, autorotate, slicedTestimonials.length]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        heightFix();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section>
      <div className="z-30 relative mx-auto max-w-3xl h-80">
        <div className="relative pb-12 md:pb-20">
          {/* Particles animation */}
          <div className="-top-2 left-1/2 -z-10 absolute -mt-6 w-80 h-20 -translate-x-1/2">
            <MemoizedSparklesCore
              id="new-particles"
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={90}
              className="w-full h-full"
              particleColor="var(--primary)"
            />
          </div>

          {/* Carousel */}
          <div className="text-center">
            {/* Testimonial image */}
            <div className="relative h-40 [mask-image:_linear-gradient(0deg,transparent,#FFFFFF_30%,#FFFFFF)] md:[mask-image:_linear-gradient(0deg,transparent,#FFFFFF_40%,#FFFFFF)]">
              <div className="top-0 left-1/2 -z-10 before:-z-20 after:-z-20 absolute before:absolute after:absolute before:inset-0 after:inset-0 after:bg-card after:dark:bg-neutral-900 before:bg-gradient-to-b before:from-neutral-400/20 before:to-20% before:to-transparent after:m-px rounded-full before:rounded-full after:rounded-full w-[480px] h-[480px] -translate-x-1/2 pointer-events-none">
                {slicedTestimonials.map((item: any, index: number) => (
                  <Transition
                    key={index}
                    show={active === index}
                    enter="transition ease-&lsqb;cubic-bezier(0.68,-0.3,0.32,1)&rsqb; duration-700 order-first"
                    enterFrom="opacity-0 -translate-x-20"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-&lsqb;cubic-bezier(0.68,-0.3,0.32,1)&rsqb; duration-700"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-20"
                    beforeEnter={() => heightFix()}
                  >
                    <div className="-z-10 absolute inset-0 h-full">
                      <Image
                        className="top-6 left-1/2 relative rounded-full -translate-x-1/2"
                        src={strapiImage(
                          !isDark
                            ? item.ImageDark?.url ||
                                item.Image?.url ||
                                "/placeholder-avatar.png"
                            : item.Image?.url || "/placeholder-avatar.png"
                        )}
                        width={96}
                        height={96}
                        alt={`${item.title} `}
                      />
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            {/* Text */}
            <div className="mb-10 px-8 sm:px-6 transition-all duration-150 ease-in-out delay-300">
              <div className="relative flex flex-col" ref={testimonialsRef}>
                {slicedTestimonials.map((item: any, index: number) => (
                  <Transition
                    key={index}
                    show={active === index}
                    enter="transition ease-in-out duration-500 delay-200 order-first"
                    enterFrom="opacity-0 -translate-x-4"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-out duration-300 delay-300 absolute"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-4"
                    beforeEnter={() => heightFix()}
                  >
                    <div className="bg-clip-text bg-gradient-to-r from-card-foreground/60 via-card-foreground to-card-foreground/60 font-medium text-transparent text-base md:text-xl">
                      {truncate(item.description, 100)}
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap justify-center -m-1.5 px-8 sm:px-6">
              {slicedTestimonials.map((item: any, index: number) => (
                <button
                  className={cn(
                    `px-2 py-1 rounded-full m-1.5 text-xs border border-transparent text-neutral-100 transition duration-150 ease-in-out bg-card relative before:absolute before:inset-0 before:bg-card before:rounded-full before:pointer-events-none ${
                      active === index
                        ? "border-accent/90"
                        : "border-transparent opacity-50"
                    }`
                  )}
                  key={index}
                  onClick={() => {
                    setActive(index);
                    setAutorotate(false);
                  }}
                >
                  <span className="relative">
                    <span className="font-bold text-primary">
                      {`${item.title} `}
                    </span>{" "}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MemoizedSparklesCore = memo(SparklesCore);
