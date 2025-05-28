import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const siteUrl = "https://prateek-protfolio-2025.vercel.app";
const title = "Prateek Kumar - Full Stack Developer";
const description =
  "Portfolio updates, projects, and insights from Prateek Kumar, a Full Stack Developer and Engineering Science student at IIT Jodhpur";
const language = "en-US";
const copyright = `© ${new Date().getFullYear()} Prateek Kumar. All rights reserved.`;

// Portfolio items that could be considered "content"
const portfolioItems = [
  {
    title: "Silque:Full Stack E-Commerce Platform",
    description:
      "A comprehensive e-commerce solution built with MERN stack featuring user authentication, payment integration, and admin dashboard.",
    link: `${siteUrl}/projects`,
    guid: "project-ecommerce-2024",
    pubDate: new Date("2024-03-15").toUTCString(),
    category: "Web Development",
  },
  {
    title: "Portfolio Website Enhancement",
    description:
      "Modern, responsive portfolio website with advanced SEO optimization, performance enhancements, and accessibility features.",
    link: `${siteUrl}`,
    guid: "portfolio-update-2024",
    pubDate: new Date().toUTCString(),
    category: "Web Development",
  },
];

function generateRSSFeed() {
  const rssItems = portfolioItems
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="false">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <category><![CDATA[${item.category}]]></category>
      <author>prateekkumar72007@gmail.com (Prateek Kumar)</author>
    </item>`
    )
    .join("");

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${title}]]></title>
    <description><![CDATA[${description}]]></description>
    <link>${siteUrl}</link>
    <language>${language}</language>
    <copyright><![CDATA[${copyright}]]></copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Custom RSS Generator for Portfolio</generator>
    <managingEditor>prateek@example.com (Prateek Kumar)</managingEditor>
    <webMaster>prateek@example.com (Prateek Kumar)</webMaster>
    <ttl>1440</ttl>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/logo.svg</url>
      <title><![CDATA[${title}]]></title>
      <link>${siteUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  // Write RSS feed to public directory
  const publicDir = path.join(__dirname, "..", "public");
  const rssPath = path.join(publicDir, "rss.xml");

  try {
    fs.writeFileSync(rssPath, rssContent, "utf8");
    console.log(`✅ RSS feed generated successfully at: ${rssPath}`);
    console.log(`📡 RSS feed URL: ${siteUrl}/rss.xml`);
  } catch (error) {
    console.error("❌ Error generating RSS feed:", error);
    process.exit(1);
  }
}

// Generate RSS feed
generateRSSFeed();

export { generateRSSFeed };
