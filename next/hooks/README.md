# Reusable Animation System

This directory contains reusable hooks and utilities for adding entrance animations to components when they come into view.

## 🎯 `useEntranceAnimation` Hook

A custom hook that provides intersection observer functionality for triggering animations when components enter the viewport.

### Usage

```tsx
import {
  useEntranceAnimation,
  entranceAnimationVariants
} from "@/hooks/useEntranceAnimation";
import { motion } from "framer-motion";

const MyComponent = () => {
  const { ref, isInView } = useEntranceAnimation();

  return (
    <motion.div
      ref={ref}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={entranceAnimationVariants.item}>
        Content here
      </motion.div>
    </motion.div>
  );
};
```

### Options

```tsx
const { ref, isInView } = useEntranceAnimation({
  amount: 0.3, // How much of the element must be visible (0-1)
  margin: "-100px 0px -100px 0px", // Trigger margin
  threshold: 0.5 // Alternative to amount (0-1)
});
```

## 🎨 Animation Variants

### Container Variants

- **`container`**: Main container with staggered children animation
- **`fadeIn`**: Simple fade in without movement

### Item Variants

- **`item`**: Standard slide up with scale (most common)
- **`icon`**: Rotation and scale animation (great for icons)
- **`content`**: Longer slide up animation
- **`slideUp`**: Slide up from below
- **`slideLeft`**: Slide in from left
- **`slideRight`**: Slide in from right
- **`scaleIn`**: Scale in with bounce effect

## 📱 Example Implementations

### Basic Component

```tsx
const BasicAnimatedComponent = () => {
  const { ref, isInView } = useEntranceAnimation();

  return (
    <motion.div
      ref={ref}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={entranceAnimationVariants.icon}>
        <Icon />
      </motion.div>

      <motion.h2 variants={entranceAnimationVariants.item}>Title</motion.h2>

      <motion.p variants={entranceAnimationVariants.item}>Description</motion.p>
    </motion.div>
  );
};
```

### Grid Layout

```tsx
const AnimatedGrid = () => {
  const { ref, isInView } = useEntranceAnimation();

  return (
    <motion.div
      ref={ref}
      variants={entranceAnimationVariants.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-3 gap-4"
    >
      <motion.div variants={entranceAnimationVariants.slideLeft}>
        Left Card
      </motion.div>

      <motion.div variants={entranceAnimationVariants.scaleIn}>
        Center Card
      </motion.div>

      <motion.div variants={entranceAnimationVariants.slideRight}>
        Right Card
      </motion.div>
    </motion.div>
  );
};
```

### Custom Timing

```tsx
const CustomTimingComponent = () => {
  const { ref, isInView } = useEntranceAnimation({
    amount: 0.2, // Trigger earlier
    margin: "-50px 0px -50px 0px" // Smaller margin
  });

  // ... rest of component
};
```

## 🔧 Customization

### Custom Animation Variants

```tsx
const customVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};
```

### Override Default Transitions

```tsx
<motion.div
  variants={entranceAnimationVariants.item}
  transition={{ duration: 1.2 }} // Override default duration
>
  Content
</motion.div>
```

## 🚀 Best Practices

1. **Use `container` variant** for the main wrapper to enable staggered animations
2. **Choose appropriate variants** for different content types:
   - `icon` for icons and decorative elements
   - `item` for text and standard content
   - `content` for larger content blocks
   - `slideLeft/Right` for directional emphasis
3. **Customize timing** based on component importance and user experience
4. **Test on different screen sizes** to ensure animations work well on mobile

## 📚 Dependencies

- `framer-motion`: For animations
- `react`: For hooks and refs

## 🔄 Reusability

This system is designed to be easily imported and used across any component in your application. Simply import the hook and variants, then apply them to your motion components for consistent, professional animations.
