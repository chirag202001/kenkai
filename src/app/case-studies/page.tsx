'use client';

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Building2, TrendingUp, Clock, Users, CheckCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const casesRef = useRef<HTMLDivElement>(null);

  const handleIndustrySelect = (industry: string | null) => {
    setSelectedIndustry(industry);
    // Scroll to case studies section with smooth animation
    setTimeout(() => {
      casesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  const caseStudies = [
    {
      id: "fintech-transformation",
      company: "PayFlow (Example Scenario)",
      industry: "FinTech",
      logo: "💳",
      title: "How We Could Accelerate Your Digital Payment Platform Launch",
      challenge: "A financial services startup needs to launch their UPI-based payment platform within 3 months to compete with established players. They have a vision but unclear technical requirements and no development team.",
      solution: "Kenkai Labs would conduct a 1-week Problem Discovery Sprint to map out technical architecture, identify compliance requirements (RBI guidelines, PCI-DSS), and create an execution-ready roadmap. We'd then build the MVP using microservices architecture with Node.js, PostgreSQL, and React Native.",
      results: [
        { metric: "3 months", description: "Idea to production launch" },
        { metric: "99.9%", description: "Target uptime with security" },
        { metric: "50K+", description: "Projected users in 6 months" },
        { metric: "PCI-DSS", description: "Full compliance from day 1" }
      ],
      technologies: ["React Native", "Node.js", "PostgreSQL", "Redis", "AWS", "Razorpay"],
      testimonial: {
        quote: "This example demonstrates how we help FinTech startups navigate complex compliance requirements while building secure, scalable payment systems. Our discovery sprint would ensure you don't miss critical regulatory requirements.",
        author: "Kenkai Labs Approach",
        position: "FinTech Solution Architecture"
      },
      timeline: "3 months (estimated)",
      teamSize: "5 engineers",
      image: "🚀",
      isExample: true
    },
    {
      id: "healthtech-scaling",
      company: "MediConnect (Example Scenario)",
      industry: "HealthTech",
      logo: "🏥",
      title: "How We'd Scale Your Telemedicine Platform for Rapid Growth",
      challenge: "A telemedicine startup is experiencing rapid growth. Their platform can't handle the load - frequent crashes, slow response times, and poor video quality are driving users away. They need to scale fast without rebuilding from scratch.",
      solution: "We'd perform a comprehensive technical audit to identify bottlenecks. Implement database optimization, move to microservices architecture, integrate WebRTC for better video calls, and set up auto-scaling infrastructure on AWS. Add real-time monitoring and automated deployment pipelines.",
      results: [
        { metric: "10X", description: "Target capacity increase" },
        { metric: "85%", description: "Potential cost reduction" },
        { metric: "<2 seconds", description: "Target page load time" },
        { metric: "4.5+/5", description: "Target app rating" }
      ],
      technologies: ["Next.js", "Python", "MongoDB", "WebRTC", "AWS Lambda", "CloudFront"],
      testimonial: {
        quote: "This scenario shows how we tackle performance bottlenecks systematically. We'd start with a technical audit to find the real problems, then implement targeted solutions that scale efficiently.",
        author: "Kenkai Labs Approach",
        position: "HealthTech Performance Optimization"
      },
      timeline: "6 weeks (estimated)",
      teamSize: "4 engineers",
      image: "📈",
      isExample: true
    },
    {
      id: "ecommerce-optimization",
      company: "FashionHub (Example Scenario)",
      industry: "E-commerce",
      logo: "🛍️",
      title: "How We'd Increase Your E-commerce Conversion Rates",
      challenge: "An online fashion retailer has good traffic but poor conversion rates (1.2%). High cart abandonment, slow checkout process, and lack of personalization are major issues. They need data-driven optimization without disrupting existing operations.",
      solution: "We'd conduct user behavior analysis and implement A/B testing framework. Optimize checkout flow from 5 steps to 2, implement smart product recommendations using ML, add abandoned cart recovery, and improve mobile experience. Integrate advanced analytics to track every user interaction.",
      results: [
        { metric: "100%+", description: "Target conversion increase" },
        { metric: "50%+", description: "Cart abandonment reduction" },
        { metric: "₹30L+", description: "Projected monthly revenue lift" },
        { metric: "2.5X", description: "Average order value target" }
      ],
      technologies: ["Next.js", "Shopify API", "Python ML", "BigQuery", "Stripe", "SendGrid"],
      testimonial: {
        quote: "This example demonstrates our data-driven approach to e-commerce optimization. We'd use A/B testing and user analytics to make informed decisions, not guesses. Every change would be measured and validated.",
        author: "Kenkai Labs Approach",
        position: "E-commerce Optimization Strategy"
      },
      timeline: "8 weeks (estimated)",
      teamSize: "3 engineers + 1 ML specialist",
      image: "💰",
      isExample: true
    },
    {
      id: "edtech-mvp",
      company: "SkillBridge (Example Scenario)",
      industry: "EdTech",
      logo: "🎓",
      title: "How We'd Build Your EdTech MVP to Secure Funding",
      challenge: "An education startup has a vision for an AI-powered learning platform but struggles to articulate technical requirements to investors. They need a working MVP to demonstrate their concept and secure funding.",
      solution: "We'd run a Problem Discovery Sprint to clarify the value proposition and technical scope. Build an MVP with core features: video lessons, AI-based assessments, progress tracking, and gamification. Design for scalability from day one with modular architecture.",
      results: [
        { metric: "2 months", description: "Target: concept to demo" },
        { metric: "$500K+", description: "Funding opportunity" },
        { metric: "5,000+", description: "Projected beta users" },
        { metric: "75%+", description: "Target completion rate" }
      ],
      technologies: ["React", "Firebase", "Node.js", "OpenAI API", "Stripe", "Vercel"],
      testimonial: {
        quote: "This scenario shows how we help startups build investor-ready MVPs. We focus on core features that demonstrate value, not building everything at once. Our discovery sprint ensures you pitch what investors want to hear.",
        author: "Kenkai Labs Approach",
        position: "EdTech MVP Strategy"
      },
      timeline: "2 months (estimated)",
      teamSize: "4 engineers",
      image: "🎯",
      isExample: true
    },
    {
      id: "logistics-automation",
      company: "SwiftLogistics (Example Scenario)",
      industry: "Logistics & Supply Chain",
      logo: "🚚",
      title: "How We'd Automate Your Warehouse & Route Operations",
      challenge: "A logistics company manages inventory and delivery routes manually using spreadsheets. This leads to inefficiencies, errors, and inability to scale. They need a custom solution that integrates with existing processes.",
      solution: "We'd build a comprehensive warehouse management system with real-time inventory tracking, barcode scanning, automated route optimization using Google Maps API, and driver mobile app. Integrate with accounting software and create dashboards for real-time visibility.",
      results: [
        { metric: "50%+", description: "Target delivery time reduction" },
        { metric: "₹5L+/month", description: "Projected cost savings" },
        { metric: "95%+", description: "Target inventory accuracy" },
        { metric: "30%+", description: "Capacity increase goal" }
      ],
      technologies: ["Next.js", "Node.js", "PostgreSQL", "React Native", "Google Maps API", "WebSocket"],
      testimonial: {
        quote: "This example shows how we build custom automation solutions. We'd start by understanding your current workflows, then design a system that fits your business - not force you to adapt to generic software.",
        author: "Kenkai Labs Approach",
        position: "Logistics Automation Strategy"
      },
      timeline: "10 weeks (estimated)",
      teamSize: "5 engineers",
      image: "⚡",
      isExample: true
    },
    {
      id: "saas-pivot",
      company: "CloudDocs Pro (Example Scenario)",
      industry: "SaaS",
      logo: "☁️",
      title: "How We'd Help You Pivot Your SaaS Product Successfully",
      challenge: "A document collaboration SaaS has been in market for 18 months with limited traction. User engagement is low and churn is high. They need to understand why and pivot quickly before running out of runway.",
      solution: "We'd conduct user research and analytics deep-dive to understand actual usage patterns. Help identify what users really want vs. what you think they want. Guide the pivot to a focused, niche solution. Rebuild core features with better UX and add API for integrations.",
      results: [
        { metric: "200%+", description: "Target user growth" },
        { metric: "40%+", description: "Churn reduction goal" },
        { metric: "$40K+", description: "Target MRR" },
        { metric: "4.5+/5", description: "Customer satisfaction goal" }
      ],
      technologies: ["React", "Node.js", "MongoDB", "Redis", "Stripe", "Elasticsearch"],
      testimonial: {
        quote: "This scenario demonstrates how we help companies make difficult pivot decisions. We'd use data and user research to validate or challenge your assumptions. Sometimes the best strategy is changing direction based on evidence.",
        author: "Kenkai Labs Approach",
        position: "SaaS Product Strategy"
      },
      timeline: "3 months (estimated)",
      teamSize: "4 engineers + product advisor",
      image: "🔄",
      isExample: true
    }
  ];

  const industries = [
    { name: "FinTech", count: "Example", icon: "💳" },
    { name: "HealthTech", count: "Example", icon: "🏥" },
    { name: "E-commerce", count: "Example", icon: "🛍️" },
    { name: "EdTech", count: "Example", icon: "🎓" },
    { name: "SaaS", count: "Example", icon: "☁️" },
    { name: "Logistics", count: "Example", icon: "🚚" }
  ];

  // Filter case studies based on selected industry
  const filteredCaseStudies = selectedIndustry
    ? caseStudies.filter(study => study.industry === selectedIndustry)
    : caseStudies;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Example Scenarios
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                See What <span className="text-gradient">Kenkai Labs Can Do</span> For You
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                While we're a new startup, we've designed our approach based on proven methodologies. 
                These example scenarios demonstrate the types of problems we can solve and the results we target for our clients.
              </p>
              
              {/* Industry Tags */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                  onClick={() => handleIndustrySelect(null)}
                  className={`px-4 py-2 rounded-full shadow-sm border transition-all duration-200 transform hover:scale-105 ${
                    selectedIndustry === null
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="text-sm font-medium">All Industries</span>
                </button>
                {industries.map((industry) => (
                  <button
                    key={industry.name}
                    onClick={() => handleIndustrySelect(industry.name)}
                    className={`px-4 py-2 rounded-full shadow-sm border transition-all duration-200 transform hover:scale-105 ${
                      selectedIndustry === industry.name
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <span className="mr-2">{industry.icon}</span>
                    <span className="text-sm font-medium">{industry.name}</span>
                    <span className="ml-2 text-xs opacity-75">({industry.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 bg-white border-y border-gray-200">
          <div className="container-width">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 font-medium">Our Capabilities & Approach</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-gray-600">Industry Scenarios</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Client Focus</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">Fast</div>
                <div className="text-gray-600">Time to Market</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">Proven</div>
                <div className="text-gray-600">Methodologies</div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section ref={casesRef} className="py-20 bg-gray-50 scroll-mt-20">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Example Scenarios</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These scenarios demonstrate our approach and the results we aim to achieve. 
                Each example is based on common challenges businesses face and proven solution methodologies.
              </p>
              {selectedIndustry && (
                <div className="mt-4 animate-fade-in">
                  <span className="text-sm text-gray-600">Showing: </span>
                  <span className="text-sm font-semibold text-blue-600">{selectedIndustry}</span>
                  <button
                    onClick={() => handleIndustrySelect(null)}
                    className="ml-2 text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-20">
              {filteredCaseStudies.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No scenarios found</h3>
                  <p className="text-gray-600 mb-6">Try selecting a different industry</p>
                  <Button onClick={() => handleIndustrySelect(null)} variant="outline">
                    View All Scenarios
                  </Button>
                </div>
              ) : (
                filteredCaseStudies.map((study, index) => (
                <div 
                  key={study.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{study.logo}</div>
                        <div>
                          <div className="text-sm opacity-90">{study.industry}</div>
                          <h2 className="text-2xl font-bold">{study.company}</h2>
                        </div>
                      </div>
                      <div className="text-6xl opacity-20">{study.image}</div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{study.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{study.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{study.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Challenge */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-red-600" />
                          The Challenge
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Our Solution
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Target Results & Impact
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{result.metric}</div>
                            <div className="text-sm text-gray-600">{result.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-600">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                        <span className="font-semibold text-blue-900">Our Approach</span>
                      </div>
                      <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                        "{study.testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          K
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{study.testimonial.author}</div>
                          <div className="text-sm text-gray-600">{study.testimonial.position}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container-width text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Make Your Project a Reality?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss your challenges and create a roadmap to achieve measurable results. 
              We'll start with a discovery call to understand your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-call">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-lg px-8 py-4 font-semibold">
                  Book a Discovery Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sprint-request">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 font-semibold"
                >
                  Try AI Discovery (Free)
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
