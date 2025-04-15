import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

interface ParallaxScrollProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
}

const ParallaxScroll = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: ParallaxScrollProps) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const [transformStyle, setTransformStyle] = useState<any>({});

  useEffect(() => {
    if (!ref.current) return;
    const setValues = () => {
      setElementTop(ref.current?.offsetTop || 0);
      setClientHeight(window.innerHeight);
    };
    setValues();
    window.addEventListener("resize", setValues);
    return () => window.removeEventListener("resize", setValues);
  }, [ref]);

  // Update transform style based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const startPosition = elementTop - clientHeight;
      const endPosition = elementTop + clientHeight;

      // Calculate progress (0 to 1) based on scroll position
      const progress = Math.max(
        0,
        Math.min(
          1,
          (scrollPosition - startPosition) / (endPosition - startPosition),
        ),
      );

      // Apply transform based on direction and progress
      let transform = {};
      if (direction === "up") {
        transform = { y: -100 * speed * progress };
      } else if (direction === "down") {
        transform = { y: 100 * speed * progress };
      } else if (direction === "left") {
        transform = { x: -100 * speed * progress };
      } else if (direction === "right") {
        transform = { x: 100 * speed * progress };
      }

      setTransformStyle(transform);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementTop, clientHeight, direction, speed]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={transformStyle}
      initial={false}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxScroll;
