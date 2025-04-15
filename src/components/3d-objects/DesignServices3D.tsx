import React from "react";
import { motion } from "framer-motion";

interface DesignServices3DProps {
  scale?: number;
  rotationSpeed?: number;
}

const DesignServices3D: React.FC<DesignServices3DProps> = ({
  scale = 1,
  rotationSpeed = 1,
}) => {
  return (
    <div
      className="relative"
      style={{
        width: `${100 * scale}px`,
        height: `${100 * scale}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: 360, rotateX: [0, 5, 0, -5, 0] }}
        transition={{
          rotateY: {
            duration: 20 / rotationSpeed,
            repeat: Infinity,
            ease: "linear",
          },
          rotateX: {
            duration: 8 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Main Design Board */}
        <div
          className="absolute rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 shadow-xl"
          style={{
            width: "80%",
            height: "80%",
            left: "10%",
            top: "10%",
            transform: "translateZ(15px) rotateX(10deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Design Canvas */}
          <div
            className="absolute rounded-md bg-white"
            style={{
              width: "90%",
              height: "90%",
              left: "5%",
              top: "5%",
              transform: "translateZ(2px)",
            }}
          >
            {/* Design Elements */}
            <div className="absolute top-2 left-2 right-2 h-2 bg-gray-200 rounded-full"></div>
            <div className="absolute top-6 left-2 w-8 h-8 bg-blue-400 rounded-md opacity-70"></div>
            <div className="absolute top-6 left-12 w-12 h-3 bg-gray-300 rounded-sm"></div>
            <div className="absolute top-12 left-2 right-2 h-10 bg-gray-100 rounded-md"></div>
            <div className="absolute bottom-4 left-2 w-6 h-6 rounded-full bg-green-400 opacity-70"></div>
            <div className="absolute bottom-4 right-2 w-6 h-6 rounded-full bg-red-400 opacity-70"></div>
          </div>
        </div>

        {/* Design Tools */}
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-indigo-500 shadow-lg"
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            right: "-10%",
            top: "20%",
            transform: "translateZ(25px)",
          }}
        >
          {/* Pen Tool */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            </svg>
          </div>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          className="absolute w-12 h-4 rounded-md overflow-hidden shadow-md"
          animate={{
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 5 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: "-15%",
            bottom: "30%",
            transform: "translateZ(20px)",
            display: "flex",
          }}
        >
          <div className="flex-1 h-full bg-red-500"></div>
          <div className="flex-1 h-full bg-yellow-500"></div>
          <div className="flex-1 h-full bg-green-500"></div>
          <div className="flex-1 h-full bg-blue-500"></div>
          <div className="flex-1 h-full bg-purple-500"></div>
        </motion.div>

        {/* Ruler */}
        <motion.div
          className="absolute h-2 bg-yellow-200 shadow-sm"
          style={{
            width: "60%",
            bottom: "-10%",
            left: "20%",
            transform: "translateZ(10px)",
          }}
          animate={{
            scaleX: [1, 1.05, 1],
          }}
          transition={{
            duration: 4 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Ruler Markings */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-0.5 h-2 bg-yellow-500"
              style={{ left: `${i * 20}%` }}
            ></div>
          ))}
        </motion.div>

        {/* Floating Design Elements */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-pink-400 opacity-70"
          animate={{
            y: [-3, 3, -3],
            x: [2, -2, 2],
          }}
          transition={{
            duration: 2.5 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "5%",
            right: "5%",
            transform: "translateZ(30px)",
          }}
        />

        <motion.div
          className="absolute w-3 h-3 rounded-full bg-cyan-400 opacity-70"
          animate={{
            y: [2, -2, 2],
            x: [-2, 2, -2],
          }}
          transition={{
            duration: 3.5 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: "10%",
            left: "10%",
            transform: "translateZ(25px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default DesignServices3D;
