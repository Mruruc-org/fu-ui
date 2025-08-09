import {
  ArrowUp,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter
} from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerSections = {
    programs: {
      title: "Programs",
      links: [
        "Bachelor's Degrees",
        "Master's Degrees",
        "PhD Programs",
        "Exchange Programs",
        "Summer Courses",
        "Language Programs",
      ],
    },
    universities: {
      title: "Universities",
      links: [
        "University of Warsaw",
        "Jagiellonian University",
        "Warsaw University of Technology",
        "AGH University",
        "University of Wrocław",
        "All Universities",
      ],
    },
    services: {
      title: "Services",
      links: [
        "Application Support",
        "Visa Assistance",
        "Scholarship Search",
        "Housing Help",
        "Career Guidance",
        "Student Support",
      ],
    },
    resources: {
      title: "Resources",
      links: [
        "Study Guide",
        "Cost Calculator",
        "City Guide",
        "Student Stories",
        "FAQ",
        "Blog",
      ],
    },
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Scroll to top">
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-auto">
        {/* Main Footer Content */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-bold text-white">
                    Poland Uni Finder
                  </h3>
                  <p className="text-sm text-gray-400">Find Your Future</p>
                </div>
              </div>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner in discovering the perfect university
                program in Poland. We help international students find their
                ideal academic path with comprehensive information and
                personalized support.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-blue-400" />
                  <span>info@polandunifinder.com</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-3 text-blue-400" />
                  <span>+48 123 456 789</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                  <span>Warsaw, Poland</span>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key} className="lg:col-span-1">
                <h4 className="text-white font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-white font-semibold text-lg mb-2">
                  Stay Updated
                </h4>
                <p className="text-gray-400 text-sm">
                  Get the latest updates on new programs, scholarships, and
                  application deadlines.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="flex items-center text-sm text-gray-400">
                <span>© 2025 Poland Uni Finder. Made with</span>
                <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
                <span>for students worldwide.</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-2 text-gray-400 ${social.color} transition-colors duration-200 hover:bg-gray-800 rounded-lg`}
                    aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6 text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

// // Example of how to use it in your page layout
// const PageLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Your Header Component */}
//       <header className="flex-shrink-0">{/* Header content */}</header>

//       {/* Main Content */}
//       <main className="flex-grow">{children}</main>

//       {/* Footer - automatically positioned at bottom */}
//       <Footer />
//     </div>
//   );
// };
