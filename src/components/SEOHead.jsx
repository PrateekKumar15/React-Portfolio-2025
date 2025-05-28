import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEOHead = ({
    title = "Prateek Kumar - Full Stack MERN Developer | React & Node.js Portfolio",
    description = "Full Stack MERN Developer & Computer Science Student at IIT Jodhpur. Specialized in React, Node.js, MongoDB, Express. View my projects including e-commerce platforms, news apps, and AI-powered tools.",
    keywords = "Prateek Kumar, Full Stack Developer, MERN Stack Developer, React Developer, Node.js Developer, Web Developer Portfolio, JavaScript Developer, Frontend Developer, Backend Developer, IIT Jodhpur, Web Development, React Projects, Portfolio Website, MongoDB, Express.js, Software Engineer",
    image = "https://prateek-protfolio-2025.vercel.app/logo.svg",
    url = "https://prateek-protfolio-2025.vercel.app",
    type = "website",
    twitterHandle = "@prateek_kumar_15"
}) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Prateek Kumar",
        "jobTitle": "Full Stack Developer",
        "url": url,
        "sameAs": [
            "https://www.linkedin.com/in/prateek-kumar-m07-d15-y2003",
            "https://github.com/PrateekKumar15",
            "https://www.instagram.com/prateek_kumar_15"
        ],
        "image": image,
        "description": description,
        "StudentOf": {
            "@type": "CollegeOrUniversity",
            "name": "Indian Institute of Technology, Jodhpur"
        },
        "knowsAbout": [
            "React.js",
            "Node.js",
            "MongoDB",
            "Express.js",
            "JavaScript",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "MERN Stack",
            "Web Development",
            "Full Stack Development",
            "Frontend Development",
            "Backend Development"
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Full Stack Developer",
            "occupationLocation": {
                "@type": "Country",
                "name": "India"
            },
            "skills": "React.js, Node.js, MongoDB, Express.js, JavaScript, HTML, CSS, Tailwind CSS"
        }
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Prateek Kumar Portfolio" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
            <meta property="twitter:creator" content={twitterHandle} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content="Prateek Kumar" />
            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* RSS Feed */}
            <link rel="alternate" type="application/rss+xml" title="Prateek Kumar - Portfolio Updates" href={`${url}/rss.xml`} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}</script>
        </Helmet>
    );
};

SEOHead.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    twitterHandle: PropTypes.string
};

export default SEOHead;
