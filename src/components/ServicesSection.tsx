import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WebDevelopment3D from "./3d-objects/WebDevelopment3D";
import DesignServices3D from "./3d-objects/DesignServices3D";
import LogoDesign3D from "./3d-objects/LogoDesign3D";
import AppDevelopment3D from "./3d-objects/AppDevelopment3D";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  index: number;
}

const ServiceCard = ({
  icon,
  title,
  description,
  delay = 0,
  index,
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2, delay }}
    >
      <div className="transition-all duration-300">
        <Card className="h-full min-h-[400px] bg-white border-0 overflow-hidden flex flex-col ">
          <CardContent className="p-6 flex flex-col text-center flex-grow">
            <motion.div
              className="w-24 h-24 flex items-center justify-center mb-4 mx-auto"
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.div>

            <h3 className="text-xl font-bold mb-2 min-h-[48px] flex items-center justify-center">
              {title}
            </h3>

            <p className="text-black leading-relaxed text-center mb-4">
              {description}
            </p>

            <div className="mt-auto">
              <Link to={`/service/${title.toLowerCase().replace(/ /g, "-")}`}>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 border-none"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  const services = [
    {
      icon: <DesignServices3D scale={0.7} rotationSpeed={1.2} />,
      title: "Graphic Design",
      description:
        "Eye-catching visuals and designs that communicate your brand's message effectively and leave a lasting impression.",
      delay: 0.1,
    },
    {
      icon: <LogoDesign3D scale={0.7} rotationSpeed={1.2} />,
      title: "Logo Design",
      description:
        "Professional and memorable logos that capture your brand's essence and help you stand out in the marketplace.",
      delay: 0.2,
    },
    {
      icon: <WebDevelopment3D scale={0.7} rotationSpeed={1.2} />,
      title: "Web Development",
      description:
        "Custom websites and webapplications built with the latest technologies for optimal performance and user experience.",
      delay: 0.3,
    },
    {
      icon: <AppDevelopment3D scale={0.7} rotationSpeed={1.2} />,
      title: "Social Media Management",
      description:
        "Strategic social media presence that builds community, increases engagement, and drives conversions for your brand.",
      delay: 0.4,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden border-0"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-black">Our </span>
            <span className="text-yellow-400">Services</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of digital services to help your business grow
            and succeed in the digital landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
