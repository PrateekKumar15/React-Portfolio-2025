import { EDUCATION } from "../constants";
import { motion } from "framer-motion";
import MetaTags from "./MetaTags";
const Experience = () => {
  return (
   
    <section className="border-b border-neutral-900 pb-4" id="education" aria-label="Education and Experience">
        <MetaTags section="education" />
      <header>
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="my-20 text-center text-4xl md:text-8xl"
        >
          Education
        </motion.h2>
      </header>
      <div role="list" aria-label="Education and experience timeline">
        {EDUCATION.map((experience, index) => {
          return (
            <article key={index} className="mb-8 backdrop-blur-sm rounded-lg flex flex-wrap lg:justify-center" role="listitem">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-1/4"
              >
                <time className="mb-2 text-sm text-aliceblue-500" dateTime={experience.year}>
                  {experience.year}
                </time>
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl lg:w-3/4"
              >
                <h3 className="mb-2 font-semibold">
                  {experience.role} -{" "}
                  <span className="text-sm text-purple-100">
                    {experience.company}
                  </span>
                </h3>
                <p className="mb-4 text-aliceblue-500">
                  {experience.description}
                </p>
                {experience.technologies.length > 0 && (
                  <ul className="flex flex-wrap" role="list" aria-label="Related technologies and skills">
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.li
                        key={techIndex}
                        className="mr-2 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        role="listitem"
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
   
  );
};

export default Experience;
