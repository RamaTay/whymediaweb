import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("footer");

  // Handle navigation to team section in About page
  const handleTeamClick = (e) => {
    e.preventDefault();
    navigate("/about");
    setTimeout(() => {
      const teamSection = document.getElementById("team");
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Handle navigation to careers section in Services page
  const handleCareersClick = (e) => {
    e.preventDefault();
    navigate("/services");
    setTimeout(() => {
      const careersSection = document.getElementById("careers");
      if (careersSection) {
        careersSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("whyMedia").split(" ")[0]}{" "}
              <span className="text-yellow-400">
                {t("whyMedia").split(" ")[1] || "Media"}
              </span>
            </h3>
            <p className="text-gray-400">{t("tagline")}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("services")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/service/web-development"
                  className="hover:text-yellow-400"
                >
                  {t("webDevelopment")}
                </Link>
              </li>
              <li>
                <Link
                  to="/service/graphic-design"
                  className="hover:text-yellow-400"
                >
                  {t("graphicDesign")}
                </Link>
              </li>
              <li>
                <Link
                  to="/service/content-creation"
                  className="hover:text-yellow-400"
                >
                  {t("contentCreation")}
                </Link>
              </li>
              <li>
                <Link
                  to="/service/logo-design"
                  className="hover:text-yellow-400"
                >
                  {t("logoDesign")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-yellow-400">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <a
                  href="/about#team"
                  className="hover:text-yellow-400"
                  onClick={handleTeamClick}
                >
                  {t("ourTeam")}
                </a>
              </li>
              <li>
                <a
                  href="/services#careers"
                  className="hover:text-yellow-400"
                  onClick={handleCareersClick}
                >
                  {t("careers")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="mailto:info@whymaidua.com"
                  className="hover:text-yellow-400"
                >
                  {t("email")}
                </a>
              </li>
              <li>
                <a href="tel:+11234567890" className="hover:text-yellow-400">
                  {t("phone")}
                </a>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-yellow-400">
                  {t("address")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Why Maidua. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
