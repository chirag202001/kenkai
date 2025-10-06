"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, FileText } from "lucide-react";

const ResourceSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDownloaded(true);
    }, 1500);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 border border-blue-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Content */}
              <div>
                <div className="flex items-center mb-6">
                  <FileText className="w-8 h-8 text-blue-600 mr-3" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Free Resource
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Technical Problem Discovery Checklist
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Answer 15 questions to see where your tech is leaking value—instant PDF 
                  you can use internally to identify bottlenecks and prioritize improvements.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">15 strategic assessment questions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Priority scoring framework</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Implementation roadmap template</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">ROI calculation guide</span>
                  </div>
                </div>

                {!isDownloaded && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Used by 500+ teams</strong> to identify and prioritize their technical improvements.
                    </p>
                  </div>
                )}
              </div>

              {/* Right Side - Form/Download */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                {isDownloaded ? (
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Download Ready!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Check your email for the Technical Problem Discovery Checklist.
                    </p>
                    <Button className="w-full mb-4">
                      <Download className="w-5 h-5 mr-2" />
                      Download PDF
                    </Button>
                    <p className="text-sm text-gray-500">
                      Didn&apos;t receive it? Check your spam folder or contact us.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDownload}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Get Your Free Checklist
                    </h3>
                    
                    <div className="mb-6">
                      <label htmlFor="resource-email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="resource-email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full text-lg py-4" 
                      disabled={isSubmitting || !email}
                    >
                      {isSubmitting ? (
                        "Preparing Download..."
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Download Now
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Additional Resources Preview */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              More Resources Coming Soon
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-4">📊</div>
                <h4 className="font-bold text-gray-900 mb-2">ROI Calculator</h4>
                <p className="text-gray-600 text-sm">
                  Calculate the business impact of your technical improvements.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-4">🔍</div>
                <h4 className="font-bold text-gray-900 mb-2">Architecture Review Guide</h4>
                <p className="text-gray-600 text-sm">
                  Step-by-step framework for evaluating your current architecture.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-4">⚡</div>
                <h4 className="font-bold text-gray-900 mb-2">Quick Wins Playbook</h4>
                <p className="text-gray-600 text-sm">
                  Immediate improvements you can implement this week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceSection;
