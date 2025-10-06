'use client';

import React, { useState } from 'react';
import { ArrowRight, Clock, FileText, Zap, CheckCircle, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatBot from '@/components/ChatBot/ChatBot';

export default function SprintRequestPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: "Conversational Discovery",
      description: "AI guides you through questions to understand your exact needs"
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      title: "Instant Documentation",
      description: "Get a professional Scope of Work document in minutes"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Quick Turnaround",
      description: "From requirements to project start in 24-48 hours"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Smart Recommendations",
      description: "AI suggests optimal tech stack and approach for your project"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "TechStart India",
      rating: 5,
      text: "The AI chatbot helped us define our requirements so clearly. We got our project scope in 15 minutes!"
    },
    {
      name: "Priya Sharma",
      company: "E-commerce Plus",
      rating: 5,
      text: "Saved us weeks of back-and-forth meetings. The requirements document was spot-on."
    },
    {
      name: "Amit Patel",
      company: "FinTech Solutions",
      rating: 5,
      text: "The pricing transparency and instant documentation made decision-making so much easier."
    }
  ];

  const pricingPlans = [
    {
      name: "Pay Per Use",
      price: "₹500",
      period: "per document",
      features: [
        "AI-guided requirement discovery",
        "Professional Scope of Work document",
        "PDF & Word format export",
        "24/7 chat support",
        "Revision within 7 days"
      ],
      popular: false,
      buttonText: "Start Discovery",
      buttonAction: () => setIsChatOpen(true)
    },
    {
      name: "Pro Subscription",
      price: "₹10,000",
      period: "per month",
      features: [
        "Unlimited requirement documents",
        "Priority AI processing",
        "Advanced project templates",
        "Team collaboration features",
        "Dedicated account manager",
        "Custom integrations",
        "API access"
      ],
      popular: true,
      buttonText: "Subscribe Now",
      buttonAction: () => alert("Subscription flow would go here")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              NEW: AI-Powered Requirements Discovery
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your Project <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Requirements</span> in Minutes
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our AI chatbot asks the right questions to create a detailed Scope of Work document. 
              No more endless meetings or unclear requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => setIsChatOpen(true)}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
              >
                Start AI Discovery
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                View Sample Document
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>500+ Projects Scoped</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Avg. 15min Completion</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>4.9/5 Accuracy Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and accurate requirement discovery</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Chat with AI</h3>
              <p className="text-gray-600">Our AI asks guided questions about your project goals, timeline, budget, and technical requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. AI Generates Document</h3>
              <p className="text-gray-600">Instantly get a professional Scope of Work with timeline estimates, technology recommendations, and clear deliverables.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Start Your Project</h3>
              <p className="text-gray-600">Use the document to get accurate quotes, plan your project timeline, and kickstart development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AI Discovery?</h2>
            <p className="text-xl text-gray-600">Faster, more accurate, and comprehensive than traditional methods</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real feedback from real projects</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-gray-900">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300">Choose the plan that works for your business</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-lg p-8 ${plan.popular ? 'ring-4 ring-blue-600' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={plan.buttonAction}
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-width text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Define Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start the AI-guided discovery process now and get your professional requirements document in minutes.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => setIsChatOpen(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 group"
          >
            Start Discovery Chat
            <MessageSquare className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Chat Interface */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
