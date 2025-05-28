import aboutImg from "../assets/about.png";
import { ABOUT_TEXT } from "../constants";
import { motion } from "framer-motion";
import LazyImage from "./LazyImage";
import UnifiedSEO from "./UnifiedSEO";

const About = () => {
  return (
    <section className="border-b  border-neutral-900 pb-4" id="about" aria-label="About Prateek Kumar">
      {/* SEO meta tags for About section */}
      <UnifiedSEO section="about" />
      <header>
        <h2 className="my-20 backdrop-blur-sm text-center text-4xl md:text-8xl">
          About
          <span className="text-neutral-500">Me</span>
        </h2>
      </header>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 lg:p-8">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <LazyImage
              className="rounded-2xl"
              src={aboutImg}
              alt="Prateek Kumar working on web development projects - About section"
              width="400"
              height="500"
              placeholder="/placeholder.svg"
            />
          </motion.div>
        </div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <div className="flex justify-center lg:justify-start">
            <p
              className="my-8 maxw-xl backdrop-blur-sm py-6"
              role="text"
              aria-label="About Prateek Kumar description"
            >
              {ABOUT_TEXT}
            </p>
          </div>
        </motion.div>
      </div>
    </section>

  );
};

export default About;
