import React, { useState } from "react";
import { motion } from "framer-motion";

interface ThreeDCardProps {
  children?: React.ReactNode;
  className?: string;
  depth?: number;
  hoverScale?: number;
}

const ThreeDCard = ({
  children,
  className = "",
  depth = 20,
  hoverScale = 1.05,
}: ThreeDCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * 10;
    const rotateYValue = ((centerX - x) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: hoverScale }}
      animate={{
        rotateX,
        rotateY,
        z: depth,
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 150,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ThreeDCard;
