import React from "react";
import { motion } from "framer-motion";

interface LogoDesign3DProps {
  scale?: number;
  rotationSpeed?: number;
}

const LogoDesign3D: React.FC<LogoDesign3DProps> = ({
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
        animate={{ rotateY: 360, rotateZ: [0, 15, 0, -15, 0] }}
        transition={{
          rotateY: {
            duration: 20 / rotationSpeed,
            repeat: Infinity,
            ease: "linear",
          },
          rotateZ: {
            duration: 10 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Main Logo Sphere */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-xl"
          style={{
            width: "80%",
            height: "80%",
            left: "10%",
            top: "10%",
            transform: "translateZ(15px)",
          }}
        >
          {/* Logo Text */}
          <div
            className="absolute inset-0 flex items-center justify-center font-bold text-white text-2xl"
            style={{ transform: "translateZ(2px)" }}
          >
            M
          </div>

          {/* Inner Circle */}
          <div
            className="absolute rounded-full border-4 border-white border-opacity-30"
            style={{
              width: "70%",
              height: "70%",
              left: "15%",
              top: "15%",
            }}
          ></div>
        </div>

        {/* Orbiting Design Tools */}
        <motion.div
          className="absolute w-10 h-10 rounded-lg bg-purple-600 shadow-lg"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 12 / rotationSpeed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            top: "0%",
            right: "0%",
            transform: "translateZ(10px) rotateX(30deg) rotateY(30deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Pen Tool Icon */}
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
              <path d="M2 2l7.586 7.586"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
          </div>
        </motion.div>

        <motion.div
          className="absolute w-8 h-8 rounded-lg bg-blue-500 shadow-lg"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15 / rotationSpeed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            bottom: "5%",
            left: "0%",
            transform: "translateZ(5px) rotateX(-20deg) rotateY(-20deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Shape Tool Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        </motion.div>

        {/* Color Droplets */}
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-red-500 opacity-80"
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "20%",
            right: "-15%",
            transform: "translateZ(20px)",
          }}
        />

        <motion.div
          className="absolute w-4 h-4 rounded-full bg-green-500 opacity-80"
          animate={{
            y: [5, -5, 5],
          }}
          transition={{
            duration: 4 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: "30%",
            right: "-10%",
            transform: "translateZ(15px)",
          }}
        />

        <motion.div
          className="absolute w-5 h-5 rounded-full bg-blue-500 opacity-80"
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 2.5 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            bottom: "15%",
            left: "-12%",
            transform: "translateZ(25px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default LogoDesign3D;
