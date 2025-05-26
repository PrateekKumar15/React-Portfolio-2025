import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/myprofile.png";
import { motion } from "framer-motion";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

// New variant for fade-in-up animation
const fadeInUp = (delay) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: delay },
  },
});

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35 overflow-hidden">
      <div className="flex gap-x-36  flex-wrap">
        <div className="w-full lg:w-[55%]">
          <div className="flex flex-col items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="lg:pb-16 text6xl font-thin tracking-tight mt-10 lg:mt-16 text-4xl lg:text-8xl"
            >
              Prateek Kumar
            </motion.h1>
            <motion.span
              variants={fadeInUp(0.5)} // Changed to fadeInUp variant
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-blue-500 via-slate-500 to-cyan-200 bg-clip-text text-4xl tracking-tight text-transparent"
            >
              Full Stack Developer
            </motion.span>
            <motion.p
              variants={container(1)} // Kept original container variant
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl py-6 backdrop-blur-sm font-light tracking-tight"
            >
              {HERO_CONTENT}

            </motion.p>
            <motion.a
              variants={container(1)} // Kept original container variant for initial animation
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(56, 189, 248, 0.7)" }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }} // Applied for hover and can affect initial if not overridden by variant
              className="my-1 mx-3 flex items-center gap-2 font-light text-white bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 rounded-3xl text-md shadow-lg"
              href="/Prateek_Kumar_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </motion.a>
          </div>
        </div>
        <div className="w-fit flex justify-start lg:items-center lg:w-[30%]">
          <div className="flex lg:items-start  ">
            <motion.img
              variants={container(0)} // Kept original container variant for initial animation
              initial={{ x: 100, opacity: 0 }} // Initial animation specific to image
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }} // Transition for initial animation
              whileHover={{ scale: 1.03, rotate: 1 }}
              // Add a specific transition for hover if needed, otherwise it might use the one above or a default spring
              // transition={{ type: "spring", stiffness: 400, damping: 15 }} // Example for hover-specific transition
              src={profilePic}
              alt="Prateek"
              className=" lg:rounded-3xl object-cover h-80 lg:h-fit  shadow-lg  shadow-slate-900/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
