import { useRef } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../constants";
import { FaLaptopCode , FaGithub} from "react-icons/fa";

const Projects = () => {
  const projectRef = useRef(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 }, // Animate from below
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="pt-16"
      id="project"
      ref={projectRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="px-4">
        <motion.h2
          className="mb-8 text-center text-3xl font-medium lg:text-4xl"
          variants={headingVariants} // Heading animation
          whileInView="visible"
          initial="hidden"
        >
          Projects
        </motion.h2>
        <div className="flex flex-wrap justify-center">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              className="flex w-full flex-col p-4 md:w-1/2 lg:w-1/3"
              variants={cardVariants}
              whileInView="visible"
              initial="hidden"
            >
              <motion.div
                className="flex flex-grow flex-col overflow-hidden rounded-lg border border-purple-300/20"
                variants={hoverVariants}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-50 w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </a>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-medium lg:text-2xl bg-gradient-to-r from-blue-500 via-slate-300 to-cyan-300 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="mb-4 backdrop-blur-md">{project.description}</p>
                  <div className="mb-4">
                    <strong>Tech Stack:</strong>
                    <ul>
                      {project.technologies.map((tech, techIndex) => (
                        <li
                          key={techIndex}
                          className="mb-1 mr-2 inline-block rounded-full border-2 border-pink-500/30 px-3 py-1 text-sm font-semibold"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4  border-b-2  rounded -lg bg-gradient-to-r from-blue-500 via-slate-300 to-cyan-300 hover:bg-gradient-to-l text-transparent bg-clip-text
                     border-2 px-2"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgb(128, 90, 213)",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    View Project <FaGithub className="inline-block text-white" />
                  </motion.a>
                  {project.live && project.live.trim() !== "" && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 ml-2 border-b-2  rounded -lg bg-gradient-to-r from-blue-500 via-slate-300 to-cyan-300 hover:bg-gradient-to-l text-transparent bg-clip-text border-2 px-2 "
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgb(128, 90, 213)",
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      Live Demo <FaLaptopCode className="inline-block text-white" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
