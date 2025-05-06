import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollEffect3D from "./ScrollEffect3D";
import { ScrollProgress } from "./ui/scroll-progress";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("header");

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
      label: t("home", "Home"),
      active: location.pathname === "/" && activeSection === "hero",
      isExternal: true,
    },
    {
      href: "/services",
      label: t("services", "Services"),
      active: location.pathname.includes("/services"),
      isExternal: true,
    },
    {
      href: "/about",
      label: t("aboutUs", "About Us"),
      active: location.pathname.includes("/about"),
      isExternal: true,
    },
    {
      href: "/#contact",
      label: t("contact", "Contact"),
      active: location.pathname === "/" && activeSection === "contact",
      isExternal: false,
    },
  ];

  const handleSectionScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const header = document.querySelector("nav");
      const headerHeight = header?.getBoundingClientRect().height || 0;
      const additionalPadding = 30;

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.pageYOffset;
      const targetPosition = sectionTop - headerHeight - additionalPadding;

      section.style.scrollMarginTop = "0";
      section.style.paddingTop = "0";
      section.style.marginTop = "0";

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        const currentPosition = window.pageYOffset;
        const visibleHeight = window.innerHeight;
        const sectionHeight = section.offsetHeight;

        if (currentPosition + visibleHeight < sectionTop + sectionHeight) {
          window.scrollTo({
            top:
              sectionTop -
              headerHeight -
              additionalPadding +
              (sectionHeight - visibleHeight) / 2,
            behavior: "auto",
          });
        }
      }, 800);
    }
  };

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/#contact");
      setTimeout(() => {
        handleSectionScroll("contact");
      }, 300);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.style.scrollMarginTop = "0";
        contactSection.style.paddingTop = "0";
        contactSection.style.marginTop = "0";
      }
      handleSectionScroll("contact");
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
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <img
                  src="/images/Y logo 2 (1).png"
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Link>
          </div>

          <motion.div
            className="hidden md:flex gap-8"
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
                {link.label === t("home", "Home") ? (
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
                ) : link.label === t("contact", "Contact") ? (
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

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
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
        </div>
      </nav>
    </>
  );
};

export default Header;
