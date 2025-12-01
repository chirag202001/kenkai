"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarPicker from "@/components/CalendarPicker";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

function BookCallContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(serviceParam || '');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    challenge: '',
    timeline: '',
    budget: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceTypes = [
    {
      id: 'consultation',
      title: '15-min Problem Triage Call',
      description: 'Quick consultation to understand your challenges and recommend next steps',
      duration: '15 minutes',
      icon: '🤝'
    },
    {
      id: 'sprint',
      title: '1-week Discovery Sprint',
      description: 'Comprehensive problem discovery and roadmap development in one week',
      duration: '1 week engagement',
      icon: '🚀'
    },
    {
      id: 'strategy',
      title: 'Strategy Session',
      description: 'Deep-dive strategy planning and architecture design consultation',
      duration: '2-4 weeks',
      icon: '🎯'
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isSubmitted) {
    return (
      <main>
        <Header />
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container-width px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl p-12 shadow-xl">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Booking Confirmed!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Thank you for booking with Kenkai Labs. We&apos;ve received your request for a{' '}
                  <strong>{serviceTypes.find(s => s.id === selectedService)?.title}</strong>.
                </p>
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-blue-900 mb-2">What happens next?</h3>
                  <ul className="text-blue-800 text-sm space-y-1 text-left">
                    <li>• You&apos;ll receive a calendar invite within 30 minutes</li>
                    <li>• We&apos;ll send a prep questionnaire 24 hours before</li>
                    <li>• Our team will reach out if we need any clarification</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/">Return to Home</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/resources">Download Prep Materials</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-24 pb-16">
        <div className="container-width px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= stepNumber 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-16 h-1 ${
                        step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-gray-600">
                Step {step} of 3: {
                  step === 1 ? 'Choose Service' : 
                  step === 2 ? 'Your Information' : 
                  'Schedule & Confirm'
                }
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Choose Your Engagement Type
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 text-center">
                    Select the type of engagement that best fits your current needs.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {serviceTypes.map((service) => (
                      <div
                        key={service.id}
                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                          selectedService === service.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div className="text-3xl mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                          {service.description}
                        </p>
                        <div className="flex items-center text-blue-600 text-sm font-medium">
                          <Clock size={16} className="mr-2" />
                          {service.duration}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button 
                      onClick={nextStep} 
                      disabled={!selectedService}
                      className="flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Information Form */}
              {step === 2 && (
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Tell Us About Your Challenge
                  </h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                      <div>
                        <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                          Role *
                        </label>
                        <select
                          id="role"
                          name="role"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={formData.role}
                          onChange={handleInputChange}
                        >
                          <option value="">Select your role</option>
                          <option value="ceo">CEO/Founder</option>
                          <option value="cto">CTO/Technical Lead</option>
                          <option value="product">Product Manager</option>
                          <option value="operations">Operations</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

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
                        placeholder="Describe the technical problems or bottlenecks you're facing..."
                        value={formData.challenge}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2">
                          Project Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={formData.timeline}
                          onChange={handleInputChange}
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6months+">6+ months</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                          Budget Range (Optional)
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={formData.budget}
                          onChange={handleInputChange}
                        >
                          <option value="">Select budget range</option>
                          <option value="under-10k">Under $10k</option>
                          <option value="10k-25k">$10k - $25k</option>
                          <option value="25k-50k">$25k - $50k</option>
                          <option value="50k-100k">$50k - $100k</option>
                          <option value="100k+">$100k+</option>
                        </select>
                      </div>
                    </div>
                  </form>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={prevStep} className="flex items-center space-x-2">
                      <ArrowLeft size={20} />
                      <span>Back</span>
                    </Button>
                    <Button 
                      onClick={nextStep}
                      disabled={!formData.name || !formData.email || !formData.company || !formData.challenge}
                      className="flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Scheduling */}
              {step === 3 && (
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Schedule Your {serviceTypes.find(s => s.id === selectedService)?.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendar */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Date</h3>
                      <CalendarPicker
                        selectedDate={formData.preferredDate}
                        onDateSelect={(date) => setFormData({ ...formData, preferredDate: date })}
                      />
                    </div>

                    {/* Time Slots */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Available Times</h3>
                      {!formData.preferredDate ? (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600">Please select a date first</p>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                  formData.preferredTime === time
                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                }`}
                                onClick={() => setFormData({...formData, preferredTime: time})}
                              >
                                {time}
                              </button>
                            ))}
                          </div>

                          {/* Summary */}
                          <div className="bg-blue-50 rounded-lg p-6">
                            <h4 className="font-bold text-blue-900 mb-3">Booking Summary</h4>
                            <div className="space-y-2 text-sm text-blue-800">
                              <div><strong>Service:</strong> {serviceTypes.find(s => s.id === selectedService)?.title}</div>
                              <div><strong>Company:</strong> {formData.company}</div>
                              <div><strong>Contact:</strong> {formData.name} ({formData.email})</div>
                              {formData.preferredDate && (
                                <div><strong>Date:</strong> {new Date(formData.preferredDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                              )}
                              {formData.preferredTime && (
                                <div><strong>Time:</strong> {formData.preferredTime} IST</div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={prevStep} className="flex items-center space-x-2">
                      <ArrowLeft size={20} />
                      <span>Back</span>
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.preferredDate || !formData.preferredTime}
                      className="flex items-center space-x-2"
                    >
                      <span>{isSubmitting ? 'Confirming...' : 'Confirm Booking'}</span>
                      <CheckCircle size={20} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function BookCallPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookCallContent />
    </Suspense>
  );
}
