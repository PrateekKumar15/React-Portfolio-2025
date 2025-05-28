/**
 * Centralized SEO Configuration
 * This file contains all SEO-related constants and metadata for the portfolio website
 *
 * @author Prateek Kumar
 * @description Configuration file for all SEO meta tags, structured data, and social media links
 */

// ============================================
// PERSONAL INFORMATION & CONTACT DETAILS
// ============================================
export const PERSONAL_INFO = {
  name: "Prateek Kumar",
  title: "Full Stack MERN Developer",
  description:
    "Full Stack MERN Developer & Engineering Science Student at IIT Jodhpur. Specialized in React, Node.js, MongoDB, Express. Available for internships and freelance work.",
  email: "prateekkumar72007.com", // Update with your actual email
  phone: "+91-8302244250", // Update with your actual phone
  location: {
    city: "Jodhpur",
    state: "Rajasthan",
    country: "India",
  },
  education: {
    institution: "Indian Institute of Technology, Jodhpur",
    degree: "B.Tech in Engineering Science",
    url: "https://iitj.ac.in",
  },
};

// ============================================
// WEBSITE & SOCIAL MEDIA URLS
// ============================================
export const WEBSITE_CONFIG = {
  // Production website URL
  baseUrl: "https://prateek-protfolio-2025.vercel.app",

  // Social media profiles
  socialMedia: {
    linkedin: "https://www.linkedin.com/in/prateek-kumar-m07-d15-y2003/",
    github: "https://github.com/PrateekKumar15",
    instagram: "https://www.instagram.com/prateek_kumar_15",
    twitter: "@prateek_kumar_15",
  },

  // Website assets
  assets: {
    logo: "/logo.svg",
    profileImage: "/assets/myprofile.png",
    aboutImage: "/assets/about.png",
    favicon: "/logo.svg",
  },
};

// ============================================
// TECHNICAL SKILLS & EXPERTISE
// ============================================
export const TECHNICAL_SKILLS = [
  "JavaScript",
  "React.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Next.js",
  "Go Programming",
  "Full Stack Development",
  "Web Development",
  "MERN Stack",
  "Frontend Development",
  "Backend Development",
];

// ============================================
// SEO META TAGS FOR DIFFERENT SECTIONS
// ============================================
export const SEO_SECTIONS = {
  home: {
    title:
      "Prateek Kumar - Full Stack Developer Portfolio",
    description:
      "Full Stack MERN Developer & Engineering Science Student at IIT Jodhpur. Specialized in React, Node.js, MongoDB, Express. View my projects including e-commerce platforms, news apps, and AI-powered tools.",
    keywords:
      "Prateek Kumar, Full Stack Developer, MERN Stack Developer, React Developer, Node.js Developer, Web Developer Portfolio, JavaScript Developer, Frontend Developer, Backend Developer, IIT Jodhpur, Web Development, React Projects, Portfolio Website, MongoDB, Express.js, Software Engineer, Computer Science, Tech Portfolio",
  },

  about: {
    title: "About - Full Stack Developer | IIT Jodhpur Student",
    description:
      "Learn about Prateek Kumar, a passionate Full Stack MERN Developer and Computer Science student at IIT Jodhpur. Discover his journey, skills, and experience in web development.",
    keywords:
      "About Prateek Kumar, Full Stack Developer Background, IIT Jodhpur Student, MERN Developer Profile, Web Developer Biography, Computer Science Student",
  },

  skills: {
    title:
      "Technical Skills - React | Node.js, MongoDB",
    description:
      "Explore Prateek Kumar's technical expertise in MERN stack development including React.js, Node.js, MongoDB, Express.js, JavaScript, HTML, CSS, and modern web technologies.",
    keywords:
      "React Developer Skills, Node.js Developer, MongoDB Expert, Express.js, JavaScript Developer, HTML CSS Skills, MERN Stack Technologies, Frontend Backend Skills",
  },

  projects: {
    title: "Web Development Projects | Prateek Kumar",
    description:
      "View Prateek Kumar's impressive web development projects including e-commerce platforms, news applications, AI tools, and innovative web solutions built with MERN stack.",
    keywords:
      "React Projects, Node.js Projects, MERN Stack Projects, Web Development Portfolio, E-commerce Website, News App, AI Projects, GitHub Projects",
  },

  education: {
    title: "Education & Experience - IIT Jodhpur | Prateek Kumar",
    description:
      "Discover Prateek Kumar's educational background at IIT Jodhpur, leadership experience at Varchas'24, and academic achievements in Computer Science and Technology.",
    keywords:
      "IIT Jodhpur Student, Computer Science Education, BTech Student, Varchas Finance Manager, Academic Experience, Leadership Skills",
  },

  contact: {
    title: "Contact Prateek Kumar - Full Stack Developer | Hire",
    description:
      "Get in touch with Prateek Kumar for web development projects, internships, or collaboration opportunities. Available for MERN stack development and freelance work.",
    keywords:
      "Contact Full Stack Developer, Hire MERN Developer, Web Development Services, Freelance Developer, React Developer for Hire, Contact Prateek Kumar",
  },
};

