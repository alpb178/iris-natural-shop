"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { MouseEvent as ReactMouseEvent, useRef } from "react";
import Beam from "../../beam";
import { CanvasRevealEffect } from "../../ui/canvas-reveal-effect";

export const Card = ({
  title,
  description,
  index
}: {
  title: string;
  description: string;
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });

  const width = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 300]), {
    stiffness: 500,
    damping: 90
  });

  useMotionValueEvent(width, "change", (latest) => {});
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-4 mx-auto py-20 max-w-4xl"
    >
      <p className="mt-8 font-bold text-foreground/75 text-9xl">
        {"0" + index}
      </p>
      <motion.div
        className="hidden md:block relative bg-gradient-to-r from-foreground/60 to-foreground/0 mt-16 rounded-full w-full h-px overflow-hidden"
        style={{ width }}
      >
        <Beam className="top-0" />
      </motion.div>
      <div
        className="group z-40 relative col-span-2 bg-card p-8 border border-border rounded-md"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="z-10 absolute -inset-px opacity-0 group-hover:opacity-100 rounded-md transition duration-300 pointer-events-none"
          style={{
            maskImage: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              var(--neutral-900),
              transparent 80%
            )
          `
          }}
        >
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [109, 186, 116],
              [22, 163, 74]
            ]}
            dotSize={2}
          />
        </motion.div>

        <p className="z-20 relative mt-2 font-bold text-xl">{title}</p>
        <p className="z-20 relative mt-4 text-foreground/60">{description}</p>
      </div>
    </div>
  );
};
