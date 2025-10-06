import Link from "next/link";
import { Search, Map, Wrench, ArrowRight } from "lucide-react";

const ServicesOverview = () => {
  const services = [
    {
      id: "discover",
      icon: Search,
      title: "Problem Discovery",
      description: "Deep-dive sessions to identify root causes, uncover hidden technical debt, and align business impact.",
      features: [
        "Stakeholder interviews",
        "System audit & analysis", 
        "Pain point mapping",
        "Impact assessment"
      ],
      link: "/services#discovery"
    },
    {
      id: "design",
      icon: Map,
      title: "Roadmap & Strategy",
      description: "Prioritized, executable technical plans with quick wins, MVP definition, and risk mitigation.",
      features: [
        "Architecture design",
        "Phased implementation",
        "Risk assessment",
        "Technology recommendations"
      ],
      link: "/services#strategy"
    },
    {
      id: "deliver",
      icon: Wrench,
      title: "Build & Execute",
      description: "Hands-on development or embedded execution to turn the roadmap into working software.",
      features: [
        "MVP development",
        "Quality assurance",
        "Team integration",
        "Knowledge transfer"
      ],
      link: "/services#execution"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What We Do
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From discovering your real problems to delivering working solutions, 
            we guide you through every step of your technology transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={service.link}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                >
                  Learn more
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            View All Services
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
