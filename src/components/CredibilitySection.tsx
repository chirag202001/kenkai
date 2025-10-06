import { Shield, Target, Users, Award } from "lucide-react";

const CredibilitySection = () => {
  const features = [
    {
      icon: Users,
      title: "10+ Years Experience",
      description: "Team with 10+ years delivering software & transformation across healthcare, SaaS, logistics, and professional services."
    },
    {
      icon: Target,
      title: "Process-First Approach",
      description: "We don't build until we validate the real problem. Our methodology ensures we solve the right challenges."
    },
    {
      icon: Shield,
      title: "Outcome Accountability",
      description: "Roadmap + execution alignment. We're committed to delivering measurable results and long-term success."
    },
    {
      icon: Award,
      title: "Industry Expertise",
      description: "Deep experience across multiple industries with proven methodologies for complex technical challenges."
    }
  ];

  const industries = [
    "Healthcare",
    "SaaS",
    "Logistics", 
    "Professional Services",
    "E-commerce",
    "Fintech"
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Kenkai Labs?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine deep technical expertise with a proven process to deliver 
            results you can count on.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  <IconComponent className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">24h</div>
              <div className="text-gray-600 font-medium">Response Time</div>
            </div>
          </div>
        </div>

        {/* Industries Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Industries We Serve
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-gray-100 px-6 py-3 rounded-full text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Highlight */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Our Proven Methodology
          </h3>
          <p className="text-lg lg:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Every engagement follows our battle-tested framework: Discover → Design → Deliver. 
            No guesswork, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="font-semibold">Transparent Process</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="font-semibold">Fixed Timelines</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="font-semibold">Measurable Outcomes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
