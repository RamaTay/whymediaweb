import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  emoji: string;
  preview: string;
  fullReview: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc",
    preview: "Maidua transformed our online presence...",
    fullReview:
      "Maidua transformed our online presence with their exceptional web development services. The team was professional, responsive, and delivered beyond our expectations.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "Innovate Solutions",
    preview: "Working with Maidua was a game-changer...",
    fullReview:
      "Working with Maidua was a game-changer for our startup. Their creative designs and technical expertise helped us stand out in a competitive market.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Digital Ventures",
    preview: "The attention to detail was impressive...",
    fullReview:
      "The attention to detail was impressive! Maidua's team took the time to understand our brand and delivered a website that perfectly captures our vision and values.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Creative Director",
    company: "Artisan Media",
    preview: "As a design professional myself...",
    fullReview:
      "As a design professional myself, I have high standards. Maidua exceeded them all with their innovative approach to our content creation needs. Highly recommended!",
  },
];

const TestimonialsSection = () => {
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
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="testimonials-section"
      className="py-20 px-4 md:px-8 lg:px-16 overflow-hidden border-0"
    >
      {/* Particle effect background */}
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
            <span className="text-black">What Our </span>
            <span className="text-yellow-400">Clients</span>
            <span className="text-black"> Say</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about our services.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="cursor-pointer"
            >
              <Card
                className={`rounded-3xl transition-all duration-300 h-full bg-white border-0 shadowh`}
              >
                <CardContent className="p-3 flex flex-col items-center">
                  <div className="mb-4 relative flex justify-center w-full">
                    <div className="text-4xl mb-2">{testimonial.emoji}</div>
                  </div>

                  <h3 className="font-bold text-lg mb-1">{testimonial.name}</h3>
                  <p className="text-sm h-10 text-muted-foreground mb-3">
                    {testimonial.role}, {testimonial.company}
                  </p>

                  <div className="text-center">
                    <p className="text-sm leading-relaxed">
                      {testimonial.fullReview}
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
