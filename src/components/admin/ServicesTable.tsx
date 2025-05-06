import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";

type Service = Database["public"]["Tables"]["Services"]["Row"];
type ServiceInsert = Database["public"]["Tables"]["Services"]["Insert"];

const ServicesTable = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(
    null,
  );
  const [formData, setFormData] = useState<ServiceInsert>({
    name: "",
    name_ar: "",
    description: "",
    description_ar: "",
    technical_skills_tools: [],
    technical_skills_tools_ar: [],
  });

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
      setServices(data || []);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    isArabic: boolean = false,
  ) => {
    const skills = e.target.value
      .split("\n")
      .filter((skill) => skill.trim() !== "");

    if (isArabic) {
      setFormData((prev) => ({ ...prev, technical_skills_tools_ar: skills }));
    } else {
      setFormData((prev) => ({ ...prev, technical_skills_tools: skills }));
    }
  };

  const openAddDialog = () => {
    setCurrentService(null);
    setFormData({
      name: "",
      name_ar: "",
      description: "",
      description_ar: "",
      technical_skills_tools: [],
      technical_skills_tools_ar: [],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      name_ar: service.name_ar || "",
      description: service.description,
      description_ar: service.description_ar || "",
      technical_skills_tools: service.technical_skills_tools || [],
      technical_skills_tools_ar: service.technical_skills_tools_ar || [],
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (currentService?.id) {
        const { error } = await supabase
          .from("Services")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentService.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("Services").insert({
          ...formData,
          created_at: new Date().toISOString(),
        });

        if (error) throw error;
      }

      setIsDialogOpen(false);
      fetchServices();
    } catch (error: any) {
      setError(error.message);
      console.error("Error saving service:", error);
    }
  };

  const handleDelete = async () => {
    if (!currentService?.id) return;

    try {
      const { error } = await supabase
        .from("Services")
        .delete()
        .eq("id", currentService.id);

      if (error) throw error;
      setIsDeleteDialogOpen(false);
      fetchServices();
    } catch (error: any) {
      setError(error.message);
      console.error("Error deleting service:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Services</h2>
        <Button
          onClick={openAddDialog}
          className="bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-md flex items-center text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-red-600 hover:text-red-700"
            onClick={() => setError(null)}
          >
            Dismiss
          </Button>
        </div>
      )}

      {services.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No services found. Click "Add Service" to create one.
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name (EN)</TableHead>
                <TableHead>Name (AR)</TableHead>
                <TableHead>Description (EN)</TableHead>
                <TableHead>Description (AR)</TableHead>
                <TableHead>Skills/Tools (EN)</TableHead>
                <TableHead>Skills/Tools (AR)</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell className="font-medium font-arabic" dir="rtl">
                    {service.name_ar}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {service.description}
                  </TableCell>
                  <TableCell
                    className="max-w-xs truncate font-arabic"
                    dir="rtl"
                  >
                    {service.description_ar}
                  </TableCell>
                  <TableCell>
                    {service.technical_skills_tools &&
                    service.technical_skills_tools.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {service.technical_skills_tools
                          .slice(0, 3)
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        {service.technical_skills_tools.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                            +{service.technical_skills_tools.length - 3} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No skills listed
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {service.technical_skills_tools_ar &&
                    service.technical_skills_tools_ar.length > 0 ? (
                      <div className="flex flex-wrap gap-1 justify-end">
                        {service.technical_skills_tools_ar
                          .slice(0, 3)
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-xs rounded-full font-arabic"
                              dir="rtl"
                            >
                              {skill}
                            </span>
                          ))}
                        {service.technical_skills_tools_ar.length > 3 && (
                          <span
                            className="px-2 py-1 bg-gray-100 text-xs rounded-full font-arabic"
                            dir="rtl"
                          >
                            +{service.technical_skills_tools_ar.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span
                        className="text-gray-400 text-sm font-arabic"
                        dir="rtl"
                      ></span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(service)}
                        className="h-8 w-8 text-gray-600 hover:text-yellow-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(service)}
                        className="h-8 w-8 text-gray-600 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {currentService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Service Name (English)
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Development"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="name_ar" className="text-sm font-medium">
                  Service Name (العربية)
                </label>
                <Input
                  id="name_ar"
                  name="name_ar"
                  value={formData.name_ar || ""}
                  onChange={handleInputChange}
                  placeholder="مثال: تطوير الويب"
                  dir="rtl"
                  className="font-arabic"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (English)
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the service"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description_ar" className="text-sm font-medium">
                  Description (العربية)
                </label>
                <Textarea
                  id="description_ar"
                  name="description_ar"
                  value={formData.description_ar || ""}
                  onChange={handleInputChange}
                  placeholder="وصف مختصر للخدمة"
                  rows={3}
                  dir="rtl"
                  className="font-arabic"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="skills" className="text-sm font-medium">
                  Technical Skills & Tools (English)
                </label>
                <textarea
                  id="skills"
                  value={formData.technical_skills_tools?.join("\n") || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      technical_skills_tools: value.split("\n"),
                    }));
                  }}
                  placeholder="Enter one skill per line"
                  rows={4}
                  className="w-full border rounded-md p-2"
                />
                <p className="text-xs text-gray-500">
                  Enter one skill or tool per line
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="skills_ar" className="text-sm font-medium">
                  Technical Skills & Tools (العربية)
                </label>
                <textarea
                  id="skills_ar"
                  value={formData.technical_skills_tools_ar?.join("\n") || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      technical_skills_tools_ar: value.split("\n"),
                    }));
                  }}
                  placeholder="أدخل مهارة واحدة في كل سطر"
                  rows={4}
                  dir="rtl"
                  className="font-arabic w-full border rounded-md p-2"
                />
                <p className="text-xs text-gray-500 font-arabic" dir="rtl">
                  أدخل مهارة أو أداة واحدة في كل سطر
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-yellow-400 hover:bg-yellow-500 text-white"
            >
              {currentService ? "Save Changes" : "Add Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete the service "
              {currentService?.name}"? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesTable;
