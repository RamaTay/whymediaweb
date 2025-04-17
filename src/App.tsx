import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import ServiceDetailsPage from "./components/ServiceDetailsPage";
import ServicePage from "./components/ServicePage";
import AboutUs from "./components/AboutUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminLayout from "./components/admin/AdminLayout";
import ServicesTable from "./components/admin/ServicesTable";
import ServiceDetailsTable from "./components/admin/ServiceDetailsTable";
import FaqTable from "./components/admin/FaqTable";
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
        {!location.pathname.startsWith("/admin") && <Header />}
        <div className={!location.pathname.startsWith("/admin") ? "pt-16" : ""}>
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

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ServicesTable />} />
              <Route path="services" element={<ServicesTable />} />
              <Route path="service-details" element={<ServiceDetailsTable />} />
              <Route path="faqs" element={<FaqTable />} />
            </Route>

            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </div>
        {!location.pathname.startsWith("/admin") && <Footer />}
      </>
    </Suspense>
  );
}

export default App;
