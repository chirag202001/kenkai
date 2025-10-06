'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  options?: string[];
  metadata?: Record<string, unknown>;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [_projectData, setProjectData] = useState<Record<string, unknown>>({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize conversation
      addBotMessage(
        "👋 Hi! I'm your AI Requirements Discovery Assistant. I'll help you create a detailed Scope of Work for your project.",
        ['Get Started', 'Learn More']
      );
    }
  }, [isOpen, messages.length]);

  const addBotMessage = (content: string, options?: string[], metadata?: Record<string, unknown>) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      options,
      metadata
    };
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSend = (message?: string, metadata?: Record<string, unknown>) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    addUserMessage(messageToSend);
    setInputValue('');

    // Update project data if metadata provided
    if (metadata) {
      setProjectData(prev => ({ ...prev, ...metadata }));
    }

    // Process the conversation flow
    setTimeout(() => {
      processConversationFlow(messageToSend, currentStep);
    }, 500);
  };

  const processConversationFlow = (userMessage: string, step: number) => {
    switch (step) {
      case 0:
        if (userMessage.includes('Get Started')) {
          addBotMessage(
            "Great! Let's start by understanding your project. What type of project are you working on?",
            ['Web Application', 'Mobile App', 'E-commerce', 'SaaS Platform', 'Other']
          );
          setCurrentStep(1);
        } else {
          addBotMessage(
            "I help businesses create detailed project requirements and scope of work documents. Ready to start?",
            ['Yes, let\'s begin', 'Tell me more']
          );
        }
        break;
        
      case 1:
        setProjectData(prev => ({ ...prev, projectType: userMessage }));
        addBotMessage(
          "Perfect! Now, what are your main business goals for this project?",
          ['Increase Revenue', 'Improve Efficiency', 'Better Customer Experience', 'Market Expansion']
        );
        setCurrentStep(2);
        break;
        
      case 2:
        setProjectData(prev => ({ ...prev, businessGoals: userMessage }));
        addBotMessage(
          "Excellent! What's your ideal timeline for this project?",
          ['ASAP (Rush job)', '1-3 months', '3-6 months', '6+ months']
        );
        setCurrentStep(3);
        break;
        
      case 3:
        setProjectData(prev => ({ ...prev, timeline: userMessage }));
        addBotMessage(
          "Got it! What's your approximate budget range?",
          ['Under $25k', '$25k-$50k', '$50k-$100k', '$100k+']
        );
        setCurrentStep(4);
        break;
        
      case 4:
        setProjectData(prev => ({ ...prev, budget: userMessage }));
        addBotMessage(
          "Thanks! Now let's dive into technical requirements. Do you have any specific technology preferences?",
          ['React/Next.js', 'WordPress', 'Custom Solution', 'No Preference']
        );
        setCurrentStep(5);
        break;
        
      case 5:
        setProjectData(prev => ({ ...prev, techPreferences: userMessage }));
        addBotMessage(
          "Almost done! What are the key features you need?",
          ['User Authentication', 'Payment Processing', 'Admin Dashboard', 'API Integration', 'All of the above']
        );
        setCurrentStep(6);
        break;
        
      case 6:
        setProjectData(prev => ({ ...prev, features: userMessage }));
        addBotMessage(
          "Perfect! I have everything I need. Let me generate your project scope document.",
          ['Generate Document']
        );
        setCurrentStep(7);
        break;
        
      case 7:
        addBotMessage(
          "🎉 Your project scope document is ready! This includes timeline estimates, recommended tech stack, and next steps.",
          ['Download PDF', 'Email Document', 'Book Consultation']
        );
        setCurrentStep(8);
        break;
        
      default:
        if (userMessage.includes('Download')) {
          addBotMessage("Document generated! Check your downloads folder.");
        } else if (userMessage.includes('Email')) {
          addBotMessage("Please provide your email address and I'll send it over:");
        } else if (userMessage.includes('Book')) {
          addBotMessage("Great! I'll redirect you to our booking page.", ['Continue to Booking']);
        }
        break;
    }
  };

  // const generateDocument = () => {
  //   const doc = {
  //     projectType: projectData.projectType,
  //     businessGoals: projectData.businessGoals,
  //     timeline: projectData.timeline,
  //     budget: projectData.budget,
  //     techPreferences: projectData.techPreferences,
  //     features: projectData.features,
  //     estimatedEffort: calculateEffort(),
  //     recommendedApproach: getRecommendedApproach()
  //   };
  //   
  //   return doc;
  // };

  // const calculateEffort = () => {
  //   // Simple effort calculation based on project data
  //   let baseWeeks = 4;
  //   
  //   if (projectData.projectType?.includes('Mobile')) baseWeeks += 2;
  //   if (projectData.projectType?.includes('E-commerce')) baseWeeks += 3;
  //   if (projectData.timeline?.includes('ASAP')) baseWeeks = Math.max(2, baseWeeks - 1);
  //   
  //   return `${baseWeeks}-${baseWeeks + 2} weeks`;
  // };

  // const getRecommendedApproach = () => {
  //   if (projectData.projectType?.includes('Web')) {
  //     return \"Agile development with React/Next.js, weekly sprints, and continuous deployment\";
  //   } else if (projectData.projectType?.includes('Mobile')) {
  //     return \"Cross-platform development with React Native, phased rollout approach\";
  //   }
  //   return \"Custom approach based on project requirements\";
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Requirements Discovery</h3>
              <p className="text-sm text-gray-500">AI-Powered Project Scoping</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                
                {message.options && (
                  <div className="mt-3 space-y-2">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(option)}
                        className="block w-full text-left px-3 py-2 text-xs bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={() => handleSend()} size="sm" className="px-4 py-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}