'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';

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
  const [projectData, setProjectData] = useState<Record<string, unknown>>({});
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

    // Prevent duplicate processing
    if (isTyping) return;

    addUserMessage(messageToSend);
    setInputValue('');

    // Update project data if metadata provided
    if (metadata) {
      setProjectData(prev => ({ ...prev, ...metadata }));
    }

    // Process the conversation flow
    setTimeout(() => {
      processConversationFlow(messageToSend, currentStep);
      setCurrentStep(prev => prev + 1);
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
        break;
        
      case 2:
        setProjectData(prev => ({ ...prev, businessGoals: userMessage }));
        addBotMessage(
          "Excellent! What's your ideal timeline for this project?",
          ['ASAP (Rush job)', '1-3 months', '3-6 months', '6+ months']
        );
        break;
        
      case 3:
        setProjectData(prev => ({ ...prev, timeline: userMessage }));
        addBotMessage(
          "Got it! What's your approximate budget range?",
          ['Under $25k', '$25k-$50k', '$50k-$100k', '$100k+']
        );
        break;
        
      case 4:
        setProjectData(prev => ({ ...prev, budget: userMessage }));
        addBotMessage(
          "Thanks! Now let's dive into technical requirements. Do you have any specific technology preferences?",
          ['React/Next.js', 'WordPress', 'Custom Solution', 'No Preference']
        );
        break;
        
      case 5:
        setProjectData(prev => ({ ...prev, techPreferences: userMessage }));
        addBotMessage(
          "Almost done! What are the key features you need?",
          ['User Authentication', 'Payment Processing', 'Admin Dashboard', 'API Integration', 'All of the above']
        );
        break;
        
      case 6:
        setProjectData(prev => ({ ...prev, features: userMessage }));
        addBotMessage(
          "Perfect! I have everything I need. Let me generate your project scope document.",
          ['Generate Document']
        );
        break;
        
      case 7:
        addBotMessage(
          "🎉 Your project scope document is ready! This includes timeline estimates, recommended tech stack, and next steps.",
          ['Download PDF', 'Email Document', 'Book Consultation']
        );
        break;
        
      default:
        if (userMessage.includes('Download')) {
          generatePDF();
          addBotMessage("Document generated! Check your downloads folder.");
        } else if (userMessage.includes('Email')) {
          addBotMessage("Please provide your email address and I'll send it over:");
        } else if (userMessage.includes('Book')) {
          addBotMessage("Great! I'll redirect you to our booking page.", ['Continue to Booking']);
        }
        break;
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 30;
    
    // Add header
    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);
    doc.text('Project Scope & Requirements', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Generated by Kenkai Labs AI Assistant', 20, yPosition);
    
    yPosition += 7;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPosition);
    
    yPosition += 8;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPosition, 190, yPosition);
    
    // Executive Summary Section
    yPosition += 15;
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text('Executive Summary', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const summaryText = doc.splitTextToSize(
      getExecutiveSummary(),
      170
    );
    doc.text(summaryText, 20, yPosition);
    yPosition += 5 * summaryText.length + 8;
    
    // Project Overview Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('1. Project Overview', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    const projectDetails = [
      { label: 'Project Type', value: projectData.projectType },
      { label: 'Business Objective', value: projectData.businessGoals },
      { label: 'Target Timeline', value: projectData.timeline },
      { label: 'Budget Range', value: projectData.budget }
    ];
    
    projectDetails.forEach(detail => {
      if (detail.value) {
        doc.setFont('helvetica', 'bold');
        doc.text(`${detail.label}:`, 25, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(String(detail.value), 70, yPosition);
        yPosition += 6;
      }
    });
    
    // Add Kenkai's Analysis
    yPosition += 5;
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.setFont('helvetica', 'bold');
    doc.text('Kenkai Labs Analysis:', 25, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    const analysisText = doc.splitTextToSize(getProjectAnalysis(), 165);
    doc.text(analysisText, 25, yPosition);
    yPosition += 5 * analysisText.length + 3;
    
    // Technical Architecture Section
    yPosition += 8;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('2. Recommended Technical Architecture', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    const techStack = getTechnologyStack();
    techStack.forEach(tech => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${tech.category}:`, 25, yPosition);
      doc.setFont('helvetica', 'normal');
      const techText = doc.splitTextToSize(tech.value, 140);
      doc.text(techText, 25, yPosition + 5);
      yPosition += 5 + (5 * techText.length) + 3;
    });
    
    // Add new page if needed
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Key Deliverables Section
    yPosition += 5;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('3. Key Deliverables', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    const deliverables = getDeliverables();
    deliverables.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, 25, yPosition);
      yPosition += 6;
    });
    
    // Project Phases Section
    yPosition += 8;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('4. Implementation Phases', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    const phases = getProjectPhases();
    phases.forEach(phase => {
      doc.setFont('helvetica', 'bold');
      doc.text(`Phase ${phase.number}: ${phase.name}`, 25, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 5;
      doc.text(`Duration: ${phase.duration}`, 30, yPosition);
      yPosition += 5;
      const phaseText = doc.splitTextToSize(phase.description, 160);
      doc.text(phaseText, 30, yPosition);
      yPosition += 5 * phaseText.length + 5;
      
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
    });
    
    // Add new page for recommendations
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Success Metrics Section
    yPosition += 5;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('5. Success Metrics & KPIs', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    const metrics = getSuccessMetrics();
    metrics.forEach(metric => {
      doc.text(`• ${metric}`, 25, yPosition);
      yPosition += 6;
    });
    
    // Risk Mitigation Section
    yPosition += 8;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('6. Risk Mitigation Strategy', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    const risks = getRiskMitigation();
    risks.forEach(risk => {
      const riskText = doc.splitTextToSize(`• ${risk}`, 170);
      doc.text(riskText, 25, yPosition);
      yPosition += 6 * riskText.length;
    });
    
    // Next Steps Section
    yPosition += 8;
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text('Next Steps', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    const nextSteps = [
      '1. Schedule a discovery call to refine requirements and discuss technical details',
      '2. Conduct technical feasibility assessment and architecture review',
      '3. Finalize project timeline, resource allocation, and sprint planning',
      '4. Sign Statement of Work and kick off Phase 1 with team introduction'
    ];
    
    nextSteps.forEach(step => {
      const stepText = doc.splitTextToSize(step, 170);
      doc.text(stepText, 25, yPosition);
      yPosition += 6 * stepText.length;
    });
    
    // Strategic Considerations
    yPosition += 8;
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text('Strategic Considerations from Kenkai Labs', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    const considerations = getStrategicConsiderations();
    considerations.forEach(consideration => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${consideration.title}:`, 25, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 6;
      const considerationText = doc.splitTextToSize(consideration.description, 165);
      doc.text(considerationText, 25, yPosition);
      yPosition += 5 * considerationText.length + 5;
      
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
    });
    
    // Summary box
    yPosition += 10;
    doc.setDrawColor(37, 99, 235);
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(20, yPosition, 170, 25, 3, 3, 'FD');
    
    yPosition += 8;
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.setFont('helvetica', 'bold');
    const effort = calculateEffort();
    doc.text(`Estimated Timeline: ${effort} | Investment: ${projectData.budget || 'Custom Quote'}`, 25, yPosition);
    
    yPosition += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text('This is a preliminary estimate. Final scope will be determined after discovery phase.', 25, yPosition);
    
    // Footer on last page
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Kenkai Labs - From Problem Discovery to Product Launch', 20, 280);
    doc.text('Contact: hello@kenkailabs.com | www.kenkailabs.com', 20, 285);
    
    // Save the PDF
    doc.save(`Kenkai-Project-Scope-${new Date().getTime()}.pdf`);
  };

  const calculateEffort = () => {
    let baseWeeks = 4;
    
    if (String(projectData.projectType)?.includes('Mobile')) baseWeeks += 2;
    if (String(projectData.projectType)?.includes('E-commerce')) baseWeeks += 3;
    if (String(projectData.projectType)?.includes('SaaS')) baseWeeks += 4;
    if (String(projectData.timeline)?.includes('ASAP')) baseWeeks = Math.max(2, baseWeeks - 1);
    if (String(projectData.features)?.includes('All of the above')) baseWeeks += 2;
    
    return `${baseWeeks}-${baseWeeks + 2} weeks`;
  };

  const getRecommendedApproach = () => {
    if (String(projectData.projectType)?.includes('Web')) {
      return "Agile development with React/Next.js, weekly sprints, and continuous deployment for rapid iteration and feedback.";
    } else if (String(projectData.projectType)?.includes('Mobile')) {
      return "Cross-platform development with React Native, phased rollout approach with beta testing phase.";
    } else if (String(projectData.projectType)?.includes('E-commerce')) {
      return "Secure payment integration with industry-standard practices, scalable architecture for growth.";
    }
    return "Custom approach tailored to your specific requirements with best practices and modern technology stack.";
  };

  const getTechnologyStack = () => {
    const projectType = String(projectData.projectType || '');
    const techPref = String(projectData.techPreferences || '');
    
    const stack = [];
    
    if (projectType.includes('Mobile')) {
      stack.push(
        { category: 'Mobile Framework', value: 'React Native with Expo for cross-platform iOS & Android development' },
        { category: 'Backend', value: 'Node.js with Express or Next.js API routes for scalable backend services' },
        { category: 'Database', value: 'PostgreSQL for relational data, Firebase for real-time features' },
        { category: 'Authentication', value: 'JWT tokens with OAuth 2.0 social login integration' }
      );
    } else if (projectType.includes('Web')) {
      stack.push(
        { category: 'Frontend', value: techPref.includes('React') ? 'React with Next.js 15 (App Router)' : 'Modern React with TypeScript' },
        { category: 'Backend', value: 'Next.js API routes or Node.js microservices architecture' },
        { category: 'Database', value: 'PostgreSQL with Prisma ORM for type-safe database access' },
        { category: 'Hosting', value: 'Vercel for frontend, AWS/Railway for backend services' }
      );
    } else if (projectType.includes('E-commerce')) {
      stack.push(
        { category: 'Platform', value: 'Next.js with Shopify/Stripe integration for payments' },
        { category: 'Payment Gateway', value: 'Stripe for secure payment processing with PCI compliance' },
        { category: 'Database', value: 'PostgreSQL for products/orders, Redis for cart/session management' },
        { category: 'Search', value: 'Algolia or Elasticsearch for fast product search and filtering' }
      );
    } else {
      stack.push(
        { category: 'Frontend', value: 'React/Next.js for modern, performant user interface' },
        { category: 'Backend', value: 'Node.js API with RESTful or GraphQL endpoints' },
        { category: 'Database', value: 'PostgreSQL for structured data with proper indexing' },
        { category: 'Cloud', value: 'AWS or Vercel for scalable hosting infrastructure' }
      );
    }
    
    stack.push(
      { category: 'DevOps', value: 'GitHub Actions for CI/CD, automated testing and deployment' },
      { category: 'Monitoring', value: 'Sentry for error tracking, Vercel Analytics for performance' }
    );
    
    return stack;
  };
  
  const getExecutiveSummary = () => {
    const projectType = String(projectData.projectType || 'project');
    const timeline = String(projectData.timeline || '');
    const budget = String(projectData.budget || '');
    const goals = String(projectData.businessGoals || '');
    
    let summary = `Based on our initial discovery conversation, we've analyzed your ${projectType} requirements. `;
    
    if (timeline.includes('ASAP')) {
      summary += 'We understand the urgency of your timeline and have designed a streamlined approach that maintains quality while accelerating delivery. ';
    }
    
    if (goals.includes('Revenue')) {
      summary += 'Our strategy focuses on conversion optimization and revenue-generating features as primary success metrics. ';
    } else if (goals.includes('Efficiency')) {
      summary += 'We\'re prioritizing automation and workflow optimization to maximize operational efficiency. ';
    } else if (goals.includes('Customer Experience')) {
      summary += 'User-centric design and seamless experience are at the core of our development approach. ';
    }
    
    summary += 'This document outlines our recommended technical architecture, implementation roadmap, and key considerations for successful project delivery. ';
    
    if (budget.includes('Under $25k')) {
      summary += 'We\'ve optimized the scope to deliver maximum value within your budget constraints, focusing on core features with potential for future expansion.';
    } else {
      summary += 'The proposed solution is designed for scalability and long-term growth.';
    }
    
    return summary;
  };
  
  const getProjectAnalysis = () => {
    const projectType = String(projectData.projectType || '');
    const timeline = String(projectData.timeline || '');
    const goals = String(projectData.businessGoals || '');
    const budget = String(projectData.budget || '');
    
    let analysis = '';
    
    if (projectType.includes('E-commerce')) {
      analysis = 'E-commerce projects require robust payment processing, inventory management, and excellent UX to drive conversions. ';
      if (timeline.includes('ASAP')) {
        analysis += 'Given your aggressive timeline, we recommend starting with core commerce features (product catalog, cart, checkout) and adding advanced features in Phase 2. ';
      }
      analysis += 'Security and PCI compliance are non-negotiable - we\'ll implement industry best practices from day one.';
    } else if (projectType.includes('Mobile')) {
      analysis = 'Mobile app success depends on native-like performance and intuitive design. Cross-platform development with React Native offers the best ROI. ';
      if (goals.includes('Market Expansion')) {
        analysis += 'For market expansion, we recommend phased rollout: beta testing with select users, then gradual geographic expansion. ';
      }
      analysis += 'App store optimization and user onboarding will be critical for adoption.';
    } else if (projectType.includes('Web')) {
      analysis = 'Modern web applications need to be fast, responsive, and SEO-friendly. Next.js provides excellent performance out of the box. ';
      if (goals.includes('Revenue')) {
        analysis += 'We\'ll implement analytics tracking from day one to measure conversion funnels and optimize for revenue. ';
      }
      analysis += 'Progressive enhancement ensures your app works for all users regardless of device or connection speed.';
    } else if (projectType.includes('SaaS')) {
      analysis = 'SaaS platforms require multi-tenancy architecture, robust authentication, and subscription management. ';
      analysis += 'Scalability is key - we\'ll architect for growth from day one. Usage analytics and feature flagging enable data-driven decisions. ';
      if (budget.includes('$100k+')) {
        analysis += 'Your budget allows for comprehensive feature development including advanced analytics and integrations.';
      }
    } else {
      analysis = 'Based on your requirements, we recommend a modular architecture that allows for flexibility and future expansion. ';
      analysis += 'Our iterative approach ensures you see working features early and can provide feedback throughout development.';
    }
    
    return analysis;
  };

  const getDeliverables = () => {
    const features = String(projectData.features || '');
    const deliverables = [
      'Fully functional and tested application',
      'Source code repository with documentation',
      'Deployment to production environment',
      'Technical documentation and API specifications',
      'User/Admin training materials'
    ];
    
    if (features.includes('User Authentication') || features.includes('All')) {
      deliverables.push('Secure user authentication system with password reset');
    }
    
    if (features.includes('Payment') || features.includes('All')) {
      deliverables.push('Payment gateway integration with transaction management');
    }
    
    if (features.includes('Admin Dashboard') || features.includes('All')) {
      deliverables.push('Comprehensive admin dashboard with analytics');
    }
    
    if (features.includes('API Integration') || features.includes('All')) {
      deliverables.push('Third-party API integrations with error handling');
    }
    
    deliverables.push(
      '30 days of post-launch support and bug fixes',
      'Performance optimization and security audit'
    );
    
    return deliverables;
  };

  const getProjectPhases = () => {
    return [
      {
        number: 1,
        name: 'Discovery & Planning',
        duration: '1-2 weeks',
        description: 'Detailed requirements gathering, user story mapping, technical architecture design, and project roadmap creation.'
      },
      {
        number: 2,
        name: 'Design & Prototyping',
        duration: '1-2 weeks',
        description: 'UI/UX design, wireframes, interactive prototypes, and design system creation with stakeholder feedback.'
      },
      {
        number: 3,
        name: 'Core Development',
        duration: '3-6 weeks',
        description: 'Backend API development, database schema implementation, frontend component development, and feature integration.'
      },
      {
        number: 4,
        name: 'Testing & QA',
        duration: '1-2 weeks',
        description: 'Comprehensive testing including unit tests, integration tests, user acceptance testing, and security audits.'
      },
      {
        number: 5,
        name: 'Deployment & Launch',
        duration: '1 week',
        description: 'Production deployment, performance monitoring setup, final bug fixes, and official launch with documentation.'
      }
    ];
  };

  const getSuccessMetrics = () => {
    const goals = String(projectData.businessGoals || '');
    const metrics = [];
    
    if (goals.includes('Revenue')) {
      metrics.push('Conversion rate increase of 15-25%');
      metrics.push('Average order value growth');
    }
    
    if (goals.includes('Efficiency')) {
      metrics.push('50% reduction in manual processing time');
      metrics.push('Automated workflow completion rates');
    }
    
    if (goals.includes('Customer Experience')) {
      metrics.push('User satisfaction score >4.5/5');
      metrics.push('Page load time <2 seconds');
    }
    
    if (goals.includes('Market Expansion')) {
      metrics.push('New user acquisition rate');
      metrics.push('Market penetration in target segments');
    }
    
    metrics.push(
      'System uptime >99.5%',
      'Zero critical security vulnerabilities',
      'Mobile responsiveness score >95%'
    );
    
    return metrics;
  };

  const getRiskMitigation = () => {
    return [
      'Scope Creep: Weekly sprint reviews with clear acceptance criteria and change request process',
      'Technical Debt: Code review standards, automated testing with >80% coverage, and refactoring sprints',
      'Timeline Delays: Buffer time in estimates, daily standups, and proactive risk identification',
      'Security Vulnerabilities: Regular security audits, dependency updates, and penetration testing',
      'Integration Issues: Early API testing, sandbox environments, and fallback strategies',
      'Performance Problems: Load testing, CDN implementation, and database query optimization'
    ];
  };
  
  const getStrategicConsiderations = () => {
    const projectType = String(projectData.projectType || '');
    const timeline = String(projectData.timeline || '');
    const goals = String(projectData.businessGoals || '');
    const budget = String(projectData.budget || '');
    
    const considerations = [];
    
    // Budget optimization
    if (budget.includes('Under $25k')) {
      considerations.push({
        title: 'Budget Optimization',
        description: 'We recommend an MVP approach focusing on core features that deliver immediate value. This allows you to launch quickly, gather user feedback, and prioritize future enhancements based on real data. We can establish a roadmap for Phase 2 features.'
      });
    } else if (budget.includes('$100k+')) {
      considerations.push({
        title: 'Investment Strategy',
        description: 'Your budget allows for comprehensive feature development. We recommend investing in robust infrastructure, advanced analytics, and automation from the start. This reduces technical debt and positions you for rapid scaling.'
      });
    }
    
    // Timeline considerations
    if (timeline.includes('ASAP')) {
      considerations.push({
        title: 'Accelerated Timeline',
        description: 'To meet your urgent timeline, we\'ll use parallel development tracks, pre-built component libraries, and automated testing. However, we strongly recommend maintaining a quality-first approach - rushing development often leads to costly rework later.'
      });
    } else if (timeline.includes('6+')) {
      considerations.push({
        title: 'Extended Timeline Benefits',
        description: 'Your flexible timeline allows for thorough user research, extensive testing, and iterative refinement. We can implement advanced features and optimize for long-term maintainability and scalability.'
      });
    }
    
    // Goal-specific recommendations
    if (goals.includes('Revenue')) {
      considerations.push({
        title: 'Revenue Optimization',
        description: 'We recommend implementing comprehensive analytics from day one to track conversion funnels, user behavior, and revenue metrics. A/B testing capabilities will allow you to continuously optimize for conversions. Consider integrating with marketing automation tools.'
      });
    }
    
    if (goals.includes('Efficiency')) {
      considerations.push({
        title: 'Efficiency Gains',
        description: 'Focus on automation, workflow optimization, and integration with existing tools. We\'ll identify manual processes that can be automated and design intuitive interfaces that reduce training time. ROI tracking will demonstrate efficiency improvements.'
      });
    }
    
    if (goals.includes('Market Expansion')) {
      considerations.push({
        title: 'Market Entry Strategy',
        description: 'For successful market expansion, consider internationalization (i18n) support, multi-currency handling, and compliance with regional regulations. A phased rollout strategy minimizes risk and allows you to adapt based on market response.'
      });
    }
    
    // Project-specific insights
    if (projectType.includes('E-commerce')) {
      considerations.push({
        title: 'E-commerce Success Factors',
        description: 'Conversion optimization is critical. We recommend implementing abandoned cart recovery, product recommendations, easy checkout flow, and trust signals (reviews, security badges). Mobile optimization is non-negotiable - over 60% of e-commerce traffic is mobile.'
      });
    }
    
    if (projectType.includes('Mobile')) {
      considerations.push({
        title: 'Mobile App Distribution',
        description: 'Plan for app store submission timelines (Apple review typically takes 1-3 days, Google 1-2 days). Beta testing through TestFlight/Play Console helps catch issues before public launch. Push notification strategy should be planned early.'
      });
    }
    
    // Always include scalability
    considerations.push({
      title: 'Scalability & Growth',
      description: 'We architect all solutions with scalability in mind. This includes database optimization, caching strategies, CDN implementation, and horizontal scaling capabilities. Your application will be ready to handle growth without major rewrites.'
    });
    
    return considerations.slice(0, 4); // Limit to 4 most relevant considerations
  };

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