// ============================================
// STRUCTURED DATA SCHEMAS
// ============================================

/**
 * Generate Person Schema for JSON-LD structured data
 * @returns {Object} Person schema object
 */
export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  jobTitle: PERSONAL_INFO.title,
  description: PERSONAL_INFO.description,
  url: WEBSITE_CONFIG.baseUrl,
  image: `${WEBSITE_CONFIG.baseUrl}${WEBSITE_CONFIG.assets.profileImage}`,
  sameAs: [
    WEBSITE_CONFIG.socialMedia.linkedin,
    WEBSITE_CONFIG.socialMedia.github,
    WEBSITE_CONFIG.socialMedia.instagram,
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: PERSONAL_INFO.education.institution,
    url: PERSONAL_INFO.education.url,
  },
  knowsAbout: TECHNICAL_SKILLS,
  hasOccupation: {
    "@type": "Occupation",
    name: PERSONAL_INFO.title,
    occupationLocation: {
      "@type": "Place",
      name: PERSONAL_INFO.location.country,
    },
    skills: TECHNICAL_SKILLS.slice(0, 8).join(", "), // First 8 skills
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PERSONAL_INFO.phone,
    contactType: "professional",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: PERSONAL_INFO.location.city,
    addressRegion: PERSONAL_INFO.location.state,
    addressCountry: "IN",
  },
});

/**
 * Generate Website Schema for JSON-LD structured data
 * @returns {Object} Website schema object
 */
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${WEBSITE_CONFIG.baseUrl}/#website`,
  url: WEBSITE_CONFIG.baseUrl,
  name: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title} Portfolio`,
  description: PERSONAL_INFO.description,
  publisher: {
    "@id": `${WEBSITE_CONFIG.baseUrl}/#person`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${WEBSITE_CONFIG.baseUrl}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-US",
  copyrightYear: new Date().getFullYear().toString(),
  copyrightHolder: {
    "@type": "Person",
    name: PERSONAL_INFO.name,
  },
});

/**
 * Generate Organization Schema for JSON-LD structured data
 * @returns {Object} Organization schema object
 */
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${WEBSITE_CONFIG.baseUrl}/#organization`,
  name: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
  url: WEBSITE_CONFIG.baseUrl,
  logo: `${WEBSITE_CONFIG.baseUrl}${WEBSITE_CONFIG.assets.logo}`,
  founder: {
    "@type": "Person",
    name: PERSONAL_INFO.name,
  },
  description:
    "Professional portfolio showcasing full stack web development projects and skills in MERN stack technologies.",
  knowsAbout: TECHNICAL_SKILLS.slice(0, 5), // Top 5 skills
  areaServed: "Worldwide",
  serviceType: "Web Development Services",
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get complete URL for any path
 * @param {string} path - Path to append to base URL
 * @returns {string} Complete URL
 */
export const getFullUrl = (path = "") => {
  return `${WEBSITE_CONFIG.baseUrl}${path}`;
};

/**
 * Get asset URL with base URL
 * @param {string} assetPath - Asset path from config
 * @returns {string} Complete asset URL
 */
export const getAssetUrl = (assetPath) => {
  return `${WEBSITE_CONFIG.baseUrl}${assetPath}`;
};

/**
 * Get social media URLs as array (for structured data)
 * @returns {Array} Array of social media URLs
 */
export const getSocialMediaUrls = () => {
  return Object.values(WEBSITE_CONFIG.socialMedia).filter(
    (url) => !url.startsWith("@")
  );
};
