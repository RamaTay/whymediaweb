import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FaqTable = () => {
  const [faqs, setFaqs] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    service_id: null,
    question_ar: "", // إضافة الحقل للسؤال بالعربية
    answer_ar: "", // إضافة الحقل للإجابة بالعربية
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchFaqs();
    fetchServices();
  }, []);

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from("FAQs")
      .select("*, Services(name)")
      .order("created_at", { ascending: false });
    if (!error) setFaqs(data);
  };

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("Services")
      .select("id, name")
      .order("name", { ascending: true });
    if (!error) setServices(data);
  };

  const openAddDialog = () => {
    setIsEditing(false);
    setFormData({
      question: "",
      answer: "",
      service_id: null,
      question_ar: "",
      answer_ar: "",
    });
    setDialogOpen(true);
  };

  const openEditDialog = (faq) => {
    setIsEditing(true);
    setCurrentFaqId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      service_id: faq.service_id,
      question_ar: faq.question_ar, // تحميل السؤال بالعربية
      answer_ar: faq.answer_ar, // تحميل الجواب بالعربية
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (id) => {
    setCurrentFaqId(id);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.question || !formData.answer) return;

    const dataToInsert = {
      question: formData.question,
      answer: formData.answer,
      service_id: formData.service_id,
      question_ar: formData.question_ar, // تضمين السؤال بالعربية
      answer_ar: formData.answer_ar, // تضمين الجواب بالعربية
    };

    if (isEditing) {
      // تحديث FAQ الحالي
      await supabase
        .from("FAQs")
        .update({
          question: formData.question,
          answer: formData.answer,
          service_id: formData.service_id,
          question_ar: formData.question_ar, // تحديث السؤال بالعربية
          answer_ar: formData.answer_ar, // تحديث الجواب بالعربية
          updated_at: new Date().toISOString(),
        })
        .eq("id", currentFaqId);
    } else {
      // إضافة FAQ جديد
      await supabase.from("FAQs").insert([dataToInsert]);
    }

    resetForm();
    fetchFaqs();
  };

  const handleDelete = async () => {
    await supabase.from("FAQs").delete().eq("id", currentFaqId);

    setDeleteDialogOpen(false);
    fetchFaqs();
  };

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      service_id: null,
      question_ar: "",
      answer_ar: "",
    });
    setCurrentFaqId(null);
    setDialogOpen(false);
    setIsEditing(false);
  };

  const handleServiceChange = (value) => {
    setFormData({ ...formData, service_id: value === "null" ? null : value });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">FAQs</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={openAddDialog}
            >
              <Plus className="h-4 w-4 mr-2" /> Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Question (English)
                  </label>
                  <Input
                    placeholder="Question"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Question (العربية)
                  </label>
                  <Input
                    placeholder="السؤال"
                    value={formData.question_ar}
                    onChange={(e) =>
                      setFormData({ ...formData, question_ar: e.target.value })
                    }
                    dir="rtl"
                    className="font-arabic"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Answer (English)
                  </label>
                  <Textarea
                    placeholder="Answer"
                    value={formData.answer}
                    onChange={(e) =>
                      setFormData({ ...formData, answer: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Answer (العربية)
                  </label>
                  <Textarea
                    placeholder="الإجابة"
                    value={formData.answer_ar}
                    onChange={(e) =>
                      setFormData({ ...formData, answer_ar: e.target.value })
                    }
                    dir="rtl"
                    className="font-arabic"
                  />
                </div>
              </div>
              <Select
                value={formData.service_id || "null"}
                onValueChange={handleServiceChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">
                    General (No specific service)
                  </SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                {isEditing ? "Save Changes" : "Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell className="font-medium">{faq.question}</TableCell>
              <TableCell>{faq.answer}</TableCell>
              <TableCell>{faq.Services?.name || "General"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(faq)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openDeleteDialog(faq.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              FAQ.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FaqTable;
