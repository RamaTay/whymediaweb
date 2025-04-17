import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import AdminLogin from "./AdminLogin";

const AdminLayout = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("services");
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/admin/${value}`);
  };

  const handleLogin = () => {
    navigate("/admin/services");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {" "}
      {/* Add padding for the fixed header */}
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/admin" className="text-xl font-bold text-yellow-500">
            Why Media Admin
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      {/* Admin Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-6"
        >
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="services" className="flex-1">
              Services
            </TabsTrigger>
            <TabsTrigger value="service-details" className="flex-1">
              Service Details
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex-1">
              FAQs
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
