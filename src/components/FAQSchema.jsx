import { Helmet } from 'react-helmet-async';

const FAQSchema = () => {
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What technologies does Prateek Kumar specialize in?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Prateek Kumar specializes in the MERN stack (MongoDB, Express.js, React.js, Node.js), along with modern web technologies including JavaScript ES6+, Tailwind CSS, Git, and various development tools. He has expertise in both frontend and backend development."
                }
            },
            {
                "@type": "Question",
                "name": "What kind of projects has Prateek Kumar worked on?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Prateek has developed various full-stack web applications including e-commerce platforms, social media applications, real-time chat systems, and responsive portfolio websites. His projects demonstrate expertise in modern web development practices and user experience design."
                }
            },
            {
                "@type": "Question",
                "name": "Where is Prateek Kumar currently studying?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Prateek Kumar is currently pursuing his Bachelor of Technology in Engineering Science and Engineering at the Indian Institute of Technology (IIT) Jodhpur, one of India's premier technical institutions."
                }
            },
            {
                "@type": "Question",
                "name": "How can I contact Prateek Kumar for project collaboration?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can contact Prateek Kumar through his portfolio website's contact form, LinkedIn profile, or email. He is available for freelance projects, internship opportunities, and collaborative development work."
                }
            },
            {
                "@type": "Question",
                "name": "What makes Prateek Kumar's development approach unique?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Prateek combines strong academic foundation from IIT Jodhpur with practical development experience. He focuses on clean code, modern development practices, performance optimization, and creating user-centric applications with attention to both functionality and design."
                }
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(faqData)}
            </script>
        </Helmet>
    );
};

export default FAQSchema;