import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface HeroSectionProps {
  onExploreClick?: () => void;
}

const HeroSection = ({
  onExploreClick = () => window.scrollTo({ top: 800, behavior: "smooth" }),
}: HeroSectionProps) => {
  const [typedText, setTypedText] = useState("");
  const fullText =
    "Where Ideas Meet Innovation – Your Digital Solutions Start Here!";

  // Typewriter effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  return (
    <section className="w-full  flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
      {/* Container for content */}
      <div className="container mx-auto flex flex-col items-center">
        {/* Headline with typewriter effect */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-gray-900 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {typedText}
          <span className="animate-pulse">|</span>
        </motion.h1>

        {/* Explore Services Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            onClick={onExploreClick}
            className="h-14 px-8 text-lg font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Explore Services</span>
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
