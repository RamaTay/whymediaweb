import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const TestimonialsSection = () => {
  const { t } = useTranslation("testimonials");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("testimonials-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const testimonialIds = [0, 1, 2, 3];

  return (
    <section
      id="testimonials-section"
      className="py-20 px-4 md:px-8 lg:px-16 overflow-hidden border-0 relative"
    >
      {/* تأثير الخلفية (particles) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-yellow-200 opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-black">{t("title", "What Our ")}</span>
            <span className="text-yellow-500">{t("clients", "Clients")}</span>
            <span className="text-black">{t("say", "Say")}</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "subtitle",
              "Don't just take our word for it. Here's what our clients say about our services.",
            )}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonialIds.map((id) => (
            <motion.div
              key={id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="cursor-pointer"
            >
              <Card className="rounded-3xl transition-all duration-300 h-full bg-white border-0 shadow-lg">
                <CardContent className="p-6 flex flex-col items-center h-full">
                  <div className="mb-4 relative flex justify-center w-full">
                    <div className="text-4xl mb-2">
                      {t(`testimonials.${id}.emoji`, "💬")}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    {t(`testimonials.${id}.name`, "Client Name")}
                  </h3>
                  <p className="text-sm h-10 text-muted-foreground mb-4">
                    {t(`testimonials.${id}.role`, "Role")},{" "}
                    {t(`testimonials.${id}.company`, "Company")}
                  </p>
                  <div className="flex-grow flex items-center">
                    <p className="text-sm text-justify text-align-last-center hyphens-auto">
                      {t(`testimonials.${id}.review`, "Review text")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
