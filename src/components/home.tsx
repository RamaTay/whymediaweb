import React, { useRef, useEffect, useState } from "react";
import ServicesSection from "./ServicesSection";
import ContactSection from "./ContactSection";
import TestimonialsSection from "./TestimonialsSection";
import EnhancedHeroSection from "./EnhancedHeroSection";

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main ref={mainRef}>
        <section id="hero" className="min-h-screen" ref={heroRef}>
          <EnhancedHeroSection scrollY={scrollPosition} />
        </section>

        <section
          id="services"
          className="py-20 bg-gray-50 relative"
          ref={servicesRef}
        >
          <ServicesSection />
        </section>

        <section
          id="testimonials"
          className="py-20 relative"
          ref={testimonialsRef}
        >
          <TestimonialsSection />
        </section>

        <section
          id="contact"
          className="py-20 bg-gray-50 relative"
          ref={contactRef}
        >
          <ContactSection />
        </section>
      </main>
    </div>
  );
};

export default Home;
