import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollTriggerProps {
  children?: React.ReactNode;
  className?: string;
  threshold?: number;
  animation?: "fade" | "slide" | "scale" | "rotate";
  delay?: number;
  duration?: number;
}

const ScrollTrigger = ({
  children,
  className = "",
  threshold = 0.2,
  animation = "fade",
  delay = 0,
  duration = 0.5,
}: ScrollTriggerProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
    }
  }, [isInView, hasTriggered]);

  const getAnimationVariants = () => {
    switch (animation) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "slide":
        return {
          hidden: { x: -100, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "scale":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        };
      case "rotate":
        return {
          hidden: { rotate: -15, opacity: 0 },
          visible: { rotate: 0, opacity: 1 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTrigger;
