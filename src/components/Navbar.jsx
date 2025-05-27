import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from 'lottie-react';
import animationData from '../assets/P.json';
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaShare,
  FaCopy,
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down, hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up, show navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.share-menu-container')) {
        setShowShareMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [lastScrollY]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Prateek Kumar - Full Stack Developer Portfolio",
          text: "Check out Prateek Kumar's portfolio - Full Stack  Developer & Engineering Science Student at IIT Jodhpur",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
      setShowShareMenu(false);
    } catch (error) {
      console.log("Error copying link:", error);
    }
  };



  const socialIconVariants = {
    hover: { transition: { type: "spring", stiffness: 300 } },
  };

  const navItems = [
    { name: "Home", link: "/", icon: <FaHome /> },
    { name: "About", link: "/about", icon: <FaUser /> },
    { name: "Skills", link: "/skills", icon: <FaCode /> },
    { name: "Projects", link: "/projects", icon: <FaProjectDiagram /> },
    { name: "Education", link: "/education", icon: <FaBriefcase /> },
    { name: "Contact", link: "/contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      {/* Top Header */}
      <nav className="fixed top-0 left-0 right-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-screen-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between bg-black/20 rounded-full px-6 py-3">
            <div>
              <button
                onClick={() => navigate('/')}
                aria-label="Go to top of page - Prateek Kumar Portfolio"
                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                title="Home"
              >

                <Lottie
                  loop={false}
                  animationData={animationData}
                  data-play={true}
                  className="w-8 h-8"
                />
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-6 text-aliceblue-500 text-xl relative" role="list" aria-label="Social media links">
              {[
                {
                  Icon: FaLinkedinIn,
                  link: "https://www.linkedin.com/in/prateek-kumar-m07-d15-y2003/",
                  name: "LinkedIn Profile"
                },
                {
                  Icon: FaGithub,
                  link: "https://github.com/PrateekKumar15",
                  name: "GitHub Profile"
                },
                {
                  Icon: FaInstagram,
                  link: "https://www.instagram.com/prateek_kumar_15",
                  name: "Instagram Profile"
                },
              ].map(({ Icon, link, name }) => (
                <motion.a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover="hover"
                  variants={socialIconVariants}
                  className="hover:text-white transition duration-300 rounded-full p-2 hover:bg-[#00356d] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label={`Visit Prateek Kumar's ${name}`}
                  role="listitem"
                  title={name}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />

                </motion.a>
              ))}

              {/* Share Button */}
              <div className="share-menu-container">
                <motion.button
                  onClick={handleShare}
                  whileHover="hover"
                  variants={socialIconVariants}
                  className="hover:text-white transition duration-300 rounded-full p-2 hover:bg-[#00356d] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Share Prateek Kumar's Portfolio"
                  role="listitem"
                  title="Share"
                >
                  <FaShare className="h-5 w-5" aria-hidden="true" />
                </motion.button>

                {/* Share Menu */}
                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute top-full right-0 mt-2 z-50"
                    >
                      <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-neutral-700 min-w-[200px]">
                        <div className="flex flex-col gap-2">

                          <motion.button
                            onClick={handleCopyLink}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors duration-200 text-neutral-300 hover:text-purple-400"
                            whileHover={{ x: 5 }}
                          >
                            <FaCopy className="w-4 h-4" />
                            <span className="text-sm">Copy Link</span>
                          </motion.button>
                        </div>

                        <button
                          onClick={() => setShowShareMenu(false)}
                          className="absolute top-2 right-2 text-neutral-400 hover:text-white"
                        >
                          ×
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-0 right-0 z-50"
          >
            <div className="container mx-auto flex justify-center">
              <div className="flex items-center gap-6 text-white bg-black/30 rounded-full px-6 pt-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    className="flex flex-col items-center justify-center hover:text-[#5e74be] transition duration-300 group"
                    
                  >
                    {React.cloneElement(item.icon, {
                      className:
                        "h-5 w-5 mb-1 group-hover:scale-110 transition",
                    })}
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
