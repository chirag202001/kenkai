import Link from "next/link";
import { Linkedin, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Problem Discovery Sprint", href: "/services#discovery" },
      { name: "Roadmap & Strategy", href: "/services#strategy" },
      { name: "Build & Execute", href: "/services#execution" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Our Approach", href: "/about#approach" },
    ],
    resources: [
      { name: "Technical Discovery Checklist", href: "/resources#checklist" },
      { name: "Insights & Blog", href: "/resources#blog" },
      { name: "Contact Us", href: "/contact" },
      { name: "Book a Call", href: "/book-call" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-width">
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="text-2xl font-bold text-blue-400 mb-4">
                Kenkai Labs
              </div>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                From problem discovery to IT execution. We uncover your real tech friction, 
                design clear roadmaps, and build solutions that work.
              </p>
              <div className="flex space-x-4">
                <a
                  href="mailto:hello@kenkailabs.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://linkedin.com/company/kenkailabs"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://twitter.com/kenkailabs"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Contact */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 mb-6">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-xs mb-2">Ready to get started?</p>
                <a
                  href="tel:+1234567890"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  <Phone size={16} className="inline mr-2" />
                  Book a Call Today
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Kenkai Labs. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
