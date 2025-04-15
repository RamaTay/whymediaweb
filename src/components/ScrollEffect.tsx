import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollEffectProps {
  children?: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

const ScrollEffect: React.FC<ScrollEffectProps> = ({
  children,
  direction = "up",
  distance = 50,
  duration = 0.8,
  delay = 0,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });

  // Calculate initial and target positions based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  // Set up transforms based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [
      direction === "left" ? distance : direction === "right" ? -distance : 0,
      0,
    ],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === "up" ? distance : direction === "down" ? -distance : 0, 0],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={getInitialPosition()}
        animate={
          isVisible
            ? { x: 0, y: 0, opacity: 1 }
            : { opacity: 0, ...getInitialPosition() }
        }
        transition={{ duration, delay, ease: "easeOut" }}
        style={{ opacity, x, y }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollEffect;
