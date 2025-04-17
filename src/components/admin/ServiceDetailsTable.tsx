import React, { useState, useEffect, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  Image,
  Upload,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ServiceDetail = Database["public"]["Tables"]["ServiceDetails"]["Row"];
type ServiceDetailInsert =
  Database["public"]["Tables"]["ServiceDetails"]["Insert"];
type Service = Database["public"]["Tables"]["Services"]["Row"];

const ProcessStepEditor = ({
  process,
  setProcess,
}: {
  process: Array<{ title: string; description: string; icon?: string }>;
  setProcess: (
    process: Array<{ title: string; description: string; icon?: string }>,
  ) => void;
}) => {
  const addStep = () => {
    setProcess([...process, { title: "", description: "", icon: "" }]);
  };

  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = [...process];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setProcess(newSteps);
  };

  const removeStep = (index: number) => {
    setProcess(process.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {process.map((step, index) => (
        <Card key={index} className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">Step {index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeStep(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <Input
              placeholder="Title"
              value={step.title}
              onChange={(e) => updateStep(index, "title", e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={step.description}
              onChange={(e) => updateStep(index, "description", e.target.value)}
              rows={2}
            />
            <Input
              placeholder="Icon name (optional)"
              value={step.icon || ""}
              onChange={(e) => updateStep(index, "icon", e.target.value)}
            />
          </div>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addStep}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Step
      </Button>
    </div>
  );
};

const ServiceDetailsTable = () => {
  const [serviceDetails, setServiceDetails] = useState<ServiceDetail[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentServiceDetail, setCurrentServiceDetail] =
    useState<Partial<ServiceDetail> | null>(null);
  const [formData, setFormData] = useState<Partial<ServiceDetailInsert>>({
    name: "",
    description: "",
    service_id: "",
    details: "",
    long_description: "",
    graphic_design_portfolio: [],
    process: [],
    benefits: [],
    cta: { title: "", description: "" },
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchServiceDetails();
    fetchServices();
    setupRealtimeSubscription();
    return () => {
      supabase.channel("servicedetails-changes").unsubscribe();
    };
  }, []);

  const setupRealtimeSubscription = () => {
    supabase
      .channel("servicedetails-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ServiceDetails" },
        () => {
          fetchServiceDetails();
        },
      )
      .subscribe();
  };

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ServiceDetails")
        .select("*, Services(name)");
      if (error) throw error;
      setServiceDetails(data || []);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching service details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("Services")
        .select("id, name")
        .order("name");
      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      console.error("Error fetching services:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service_id: value }));
  };

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const urls = e.target.value.split("\n").filter((url) => url.trim() !== "");
    setFormData((prev) => ({ ...prev, graphic_design_portfolio: urls }));
    setPreviewImages(urls);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setUploadError(
        "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.",
      );
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError("Image is too large. Maximum size is 5MB.");
      return;
    }

    setUploadingImage(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `service-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      const updatedUrls = [
        ...(formData.graphic_design_portfolio || []),
        publicUrl,
      ];
      setFormData((prev) => ({
        ...prev,
        graphic_design_portfolio: updatedUrls,
      }));
      setPreviewImages(updatedUrls);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setUploadError(
        error.message || "Failed to upload image. Please try again.",
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedUrls = [...(formData.graphic_design_portfolio || [])];
    updatedUrls.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      graphic_design_portfolio: updatedUrls,
    }));
    setPreviewImages(updatedUrls);
  };

  const handleBenefitsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const benefits = e.target.value
      .split("\n")
      .filter((benefit) => benefit.trim() !== "");
    setFormData((prev) => ({ ...prev, benefits }));
  };

  const handleCtaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      cta: { ...((prev.cta as any) || {}), [name.replace("cta_", "")]: value },
    }));
  };

  const openAddDialog = () => {
    setCurrentServiceDetail(null);
    setFormData({
      name: "",
      description: "",
      service_id: "",
      details: "",
      long_description: "",
      graphic_design_portfolio: [],
      process: [],
      benefits: [],
      cta: { title: "", description: "" },
    });
    setPreviewImages([]);
    setUploadError(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (serviceDetail: ServiceDetail) => {
    setCurrentServiceDetail(serviceDetail);
    setFormData({
      name: serviceDetail.name,
      description: serviceDetail.description,
      service_id: serviceDetail.service_id,
      details: serviceDetail.details || "",
      long_description: serviceDetail.long_description || "",
      graphic_design_portfolio: serviceDetail.graphic_design_portfolio || [],
      process: serviceDetail.process || [],
      benefits: serviceDetail.benefits || [],
      cta: serviceDetail.cta || { title: "", description: "" },
    });
    setPreviewImages(serviceDetail.graphic_design_portfolio || []);
    setUploadError(null);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (serviceDetail: ServiceDetail) => {
    setCurrentServiceDetail(serviceDetail);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.service_id || !formData.name || !formData.description) {
      setError("Service ID, name, and description are required");
      return;
    }

    try {
      if (currentServiceDetail?.id) {
        const { error } = await supabase
          .from("ServiceDetails")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentServiceDetail.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("ServiceDetails").insert({
          ...(formData as ServiceDetailInsert),
          created_at: new Date().toISOString(),
        });
        if (error) throw error;
      }
      setIsDialogOpen(false);
      fetchServiceDetails();
    } catch (error: any) {
      setError(error.message);
      console.error("Error saving service detail:", error);
    }
  };

  const handleDelete = async () => {
    if (!currentServiceDetail?.id) return;

    try {
      const { error } = await supabase
        .from("ServiceDetails")
        .delete()
        .eq("id", currentServiceDetail.id);
      if (error) throw error;
      setIsDeleteDialogOpen(false);
      fetchServiceDetails();
    } catch (error: any) {
      setError(error.message);
      console.error("Error deleting service detail:", error);
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
        <h2 className="text-2xl font-bold">Service Details</h2>
        <Button
          onClick={openAddDialog}
          className="bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service Detail
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

      {serviceDetails.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No service details found. Click "Add Service Detail" to create one.
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Portfolio Images</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceDetails.map((detail) => (
                <TableRow key={detail.id}>
                  <TableCell className="font-medium">{detail.name}</TableCell>
                  <TableCell>
                    {(detail as any).Services?.name || "Unknown"}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {detail.description}
                  </TableCell>
                  <TableCell>
                    {detail.graphic_design_portfolio &&
                    detail.graphic_design_portfolio.length > 0 ? (
                      <span className="flex items-center">
                        <Image className="h-4 w-4 mr-1" />
                        {detail.graphic_design_portfolio.length} images
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">No images</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(detail)}
                        className="h-8 w-8 text-gray-600 hover:text-yellow-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(detail)}
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
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentServiceDetail
                ? "Edit Service Detail"
                : "Add New Service Detail"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="service_id" className="text-sm font-medium">
                Service
              </label>
              <Select
                value={formData.service_id}
                onValueChange={handleServiceChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
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
              <label htmlFor="description" className="text-sm font-medium">
                Short Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the service"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="details" className="text-sm font-medium">
                Details
              </label>
              <Textarea
                id="details"
                name="details"
                value={formData.details || ""}
                onChange={handleInputChange}
                placeholder="Additional details about the service"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="long_description" className="text-sm font-medium">
                Long Description
              </label>
              <Textarea
                id="long_description"
                name="long_description"
                value={formData.long_description || ""}
                onChange={handleInputChange}
                placeholder="Comprehensive description of the service"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="portfolio" className="text-sm font-medium">
                Portfolio Images
              </label>
              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Upload Images</h4>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center"
                  >
                    {uploadingImage ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </>
                    )}
                  </Button>
                </div>

                {uploadError && (
                  <div className="p-2 mb-3 bg-red-50 text-red-600 rounded-md text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {uploadError}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-red-600 hover:text-red-700 h-6 w-6 p-0"
                      onClick={() => setUploadError(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {previewImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {previewImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">
                  Or Enter Image URLs Manually
                </h4>
                <Textarea
                  id="portfolio"
                  name="portfolio"
                  value={formData.graphic_design_portfolio?.join("\n") || ""}
                  onChange={handlePortfolioChange}
                  placeholder="Enter one image URL per line"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter one image URL per line
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Process Steps</label>
              <ProcessStepEditor
                process={formData.process || []}
                setProcess={(newProcess) =>
                  setFormData({ ...formData, process: newProcess })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="benefits" className="text-sm font-medium">
                Benefits
              </label>
              <Textarea
                id="benefits"
                name="benefits"
                value={formData.benefits?.join("\n") || ""}
                onChange={(e) => {
                  const benefitsArray = e.target.value.split("\n");
                  setFormData((prev) => ({
                    ...prev,
                    benefits: benefitsArray,
                  }));
                }}
                placeholder="Enter one benefit per line"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const textarea = e.target as HTMLTextAreaElement;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const value = textarea.value;

                    textarea.value =
                      value.substring(0, start) + "\n" + value.substring(end);

                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                    const benefitsArray = textarea.value.split("\n");
                    setFormData((prev) => ({
                      ...prev,
                      benefits: benefitsArray,
                    }));
                  }
                }}
              />
              <p className="text-xs text-gray-500">
                Enter one benefit per line
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Call to Action</label>
              <Input
                id="cta_title"
                name="cta_title"
                value={(formData.cta as any)?.title || ""}
                onChange={handleCtaChange}
                placeholder="CTA Title"
                className="mb-2"
              />
              <Textarea
                id="cta_description"
                name="cta_description"
                value={(formData.cta as any)?.description || ""}
                onChange={handleCtaChange}
                placeholder="CTA Description"
                rows={2}
              />
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
              {currentServiceDetail ? "Save Changes" : "Add Service Detail"}
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
              Are you sure you want to delete the service detail "
              {currentServiceDetail?.name}"? This action cannot be undone.
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

export default ServiceDetailsTable;
