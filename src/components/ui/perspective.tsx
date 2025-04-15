import React from "react";
import { motion } from "framer-motion";

interface PerspectiveProps {
  children?: React.ReactNode;
  className?: string;
  rotateX?: number;
  rotateY?: number;
  perspective?: number;
}

const Perspective = ({
  children,
  className = "",
  rotateX = 0,
  rotateY = 0,
  perspective = 1000,
}: PerspectiveProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Perspective;
