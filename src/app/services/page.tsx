import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Map, Wrench, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services - Kenkai Labs | Problem Discovery to IT Execution",
  description: "Our comprehensive technology consulting services: Problem Discovery Sprint, Roadmap & Strategy, and Build & Execute. From diagnosis to delivery.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "discovery",
      icon: Search,
      title: "Problem Discovery & Roadmap Sprint",
      subtitle: "1-Week Fixed Engagement",
      goal: "In one week, surface the real technical problems and get a prioritized execution-ready roadmap.",
      whoFor: "Early-stage startups, stuck teams, legacy systems needing clarity.",
      price: "Fixed price introductory offer",
      timeline: "5 business days",
      deliverables: [
        "Stakeholder interviews & system audit",
        "Root-cause mapping",
        "Prioritized technical roadmap (MVP, quick wins, risk flags)",
        "Recommended stack/architecture & next-phase plan"
      ],
      process: [
        { day: "Day 1", activity: "Kickoff & stakeholder interviews" },
        { day: "Day 2-3", activity: "System analysis & documentation review" },
        { day: "Day 4", activity: "Draft roadmap & recommendations" },
        { day: "Day 5", activity: "Review session & final handoff" }
      ],
      cta: "Book Sprint",
      ctaLink: "/book-call?service=sprint"
    },
    {
      id: "strategy",
      icon: Map,
      title: "Technical Strategy & Execution Roadmapping",
      subtitle: "Comprehensive Planning Engagement",
      goal: "For teams that need more than diagnosis—get a full strategic architecture, phased implementation plan, and alignment with business KPIs.",
      whoFor: "Growing companies, complex systems, strategic technology initiatives.",
      price: "Custom engagement pricing",
      timeline: "2-4 weeks",
      deliverables: [
        "System architecture design",
        "Data model and integration plan",
        "Milestone breakdown + effort estimate",
        "Risk & dependency matrix",
        "Decision-grade roadmap for internal teams or external execution"
      ],
      process: [
        { phase: "Phase 1", activity: "Discovery & stakeholder alignment" },
        { phase: "Phase 2", activity: "Architecture design & planning" },
        { phase: "Phase 3", activity: "Implementation roadmap & risk assessment" },
        { phase: "Phase 4", activity: "Final strategy presentation & handoff" }
      ],
      cta: "Schedule Strategy Session",
      ctaLink: "/book-call?service=strategy"
    },
    {
      id: "execution",
      icon: Wrench,
      title: "Execution & Embedded Delivery",
      subtitle: "Implementation Partnership",
      goal: "We implement the roadmap ourselves or embed with your team as fractional CTO / dev partner.",
      whoFor: "Teams ready to build, companies needing execution support, ongoing development needs.",
      price: "Multiple engagement models",
      timeline: "4-16 weeks (project dependent)",
      deliverables: [
        "Code delivery with automated CI/CD",
        "Quality gates & testing protocols",
        "Team training & knowledge transfer",
        "Handoff documentation",
        "Optional ongoing maintenance"
      ],
      modes: [
        "Fixed-scope MVP build",
        "Retainer / sprint-based delivery",
        "Embedded team augmentation",
        "Fractional CTO support"
      ],
      cta: "Talk to an Engineer",
      ctaLink: "/book-call?service=execution"
    }
  ];

  const comparisonFeatures = [
    { feature: "Problem Audit", sprint: true, strategy: true, execution: true },
    { feature: "Technical Roadmap", sprint: true, strategy: true, execution: true },
    { feature: "Architecture Design", sprint: false, strategy: true, execution: true },
    { feature: "Implementation Planning", sprint: false, strategy: true, execution: true },
    { feature: "Code Development", sprint: false, strategy: false, execution: true },
    { feature: "Team Embedding", sprint: false, strategy: false, execution: true },
    { feature: "Ongoing Support", sprint: false, strategy: false, execution: true }
  ];

  const faqs = [
    {
      question: "We&apos;re new—why should we trust you?",
      answer: "Our team has 10+ years of combined experience delivering software across multiple industries. We use a proven process and provide clear deliverables at each stage. Start with our low-risk Discovery Sprint to see our approach in action."
    },
    {
      question: "What does the sprint actually cost?",
      answer: "Our Problem Discovery Sprint is offered at an introductory fixed price of $4,950. This includes all deliverables and a comprehensive roadmap you can use immediately or implement with any team."
    },
    {
      question: "How long before we get something actionable?",
      answer: "With the Discovery Sprint, you&apos;ll have actionable insights within 5 business days. For strategy engagements, expect initial recommendations within the first week, with full strategy delivery in 2-4 weeks."
    },
    {
      question: "Can you work with our internal team?",
      answer: "Absolutely. Our Execution service includes embedded team augmentation where we work directly with your existing developers, providing guidance, code review, and knowledge transfer."
    },
    {
      question: "Do you work in our technology stack?",
      answer: "We&apos;re technology-agnostic and work with most modern stacks. If you have specific requirements, we&apos;ll discuss compatibility during our initial consultation to ensure the best fit."
    }
  ];

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="container-width section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              From problem discovery to solution delivery, we guide you through every step 
              of your technology transformation with proven methodologies and expert execution.
            </p>
            
            {/* Anchor Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="#discovery" className="btn-secondary text-sm">Problem Discovery</a>
              <a href="#strategy" className="btn-secondary text-sm">Roadmap & Strategy</a>
              <a href="#execution" className="btn-secondary text-sm">Build & Execute</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => {
        const IconComponent = service.icon;
        const isEven = index % 2 === 0;
        
        return (
          <section 
            key={service.id}
            id={service.id}
            className={`section-padding ${isEven ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="container-width">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mr-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                          {service.subtitle}
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h2>
                    
                    <p className="text-lg text-gray-600 mb-6">
                      {service.goal}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div>
                        <span className="font-semibold text-gray-900">Who it&apos;s for: </span>
                        <span className="text-gray-600">{service.whoFor}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-gray-700">{service.timeline}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-5 h-5 text-blue-600 mr-2">💰</span>
                          <span className="text-gray-700">{service.price}</span>
                        </div>
                      </div>
                    </div>

                    <Button size="lg" asChild>
                      <Link href={service.ctaLink} className="flex items-center space-x-2">
                        <span>{service.cta}</span>
                        <ArrowRight size={20} />
                      </Link>
                    </Button>
                  </div>

                  <div className={isEven ? '' : 'lg:order-1'}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Deliverables</h3>
                      <ul className="space-y-3 mb-8">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {service.process && (
                        <>
                          <h4 className="font-bold text-gray-900 mb-4">Process Breakdown</h4>
                          <div className="space-y-3">
                            {service.process.map((step, idx) => (
                              <div key={idx} className="flex items-start">
                                <div className="bg-blue-100 text-blue-600 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">
                                    {'day' in step ? step.day : step.phase}
                                  </div>
                                  <div className="text-gray-600 text-sm">{step.activity}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {service.modes && (
                        <>
                          <h4 className="font-bold text-gray-900 mb-4 mt-8">Engagement Modes</h4>
                          <ul className="space-y-2">
                            {service.modes.map((mode, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                <span className="text-gray-700">{mode}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Comparison Table */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Service Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-50 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-4 px-6 font-bold text-gray-900">Feature / Output</th>
                    <th className="text-center py-4 px-6 font-bold text-blue-600">Sprint</th>
                    <th className="text-center py-4 px-6 font-bold text-blue-600">Strategy</th>
                    <th className="text-center py-4 px-6 font-bold text-blue-600">Execution</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                      <td className="text-center py-4 px-6">
                        {row.sprint ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        {row.strategy ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        {row.execution ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-width">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Choose the service that fits your needs, or start with a discovery call 
              to discuss your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/book-call?service=sprint">Start with Discovery Sprint</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-white border-white hover:bg-white hover:text-blue-600">
                <Link href="/book-call">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}