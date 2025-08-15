"use client";

import {
  entranceAnimationVariants,
  useEntranceAnimation
} from "@/hooks/useEntranceAnimation";
import { motion } from "framer-motion";

// Example of how to use the reusable animation system
export const AnimatedComponentExample = () => {
  const { ref, isInView } = useEntranceAnimation({
    amount: 0.2 // Customize when animation triggers
  });

  return (
    <motion.div
      ref={ref}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="p-8"
    >
      {/* Icon with rotation animation */}
      <motion.div variants={entranceAnimationVariants.icon}>
        <div className="bg-blue-500 mx-auto mb-4 rounded-full w-16 h-16" />
      </motion.div>

      {/* Title with slide up animation */}
      <motion.h2 variants={entranceAnimationVariants.item}>
        <h2 className="mb-4 font-bold text-2xl text-center">Animated Title</h2>
      </motion.h2>

      {/* Content with slide up animation */}
      <motion.p variants={entranceAnimationVariants.item}>
        <p className="mb-4 text-gray-600 text-center">
          This content animates in with staggered timing
        </p>
      </motion.p>

      {/* Button with scale animation */}
      <motion.div variants={entranceAnimationVariants.scaleIn}>
        <button className="block bg-blue-500 mx-auto px-6 py-2 rounded-lg text-white">
          Animated Button
        </button>
      </motion.div>
    </motion.div>
  );
};

// Example with different animation types
export const AnimatedCardExample = () => {
  const { ref, isInView } = useEntranceAnimation();

  return (
    <motion.div
      ref={ref}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="gap-6 grid grid-cols-1 md:grid-cols-3 p-8"
    >
      {/* Left card slides in from left */}
      <motion.div variants={entranceAnimationVariants.slideLeft}>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="mb-2 font-semibold text-lg">Left Card</h3>
          <p className="text-gray-600">Slides in from the left</p>
        </div>
      </motion.div>

      {/* Center card scales in */}
      <motion.div variants={entranceAnimationVariants.scaleIn}>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="mb-2 font-semibold text-lg">Center Card</h3>
          <p className="text-gray-600">Scales in with bounce</p>
        </div>
      </motion.div>

      {/* Right card slides in from right */}
      <motion.div variants={entranceAnimationVariants.slideRight}>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="mb-2 font-semibold text-lg">Right Card</h3>
          <p className="text-gray-600">Slides in from the right</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
