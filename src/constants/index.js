import project1 from "../assets/projects/project1.png";
import project2 from "../assets/projects/project2.png";
import project3 from "../assets/projects/project3.png";
import project4 from "../assets/projects/project4.png";

export const HERO_CONTENT = `I'm Prateek Kumar, a web developer and designer currently pursuing a Bachelor of Technology at the Indian Institute of Technology, Jodhpur. With a solid foundation in programming languages and frameworks such as HTML, CSS, JavaScript, React, Tailwind CSS, Express and Node. I am passionate about crafting responsive and user-friendly websites.

I am eager to connect with fellow developers and designers to explore innovative ideas and contribute to impactful projects. Thank you for visiting my portfolio, and I look forward to the opportunity to collaborate!`;

export const ABOUT_TEXT = `Hi, I’m a dedicated MERN stack developer with a passion for building dynamic and user-friendly web applications. My journey in web development has been driven by a love for problem-solving and creating seamless digital experiences.

In addition to my technical skills, I’ve taken on leadership roles that have shaped my ability to manage teams and deliver results. As the Finance Manager and Lead of the Web Development team for Varchas’24 FC, I successfully managed finances and led a team of 10 talented individuals to create and maintain the event’s web presence. This experience honed my organizational and teamwork skills, which I bring to every project I undertake.

I’m always excited to collaborate with fellow developers and designers to bring innovative ideas to life. Thanks for visiting my portfolio—let’s connect and build something incredible together!`;

export const EDUCATION = [
  {
    year: "2022 - Current",
    role: "Bachelor of Technology",
    company: "Indian Institute of Technology, Jodhpur",
    description: `As a student at the prestigious Indian Institute of Technology, Jodhpur, I am pursuing a Bachelor of Technology degree. Through rigorous coursework in Data Structures and Algorithms, Introduction to Machine Learning, and Internet of Things, I am honing my skills in web development and design.`,
    technologies: [],
  },
  {
    year: "01/2025 - 03/2025",
    role: "Frontend Developer",
    company: "IITian Vibes",
    description: `As a Frontend Developer at IITian Vibes, I spearheaded the complete redesign of the frontend interface, enhancing user experience and modernizing the platform's visual appeal. This role involved implementing responsive design principles, optimizing performance, and creating intuitive user interfaces that significantly improved user engagement and satisfaction.`,
    technologies: ["React", "Redux-Toolkit", "Tailwind", "MUI", "Responsive Design","Google Auth"],
  },
  {
    year: "08/2024 - 10/2024",
    role: "Extracurricular Involvement",
    company: "Varchas'24 FC",
    description: `As the Finance Manager and Lead of the Web Development team for Varchas'24 FC, I successfully managed finances and led a team of 10 talented individuals to create and maintain the event's web presence. This experience honed my organizational and teamwork skills, which I bring to every project I undertake.`,
    technologies: ["Leadership","Communication","Finance","Management"]
    },
  {
    year: "2021 - 2022",
    role: "12th Grade",
    company: "New Rajasthan Public School",
    description: `I completed my Class XII studies at New Rajasthan Public School, where I excelled academically with a percentage of 87.00%. This strong foundation prepared me for the challenges of higher education and laid the groundwork for my journey in web development.`,
    technologies: [],
  },
  {
    year: "2018 - 2019",
    role: "10th Grade",
    company: "Godavribai Ramdev Podar Public School",
    description: `During my secondary education at Godavribai Ramdev Podar Public School, I achieved a remarkable percentage of 91.00% in Class X. This achievement not only showcased my academic prowess but also instilled in me the discipline and dedication necessary for success in the field of web development.`,
    technologies: [],
  },
];

export const PROJECTS = [
  {
    title: "Silque",
    image: project1,
    description:
      "Buy-It -Built a scalable e-commerce platform with Node.js, React, and MongoDB, featuring JWT auth, Redis caching, RESTful APIs, role-based access, and Cloudinary for media storage..",
    technologies: [
      "React",
      "Tailwind CSS",
      "MongoDB",
      "Node.js",
      "Express",
      "Redis",
      "Cloudinary",
    ],
    link: "https://github.com/PrateekKumar15/Silque",
    live: "https://silque-qzmo.onrender.com/",
  },
  {
    title: "News App",
    image: project2,
    description:
      "NewsApp - Built a dynamic news app with ReactJS and News API, offering categorized news by topic/country, real-time updates, and a responsive, user-friendly interface with filtering options.",
    technologies: ["React", "Bootstrap", "Restful API", "CSS"],
    link: "https://github.com/PrateekKumar15/NewsApp",
    live: "",
  },
  {
    title: "Landmine Detection System",
    image: project3,
    description:
      "Built a landmine detection system using Raspberry Pi and an IR thermal sensor, enabling real-time monitoring and data analysis via a network-connected interface for improved safety and efficiency.",
    technologies: ["Python", "Raspberry Pi", "IR thermal sensor"],
    link: "https://github.com/PrateekKumar15/Landmine-Detection-System",
    live: "",
  },
  {
    title: "Bruce",
    image: project4,
    description:
      "AI-powered PPT builder with Gemini AI, Next.js, and a template marketplace, featuring Google auth and prompt-based slide generation.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Prisma",
      "Clerk",
      "Gemini Api",
    ],
    link: "https://github.com/PrateekKumar15/bruce/",
    live: "https://bruceai.vercel.app/",
  },
];
