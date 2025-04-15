import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import ServiceDetailsPage from "./components/ServiceDetailsPage";
import ServicePage from "./components/ServicePage";
import AboutUs from "./components/AboutUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import routes from "tempo-routes";

function App() {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Header />
        <div className="pt-16">
          {/* Add padding to account for fixed header */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServiceDetailsPage />} />
            <Route
              path="/services/:serviceId"
              element={<ServiceDetailsPage />}
            />
            <Route path="/service/:serviceId" element={<ServicePage />} />
            <Route path="/about" element={<AboutUs />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </div>
        <Footer />
      </>
    </Suspense>
  );
}

export default App;
