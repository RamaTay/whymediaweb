import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ScrollEffect3D from "./ScrollEffect3D";
import { ScrollProgress } from "./ui/scroll-progress";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      const sections = ["hero", "services", "testimonials", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      href: "/",
      label: "Home",
      active: location.pathname === "/" && activeSection === "hero",
      isExternal: true,
    },
    {
      href: "/services",
      label: "Services",
      active:
        location.pathname.includes("/services") ||
        location.pathname.includes("/service"),
      isExternal: true,
    },
    {
      href: "/about",
      label: "About Us",
      active: location.pathname.includes("/about"),
      isExternal: true,
    },
    {
      href: "/#contact",
      label: "Contact",
      active: location.pathname === "/" && activeSection === "contact",
      isExternal: false,
    },
  ];

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/#contact");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <ScrollProgress
        height={4}
        color="#FFCC00"
        position="top"
        showPercentage={false}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <motion.div
                className="h-10 w-auto"
                whileHover={{ scale: 1.1, opacity: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {" "}
                <img
                  src="/images/Y logo 2 (1).png"
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Link>
          </div>

          <motion.div
            className="hidden md:flex space-x-8"
            animate={{
              y: scrollPosition > 100 ? -5 : 0,
              opacity: scrollPosition > 100 ? 0.9 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <ScrollEffect3D
                key={link.href}
                depth={20}
                rotationIntensity={2}
                translateZ={10}
                disableShadow
                className="inline-block"
                scrollMultiplier={0.8 + index * 0.1}
              >
                {link.label === "Home" ? (
                  <motion.button
                    onClick={() => {
                      if (location.pathname !== "/") {
                        navigate("/");
                      } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setActiveSection("hero");
                      }
                    }}
                    className={`bg-transparent border-none outline-none text-gray-800 hover:text-yellow-400 transition-colors ${
                      link.active ? "text-yellow-500 font-medium" : ""
                    }`}
                    whileHover={{ scale: 1.1, z: 10 }}
                    style={{ display: "inline-block" }}
                  >
                    {link.label}
                  </motion.button>
                ) : link.label === "Contact" ? (
                  <motion.button
                    onClick={handleContactClick}
                    className={`bg-transparent border-none outline-none text-gray-800 hover:text-yellow-400 transition-colors ${
                      link.active ? "text-yellow-500 font-medium" : ""
                    }`}
                    whileHover={{ scale: 1.1, z: 10 }}
                    style={{ display: "inline-block" }}
                  >
                    {link.label}
                  </motion.button>
                ) : (
                  <Link to={link.href}>
                    <motion.span
                      className={`text-gray-800 hover:text-yellow-400 transition-colors ${
                        link.active ? "text-yellow-500 font-medium" : ""
                      }`}
                      whileHover={{ scale: 1.1, z: 10 }}
                      style={{ display: "inline-block" }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                )}
              </ScrollEffect3D>
            ))}
          </motion.div>

          <div className="md:hidden">
            <button className="text-gray-800 hover:text-yellow-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
