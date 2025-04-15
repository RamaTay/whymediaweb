import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import WebDevelopment3D from "./3d-objects/WebDevelopment3D";
import DesignServices3D from "./3d-objects/DesignServices3D";
import ContentCreation3D from "./3d-objects/ContentCreation3D";
import LogoDesign3D from "./3d-objects/LogoDesign3D";
import AppDevelopment3D from "./3d-objects/AppDevelopment3D";

import { Button } from "./ui/button";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  skills: string[];
}

const ServiceDetailsPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [activeSection, setActiveSection] = useState<string>(
    serviceId || "graphic-design",
  );
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (serviceId) {
      setActiveSection(serviceId);
      // Scroll to the section if it exists
      const element = document.getElementById(serviceId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [serviceId]);

  const services: ServiceData[] = [
    {
      id: "graphic-design",
      title: "Graphic Design",
      description:
        "Eye-catching visuals and designs that communicate your brand's message effectively.",
      icon: <DesignServices3D scale={0.7} rotationSpeed={1.2} />,
      details:
        "Our graphic design services focus on creating visually appealing and effective designs that help your brand stand out. We combine creativity with strategic thinking to deliver designs that not only look great but also achieve your business objectives.",
      skills: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe InDesign",
        "Figma",
        "Sketch",
        "Color Theory",
        "Typography",
        "Layout Design",
      ],
    },
    {
      id: "web-development",
      title: "Web Development",
      description:
        "Custom websites and web applications built with the latest technologies.",
      icon: <WebDevelopment3D scale={0.7} rotationSpeed={1.2} />,
      details:
        "Our web development team creates responsive, user-friendly websites and applications that provide an exceptional user experience. We focus on clean code, performance optimization, and search engine visibility to ensure your website not only looks great but also performs well.",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Node.js",
        "PHP",
        "WordPress",
        "Shopify",
        "SEO",
        "Responsive Design",
        "Web Accessibility",
      ],
    },
    {
      id: "content-creation",
      title: "Content Creation",
      description:
        "Engaging and SEO-optimized content that resonates with your audience.",
      icon: <ContentCreation3D scale={0.7} rotationSpeed={1.2} />,
      details:
        "Our content creation services help you tell your brand's story in a compelling way. From blog posts and articles to social media content and email newsletters, we create content that engages your audience and drives conversions.",
      skills: [
        "Copywriting",
        "Blog Writing",
        "SEO Content",
        "Email Marketing",
        "Social Media Content",
        "Content Strategy",
        "Editing",
        "Proofreading",
      ],
    },
    {
      id: "social-media-management",
      title: "Social Media Management",
      description:
        "Strategic social media presence that builds community and drives engagement.",
      icon: <AppDevelopment3D scale={0.7} rotationSpeed={1.2} />,
      details:
        "Our social media management services help you build and maintain a strong presence on the platforms that matter most to your audience. We develop strategies, create engaging content, and analyze performance to continuously improve results.",
      skills: [
        "Social Media Strategy",
        "Content Calendar Planning",
        "Community Management",
        "Social Media Analytics",
        "Paid Social Campaigns",
        "Influencer Outreach",
        "Platform-Specific Content Creation",
      ],
    },
  ];

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-yellow-300 opacity-10"
              style={{
                width: 20 + Math.random() * 100,
                height: 20 + Math.random() * 100,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-black">Our </span>
              <span className="text-yellow-400">Services</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore our comprehensive range of digital services designed to
              help your business thrive in the digital landscape.
            </p>
          </motion.div>

          {/* Service Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => handleSectionClick(service.id)}
                className={`px-6 py-3 rounded-full transition-all ${activeSection === service.id ? "bg-yellow-400 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.title}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Sections */}
      <div className="container mx-auto px-4 py-16">
        {services.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className="mb-24 scroll-mt-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-64 h-64"
                >
                  {service.icon}
                </motion.div>
              </div>
              <div className="lg:col-span-8">
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{service.details}</p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">
                    Technical Skills & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to={`/service/${service.id}`}>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-white">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
