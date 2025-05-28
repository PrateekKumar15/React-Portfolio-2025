/**
 * SEO-Enhanced Footer Component
 * Provides additional content, external links, and business information for better SEO
 * 
 * @author Prateek Kumar
 * @description Footer with external authoritative links and structured business information
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram, 
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCode,
  FaGraduationCap
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // External authoritative links for SEO
  const externalLinks = [
    {
      name: "IIT Jodhpur",
      url: "https://iitj.ac.in/",
      description: "Indian Institute of Technology Jodhpur - Premier Engineering Institution",
      category: "Education"
    },
    {
      name: "React Documentation",
      url: "https://react.dev/",
      description: "Official React.js Documentation and Learning Resources",
      category: "Technology"
    },
    {
      name: "Node.js Official",
      url: "https://nodejs.org/",
      description: "Node.js Official Website and Documentation",
      category: "Technology"
    },
    {
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      description: "Mozilla Developer Network - Web Development Resources",
      category: "Technology"
    },
    {
      name: "Vercel Platform",
      url: "https://vercel.com/",
      description: "Vercel - Platform for Frontend Frameworks and Static Sites",
      category: "Technology"
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      description: "GitHub - Code Hosting and Collaboration Platform",
      category: "Technology"
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/prateek-kumar-m07-d15-y2003/",
      icon: <FaLinkedinIn className="w-5 h-5" />,
      description: "Connect on LinkedIn for professional networking"
    },
    {
      name: "GitHub",
      url: "https://github.com/PrateekKumar15",
      icon: <FaGithub className="w-5 h-5" />,
      description: "View source code and projects on GitHub"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/prateek_kumar_15",
      icon: <FaInstagram className="w-5 h-5" />,
      description: "Follow on Instagram for updates"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      className="bg-slate-900/95 border-t border-slate-700 mt-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      role="contentinfo"
      aria-label="Footer with contact information and external links"
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FaCode className="text-indigo-400" />
              Prateek Kumar
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full-Stack MERN Developer and Engineering Science student at IIT Jodhpur. 
              Passionate about creating innovative web solutions and contributing to the 
              tech community.
            </p>
            <div className="flex items-center text-sm text-slate-500">
              <FaMapMarkerAlt className="w-4 h-4 mr-2" />
              Jodhpur, Rajasthan, India
            </div>
            <div className="flex items-center text-sm text-slate-500">
              <FaCalendarAlt className="w-4 h-4 mr-2" />
              Portfolio Updated: {currentYear}
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Navigation</h3>
            <nav className="space-y-2" aria-label="Footer navigation">
              {[
                { name: "About Me", path: "/about" },
                { name: "Technical Skills", path: "/skills" },
                { name: "Projects", path: "/projects" },
                { name: "Education", path: "/education" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                  aria-label={`Navigate to ${link.name} page`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* External Resources */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tech Resources</h3>
            <div className="space-y-2">
              {externalLinks.slice(0, 5).map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-400 hover:text-indigo-400 transition-colors text-sm group"
                  aria-label={`Visit ${link.description} (opens in new tab)`}
                  title={link.description}
                >
                  <span className="mr-2">{link.name}</span>
                  <FaExternalLinkAlt className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Media & Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Me</h3>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-400 hover:text-indigo-400 transition-colors text-sm group"
                  aria-label={social.description}
                  title={social.description}
                >
                  {social.icon}
                  <span className="ml-3">{social.name}</span>
                  <FaExternalLinkAlt className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
            
            {/* Professional Status */}
            <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center text-green-400 text-sm mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Available for Opportunities
              </div>
              <p className="text-xs text-slate-500">
                Open to internships, full-time roles, and freelance projects
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-sm text-slate-500 mb-4 md:mb-0">
            <p>
              © {currentYear} Prateek Kumar. All rights reserved. 
              <span className="hidden md:inline"> Built with React, Node.js, and passion for web development.</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <a 
              href="/sitemap.xml" 
              className="hover:text-indigo-400 transition-colors"
              aria-label="View XML sitemap"
            >
              Sitemap
            </a>
            <a 
              href="/robots.txt" 
              className="hover:text-indigo-400 transition-colors"
              aria-label="View robots.txt file"
            >
              Robots.txt
            </a>
            <span className="flex items-center">
              <FaGraduationCap className="w-3 h-3 mr-1" />
              IIT Jodhpur
            </span>
          </div>
        </motion.div>

        {/* Structured Data for Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Prateek Kumar",
            "jobTitle": "Full Stack Developer",
            "affiliation": {
              "@type": "Organization",
              "name": "Indian Institute of Technology Jodhpur"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Jodhpur",
              "addressRegion": "Rajasthan",
              "addressCountry": "India"
            },
            "sameAs": [
              "https://www.linkedin.com/in/prateek-kumar-m07-d15-y2003/",
              "https://github.com/PrateekKumar15",
              "https://www.instagram.com/prateek_kumar_15"
            ],
            "knowsAbout": [
              "React.js",
              "Node.js",
              "Full Stack Development",
              "MERN Stack",
              "Web Development",
              "JavaScript",
              "TypeScript"
            ]
          }, null, 0)}
        </script>
      </div>
    </motion.footer>
  );
};

export default Footer;
