import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Smartphone, Globe, Monitor, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio - Kenkai Labs | Web & Mobile Development Examples",
  description: "See examples of web applications, mobile apps, and websites we can build for you. Sample wireframes and project scopes.",
};

export default function PortfolioPage() {
  const projectTypes = [
    {
      id: "web-app",
      icon: Monitor,
      title: "Web Applications",
      description: "Full-stack SaaS platforms, dashboards, and enterprise applications",
      examples: [
        {
          name: "E-Commerce Platform",
          features: ["Product catalog", "Shopping cart", "Payment integration", "Admin dashboard", "Order management"],
          tech: "Next.js, Node.js, PostgreSQL, Stripe",
          timeline: "12-16 weeks",
          wireframeDesc: "Multi-vendor marketplace with real-time inventory",
          wireframeUrl: "/wireframes/ecommerce-dashboard.html"
        },
        {
          name: "Project Management Tool",
          features: ["Task boards", "Team collaboration", "File sharing", "Time tracking", "Reporting"],
          tech: "React, TypeScript, MongoDB, WebSockets",
          timeline: "10-14 weeks",
          wireframeDesc: "Kanban-style project tracking with real-time updates",
          wireframeUrl: "/wireframes/project-management.html"
        },
        {
          name: "Analytics Dashboard",
          features: ["Data visualization", "Custom reports", "API integrations", "User management", "Export functionality"],
          tech: "Next.js, Python, PostgreSQL, Chart.js",
          timeline: "8-12 weeks",
          wireframeDesc: "Business intelligence platform with interactive charts",
          wireframeUrl: "/wireframes/analytics-dashboard.html"
        }
      ]
    },
    {
      id: "mobile-app",
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps for iOS and Android",
      examples: [
        {
          name: "Food Delivery App",
          features: ["Real-time tracking", "In-app payments", "Push notifications", "Restaurant listings", "Order history"],
          tech: "React Native, Firebase, Google Maps API",
          timeline: "14-18 weeks",
          wireframeDesc: "Consumer app with driver and restaurant portals",
          wireframeUrl: "/wireframes/food-delivery-app.html"
        },
        {
          name: "Fitness Tracking App",
          features: ["Workout logging", "Progress charts", "Social features", "Goal setting", "Integration with wearables"],
          tech: "Flutter, Node.js, MongoDB",
          timeline: "12-16 weeks",
          wireframeDesc: "Health & fitness companion with community features",
          wireframeUrl: "/wireframes/fitness-tracking-app.html"
        },
        {
          name: "Field Service App",
          features: ["Job scheduling", "GPS tracking", "Offline mode", "Digital signatures", "Photo capture"],
          tech: "React Native, AWS, PostgreSQL",
          timeline: "10-14 weeks",
          wireframeDesc: "Enterprise mobile solution for field workers",
          wireframeUrl: "/wireframes/field-service-app.html"
        }
      ]
    },
    {
      id: "website",
      icon: Globe,
      title: "Websites & Landing Pages",
      description: "Corporate websites, landing pages, and marketing sites",
      examples: [
        {
          name: "Corporate Website",
          features: ["CMS integration", "Blog", "Contact forms", "SEO optimization", "Analytics"],
          tech: "Next.js, Tailwind CSS, Contentful",
          timeline: "4-6 weeks",
          wireframeDesc: "Modern company website with content management",
          wireframeUrl: "/wireframes/corporate-website.html"
        },
        {
          name: "SaaS Landing Page",
          features: ["Hero section", "Feature showcase", "Pricing tables", "Testimonials", "Lead capture"],
          tech: "Next.js, TypeScript, Framer Motion",
          timeline: "2-4 weeks",
          wireframeDesc: "High-converting product landing page",
          wireframeUrl: "/wireframes/saas-landing.html"
        },
        {
          name: "E-Learning Platform",
          features: ["Course catalog", "Video player", "Student dashboard", "Progress tracking", "Certificates"],
          tech: "Next.js, Supabase, Vimeo API",
          timeline: "10-14 weeks",
          wireframeDesc: "Online education platform with course management",
          wireframeUrl: "/wireframes/e-learning-platform.html"
        }
      ]
    },
    {
      id: "custom",
      icon: Code,
      title: "Custom Software",
      description: "Backend systems, APIs, and custom integrations",
      examples: [
        {
          name: "API Gateway",
          features: ["REST & GraphQL APIs", "Authentication", "Rate limiting", "Documentation", "Monitoring"],
          tech: "Node.js, Express, Redis, AWS",
          timeline: "6-10 weeks",
          wireframeDesc: "Scalable API infrastructure for microservices",
          wireframeUrl: "/wireframes/api-gateway.html"
        },
        {
          name: "Automation System",
          features: ["Workflow builder", "Third-party integrations", "Scheduled jobs", "Error handling", "Logging"],
          tech: "Python, Celery, PostgreSQL, Docker",
          timeline: "8-12 weeks",
          wireframeDesc: "Business process automation platform",
          wireframeUrl: "/wireframes/automation-system.html"
        },
        {
          name: "Data Pipeline",
          features: ["ETL processes", "Data warehousing", "Real-time sync", "Data validation", "Reporting"],
          tech: "Python, Apache Airflow, BigQuery",
          timeline: "10-14 weeks",
          wireframeDesc: "Enterprise data integration and processing",
          wireframeUrl: "/wireframes/data-pipeline.html"
        }
      ]
    }
  ];

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-width px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What We Build
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Sample project types, wireframes, and technical specifications to help you understand 
              what we can build for your business. Every project is customized to your needs.
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              🖱️ Click on project images to view interactive wireframes
            </div>
          </div>
        </div>
      </section>

      {/* Project Types */}
      {projectTypes.map((category, idx) => {
        const IconComponent = category.icon;
        const isEven = idx % 2 === 0;
        
        return (
          <section 
            key={category.id}
            className={`py-16 md:py-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="container-width px-4 md:px-8">
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mr-4">
                    <IconComponent className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.examples.map((project, projectIdx) => (
                  <div 
                    key={projectIdx}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Wireframe Placeholder */}
                    {project.wireframeUrl ? (
                      <a 
                        href={project.wireframeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center hover:from-blue-200 hover:to-purple-200 transition-colors cursor-pointer group"
                      >
                        <div className="text-center p-6">
                          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖥️</div>
                          <p className="text-sm text-gray-700 font-medium mb-2">{project.wireframeDesc}</p>
                          <p className="text-xs text-blue-600 font-semibold">Click to view interactive wireframe →</p>
                        </div>
                      </a>
                    ) : (
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="text-4xl mb-2">📱</div>
                          <p className="text-sm text-gray-700 font-medium">{project.wireframeDesc}</p>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {project.features.slice(0, 4).map((feature, fIdx) => (
                            <li key={fIdx} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Tech Stack</div>
                        <div className="text-sm text-gray-700 font-medium">{project.tech}</div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-xs text-gray-500">Timeline</div>
                          <div className="text-sm font-semibold text-gray-900">{project.timeline}</div>
                        </div>
                        {project.wireframeUrl && (
                          <a href={project.wireframeUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                              View Demo
                            </Button>
                          </a>
                        )}
                        <Link href="/book-call">
                          <Button size="sm" variant="outline">
                            Discuss
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-width px-4 md:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start with a free AI discovery chat to define your requirements, or book a call to discuss 
            your project with our team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sprint-request">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-lg px-8 py-4 font-semibold"
              >
                Start Free AI Discovery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/book-call">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 font-semibold"
              >
                Talk to Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
