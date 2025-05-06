import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim())
      newErrors.name = t("validation.name", "Name is required");
    if (!formData.email.trim()) {
      newErrors.email = t("validation.email.required", "Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t("validation.email.invalid", "Email is invalid");
    }
    if (!formData.subject.trim())
      newErrors.subject = t("validation.subject", "Subject is required");
    if (!formData.message.trim())
      newErrors.message = t("validation.message", "Message is required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setTimeout(() => {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      }, 1500);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden border-0"
      style={{
        scrollMarginTop: "100px",
        paddingTop: "1px",
        marginTop: "-1px",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-black">{t("get", "Get In ")}</span>
            <span className="text-yellow-500">{t("touch", "Touch")}</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            {t(
              "subtitle",
              "Have a project in mind or want to learn more about our services? Send us a message and we'll get back to you as soon as possible.",
            )}
          </p>
        </motion.div>
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden">
            <CardContent className="p-8">
              {formStatus === "success" ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    {t("success.title", "Message Sent Successfully!")}
                  </h3>
                  <p className="text-gray-600">
                    {t(
                      "success.message",
                      "Thank you for reaching out. We'll get back to you shortly.",
                    )}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("form.name.label", "Your Name")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("form.name.placeholder", "John Doe")}
                        className={`w-full transition-all ${errors.name ? "border-red-500" : "focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400"}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("form.email.label", "Email Address")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t(
                          "form.email.placeholder",
                          "john@example.com",
                        )}
                        className={`w-full transition-all ${errors.email ? "border-red-500" : "focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400"}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("form.subject.label", "Subject")}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t(
                        "form.subject.placeholder",
                        "How can we help you?",
                      )}
                      className={`w-full transition-all ${errors.subject ? "border-red-500" : "focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400"}`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("form.message.label", "Your Message")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t(
                        "form.message.placeholder",
                        "Tell us about your project or inquiry...",
                      )}
                      rows={5}
                      className={`w-full transition-all ${errors.message ? "border-red-500" : "focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400"}`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="px-8 py-6 h-auto text-base font-medium bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-white rounded-full transition-all transform hover:scale-105 shadow-lg"
                      disabled={formStatus !== "idle"}
                    >
                      {formStatus === "idle" ? (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t("form.button", "Send Message")}
                        </>
                      ) : (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          {t("form.sending", "Sending...")}
                        </div>
                      )}
                    </Button>
                  </div>
                  {formStatus === "error" && (
                    <motion.div
                      className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>
                        {t(
                          "error.message",
                          "There was an error sending your message. Please try again.",
                        )}
                      </span>
                    </motion.div>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
