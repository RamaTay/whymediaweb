import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  onExploreClick?: () => void;
  scrollY?: number;
}

const EnhancedHeroSection = ({
  onExploreClick = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const header = document.querySelector("nav");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  },
  scrollY = 0,
}: HeroSectionProps) => {
  const { t } = useTranslation("hero");
  const [typedText, setTypedText] = useState("");
  const fullText = t(
    "tagline",
    "Where Ideas Meet Innovation – Your Digital Solutions Start Here!",
  );

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
    <section className="  absolute w-full h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="/images/background.png"
          alt="Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center z-10 relative">
        {/* Headline with typewriter effect */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white max-w-4xl drop-shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            <span className="relative z-10">
              {t("exploreServices", "Explore Services")}
            </span>
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
