import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScrollEffect3D from "./ScrollEffect3D";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("about");

  const handleGetInTouchClick = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
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
              <span>{t("title", "About ")}</span>
              <span className="text-yellow-500">{t("word", "Why Media")}</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t(
                "subtitle",
                "Where Ideas Meet Innovation – Your Digital Solutions Partner",
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <ScrollEffect3D
                depth={100}
                rotationIntensity={5}
                scrollMultiplier={1.2}
              >
                <motion.div
                  className="rounded-2xl overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                    alt="Our Team"
                    className="w-full h-auto"
                  />
                </motion.div>
              </ScrollEffect3D>
            </div>
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Vision Section */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span>{t("vision.title", "Our ")}</span>
                  <span className="text-yellow-500">
                    {t("vision.word", "Vision")}
                  </span>
                </h2>

                <p className="text-lg text-gray-600 mb-8">
                  {t(
                    "vision.description",
                    "To be the leading partner in uncovering the intrinsic purpose ('Why') of brands and individuals, transforming it into visually compelling and strategically aligned solutions that reflect their true essence and drive meaningful impact in the marketplace.",
                  )}
                </p>

                {/* Mission Section */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span>{t("mission.title", "Our ")}</span>
                  <span className="text-yellow-500">
                    {t("mission.word", " Mission")}
                  </span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {t(
                    "mission.description",
                    "We assist brands in identifying their 'why' through a methodical research process, then translate this understanding into practical visual designs that align with the brand's strategic objectives and market needs.",
                  )}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Center the Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span>{t("values.title", "Our ")}</span>
              <span className="text-yellow-500">
                {t("values.word", "Values")}
              </span>
            </h2>
          </div>

          {/* Grid Layout for Value Cards (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: t("values.items.0.title", "Commitment to 'Why'"),
                description: t(
                  "values.items.0.description",
                  "We are dedicated to uncovering and honoring the core purpose behind every brand. This commitment drives every decision and design we make, ensuring that each project is deeply rooted in meaning, not just aesthetics.",
                ),
              },
              {
                title: t("values.items.1.title", "Continuous Innovation"),
                description: t(
                  "values.items.1.description",
                  "We believe that creativity knows no limits. Through forward-thinking and smart experimentation, we constantly seek new and better ways to solve problems and bring fresh, impactful ideas to life.",
                ),
              },
              {
                title: t("values.items.2.title", "Authenticity First"),
                description: t(
                  "values.items.2.description",
                  "We prioritize honesty and transparency in everything we do. Our designs reflect the true essence of our clients, steering away from imitation to create meaningful and genuine connections with their audience.",
                ),
              },
              {
                title: t("values.items.3.title", "Unbounded Growth"),
                description: t(
                  "values.items.3.description",
                  "We believe in the limitless potential of every brand and individual. Through strategic guidance and ongoing support, we help unlock new levels of growth, expansion, and success—without boundaries.",
                ),
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span>{t("team.title", "Our ")}</span>
              <span className="text-yellow-500">{t("team.word", "Team")}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t(
                "team.subtitle",
                "Meet the talented professionals behind Maidua's success.",
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: t("team.members.0.name", "Alex Johnson"),
                role: t("team.members.0.role", "Founder & CEO"),
                image: "",
                description: t(
                  "team.members.0.description",
                  "With over 15 years of experience in digital innovation, Alex leads our team with vision and expertise.",
                ),
              },
              {
                name: t("team.members.1.name", "Samantha Lee"),
                role: t("team.members.1.role", "Creative Director"),
                image: "",
                description: t(
                  "team.members.1.description",
                  "Samantha brings creative excellence to every project, ensuring stunning visual designs that captivate audiences.",
                ),
              },
              {
                name: t("team.members.2.name", "Marcus Chen"),
                role: t("team.members.2.role", "Lead Developer"),
                image: "",
                description: t(
                  "team.members.2.description",
                  "Marcus combines technical brilliance with problem-solving skills to build robust, scalable solutions.",
                ),
              },
              {
                name: t("team.members.3.name", "Olivia Rodriguez"),
                role: t("team.members.3.role", "Client Success Manager"),
                image: "",
                description: t(
                  "team.members.3.description",
                  "Olivia ensures our clients receive exceptional service and support throughout their journey with us.",
                ),
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-sm"
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-yellow-500 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span>{t("cta.title", "Our ")}</span>
            <span className="text-yellow-500">{t("cta.word", "Vision")}</span>
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-black">
            {t(
              "cta.description",
              "Contact us today to discuss how we can help your business thrive in the digital landscape.",
            )}
          </p>
          <motion.button
            onClick={handleGetInTouchClick}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full text-lg font-semibold shadow-lg border-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("cta.button", "Get in Touch")}
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
