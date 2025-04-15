import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import WebDevelopment3D from "./3d-objects/WebDevelopment3D";
import DesignServices3D from "./3d-objects/DesignServices3D";
import ContentCreation3D from "./3d-objects/ContentCreation3D";
import LogoDesign3D from "./3d-objects/LogoDesign3D";
import AppDevelopment3D from "./3d-objects/AppDevelopment3D";
import ScrollEffect3D from "./ScrollEffect3D";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  longDescription: string;
  process: {
    title: string;
    description: string;
    icon: string;
  }[];
  benefits: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  cta: {
    title: string;
    description: string;
  };
  portfolio: string[];
}

const services: Record<string, ServiceData> = {
  "graphic-design": {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Eye-catching visuals and designs that communicate your brand's message effectively.",
    icon: <DesignServices3D scale={1} rotationSpeed={1} />,
    details:
      "Our graphic design services focus on creating visually appealing and effective designs that help your brand stand out.",
    longDescription:
      "Our graphic design team combines creativity with strategic thinking to deliver designs that not only look great but also achieve your business objectives. We work closely with you to understand your brand, target audience, and goals to create designs that resonate with your customers and drive results. From branding and marketing materials to digital assets and print collateral, we provide comprehensive graphic design services tailored to your needs.",
    process: [
      {
        title: "Discovery",
        description:
          "We start by understanding your brand, target audience, and design objectives through in-depth consultations.",
        icon: "search",
      },
      {
        title: "Concept Development",
        description:
          "Our designers create initial concepts based on your requirements and brand guidelines.",
        icon: "lightbulb",
      },
      {
        title: "Refinement",
        description:
          "We refine the chosen concept based on your feedback, ensuring every detail meets your expectations.",
        icon: "edit",
      },
      {
        title: "Finalization",
        description:
          "The final designs are prepared in all required formats for various applications and platforms.",
        icon: "check-circle",
      },
    ],
    benefits: [
      "Increased brand recognition and recall",
      "Improved customer perception and trust",
      "Consistent visual identity across all touchpoints",
      "Enhanced marketing effectiveness",
      "Professional image that stands out from competitors",
      "Designs optimized for both print and digital media",
    ],
    faq: [
      {
        question: "What types of graphic design services do you offer?",
        answer:
          "We offer a wide range of graphic design services including brand identity design, marketing materials, social media graphics, packaging design, infographics, presentation design, and more.",
      },
      {
        question: "How long does a typical graphic design project take?",
        answer:
          "Project timelines vary depending on complexity and scope. A logo design might take 2-3 weeks, while a complete brand identity package could take 4-6 weeks. We'll provide a detailed timeline during our initial consultation.",
      },
      {
        question: "Do you provide source files of the designs?",
        answer:
          "Yes, we provide all source files and assets upon project completion, giving you full ownership of your designs.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Absolutely! We can work within your existing brand guidelines to ensure consistency across all materials.",
      },
    ],
    cta: {
      title: "Ready to elevate your brand with stunning designs?",
      description:
        "Contact us today to discuss your graphic design needs and how we can help your brand stand out visually.",
    },
    portfolio: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80",
      "https://images.unsplash.com/photo-1611532736637-13a8bdf96127?w=800&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      "https://images.unsplash.com/photo-1600697394936-59934aa5951f?w=800&q=80",
      "https://images.unsplash.com/photo-1634942536790-dad8f9ff3bae?w=800&q=80",
    ],
  },
  "logo-design": {
    id: "logo-design",
    title: "Logo Design",
    description:
      "Professional and memorable logos that capture your brand's essence.",
    icon: <LogoDesign3D scale={1} rotationSpeed={1} />,
    details:
      "Our logo design process is thorough and collaborative, creating logos that are not only visually appealing but also meaningful and memorable.",
    longDescription:
      "A logo is the cornerstone of your brand identity. Our logo design service focuses on creating distinctive, versatile, and timeless logos that effectively communicate your brand's values and personality. We follow a structured design process that ensures your logo is not only aesthetically pleasing but also strategically aligned with your business objectives and target audience expectations.",
    process: [
      {
        title: "Brand Analysis",
        description:
          "We conduct a thorough analysis of your brand values, target audience, and competitors to inform the design direction.",
        icon: "search",
      },
      {
        title: "Sketching & Concepts",
        description:
          "Our designers develop multiple concept sketches exploring different visual approaches for your logo.",
        icon: "pen-tool",
      },
      {
        title: "Digital Rendering",
        description:
          "The most promising concepts are digitally rendered and refined with attention to typography, color, and proportion.",
        icon: "monitor",
      },
      {
        title: "Finalization & Delivery",
        description:
          "After your approval, we prepare the final logo in various formats for different applications and provide a brand style guide.",
        icon: "package",
      },
    ],
    benefits: [
      "Instant brand recognition in the marketplace",
      "Professional image that builds customer trust",
      "Versatile design that works across all media",
      "Distinctive visual identity that sets you apart from competitors",
      "Scalable logo that maintains quality at any size",
      "Comprehensive file formats for all applications",
    ],
    faq: [
      {
        question: "How many logo concepts will I receive?",
        answer:
          "Our standard package includes 3-5 initial concepts. After you select your preferred direction, we'll refine that concept through several iterations based on your feedback.",
      },
      {
        question: "Do I own the copyright to my logo?",
        answer:
          "Yes, once the project is complete and final payment is made, you own all rights to your logo design.",
      },
      {
        question: "What file formats will I receive for my logo?",
        answer:
          "We provide your logo in all industry-standard formats including AI, EPS, PDF, PNG, JPG, and SVG, ensuring you have the right format for any application.",
      },
      {
        question: "Can you redesign my existing logo?",
        answer:
          "Absolutely! We can either refresh your current logo while maintaining its recognition or create a completely new design if you're looking for a major rebrand.",
      },
    ],
    cta: {
      title: "Ready to create a logo that makes a lasting impression?",
      description:
        "Contact us today to start the process of designing a logo that perfectly represents your brand.",
    },
    portfolio: [
      "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?w=800&q=80",
      "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=800&q=80",
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&q=80",
      "https://images.unsplash.com/photo-1599305445688-d69d165b6308?w=800&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80",
    ],
  },
  "web-development": {
    id: "web-development",
    title: "Web Development",
    description:
      "Custom websites and web applications built with the latest technologies.",
    icon: <WebDevelopment3D scale={1} rotationSpeed={1} />,
    details:
      "Our web development team creates responsive, user-friendly websites and applications that provide an exceptional user experience.",
    longDescription:
      "We design and develop websites that not only look great but also perform exceptionally well. Our web development approach focuses on creating responsive, fast-loading, and user-friendly websites that drive conversions and provide an excellent user experience. Whether you need a simple informational website, a complex e-commerce platform, or a custom web application, our team has the expertise to deliver a solution that meets your specific requirements.",
    process: [
      {
        title: "Discovery & Planning",
        description:
          "We gather requirements, define project scope, and create a detailed roadmap for your web development project.",
        icon: "clipboard",
      },
      {
        title: "Design & Prototyping",
        description:
          "Our designers create wireframes and visual designs for your approval before any coding begins.",
        icon: "layout",
      },
      {
        title: "Development",
        description:
          "Our developers build your website or application using clean, efficient code and the latest technologies.",
        icon: "code",
      },
      {
        title: "Testing & Launch",
        description:
          "We thoroughly test across devices and browsers before launching your site with proper SEO configuration.",
        icon: "check-circle",
      },
    ],
    benefits: [
      "Mobile-responsive design that works on all devices",
      "Fast-loading pages that improve user experience and SEO",
      "Intuitive navigation and user interface",
      "Search engine optimized structure and content",
      "Secure and reliable hosting solutions",
      "Ongoing support and maintenance options",
    ],
    faq: [
      {
        question: "How long does it take to build a website?",
        answer:
          "The timeline varies depending on the complexity of the project. A basic informational website might take 4-6 weeks, while a custom e-commerce site could take 8-12 weeks or more. We'll provide a detailed timeline during our planning phase.",
      },
      {
        question: "Do you provide website maintenance after launch?",
        answer:
          "Yes, we offer various maintenance packages to keep your website secure, up-to-date, and performing optimally. This includes regular updates, security monitoring, backups, and technical support.",
      },
      {
        question: "Will my website be mobile-friendly?",
        answer:
          "Absolutely! All our websites are built with a mobile-first approach, ensuring they look and function perfectly on all devices, from smartphones and tablets to desktop computers.",
      },
      {
        question: "Do you help with domain registration and hosting?",
        answer:
          "Yes, we can assist with domain registration and recommend appropriate hosting solutions based on your website's needs. We can also handle the entire setup process for you.",
      },
    ],
    cta: {
      title: "Ready to build a website that drives results?",
      description:
        "Contact us today to discuss your web development project and how we can help you achieve your online goals.",
    },
    portfolio: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    ],
  },
  "content-creation": {
    id: "content-creation",
    title: "Content Creation",
    description:
      "Engaging and SEO-optimized content that resonates with your audience.",
    icon: <ContentCreation3D scale={1} rotationSpeed={1} />,
    details:
      "Our content creation services help you tell your brand's story in a compelling way that engages your audience and drives conversions.",
    longDescription:
      "Great content is the foundation of effective digital marketing. Our content creation services help you develop high-quality, engaging content that resonates with your target audience and supports your business objectives. From blog posts and articles to social media content and email newsletters, we create content that not only attracts attention but also drives engagement, builds trust, and encourages conversions.",
    process: [
      {
        title: "Content Strategy",
        description:
          "We develop a comprehensive content strategy aligned with your business goals and target audience needs.",
        icon: "target",
      },
      {
        title: "Research & Planning",
        description:
          "Our team conducts thorough research on topics, keywords, and competitor content to inform our approach.",
        icon: "search",
      },
      {
        title: "Content Creation",
        description:
          "Our writers craft engaging, informative content that speaks to your audience and reflects your brand voice.",
        icon: "edit-3",
      },
      {
        title: "Optimization & Distribution",
        description:
          "We optimize content for search engines and help distribute it across appropriate channels for maximum impact.",
        icon: "share-2",
      },
    ],
    benefits: [
      "Increased organic traffic through SEO-optimized content",
      "Enhanced brand authority and thought leadership",
      "Improved audience engagement and time on site",
      "Higher conversion rates with strategic calls-to-action",
      "Consistent brand voice across all content",
      "Content tailored to different stages of the customer journey",
    ],
    faq: [
      {
        question: "What types of content do you create?",
        answer:
          "We create a wide range of content including blog posts, articles, website copy, email newsletters, social media content, case studies, whitepapers, ebooks, product descriptions, video scripts, and more.",
      },
      {
        question: "How do you ensure content is SEO-friendly?",
        answer:
          "We conduct keyword research to identify relevant terms, then strategically incorporate these keywords into the content while maintaining readability and engagement. We also optimize meta descriptions, headings, and other on-page elements.",
      },
      {
        question: "Can you match our brand's tone and voice?",
        answer:
          "Absolutely! We take time to understand your brand's unique voice and tone, and ensure all content consistently reflects your brand personality whether it's professional, conversational, technical, or playful.",
      },
      {
        question: "How often should we publish new content?",
        answer:
          "The ideal publishing frequency depends on your goals, resources, and audience. We'll help you develop a content calendar that balances consistency with quality, ensuring you publish often enough to engage your audience without sacrificing content value.",
      },
    ],
    cta: {
      title: "Ready to create content that connects and converts?",
      description:
        "Contact us today to discuss your content needs and how we can help you tell your brand's story effectively.",
    },
    portfolio: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    ],
  },
  "social-media-management": {
    id: "social-media-management",
    title: "Social Media Management",
    description:
      "Strategic social media presence that builds community and drives engagement.",
    icon: <AppDevelopment3D scale={1} rotationSpeed={1} />,
    details:
      "Our social media management services help you build and maintain a strong presence on the platforms that matter most to your audience.",
    longDescription:
      "Effective social media management is about more than just posting content—it's about creating meaningful connections with your audience. Our social media management services help you develop and implement a strategic approach to social media that builds your brand, engages your audience, and drives measurable results. From content creation and community management to paid advertising and performance analysis, we provide comprehensive social media solutions tailored to your business goals.",
    process: [
      {
        title: "Strategy Development",
        description:
          "We create a customized social media strategy based on your business goals, target audience, and competitive landscape.",
        icon: "compass",
      },
      {
        title: "Content Planning & Creation",
        description:
          "Our team develops engaging content tailored to each platform and aligned with your brand voice and marketing objectives.",
        icon: "calendar",
      },
      {
        title: "Community Management",
        description:
          "We actively engage with your audience, respond to comments and messages, and build meaningful relationships with followers.",
        icon: "users",
      },
      {
        title: "Analysis & Optimization",
        description:
          "We continuously monitor performance metrics and optimize your strategy to improve results and ROI.",
        icon: "bar-chart-2",
      },
    ],
    benefits: [
      "Increased brand awareness and visibility",
      "Stronger customer relationships and loyalty",
      "Higher website traffic from social referrals",
      "Improved customer insights through social listening",
      "Enhanced reputation management",
      "Competitive advantage through strategic social presence",
    ],
    faq: [
      {
        question: "Which social media platforms do you manage?",
        answer:
          "We manage all major social media platforms including Facebook, Instagram, Twitter, LinkedIn, TikTok, Pinterest, and YouTube. We'll help you identify which platforms are most relevant for your business and target audience.",
      },
      {
        question: "How often will you post on our social media accounts?",
        answer:
          "Posting frequency depends on the platform and your specific goals. Generally, we recommend posting 3-5 times per week on Facebook and LinkedIn, 5-7 times per week on Instagram, and more frequently on Twitter. We'll develop a custom posting schedule as part of your strategy.",
      },
      {
        question: "Do you handle paid social media advertising?",
        answer:
          "Yes, we offer comprehensive paid social media advertising services including strategy development, ad creation, audience targeting, campaign management, and performance analysis across all major social platforms.",
      },
      {
        question: "How do you measure social media success?",
        answer:
          "We track various metrics depending on your goals, including engagement rates, follower growth, reach, impressions, click-through rates, conversions, and ROI. We provide regular reports that show progress toward your specific objectives.",
      },
    ],
    cta: {
      title: "Ready to build a powerful social media presence?",
      description:
        "Contact us today to discuss your social media goals and how we can help you connect with your audience effectively.",
    },
    portfolio: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
      "https://images.unsplash.com/photo-1611162616305-c69b3396004b?w=800&q=80",
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80",
    ],
  },
};

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service =
    serviceId && services[serviceId]
      ? services[serviceId]
      : services["graphic-design"];

  const handleContactClick = () => {
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
          <Link
            to="/services"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {service.longDescription}
                </p>
                <Button
                  onClick={handleContactClick}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-6 h-auto text-lg rounded-full"
                >
                  Get a Free Consultation
                </Button>
              </motion.div>
            </div>
            <div className="lg:col-span-5">
              <ScrollEffect3D
                depth={100}
                rotationIntensity={5}
                scrollMultiplier={1.2}
                disableShadow
              >
                <motion.div
                  className="flex justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  {service.icon}
                </motion.div>
              </ScrollEffect3D>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Our {service.title} Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a structured approach to deliver exceptional results for
              every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <ScrollEffect3D
                key={index}
                depth={50}
                rotationIntensity={3}
                scrollMultiplier={1 + index * 0.1}
                disableShadow
              >
                <motion.div
                  className="bg-gray-50 rounded-xl p-6 h-full border border-gray-100"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-yellow-500">
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              </ScrollEffect3D>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Benefits of Our {service.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here's how our services can help your business grow and succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mb-4 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {service.title} Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our recent work in{" "}
              {service.title.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.portfolio.map((image, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden aspect-video bg-gray-100"
                whileHover={{ scale: 1.03, zIndex: 10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <img
                  src={image}
                  alt={`${service.title} portfolio ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our{" "}
              {service.title.toLowerCase()} services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {service.faq.map((item, index) => (
              <motion.div
                key={index}
                className="mb-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{service.cta.title}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {service.cta.description}
          </p>
          <Button
            onClick={handleContactClick}
            className="bg-white text-yellow-500 hover:bg-gray-100 px-8 py-6 h-auto text-lg rounded-full"
          >
            Contact Us Today
          </Button>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Explore Other Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our full range of digital services to help your business
              grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.values(services)
              .filter((s) => s.id !== service.id)
              .slice(0, 4)
              .map((relatedService, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">
                      {relatedService.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {relatedService.description}
                    </p>
                    <Link to={`/service/${relatedService.id}`}>
                      <Button variant="outline" className="w-full">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
