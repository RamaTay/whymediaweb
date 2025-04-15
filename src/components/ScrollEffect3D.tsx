import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface ScrollEffect3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  rotationIntensity?: number;
  section?: string;
  transformOrigin?: string;
  perspective?: number;
  translateZ?: number;
  translateX?: number;
  translateY?: number;
  rotateZ?: number;
  customTransform?: (progress: number) => Record<string, number>;
  scrollMultiplier?: number;
  scrollOffset?: number;
  disableShadow?: boolean;
}

const ScrollEffect3D = ({
  children,
  className = "",
  depth = 100,
  rotationIntensity = 5,
  section = "default",
  transformOrigin = "center",
  perspective = 1500,
  translateZ = 0,
  translateX = 0,
  translateY = 0,
  rotateZ = 0,
  customTransform,
  scrollMultiplier = 1,
  scrollOffset = 0,
  disableShadow = false,
}: ScrollEffect3DProps) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const setValues = () => {
      setElementTop(ref.current?.offsetTop || 0);
      setClientHeight(window.innerHeight);
    };

    setValues();

    // Use IntersectionObserver to detect when element is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(ref.current);
    window.addEventListener("resize", setValues);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      window.removeEventListener("resize", setValues);
    };
  }, [ref]);

  useEffect(() => {
    const handleScroll = () => {
      if (isInView) {
        // Only update scroll position when element is in view
        // This improves performance by avoiding unnecessary calculations
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView]);

  // Calculate rotation and transform values based on scroll position
  const calculateTransform = () => {
    const startPosition = elementTop - clientHeight * 1.5 + scrollOffset;
    const midPosition = elementTop + scrollOffset;
    const endPosition = elementTop + clientHeight * 1.5 + scrollOffset;

    let progress = 0;
    if (scrollY <= startPosition) {
      progress = 0;
    } else if (scrollY >= endPosition) {
      progress = 1;
    } else if (scrollY <= midPosition) {
      // First half: 0 to 0.5
      progress =
        (0.5 * (scrollY - startPosition)) / (midPosition - startPosition);
    } else {
      // Second half: 0.5 to 1
      progress =
        0.5 + (0.5 * (scrollY - midPosition)) / (endPosition - midPosition);
    }

    // Apply scroll multiplier to make effect more or less intense
    progress = progress * scrollMultiplier;

    // If custom transform function is provided, use it
    if (customTransform) {
      return customTransform(progress);
    }

    // Calculate rotation values
    const rotateXValue = rotationIntensity * 1.2 * (1 - 2 * progress);
    const rotateYValue = (-rotationIntensity / 1.5) * (1 - 2 * progress);
    const rotateZValue = rotateZ * (1 - 2 * progress);
    const zValue = depth * (progress - 0.5) * 2 + translateZ;
    const xValue = translateX * (1 - 2 * progress);
    const yValue = translateY * (1 - 2 * progress);
    const scaleValue = 0.95 + 0.05 * (1 - Math.abs(2 * progress - 1));

    return {
      rotateX: rotateXValue,
      rotateY: rotateYValue,
      rotateZ: rotateZValue,
      z: zValue,
      x: xValue,
      y: yValue,
      scale: scaleValue,
    };
  };

  const transformValues = calculateTransform();

  // Calculate shadow based on rotation
  const calculateShadow = () => {
    if (disableShadow) return "none";

    const { rotateY } = transformValues;
    const intensity = Math.abs(rotateY);

    if (rotateY < 0) {
      return `${-rotateY}px ${rotationIntensity}px ${intensity * 3}px rgba(0,0,0,0.1)`;
    } else if (rotateY > 0) {
      return `${rotateY}px ${rotationIntensity}px ${intensity * 3}px rgba(0,0,0,0.1)`;
    } else {
      return `0px ${Math.abs(rotationIntensity)}px ${Math.abs(rotationIntensity) * 2}px rgba(0,0,0,0.07)`;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        transformOrigin,
        scale: transformValues.scale,
      }}
      animate={{
        rotateX: transformValues.rotateX,
        rotateY: transformValues.rotateY,
        rotateZ: transformValues.rotateZ,
        z: transformValues.z,
        x: transformValues.x,
        y: transformValues.y,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 1.2,
      }}
      data-section={section}
    >
      {/* Add subtle shadow that changes with rotation */}
      {!disableShadow && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: calculateShadow(),
            zIndex: -1,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default ScrollEffect3D;
