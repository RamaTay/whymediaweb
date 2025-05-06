import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLanguage;
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={toggleLanguage}
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-gray-700 hover:text-yellow-500"
      >
        <Globe className="h-4 w-4" />
        {currentLanguage === "ar" ? "English" : "العربية"}
      </Button>
    </motion.div>
  );
};

export default LanguageSwitcher;
