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
    
    // Call the API to send email and log the download
    try {
      const response = await fetch('/api/resources/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          resourceType: 'Technical Problem Discovery Checklist' 
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsDownloaded(true);
        // Trigger PDF download immediately
        downloadPDF();
      } else {
        alert('Something went wrong. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const downloadPDF = () => {
    // Generate the Technical Problem Discovery Checklist PDF
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      let yPosition = 20;

      // Header
      doc.setFontSize(24);
      doc.setTextColor(37, 99, 235);
      doc.text('Technical Problem Discovery Checklist', 20, yPosition);
      
      yPosition += 10;
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text('Identify bottlenecks and prioritize improvements', 20, yPosition);
      
      yPosition += 5;
      doc.text('By Kenkai Labs', 20, yPosition);
      
      yPosition += 10;
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition, 190, yPosition);
      
      yPosition += 15;
      
      // Introduction
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('How to Use This Checklist', 20, yPosition);
      
      yPosition += 8;
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const intro = doc.splitTextToSize(
        'Answer each question honestly and rate the severity (1-5). This assessment will help you identify where your technology is leaking value and which problems to tackle first. Focus on high-impact, quick-win improvements.',
        170
      );
      doc.text(intro, 20, yPosition);
      yPosition += 5 * intro.length + 15;
      
      // Questions
      const questions = [
        {
          category: 'Performance & Scalability',
          questions: [
            'Are users experiencing slow page loads or timeouts? (Performance issues)',
            'Does your system struggle during peak traffic times? (Scalability)',
            'Are database queries taking longer than they should? (Database optimization)'
          ]
        },
        {
          category: 'Security & Compliance',
          questions: [
            'Do you have outdated dependencies with known vulnerabilities?',
            'Is your authentication/authorization system robust and up-to-date?',
            'Are you compliant with relevant regulations (GDPR, HIPAA, etc.)?'
          ]
        },
        {
          category: 'Development Velocity',
          questions: [
            'Is your team spending too much time on bug fixes vs new features?',
            'Do deployments require manual steps or cause frequent issues?',
            'Is technical debt making it hard to implement new features?'
          ]
        },
        {
          category: 'Infrastructure & DevOps',
          questions: [
            'Are you experiencing frequent downtime or service interruptions?',
            'Is monitoring and alerting giving you visibility into problems?',
            'Are infrastructure costs growing faster than revenue?'
          ]
        },
        {
          category: 'User Experience',
          questions: [
            'Are users reporting confusion or friction in key workflows?',
            'Is your mobile experience as good as your desktop experience?',
            'Are you losing users due to technical limitations?'
          ]
        }
      ];

      questions.forEach((section, sectionIndex) => {
        // Add new page if needed
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        // Section header
        doc.setFontSize(14);
        doc.setTextColor(37, 99, 235);
        doc.setFont('helvetica', 'bold');
        doc.text(`${sectionIndex + 1}. ${section.category}`, 20, yPosition);
        yPosition += 10;

        // Questions
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');

        section.questions.forEach((question, qIndex) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }

          const questionText = doc.splitTextToSize(`${sectionIndex + 1}.${qIndex + 1}. ${question}`, 145);
          doc.text(questionText, 25, yPosition);
          
          // Rating boxes
          const boxY = yPosition - 3;
          for (let i = 0; i < 5; i++) {
            doc.rect(175 + (i * 6), boxY, 5, 5);
            doc.setFontSize(7);
            doc.text(String(i + 1), 176 + (i * 6), boxY + 3.5);
          }
          doc.setFontSize(10);
          
          yPosition += 6 * questionText.length + 3;
        });

        yPosition += 8;
      });

      // Add scoring guide
      doc.addPage();
      yPosition = 20;
      
      doc.setFontSize(16);
      doc.setTextColor(37, 99, 235);
      doc.text('Priority Scoring Framework', 20, yPosition);
      yPosition += 15;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);

      const scoringGuide = [
        { score: '1-2', label: 'Low Priority', desc: 'Minor issues. Address when resources allow.' },
        { score: '3', label: 'Medium Priority', desc: 'Noticeable impact. Plan for next quarter.' },
        { score: '4-5', label: 'High Priority', desc: 'Critical issues. Address immediately.' }
      ];

      scoringGuide.forEach(item => {
        doc.setFont('helvetica', 'bold');
        doc.text(`Score ${item.score}: ${item.label}`, 25, yPosition);
        doc.setFont('helvetica', 'normal');
        yPosition += 6;
        doc.text(item.desc, 25, yPosition);
        yPosition += 10;
      });

      yPosition += 10;
      doc.setFontSize(12);
      doc.setTextColor(37, 99, 235);
      doc.setFont('helvetica', 'bold');
      doc.text('Next Steps', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');

      const nextSteps = [
        '1. Total your scores by category to identify your weakest areas',
        '2. List all items rated 4-5 (high priority)',
        '3. Estimate the business impact of fixing each issue',
        '4. Choose 2-3 quick wins to tackle in the next 30 days',
        '5. Schedule a discovery sprint for complex problems'
      ];

      nextSteps.forEach(step => {
        const stepText = doc.splitTextToSize(step, 170);
        doc.text(stepText, 25, yPosition);
        yPosition += 6 * stepText.length + 2;
      });

      // Footer
      yPosition = 270;
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('Kenkai Labs - From Problem Discovery to Product Launch', 20, yPosition);
      doc.text('Book a free discovery call: hello@kenkailabs.com | www.kenkailabs.com', 20, yPosition + 5);

      // Save
      doc.save('Technical-Problem-Discovery-Checklist-Kenkai-Labs.pdf');
    });
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-width px-4 md:px-8">
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
                    <Button 
                      onClick={downloadPDF}
                      className="w-full mb-4"
                    >
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
