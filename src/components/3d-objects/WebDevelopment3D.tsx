import React from "react";
import { motion } from "framer-motion";

interface WebDevelopment3DProps {
  scale?: number;
  rotationSpeed?: number;
}

const WebDevelopment3D: React.FC<WebDevelopment3DProps> = ({
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
        {/* Main Monitor */}
        <div
          className="absolute rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl"
          style={{
            width: "80%",
            height: "60%",
            left: "10%",
            top: "10%",
            transform: "translateZ(15px) rotateX(10deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Screen */}
          <div
            className="absolute rounded-sm bg-gray-900"
            style={{
              width: "90%",
              height: "90%",
              left: "5%",
              top: "5%",
              transform: "translateZ(2px)",
            }}
          >
            {/* Code Elements */}
            <div className="absolute top-2 left-2 w-8 h-1 bg-green-400 rounded-sm"></div>
            <div className="absolute top-4 left-4 w-12 h-1 bg-blue-400 rounded-sm"></div>
            <div className="absolute top-6 left-2 w-10 h-1 bg-purple-400 rounded-sm"></div>
            <div className="absolute top-8 left-6 w-8 h-1 bg-yellow-400 rounded-sm"></div>
            <div className="absolute top-10 left-4 w-6 h-1 bg-red-400 rounded-sm"></div>
          </div>
        </div>

        {/* Monitor Stand */}
        <div
          className="absolute bg-gray-700 rounded-sm"
          style={{
            width: "20%",
            height: "10%",
            left: "40%",
            top: "70%",
            transform: "translateZ(10px)",
          }}
        ></div>

        <div
          className="absolute bg-gray-800 rounded-sm"
          style={{
            width: "30%",
            height: "2%",
            left: "35%",
            top: "80%",
            transform: "translateZ(5px)",
          }}
        ></div>

        {/* Floating Code Blocks */}
        <motion.div
          className="absolute w-12 h-8 rounded-md bg-gray-800 opacity-90"
          animate={{
            y: [-5, 5, -5],
            rotateZ: [0, 5, 0, -5, 0],
          }}
          transition={{
            y: {
              duration: 3 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotateZ: {
              duration: 5 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            right: "-20%",
            top: "20%",
            transform: "translateZ(25px)",
          }}
        >
          <div className="p-1 flex flex-col justify-center h-full">
            <div className="w-8 h-1 bg-blue-400 rounded-sm mb-1"></div>
            <div className="w-6 h-1 bg-green-400 rounded-sm mb-1"></div>
            <div className="w-4 h-1 bg-purple-400 rounded-sm"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute w-10 h-6 rounded-md bg-gray-800 opacity-90"
          animate={{
            y: [3, -3, 3],
            rotateZ: [0, -3, 0, 3, 0],
          }}
          transition={{
            y: {
              duration: 4 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotateZ: {
              duration: 6 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            left: "-15%",
            bottom: "30%",
            transform: "translateZ(20px)",
          }}
        >
          <div className="p-1 flex flex-col justify-center h-full">
            <div className="w-6 h-1 bg-yellow-400 rounded-sm mb-1"></div>
            <div className="w-4 h-1 bg-red-400 rounded-sm"></div>
          </div>
        </motion.div>

        {/* Small Floating Elements */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-blue-500 opacity-80"
          animate={{
            rotate: 360,
            y: [-2, 2, -2],
          }}
          transition={{
            rotate: {
              duration: 5 / rotationSpeed,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: 2 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            top: "15%",
            right: "-5%",
            transform: "translateZ(30px)",
          }}
        />

        <motion.div
          className="absolute w-2 h-2 rounded-full bg-green-500 opacity-80"
          animate={{
            rotate: -360,
            x: [-2, 2, -2],
          }}
          transition={{
            rotate: {
              duration: 7 / rotationSpeed,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: 3 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            bottom: "20%",
            left: "-5%",
            transform: "translateZ(25px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default WebDevelopment3D;
