/**
 * Unified SEO Component
 * This component handles all SEO meta tags, structured data, and social media optimization
 * 
 * @author Prateek Kumar
 * @description Centralized SEO management for the portfolio website
 */

import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import {
    PERSONAL_INFO,
    WEBSITE_CONFIG,
    SEO_SECTIONS,
    generatePersonSchema,
    generateWebsiteSchema,
    generateOrganizationSchema,
    getFullUrl,
    getAssetUrl
} from '../config/seoConfig';

const UnifiedSEO = ({
    section = 'home',
    customTitle,
    customDescription,
    customKeywords,
    customImage,
    customUrl
}) => {
    // Get section-specific SEO data or use custom values
    const sectionData = SEO_SECTIONS[section] || SEO_SECTIONS.home;

    // Final SEO values (custom overrides section defaults)
    const seoTitle = customTitle || sectionData.title;
    const seoDescription = customDescription || sectionData.description;
    const seoKeywords = customKeywords || sectionData.keywords;
    const seoImage = customImage || getAssetUrl(WEBSITE_CONFIG.assets.logo);
    const seoUrl = customUrl || getFullUrl(section === 'home' ? '' : `#${section}`);
    // Generate structured data
    const personSchema = generatePersonSchema();
    const websiteSchema = generateWebsiteSchema();
    const organizationSchema = generateOrganizationSchema();

    return (
        <Helmet>
            {/* ========================================== */}
            {/* PRIMARY META TAGS */}
            {/* ========================================== */}
            <html lang="en" />
            <title>{seoTitle}</title>
            <meta name="title" content={seoTitle} />
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={seoKeywords} />
            <meta name="author" content={PERSONAL_INFO.name} />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="distribution" content="web" />
            <meta name="web_author" content={PERSONAL_INFO.name} />
            <meta name="rating" content="general" />

            {/* ========================================== */}
            {/* OPEN GRAPH / FACEBOOK META TAGS */}
            {/* ========================================== */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={`${PERSONAL_INFO.name} Portfolio`} />
            <meta property="og:locale" content="en_US" />

            {/* ========================================== */}
            {/* TWITTER CARD META TAGS */}
            {/* ========================================== */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={seoUrl} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />
            <meta name="twitter:creator" content={WEBSITE_CONFIG.socialMedia.twitter} />

            {/* ========================================== */}
            {/* ADDITIONAL META TAGS */}
            {/* ========================================== */}
            <meta name="theme-color" content="#1e293b" />
            <meta name="msapplication-TileColor" content="#1e293b" />
            {/* ========================================== */}
            {/* CANONICAL URL & ALTERNATE LINKS */}
            {/* ========================================== */}
            <link rel="canonical" href={seoUrl} />
            <link rel="alternate" hrefLang="en" href={seoUrl} />

            {/* ========================================== */}
            {/* FAVICON & ICONS */}
            {/* ========================================== */}
            <link rel="icon" type="image/svg+xml" href={WEBSITE_CONFIG.assets.favicon} />

            {/* ========================================== */}
            {/* PERFORMANCE OPTIMIZATION */}
            {/* ========================================== */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//api.emailjs.com" />

            {/* ========================================== */}
            {/* RSS FEED */}
            {/* ========================================== */}
            <link
                rel="alternate"
                type="application/rss+xml"
                title={`${PERSONAL_INFO.name} - Portfolio Updates`}
                href={`${WEBSITE_CONFIG.baseUrl}/rss.xml`}
            />

            {/* ========================================== */}
            {/* SECTION-SPECIFIC META TAGS */}
            {/* ========================================== */}
            {section === 'projects' && (
                <>
                    <meta name="robots" content="index, follow, max-image-preview:large" />
                    <meta property="og:type" content="website" />
                </>
            )}

            {section === 'contact' && (
                <>
                    <meta name="robots" content="index, follow" />
                    <meta property="business:contact_data:email" content={PERSONAL_INFO.email} />
                    <meta property="business:contact_data:website" content={WEBSITE_CONFIG.baseUrl} />
                </>
            )}

            {/* ========================================== */}
            {/* JSON-LD STRUCTURED DATA */}
            {/* ========================================== */}

            {/* Person Schema */}
            <script type="application/ld+json">
                {JSON.stringify(personSchema, null, 0)}
            </script>

            {/* Website Schema */}
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema, null, 0)}
            </script>

            {/* Organization Schema */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema, null, 0)}
            </script>
        </Helmet>
    );
};

// ============================================
// PROP TYPES VALIDATION
// ============================================
UnifiedSEO.propTypes = {
    section: PropTypes.oneOf(['home', 'about', 'skills', 'projects', 'education', 'contact']),
    customTitle: PropTypes.string,
    customDescription: PropTypes.string,
    customKeywords: PropTypes.string,
    customImage: PropTypes.string,
    customUrl: PropTypes.string
};

export default UnifiedSEO;
