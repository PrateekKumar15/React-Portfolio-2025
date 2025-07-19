import fs from "fs";
import path from "path";
import process from "node:process";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const baseUrl =
  process.env.VITE_REACT_APP_BASE_URL ||
  "https://prateek-portfolio-2025.vercel.app"; // Update with your actual domain
const currentDate = new Date().toISOString();

function generateSitemap() {
  const urls = [
    {
      loc: baseUrl,
      priority: "1.0",
      changefreq: "weekly",
      images: [
        {
          loc: baseUrl + "/assets/myprofile.png",
          caption: "Prateek Kumar - Full Stack Developer",
        },
      ],
    },
    {
      loc: baseUrl + "/about",
      priority: "0.8",
      changefreq: "monthly",
      images: [
        {
          loc: baseUrl + "/assets/about.png",
          caption:
            "About Prateek Kumar - Computer Science Student at IIT Jodhpur",
        },
      ],
    },
    {
      loc: baseUrl + "/skills",
      priority: "0.8",
      changefreq: "monthly",
      title: "Technical Skills - React, Node.js, MongoDB, JavaScript",
    },
    {
      loc: baseUrl + "/projects",
      priority: "0.9",
      changefreq: "weekly",
      title: "Portfolio Projects - MERN Stack Applications",
      images: [
        {
          loc: baseUrl + "/assets/projects/project1.png",
          caption: "Full Stack Web Application Project",
        },
        {
          loc: baseUrl + "/assets/projects/project2.png",
          caption: "React.js Frontend Project",
        },
        {
          loc: baseUrl + "/assets/projects/project3.png",
          caption: "Node.js Backend Project",
        },
        {
          loc: baseUrl + "/assets/projects/project4.png",
          caption: "MongoDB Database Project",
        },
      ],
    },
    {
      loc: baseUrl + "/experience",
      priority: "0.7",
      changefreq: "monthly",
      title: "Education - IIT Jodhpur Computer Science Engineering",
    },
    {
      loc: baseUrl + "/contact",
      priority: "0.6",
      changefreq: "monthly",
      title: "Contact Prateek Kumar - Full Stack Developer",
    },
  ];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((url) => {
    sitemap += "  <url>\n";
    sitemap += `    <loc>${url.loc}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${url.priority}</priority>\n`;
    sitemap += "  </url>\n";
  });

  sitemap += "</urlset>";
  return sitemap;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Important pages
Allow: /#about
Allow: /#skills
Allow: /#projects
Allow: /#experience
Allow: /#contact

# Block development files
Disallow: /src/
Disallow: /node_modules/
Disallow: /*.json$

# Allow important files
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /favicon.ico

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
}

function writeFiles() {
  const publicDir = path.join(process.cwd(), "public");

  const sitemapContent = generateSitemap();
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log("✅ Sitemap generated successfully");

  const robotsContent = generateRobotsTxt();
  const robotsPath = path.join(publicDir, "robots.txt");
  fs.writeFileSync(robotsPath, robotsContent);
  console.log("✅ Robots.txt generated successfully");
}

writeFiles();
