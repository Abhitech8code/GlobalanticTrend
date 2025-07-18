
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Women's Fashion", path: "/shop?category=Women" },
        { name: "Men's Fashion", path: "/shop?category=Men" },
        { name: "Electronics", path: "/shop?category=Electronics" },
        { name: "Home & Décor", path: "/shop?category=Home & Décor" },
        { name: "Kids", path: "/shop?category=Kids" },
        { name: "Sale", path: "/shop?sale=true" }
      ]
    },
    {
      title: "Help",
      links: [
        { name: "Track Your Order", path: "/track-order" },
        { name: "Returns & Exchanges", path: "/returns" },
        { name: "Shipping Info", path: "/shipping" },
        { name: "Size Guide", path: "/size-guide" },
        { name: "Contact Us", path: "/contact" },
        { name: "FAQ", path: "/faq" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Sustainability", path: "/sustainability" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" }
  ];

  const paymentMethods = [
    "Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay", "American Express"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/Global.png" 
                alt="Globalantic Trends" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm mb-4">
                Wear it. Live it. Tech it. - Your destination for global trends in fashion, technology, and lifestyle.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center lg:text-left">
              <p>© {currentYear} Globalantic Trends. All rights reserved.</p>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-4">
              <span className="text-sm text-gray-400 mr-2">We accept:</span>
              {paymentMethods.map((method, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center lg:justify-start space-x-6 mt-4 pt-4 border-t border-gray-800">
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-xs text-gray-400 hover:text-white">
              Cookie Policy
            </Link>
            <Link to="/accessibility" className="text-xs text-gray-400 hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
