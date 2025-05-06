import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import WebDevelopment3D from "./3d-objects/WebDevelopment3D";
import DesignServices3D from "./3d-objects/DesignServices3D";
import ContentCreation3D from "./3d-objects/ContentCreation3D";
import LogoDesign3D from "./3d-objects/LogoDesign3D";
import AppDevelopment3D from "./3d-objects/AppDevelopment3D";
import ScrollEffect3D from "./ScrollEffect3D";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";
import { useTranslation } from "react-i18next";

interface ServiceData {
  id: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  icon: React.ReactNode;
  details: string;
  details_ar: string;
  longDescription: string;
  longDescription_ar: string;
  process: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    icon: string;
  }[];
  benefits: string[];
  benefits_ar: string[];
  faq: {
    question: string;
    question_ar: string;
    answer: string;
    answer_ar: string;
  }[];
  cta: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
  };
  portfolio: string[];
}

type Service = Database["public"]["Tables"]["Services"]["Row"];
type ServiceDetail = Database["public"]["Tables"]["ServiceDetails"]["Row"];
type FAQ = Database["public"]["Tables"]["FAQs"]["Row"];

const ServicePage = () => {
  const { t, i18n } = useTranslation("services");
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(
    null,
  );
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [relatedServicesLoading, setRelatedServicesLoading] = useState(false);

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetail();
      fetchFaqs();
      fetchRelatedServices();
    }
  }, [serviceId, i18n.language]);

  const fetchServiceDetail = async () => {
    try {
      setLoading(true);
      const { data: serviceDetails, error: detailsError } = await supabase
        .from("ServiceDetails")
        .select("*, Services(name, name_ar)")
        .eq("service_id", serviceId)
        .maybeSingle();

      if (detailsError || !serviceDetails) {
        const { data: serviceById, error: idError } = await supabase
          .from("ServiceDetails")
          .select("*, Services(name, name_ar)")
          .eq("id", serviceId)
          .maybeSingle();

        if (idError || !serviceById) {
          const { data: servicesByName, error: nameError } = await supabase
            .from("ServiceDetails")
            .select("*, Services(name, name_ar)")
            .ilike("name", serviceId.replace(/-/g, "%"));

          if (nameError) throw nameError;
          if (servicesByName && servicesByName.length > 0) {
            setServiceDetail(servicesByName[0]);
          } else {
            setServiceDetail(null);
          }
        } else {
          setServiceDetail(serviceById);
        }
      } else {
        setServiceDetail(serviceDetails);
      }
    } catch (error: any) {
      console.error("Error fetching service detail:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from("FAQs")
        .select("*")
        .eq("service_id", serviceId);

      if (error) throw error;
      setFaqs(data || []);

      if (data.length === 0) {
        const { data: generalFaqs, error: generalError } = await supabase
          .from("FAQs")
          .select("*")
          .is("service_id", null);

        if (!generalError && generalFaqs) {
          setFaqs(generalFaqs);
        }
      }
    } catch (error: any) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const fetchRelatedServices = async () => {
    try {
      setRelatedServicesLoading(true);
      const { data, error } = await supabase
        .from("Services")
        .select("*")
        .order("name");

      if (error) throw error;
      setRelatedServices(
        data?.filter((service) => service.id !== serviceId) || [],
      );
    } catch (error: any) {
      console.error("Error fetching related services:", error);
    } finally {
      setRelatedServicesLoading(false);
    }
  };

  const service = serviceDetail
    ? {
        id: serviceDetail.id,
        title:
          i18n.language === "ar"
            ? serviceDetail.name_ar || serviceDetail.name
            : serviceDetail.name,
        description:
          i18n.language === "ar"
            ? serviceDetail.description_ar || serviceDetail.description
            : serviceDetail.description,
        icon: getServiceIcon(serviceDetail.name),
        details:
          i18n.language === "ar"
            ? serviceDetail.details_ar || serviceDetail.details
            : serviceDetail.details || "",
        longDescription:
          i18n.language === "ar"
            ? serviceDetail.long_description_ar ||
              serviceDetail.long_description
            : serviceDetail.long_description || "",
        process:
          ((i18n.language === "ar"
            ? serviceDetail.process_ar || serviceDetail.process
            : serviceDetail.process) as any[]) || [],
        benefits:
          ((i18n.language === "ar"
            ? serviceDetail.benefits_ar || serviceDetail.benefits
            : serviceDetail.benefits) as string[]) || [],
        faq: faqs.map((faq) => ({
          question:
            i18n.language === "ar"
              ? faq.question_ar || faq.question
              : faq.question,
          answer:
            i18n.language === "ar" ? faq.answer_ar || faq.answer : faq.answer,
        })),
        cta: {
          title:
            i18n.language === "ar"
              ? (serviceDetail.cta_ar as any)?.title ||
                (serviceDetail.cta as any)?.title ||
                ""
              : (serviceDetail.cta as any)?.title || "",
          description:
            i18n.language === "ar"
              ? (serviceDetail.cta_ar as any)?.description ||
                (serviceDetail.cta as any)?.description ||
                ""
              : (serviceDetail.cta as any)?.description || "",
        },
        portfolio: serviceDetail.graphic_design_portfolio || [],
      }
    : null;

  function getServiceIcon(name: string) {
    if (!name) return <AppDevelopment3D scale={1} rotationSpeed={1} />;

    const lowercaseName = name.toLowerCase();
    console.log("Service name for icon:", lowercaseName);

    if (
      lowercaseName.includes("web") ||
      lowercaseName.includes("development") ||
      lowercaseName.includes("تطوير")
    ) {
      return <WebDevelopment3D scale={1} rotationSpeed={1} />;
    } else if (
      lowercaseName.includes("graphic") ||
      lowercaseName.includes("جرافيك")
    ) {
      return <DesignServices3D scale={1} rotationSpeed={1} />;
    } else if (
      lowercaseName.includes("logo") ||
      lowercaseName.includes("شعار")
    ) {
      return <LogoDesign3D scale={1} rotationSpeed={1} />;
    } else if (
      lowercaseName.includes("content") ||
      lowercaseName.includes("محتوى")
    ) {
      return <ContentCreation3D scale={1} rotationSpeed={1} />;
    } else {
      return <AppDevelopment3D scale={1} rotationSpeed={1} />;
    }
  }

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Service not found</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/services"
            className={`inline-flex items-center text-yellow-500 hover:text-yellow-600 mb-6 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
          >
            <ArrowLeft
              className={
                i18n.language === "ar"
                  ? "ml-2 h-4 w-4 transform rotate-180"
                  : "mr-2 h-4 w-4"
              }
            />
            {t("backToAllServices", "Back to All Services")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {service.longDescription}
                </p>
                <Button
                  onClick={handleContactClick}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-6 h-auto text-lg rounded-full"
                >
                  {t("getFreeConsultation", "Get a Free Consultation")}
                </Button>
              </motion.div>
            </div>
            <div className="lg:col-span-5">
              <ScrollEffect3D
                depth={100}
                rotationIntensity={5}
                scrollMultiplier={1.2}
                disableShadow
              >
                <motion.div
                  className="flex justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  {service.icon}
                </motion.div>
              </ScrollEffect3D>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {t("our", "Our")} {service.title} {t("process", "Process")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t(
                "processDescription",
                "We follow a structured approach to deliver exceptional results for every project.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-6 h-full border border-gray-100"
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-yellow-500">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {t("benefitsOf", "Benefits of Our")} {service.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t(
                "benefitsDescription",
                "Here's how our services can help your business grow and succeed.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mb-4 text-white">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {service.portfolio && service.portfolio.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {service.title} {t("portfolio", "Portfolio")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t(
                  "portfolioDescription",
                  "Take a look at some of our recent work in",
                )}{" "}
                {service.title.toLowerCase()}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.portfolio.map((image, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl overflow-hidden aspect-video bg-gray-100"
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <img
                    src={image}
                    alt={`${service.title} portfolio ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {t("faq", "Frequently Asked Questions")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t(
                  "faqDescription",
                  "Find answers to common questions about our",
                )}{" "}
                {service.title.toLowerCase()} {t("services", "services")}.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {service.faq.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{service.cta.title}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {service.cta.description}
          </p>
          <Button
            onClick={handleContactClick}
            className="bg-white text-yellow-500 hover:bg-gray-100 px-8 py-6 h-auto text-lg rounded-full"
          >
            {t("contactUsToday", "Contact Us Today")}
          </Button>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {t("exploreOtherServices", "Explore Other Services")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t(
                "exploreDescription",
                "Discover our full range of digital services to help your business grow.",
              )}
            </p>
          </div>

          {relatedServicesLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : relatedServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
              {relatedServices.slice(0, 4).map((relatedService, index) => (
                <motion.div
                  key={relatedService.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3">
                      {i18n.language === "ar"
                        ? relatedService.name_ar || relatedService.name
                        : relatedService.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {i18n.language === "ar"
                        ? relatedService.description_ar ||
                          relatedService.description
                        : relatedService.description}
                    </p>
                    <Link
                      to={`/service/${relatedService.id}`}
                      className="mt-auto"
                    >
                      <Button variant="outline" className="w-full">
                        {t("learnMore", "Learn More")}
                        <ChevronRight
                          className={
                            i18n.language === "ar"
                              ? "mr-2 h-4 w-4 transform rotate-180"
                              : "ml-2 h-4 w-4"
                          }
                        />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {t("noRelatedServices", "No related services found.")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
