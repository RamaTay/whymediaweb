import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
  height?: number;
  color?: string;
  position?: "top" | "bottom";
  showPercentage?: boolean;
}

export const ScrollProgress = ({
  className = "",
  height = 4,
  color = "#FFCC00",
  position = "top",
  showPercentage = false,
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setPercentage(Math.round(value * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const positionStyles = {
    top: position === "top" ? 0 : "auto",
    bottom: position === "bottom" ? 0 : "auto",
  };

  return (
    <>
      <motion.div
        className={`fixed left-0 right-0 z-50 ${className}`}
        style={{
          ...positionStyles,
          height: `${height}px`,
          transformOrigin: "left",
          scaleX,
          backgroundColor: color,
        }}
      />
      {showPercentage && (
        <div
          className="fixed right-4 z-50 rounded-full bg-white px-2 py-1 text-xs font-semibold shadow-md"
          style={{
            ...positionStyles,
            [position]: `${height + 8}px`,
          }}
        >
          {percentage}%
        </div>
      )}
    </>
  );
};

export default ScrollProgress;
