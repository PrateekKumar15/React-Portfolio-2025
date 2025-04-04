import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/myprofile.png";
import { motion} from "framer-motion";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
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
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-blue-500 via-slate-500 to-cyan-200 bg-clip-text text-4xl tracking-tight text-transparent"
            >
              Full Stack Developer
            </motion.span>
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl py-6 backdrop-blur-sm font-light tracking-tight"
            >
              {HERO_CONTENT}
              
            </motion.p>
            <motion.a
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-1 font-light text-white  bg-[#00346d] px-3  py-2 rounded-3xl text-md   shadow-lg hover:bg-opacity-75 transition-transform duration-300"
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </motion.a>
          </div>
        </div>
        <div className="w-fit flex justify-start lg:items-center lg:w-[30%]">
          <div className="flex lg:items-start  ">
            <motion.img
              variants={container(0)}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
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
