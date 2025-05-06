import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WebDevelopment3D from "./3d-objects/WebDevelopment3D";
import DesignServices3D from "./3d-objects/DesignServices3D";
import LogoDesign3D from "./3d-objects/LogoDesign3D";
import AppDevelopment3D from "./3d-objects/AppDevelopment3D";
import ContentCreation3D from "./3d-objects/ContentCreation3D";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";
import { useTranslation } from "react-i18next";

type Service = Database["public"]["Tables"]["Services"]["Row"];

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  delay: number;
  index: number;
  id: string;
  t: (key: string, defaultValue: string) => string;
  currentLanguage: string;
}

const ServiceCard = ({
  icon,
  title,
  title_ar,
  description,
  description_ar,
  delay = 0,
  index,
  id,
  t,
  currentLanguage,
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const displayTitle = currentLanguage === "ar" && title_ar ? title_ar : title;
  const displayDescription =
    currentLanguage === "ar" && description_ar ? description_ar : description;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, delay }}
    >
      <div className="transition-all duration-300 h-full">
        <Card className="h-full min-h-[400px] bg-white border-0 overflow-hidden flex flex-col">
          <CardContent className="p-6 flex flex-col text-center flex-grow">
            <motion.div
              className="w-20 h-16 flex items-center justify-center mb-2 mx-auto overflow-hidden"
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.div>

            <h3
              className="text-xl font-bold mb-2 min-h-[48px] flex items-center justify-center"
              dir={currentLanguage === "ar" ? "rtl" : "ltr"}
            >
              {displayTitle}
            </h3>

            <p
              className="text-black leading-relaxed text-center mb-4"
              dir={currentLanguage === "ar" ? "rtl" : "ltr"}
            >
              {displayDescription}
            </p>

            <div className="mt-auto">
              <Link to={`/service/${id}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 border-none"
                  >
                    {t("learnMore", "Learn More")}
                  </Button>
                </motion.div>
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation("services");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  useEffect(() => {
    fetchServices();
    setupRealtimeSubscription();

    return () => {
      supabase.channel("services-changes").unsubscribe();
    };
  }, []);

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
      const { data, error } = await supabase
        .from("Services")
        .select("*")
        .order("name");

      if (error) throw error;
      setServices((data || []).slice(0, 4));
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (
    serviceName: string,
    scale = 0.5,
    rotationSpeed = 1.2,
  ) => {
    if (!serviceName)
      return <AppDevelopment3D scale={scale} rotationSpeed={rotationSpeed} />;

    const name = serviceName.toLowerCase();

    if (
      name.includes("web") ||
      name.includes("development") ||
      name.includes("تطوير") ||
      name.includes("المواقع")
    ) {
      return <WebDevelopment3D scale={scale} rotationSpeed={rotationSpeed} />;
    } else if (name.includes("graphic") || name.includes("جرافيك")) {
      return <DesignServices3D scale={scale} rotationSpeed={rotationSpeed} />;
    } else if (name.includes("logo") || name.includes("الشعارات")) {
      return <LogoDesign3D scale={scale} rotationSpeed={rotationSpeed} />;
    } else if (name.includes("content") || name.includes("محتوى")) {
      return <ContentCreation3D scale={scale} rotationSpeed={rotationSpeed} />;
    } else {
      return <AppDevelopment3D scale={scale} rotationSpeed={rotationSpeed} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden border-0"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("ourServices", "Our ")}

            <span className="text-yellow-500">{t("services", "Services")}</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            {t(
              "subtitle",
              "We offer a wide range of digital services to help your business grow and succeed in the digital landscape.",
            )}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchServices}>
              {t("tryAgain", "Try Again")}
            </Button>
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                icon={getServiceIcon(
                  i18n.language === "ar" && service.name_ar
                    ? service.name_ar
                    : service.name,
                )}
                title={service.name}
                title_ar={service.name_ar}
                description={service.description}
                description_ar={service.description_ar}
                delay={index * 0.1}
                index={index}
                t={t}
                currentLanguage={i18n.language}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {t("noServices", "No services available at the moment.")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
