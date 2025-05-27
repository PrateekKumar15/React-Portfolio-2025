import { Helmet } from 'react-helmet-async';

const PersonStructuredData = () => {
    const personData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Prateek Kumar",
        "jobTitle": "Full Stack MERN Developer",
        "description": "Full Stack MERN Developer and Computer Science student at IIT Jodhpur specializing in React.js, Node.js, MongoDB, and modern web technologies.", "url": "https://react-portfolio-2025.onrender.com",
        "image": "https://react-portfolio-2025.onrender.com/assets/myprofile.png",
        "sameAs": [
            "https://linkedin.com/in/prateek-kumar",
            "https://github.com/prateek-kumar",
            "https://twitter.com/prateek_kumar"
        ],
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Indian Institute of Technology Jodhpur",
            "url": "https://iitj.ac.in"
        },
        "knowsAbout": [
            "JavaScript",
            "React.js",
            "Node.js",
            "MongoDB",
            "Express.js",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
            "Next.js",
            "Go Programming",
            "Full Stack Development",
            "Web Development",
            "MERN Stack"
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Full Stack Developer",
            "occupationLocation": {
                "@type": "Place",
                "name": "India"
            },
            "skills": "React.js, Node.js, MongoDB, Express.js, JavaScript, HTML, CSS, Tailwind CSS, Next.js, Go"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8302244250",
            "contactType": "professional",
            "availableLanguage": ["English", "Hindi"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressRegion": "Rajasthan"
        },
        "seeks": {
            "@type": "Demand",
            "name": "Full Stack Developer Position",
            "description": "Seeking opportunities in full stack web development, particularly with MERN stack technologies"
        }
    };

    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://react-portfolio-2025.onrender.com/#organization",
        "name": "Prateek Kumar - Full Stack Developer",
        "url": "https://react-portfolio-2025.onrender.com",
        "logo": "https://react-portfolio-2025.onrender.com/logo.svg",
        "founder": {
            "@type": "Person",
            "name": "Prateek Kumar"
        },
        "description": "Professional portfolio showcasing full stack web development projects and skills in MERN stack technologies.",
        "knowsAbout": ["Web Development", "Full Stack Development", "MERN Stack", "React.js", "Node.js"],
        "areaServed": "Worldwide",
        "serviceType": "Web Development Services"
    };

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://react-portfolio-2025.onrender.com/#website",
        "url": "https://react-portfolio-2025.onrender.com",
        "name": "Prateek Kumar - Full Stack MERN Developer Portfolio",
        "description": "Professional portfolio of Prateek Kumar, Full Stack MERN Developer and Computer Science student at IIT Jodhpur",
        "publisher": {
            "@id": "https://react-portfolio-2025.onrender.com/#organization"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://react-portfolio-2025.onrender.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US",
        "copyrightYear": "2025",
        "copyrightHolder": {
            "@type": "Person",
            "name": "Prateek Kumar"
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(personData)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(organizationData)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteData)}
            </script>
        </Helmet>
    );
};

export default PersonStructuredData;
