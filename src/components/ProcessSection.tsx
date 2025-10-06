import { Users, FileText, Code2 } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Users,
      title: "Audit & Interview",
      description: "We talk to stakeholders, review systems, and map pain points.",
      details: [
        "Stakeholder interviews across all levels",
        "Current system architecture review", 
        "Process workflow analysis",
        "Pain point identification and prioritization"
      ]
    },
    {
      icon: FileText,
      title: "Roadmap & Plan",
      description: "We deliver a clear technical plan with priorities and delivery phases.",
      details: [
        "Comprehensive technical strategy document",
        "Prioritized implementation roadmap",
        "Risk assessment and mitigation plans",
        "Resource and timeline estimates"
      ]
    },
    {
      icon: Code2,
      title: "Build & Operate",
      description: "We implement, handoff, or embed as your execution partner.",
      details: [
        "Agile development methodology",
        "Quality assurance and testing",
        "Team training and knowledge transfer",
        "Ongoing support and maintenance"
      ]
    }
  ];

  return (
    <section id="process" className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 3-step process takes you from problem identification 
            to solution delivery with complete transparency and accountability.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Content */}
                  <div className="text-center lg:text-left">
                    {/* Icon & Number */}
                    <div className="flex flex-col items-center lg:items-start mb-6">
                      <div className="relative bg-white rounded-2xl p-6 shadow-lg mb-4 border border-gray-100">
                        <div className="absolute -top-3 -right-3 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <IconComponent className="w-12 h-12 text-blue-600" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-3">What we deliver:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-8">
                      <div className="w-0.5 h-8 bg-blue-200"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Typical Timeline</h3>
            <p className="text-gray-600">From initial consultation to solution delivery</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1 Week</div>
              <div className="text-sm text-gray-600">Discovery Sprint</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2-4 Weeks</div>
              <div className="text-sm text-gray-600">Strategy & Planning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4-12 Weeks</div>
              <div className="text-sm text-gray-600">Implementation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
