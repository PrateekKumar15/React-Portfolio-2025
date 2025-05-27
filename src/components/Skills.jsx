import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb, SiPrisma } from "react-icons/si";
import { FaNodeJs, FaGitAlt, FaGithub, FaAws, FaDatabase, FaGoogle, FaCode } from "react-icons/fa";
import { SiExpress, SiRedux, SiTypescript, SiPostman, SiVercel, SiNetlify, SiRender } from "react-icons/si";
import { SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiGo, SiMysql, SiPostgresql } from "react-icons/si";
import { SiJsonwebtokens, SiClerk } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { FaChartBar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MetaTags from "./MetaTags";


const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = {
    frontend: {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { Icon: SiHtml5, name: "HTML5", color: "text-orange-500", duration: 2.5, description: "Semantic markup and accessibility" },
        { Icon: SiCss3, name: "CSS3", color: "text-blue-500", duration: 3, description: "Modern CSS with Grid & Flexbox" },
        { Icon: SiTailwindcss, name: "Tailwind CSS", color: "text-cyan-400", duration: 2, description: "Utility-first CSS framework" },
        { Icon: SiJavascript, name: "JavaScript", color: "text-yellow-400", duration: 6, description: "ES6+ and modern JavaScript" },
        { Icon: SiTypescript, name: "TypeScript", color: "text-blue-400", duration: 4, description: "Type-safe JavaScript development" },
        { Icon: RiReactjsLine, name: "React.js", color: "text-cyan-400", duration: 3, description: "Component-based UI development" },
        { Icon: SiRedux, name: "Redux", color: "text-purple-500", duration: 3.5, description: "State management for React" },
        { Icon: TbBrandNextjs, name: "Next.js", color: "text-white", duration: 6, description: "Full-stack React framework" }
      ]
    },
    backend: {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { Icon: FaNodeJs, name: "Node.js", color: "text-green-500", duration: 2.5, description: "Server-side JavaScript runtime" },
        { Icon: SiExpress, name: "Express.js", color: "text-gray-300", duration: 5, description: "Fast Node.js web framework" },
        { Icon: SiGo, name: "Go", color: "text-[#29BEB0]", duration: 3, description: "Efficient systems programming" },
        { Icon: SiJsonwebtokens, name: "JWT Auth", color: "text-purple-400", duration: 3.5, description: "JSON Web Token authentication" },
        { Icon: SiClerk, name: "Clerk Auth", color: "text-blue-500", duration: 4, description: "User authentication & management" },
        { Icon: FaGoogle, name: "Google Auth", color: "text-red-500", duration: 3, description: "Google OAuth integration" }
      ]
    },
    database: {
      title: "Database & ORM",
      icon: "🗄️",
      skills: [
        { Icon: SiMongodb, name: "MongoDB", color: "text-green-500", duration: 4, description: "NoSQL document database" },
        { Icon: SiMysql, name: "MySQL", color: "text-blue-600", duration: 3.5, description: "Relational database management" },
        { Icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-400", duration: 4.5, description: "Advanced relational database" },
        { Icon: SiPrisma, name: "Prisma", color: "text-indigo-400", duration: 3, description: "Next-generation ORM" },
        { Icon: FaDatabase, name: "Neon", color: "text-green-400", duration: 2.5, description: "Serverless PostgreSQL" }
      ]
    },
    cloud: {
      title: "Cloud & Hosting",
      icon: "☁️",
      skills: [
        { Icon: SiVercel, name: "Vercel", color: "text-white", duration: 4, description: "Frontend deployment platform" },
        { Icon: SiNetlify, name: "Netlify", color: "text-teal-400", duration: 3.5, description: "JAMstack deployment platform" },
        { Icon: SiRender, name: "Render", color: "text-purple-400", duration: 3, description: "Cloud application platform" },
        { Icon: FaAws, name: "AWS", color: "text-orange-400", duration: 4.5, description: "Amazon Web Services" }
      ]
    },
    tools: {
      title: "Tools & Analytics",
      icon: "🛠️",
      skills: [
        { Icon: FaGitAlt, name: "Git", color: "text-orange-600", duration: 2, description: "Version control system" },
        { Icon: FaGithub, name: "GitHub", color: "text-white", duration: 3, description: "Code collaboration platform" },
        { Icon: SiPostman, name: "Postman", color: "text-orange-400", duration: 2.5, description: "API testing and development" },
        { Icon: FaChartBar, name: "Microsoft Clarity", color: "text-blue-500", duration: 2.5, description: "Web analytics and user insights" },
        { Icon: VscCode, name: "VS Code", color: "text-blue-400", duration: 3, description: "Code editor and IDE" },
        { Icon: FaCode, name: "Cursor", color: "text-purple-400", duration: 2.5, description: "AI-powered code editor" }
      ]
    }
  };

  const allSkills = Object.values(skillCategories).flatMap(category => 
    category.skills.map(skill => ({ ...skill, category: category.title.toLowerCase() }))
  );

  const filteredSkills = activeCategory === "all" ? allSkills : 
    skillCategories[activeCategory]?.skills || [];

  const categories = [
    { key: "all", label: "All Skills", icon: "💼" },
    { key: "frontend", label: "Frontend", icon: "🎨" },
    { key: "backend", label: "Backend", icon: "⚙️" },
    { key: "database", label: "Database & ORM", icon: "🗄️" },
    { key: "cloud", label: "Cloud & Hosting", icon: "☁️" },
    { key: "tools", label: "Tools & Analytics", icon: "🛠️" }
  ];

  return (
    <section className="border-b border-neutral-800 pb-24" id="skills" aria-label="Technical Skills">
      <MetaTags section="skills" />
      
      {/* Header */}
      <header className="text-center mb-16">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5 }}
          className="my-20 text-center text-4xl md:text-8xl font-bold text-white"
        >
          Technologies
        </motion.h2>
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-neutral-300 text-lg max-w-2xl mx-auto"
        >
          Here are the technologies and tools I work with to bring ideas to life
        </motion.p>
      </header>

      {/* Category Filter */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-6 py-3 rounded-full border-2 transition-all duration-300 flex items-center gap-2 ${
              activeCategory === key
                ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                : "border-neutral-600 text-neutral-400 hover:border-neutral-500 hover:text-neutral-300"
            }`}
          >
            <span>{icon}</span>
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredSkills.map(({ Icon, name, color, duration, description }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              onHoverStart={() => setHoveredSkill(name)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="group relative"
            >
              {/* Main Skill Card */}
              <motion.div
                variants={iconVariants(duration)}
                initial="initial"
                animate="animate"
                className="relative rounded-2xl border-2 border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-cyan-400/20 group-hover:shadow-xl group-hover:scale-105"
                role="listitem"
                aria-label={`${name} technology skill`}
                title={name}
              >
                <div className="flex flex-col items-center space-y-3">
                  <Icon className={`text-4xl ${color} transition-transform duration-300 group-hover:scale-110`} aria-hidden="true" />
                  <h3 className="text-white font-semibold text-sm text-center">{name}</h3>
                </div>

                {/* Hover Tooltip */}
                <AnimatePresence>
                  {hoveredSkill === name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-10 border border-neutral-700"
                    >
                      {description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-800"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Skills Summary */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {Object.entries(skillCategories).map(([key, category]) => (
            <div key={key} className="text-center">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="text-white font-semibold mb-1">{category.title}</h3>
              <p className="text-cyan-400 text-2xl font-bold">{category.skills.length}</p>
              <p className="text-neutral-400 text-sm">Skills</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
