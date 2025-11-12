"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, CheckCircle } from "lucide-react";

const LeadCaptureSection = () => {
  const [formData, setFormData] = useState({
    challenge: "",
    name: "",
    email: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container-width px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
              <p className="text-xl mb-6 opacity-90">
                We&apos;ve received your request for a Problem-to-Roadmap Sprint.
              </p>
              <p className="text-lg opacity-80">
                Our team will follow up within 24 hours to schedule your discovery session.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container-width px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12 bg-gray-50">
                <div className="flex items-center mb-6">
                  <Rocket className="w-8 h-8 text-blue-600 mr-3" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Limited Introductory Offer
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Start with a Problem-to-Roadmap Sprint
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  1-week fixed-scope engagement to surface your key bottlenecks 
                  and get a prioritized technical roadmap.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">Comprehensive system analysis and stakeholder interviews</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">Root-cause mapping of technical bottlenecks</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">Prioritized execution-ready technical roadmap</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">Technology recommendations and next-phase plan</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Limited introductory slots.</strong> We&apos;ll follow up within 24 hours.
                  </p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-8 lg:p-12 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="challenge" className="block text-sm font-semibold text-gray-700 mb-2">
                      What&apos;s your biggest tech challenge? *
                    </label>
                    <textarea
                      id="challenge"
                      name="challenge"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Describe the technical problems or bottlenecks you&apos;re facing..."
                      value={formData.challenge}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full text-lg py-4" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request Sprint"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
