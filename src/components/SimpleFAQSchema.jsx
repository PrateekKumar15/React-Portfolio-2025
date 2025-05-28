/**
 * FAQ Structured Data Component
 * This component adds FAQ schema markup for better search engine understanding
 * 
 * @author Prateek Kumar
 * @description FAQ schema for common questions about Prateek Kumar's portfolio and services
 */

import { Helmet } from 'react-helmet-async';
import { PERSONAL_INFO, TECHNICAL_SKILLS } from '../config/seoConfig';

const FAQSchema = () => {
    // FAQ data with common questions about the portfolio and services
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What technologies does Prateek Kumar specialize in?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${PERSONAL_INFO.name} specializes in MERN stack development including ${TECHNICAL_SKILLS.slice(0, 8).join(', ')}. He focuses on modern web development technologies and best practices.`
                }
            },
            {
                "@type": "Question",
                "name": "What is Prateek Kumar's educational background?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${PERSONAL_INFO.name} is currently pursuing ${PERSONAL_INFO.education.degree} at ${PERSONAL_INFO.education.institution}, one of India's premier technical institutes.`
                }
            },
            {
                "@type": "Question",
                "name": "What types of web development projects does Prateek work on?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Prateek works on various web development projects including e-commerce platforms, news applications, AI-powered tools, and custom web solutions using MERN stack technologies."
                }
            },
            {
                "@type": "Question",
                "name": "Is Prateek Kumar available for freelance work or internships?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Prateek Kumar is available for both freelance web development projects and internship opportunities. You can contact him through his portfolio website for collaboration."
                }
            },
            {
                "@type": "Question",
                "name": "What makes Prateek Kumar stand out as a full stack developer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${PERSONAL_INFO.name} combines strong academic foundation from ${PERSONAL_INFO.education.institution} with practical development experience. He focuses on clean code, modern development practices, performance optimization, and creating user-centric applications.`
                }
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(faqData, null, 0)}
            </script>
        </Helmet>
    );
};

export default FAQSchema;
