import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/myprofile.png";
import { motion } from "framer-motion";
import LazyImage from "./LazyImage";
import CircularText from './CircularText';

const container = (delay) => ({
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const Hero = () => {
  return (
    <section className="border-b  pb-4 lg:mb-35 overflow-hidden" aria-label="Hero section">
      
      <div className="flex gap-x-36  flex-wrap">
        <div className="w-full lg:w-[55%]">
          <div className="flex flex-col items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="lg:pb-6 text6xl font-thin tracking-tight sm:mt-10 lg:mt-4 text-4xl lg:text-8xl">
              Prateek Kumar
            </motion.h1>
            <motion.h2
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-blue-500 via-slate-500 to-cyan-200 bg-clip-text text-4xl tracking-tight text-transparent"
            >
              Full Stack Developer
            </motion.h2>
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl py-6 backdrop-blur-sm font-light tracking-tight"
              role="text"
              aria-label="Professional summary"
            >
              {HERO_CONTENT}

            </motion.p>
            <motion.div
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-1 font-light text-white px-3  py-2 rounded-3xl text-md   shadow-lg hover:bg-opacity-75 transition-transform duration-300"
              role="link"
              aria-label="Download Prateek Kumar's resume"
            >
              <a
                href="/Prateek_Kumar_Resume.pdf"
                download="Prateek_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume of Prateek Kumar, Full Stack Developer"
                className="block"
              >
                <CircularText
                  text=" My Resume * Prateek Kumar *"
                  onHover="goBonkers"
                  spinDuration={10}
                  className="custom-class"
                />
              </a>
            </motion.div>
          </div>
        </div>
        <div className="w-fit flex justify-start lg:items-center lg:w-[30%]">
          <div className="flex lg:items-start  ">
            <motion.div
              variants={container(0)}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="lg:rounded-3xl overflow-hidden shadow-lg shadow-slate-900/50"
            >
              <LazyImage
                src={profilePic}
                alt="Prateek Kumar - Full Stack MERN Developer and Computer Science Student at IIT Jodhpur"
                className="object-cover h-80 lg:h-fit"
                width="320"
                height="400"
                loading="eager"
                placeholder="/placeholder.svg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
