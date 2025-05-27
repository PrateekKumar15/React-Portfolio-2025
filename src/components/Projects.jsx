import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { PROJECTS } from "../constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import LazyImage from "./LazyImage";
import MetaTags from "./MetaTags";

const Projects = () => {
  return (
    
    <section className="border-b border-neutral-900 pb-4" id="projects" aria-label="Portfolio Projects">
      {/* Header Section */}
        <MetaTags section="projects" />
      <header>
        <motion.h2
          className="my-20 text-center text-4xl md:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My <span className="text-neutral-500">Projects</span>
        </motion.h2>
      </header>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 space-y-16" role="list" aria-label="List of portfolio projects">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={`project_${i}`}
            project={project}
            index={i}
          />
        ))}
      </div>
    </section>
    
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <section
      className="relative w-full max-w-6xl mx-auto h-auto bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8"
      role="listitem"
      aria-label={`Project: ${project.title}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col lg:flex-row h-full gap-8"
      >
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
          <motion.h3
            className="text-3xl lg:text-4xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-neutral-300 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-3 text-lg">Technologies Used</h4>
            <ul className="flex flex-wrap gap-2" role="list" aria-label="Technologies used in this project">
              {project.technologies.map((tech, techIndex) => (
                <motion.li
                  key={techIndex}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1 text-sm font-medium text-neutral-300"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgb(55, 65, 81)",
                    color: "rgb(255, 255, 255)"
                  }}
                  transition={{ duration: 0.2 }}
                  role="listitem"
                >
                  {tech}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg px-6 py-3 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <FaGithub className="text-lg" aria-hidden="true" />
              View Code
            </motion.a>
            {project.live && project.live.trim() !== "" && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-neutral-600 text-neutral-300 font-semibold rounded-lg px-6 py-3 hover:border-neutral-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View live demo of ${project.title}`}
              >
                <FaExternalLinkAlt className="text-lg" aria-hidden="true" />
                Live Demo
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-96 rounded-xl overflow-hidden border border-neutral-800">
          <LazyImage
            src={project.image}
            alt={`Screenshot of ${project.title} project showing the user interface and functionality`}
            className="w-full h-full object-cover"
            width="600"
            height="400"
            placeholder="/placeholder.svg"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-transparent to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

// PropTypes validation for ProjectCard component
ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    live: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Projects;
