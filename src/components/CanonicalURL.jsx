import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const CanonicalURL = () => {
    const location = useLocation();
    const baseUrl = 'https://prateek-protfolio-2025.vercel.app'; // Replace with your actual domain

    // Generate canonical URL based on current route
    const getCanonicalUrl = () => {
        const path = location.pathname;

        // Handle specific routes
        switch (path) {
            case '/':
                return baseUrl;
            case '/about':
                return `${baseUrl}/about`;
            case '/skills':
                return `${baseUrl}/skills`;
            case '/projects':
                return `${baseUrl}/projects`;
            case '/education':
                return `${baseUrl}/education`;
            case '/contact':
                return `${baseUrl}/contact`;
            default:
                return `${baseUrl}${path}`;
        }
    };

    return (
        <Helmet>
            <link rel="canonical" href={getCanonicalUrl()} />
        </Helmet>
    );
};

export default CanonicalURL;
