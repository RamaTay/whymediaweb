import React from "react";
import { motion } from "framer-motion";

interface AppDevelopment3DProps {
  scale?: number;
  rotationSpeed?: number;
}

const AppDevelopment3D: React.FC<AppDevelopment3DProps> = ({
  scale = 1,
  rotationSpeed = 1,
}) => {
  return (
    <div
      className="relative"
      style={{
        width: `${100 * scale}px`,
        height: `${120 * scale}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: 360, rotateX: [0, 10, 0] }}
        transition={{
          rotateY: {
            duration: 25 / rotationSpeed,
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
        {/* Smartphone Body */}
        <div
          className="absolute rounded-2xl bg-gray-800 border-4 border-gray-700 shadow-xl"
          style={{
            width: "70%",
            height: "90%",
            left: "15%",
            top: "5%",
            transform: "translateZ(10px)",
          }}
        >
          {/* Screen */}
          <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
            {/* App UI Elements */}
            <div className="absolute top-4 left-0 right-0 flex justify-center">
              <div className="w-10 h-1 bg-white rounded-full opacity-70"></div>
            </div>
            <div className="absolute top-8 left-3 right-3 h-4 bg-white bg-opacity-20 rounded-md"></div>
            <div
              className="absolute grid grid-cols-3 gap-1 p-1"
              style={{ top: "40%", left: 3, right: 3 }}
            >
              <div className="aspect-square bg-white bg-opacity-20 rounded-md"></div>
              <div className="aspect-square bg-white bg-opacity-30 rounded-md"></div>
              <div className="aspect-square bg-white bg-opacity-20 rounded-md"></div>
              <div className="aspect-square bg-white bg-opacity-30 rounded-md"></div>
              <div className="aspect-square bg-white bg-opacity-20 rounded-md"></div>
              <div className="aspect-square bg-white bg-opacity-30 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Orbiting Code Elements */}
        <motion.div
          className="absolute w-20 h-12 rounded-lg bg-gray-900 opacity-90"
          animate={{
            rotateZ: 360,
          }}
          transition={{
            duration: 15 / rotationSpeed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            top: "10%",
            right: "-30%",
            transform: "translateZ(5px) rotateX(45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="p-1 flex flex-col justify-center h-full">
            <div className="w-3/4 h-1 bg-green-400 rounded mb-1 opacity-70"></div>
            <div className="w-1/2 h-1 bg-blue-400 rounded mb-1 opacity-70"></div>
            <div className="w-2/3 h-1 bg-purple-400 rounded opacity-70"></div>
          </div>
        </motion.div>

        {/* Floating UI Components */}
        <motion.div
          className="absolute w-12 h-12 rounded-lg bg-white shadow-lg opacity-90"
          animate={{
            y: [-5, 5, -5],
            rotateY: [0, 180, 360],
          }}
          transition={{
            y: {
              duration: 3 / rotationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotateY: {
              duration: 10 / rotationSpeed,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{
            bottom: "15%",
            left: "-20%",
            transform: "translateZ(15px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="w-6 h-1 bg-blue-400 rounded mb-1"></div>
            <div className="w-4 h-1 bg-blue-400 rounded mb-1"></div>
            <div className="w-6 h-1 bg-blue-400 rounded"></div>
          </div>
        </motion.div>

        {/* Small Floating Elements */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-yellow-500 opacity-80"
          animate={{
            rotate: 360,
            y: [-3, 3, -3],
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
            top: "60%",
            right: "-15%",
            transform: "translateZ(20px)",
          }}
        />

        <motion.div
          className="absolute w-3 h-3 rounded-full bg-green-500 opacity-80"
          animate={{
            rotate: -360,
            x: [-3, 3, -3],
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
            bottom: "10%",
            right: "-10%",
            transform: "translateZ(25px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default AppDevelopment3D;
