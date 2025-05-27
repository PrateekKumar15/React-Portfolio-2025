import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const MetaTags = ({
    section,
    title,
    description,
    keywords,
    image,
    url = window.location.href,
    type = "website"
}) => {
    const sectionMeta = {
        about: {
            title: "Prateek Kumar - Full Stack Developer | IIT Jodhpur Student",
            description: "Learn about Prateek Kumar, a passionate Full Stack MERN Developer and Computer Science student at IIT Jodhpur. Discover his journey, skills, and experience in web development.",
            keywords: "About Prateek Kumar, Full Stack Developer Background, IIT Jodhpur Student, MERN Developer Profile, Web Developer Biography, Computer Science Student",
        },
        skills: {
            title: "Technical Skills - React, Node.js, MongoDB | Prateek Kumar Portfolio",
            description: "Explore Prateek Kumar's technical expertise in MERN stack development including React.js, Node.js, MongoDB, Express.js, JavaScript, HTML, CSS, and modern web technologies.",
            keywords: "React Developer Skills, Node.js Developer, MongoDB Expert, Express.js, JavaScript Developer, HTML CSS Skills, MERN Stack Technologies, Frontend Backend Skills",
        },
        projects: {
            title: "Web Development Projects | Prateek Kumar - MERN Stack Portfolio",
            description: "View Prateek Kumar's impressive web development projects including e-commerce platforms, news applications, AI tools, and innovative web solutions built with MERN stack.",
            keywords: "React Projects, Node.js Projects, MERN Stack Projects, Web Development Portfolio, E-commerce Website, News App, AI Projects, GitHub Projects",
        },
        education: {
            title: "Education & Experience - IIT Jodhpur | Prateek Kumar Portfolio",
            description: "Discover Prateek Kumar's educational background at IIT Jodhpur, leadership experience at Varchas'24, and academic achievements in Computer Science and Technology.",
            keywords: "IIT Jodhpur Student, Computer Science Education, BTech Student, Varchas Finance Manager, Academic Experience, Leadership Skills",
        },
        contact: {
            title: "Contact Prateek Kumar - Full Stack Developer | Hire MERN Developer",
            description: "Get in touch with Prateek Kumar for web development projects, internships, or collaboration opportunities. Available for MERN stack development and freelance work.",
            keywords: "Contact Full Stack Developer, Hire MERN Developer, Web Development Services, Freelance Developer, React Developer for Hire, Contact Prateek Kumar",
        }
    };

    const meta = section ? sectionMeta[section] : {
        title: title || "Prateek Kumar - Full Stack MERN Developer Portfolio",
        description: description || "Full Stack MERN Developer & Computer Science Student at IIT Jodhpur",
        keywords: keywords || "Full Stack Developer, MERN Stack, React Developer, Node.js"
    };

    const fullTitle = meta.title;
    const fullDescription = meta.description;
    const fullKeywords = meta.keywords;
    const canonicalUrl = section ? `${url.split('#')[0]}#${section}` : url;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={fullDescription} />
            <meta name="keywords" content={fullKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={fullDescription} />
            {image && <meta property="twitter:image" content={image} />}

            {/* Canonical URL */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Section-specific meta tags */}
            {section === 'projects' && (
                <>
                    <meta name="robots" content="index, follow, max-image-preview:large" />
                    <meta property="og:type" content="website" />
                </>
            )}

            {section === 'contact' && (
                <>
                    <meta name="robots" content="index, follow" />
                    <meta property="business:contact_data:email" content="prateek.kumar@example.com" />
                    <meta property="business:contact_data:website" content="https://react-portfolio-2025.onrender.com/" />
                </>
            )}
        </Helmet>
    );
};

MetaTags.propTypes = {
    section: PropTypes.oneOf(['about', 'skills', 'projects', 'experience', 'contact']),
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
};

export default MetaTags;
