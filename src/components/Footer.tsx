import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
              Why <span className="text-yellow-400">Media</span>
            </h3>
            <p className="text-gray-400">
              Where Ideas Meet Innovation – Your Digital Solutions Start Here!
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/service/web-development"
                  className="hover:text-yellow-400"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  to="/service/graphic-design"
                  className="hover:text-yellow-400"
                >
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  to="/service/content-creation"
                  className="hover:text-yellow-400"
                >
                  Content Creation
                </Link>
              </li>
              <li>
                <Link
                  to="/service/logo-design"
                  className="hover:text-yellow-400"
                >
                  Logo Design
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-yellow-400">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="/about#team"
                  className="hover:text-yellow-400"
                  onClick={handleTeamClick}
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="/services#careers"
                  className="hover:text-yellow-400"
                  onClick={handleCareersClick}
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="mailto:info@whymaidua.com"
                  className="hover:text-yellow-400"
                >
                  Email: info@whymaidua.com
                </a>
              </li>
              <li>
                <a href="tel:+11234567890" className="hover:text-yellow-400">
                  Phone: 0930429893
                </a>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-yellow-400">
                  Address: Baramka Damascus Tajheez Area
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Why Maidua. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
