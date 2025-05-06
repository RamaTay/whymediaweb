import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import WebDevelopment3D from "./3d-objects/WebDevelopment3D";
import DesignServices3D from "./3d-objects/DesignServices3D";
import ContentCreation3D from "./3d-objects/ContentCreation3D";
import LogoDesign3D from "./3d-objects/LogoDesign3D";
import AppDevelopment3D from "./3d-objects/AppDevelopment3D";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

type Service = Database["public"]["Tables"]["Services"]["Row"] & {
  name_ar?: string;
  description_ar?: string;
  technical_skills_tools_ar?: string[];
};

const ServiceDetailsPage = () => {
  const { t, i18n } = useTranslation("services");
  const { serviceId } = useParams<{ serviceId: string }>();
  const [activeSection, setActiveSection] = useState<string>(serviceId || "");
  const [scrollY, setScrollY] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (serviceId) {
      setActiveSection(serviceId);
      const element = document.getElementById(serviceId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    fetchServices();
    setupRealtimeSubscription();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      supabase.channel("services-changes").unsubscribe();
    };
  }, [serviceId, i18n.language]);

  const setupRealtimeSubscription = () => {
    supabase
      .channel("services-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Services" },
        () => {
          fetchServices();
        },
      )
      .subscribe();
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data: servicesData, error: servicesError } = await supabase
        .from("Services")
        .select("*")
        .order("name");

      if (servicesError) throw servicesError;

      const localizedServices =
        servicesData?.map((service) => {
          if (i18n.language === "ar") {
            return {
              ...service,
              name: service.name_ar || service.name,
              description: service.description_ar || service.description,
              technical_skills_tools:
                service.technical_skills_tools_ar ||
                service.technical_skills_tools,
            };
          }
          return service;
        }) || [];

      setServices(localizedServices);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (
    serviceName: string,
    scale = 0.7,
    rotationSpeed = 1.2,
  ) => {
    if (!serviceName)
      return <AppDevelopment3D scale={scale} rotationSpeed={rotationSpeed} />;

    const name = serviceName.toLowerCase();
    console.log("Service name for icon:", name); // لأغراض التصحيح

    if (
      name.includes("web") ||
      name.includes("development") ||
      name.includes("تطوير")
    ) {
      return <WebDevelopment3D scale={scale} rotationSpeed={rotationSpeed} />;
    } else if (name.includes("graphic") || name.includes("جرافيك")) {
      return <DesignServices3D scale={scale} rotationSpeed={rotationSpeed} />;
    } else if (name.includes("logo") || name.includes("شعار")) {
      return <LogoDesign3D scale={scale} rotationSpeed={rotationSpeed} />;
    } else if (name.includes("content") || name.includes("محتوى")) {
      return <ContentCreation3D scale={scale} rotationSpeed={rotationSpeed} />;
    } else {
      return <AppDevelopment3D scale={scale} rotationSpeed={rotationSpeed} />;
    }
  };

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            {t("errorLoading", "Error Loading Services")}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={fetchServices}>{t("tryAgain", "Try Again")}</Button>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t("noServices", "No Services Available")}
          </h2>
          <p className="text-gray-600">
            {t(
              "noServicesDescription",
              "Please check back later or contact support.",
            )}
          </p>
        </div>
      </div>
    );
  }

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
              {t("ourServices", "Our ")}

              <span className="text-yellow-500">
                {t("services", "Services")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t(
                "subtitle",
                "Explore our comprehensive range of digital services designed to help your business thrive.",
              )}
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
                {service.name}
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
                  {getServiceIcon(service.name || "", 0.8, 1)}
                </motion.div>
              </div>
              <div className="lg:col-span-8">
                <h2
                  className="text-3xl font-bold mb-4"
                  dir={i18n.language === "ar" ? "rtl" : "ltr"}
                >
                  {service.name}
                </h2>
                <p
                  className="text-lg text-gray-600 mb-6"
                  dir={i18n.language === "ar" ? "rtl" : "ltr"}
                >
                  {service.description}
                </p>

                {service.technical_skills_tools &&
                  service.technical_skills_tools.length > 0 && (
                    <div className="mb-8">
                      <h3
                        className="text-xl font-semibold mb-3"
                        dir={i18n.language === "ar" ? "rtl" : "ltr"}
                      >
                        {t("technicalSkills", "Technical Skills & Tools")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technical_skills_tools.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            dir={i18n.language === "ar" ? "rtl" : "ltr"}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                <Link to={`/service/${service.id}`}>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-white">
                    {t("viewDetails", "View Details")}
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
