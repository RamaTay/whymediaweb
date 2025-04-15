import React from "react";
import { motion } from "framer-motion";

interface ContentCreation3DProps {
  scale?: number;
  rotationSpeed?: number;
}

const ContentCreation3D: React.FC<ContentCreation3DProps> = ({
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
        animate={{ rotateY: 360, rotateX: [0, 7, 0, -7, 0] }}
        transition={{
          rotateY: {
            duration: 22 / rotationSpeed,
            repeat: Infinity,
            ease: "linear",
          },
          rotateX: {
            duration: 9 / rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Main Document */}
        <div
          className="absolute rounded-lg bg-white shadow-xl border-2 border-gray-100"
          style={{
            width: "70%",
            height: "85%",
            left: "15%",
            top: "7.5%",
            transform: "translateZ(15px) rotateX(5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Document Content */}
          <div className="absolute top-4 left-4 right-4 h-2 bg-gray-300 rounded-full"></div>
          <div className="absolute top-8 left-4 right-4 h-2 bg-gray-300 rounded-full"></div>
          <div className="absolute top-12 left-4 right-4 h-2 bg-gray-300 rounded-full"></div>
          <div className="absolute top-16 left-4 right-4 h-2 bg-gray-300 rounded-full"></div>
          <div className="absolute top-20 left-4 right-4 h-2 bg-gray-300 rounded-full"></div>
          <div className="absolute top-24 left-4 right-4 h-2 bg-gray-300 rounded-full"></div>
          <div className="absolute top-28 left-4 w-12 h-2 bg-gray-300 rounded-full"></div>

          {/* Document Image */}
          <div
            className="absolute rounded-md bg-gradient-to-br from-yellow-100 to-yellow-300"
            style={{
              width: "40%",
              height: "25%",
              right: "4px",
              bottom: "4px",
              transform: "translateZ(2px)",
            }}
          ></div>
        </div>

        {/* Floating Pen */}
        <motion.div
          className="absolute"
          animate={{
            y: [-8, 0, -8],
            rotateZ: [-10, 0, -10],
          }}
          transition={{
            y: {
              duration: 3 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotateZ: {
              duration: 3 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            width: "30%",
            height: "8%",
            right: "-5%",
            top: "30%",
            transform: "translateZ(25px) rotate(-30deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute rounded-full bg-blue-600"
            style={{
              width: "30%",
              height: "100%",
              left: "0%",
              transform: "translateZ(2px)",
            }}
          ></div>
          <div
            className="absolute bg-yellow-500"
            style={{
              width: "70%",
              height: "60%",
              left: "30%",
              top: "20%",
              transform: "translateZ(2px)",
            }}
          ></div>
          <div
            className="absolute bg-gray-300 rounded-sm"
            style={{
              width: "10%",
              height: "40%",
              left: "100%",
              top: "30%",
              transform: "translateZ(2px)",
            }}
          ></div>
        </motion.div>

        {/* Floating Text Elements */}
        <motion.div
          className="absolute rounded-md bg-yellow-100 flex items-center justify-center"
          animate={{
            y: [3, -3, 3],
            rotateZ: [0, 5, 0],
          }}
          transition={{
            y: {
              duration: 4 / rotationSpeed,
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
            width: "25%",
            height: "15%",
            left: "-10%",
            bottom: "20%",
            transform: "translateZ(20px)",
          }}
        >
          <div className="w-3/4 h-1 bg-gray-400 rounded-full mb-1"></div>
        </motion.div>

        {/* Small Floating Elements */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-yellow-400 opacity-80"
          animate={{
            rotate: 360,
            y: [-3, 3, -3],
          }}
          transition={{
            rotate: {
              duration: 6 / rotationSpeed,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: 2.5 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            top: "10%",
            left: "-10%",
            transform: "translateZ(30px)",
          }}
        />

        <motion.div
          className="absolute w-3 h-3 rounded-full bg-blue-400 opacity-80"
          animate={{
            rotate: -360,
            x: [-3, 3, -3],
          }}
          transition={{
            rotate: {
              duration: 8 / rotationSpeed,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: 3.5 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            bottom: "15%",
            right: "-5%",
            transform: "translateZ(25px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default ContentCreation3D;
