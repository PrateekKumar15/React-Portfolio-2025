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
    generateBreadcrumbSchema,
    generatePortfolioSchema,
    generateLocalBusinessSchema,
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
    const sectionData = SEO_SECTIONS[section] || SEO_SECTIONS.home;    // Final SEO values (custom overrides section defaults)
    const seoTitle = customTitle || sectionData.title;
    const seoDescription = customDescription || sectionData.description;
    const seoKeywords = customKeywords || sectionData.keywords; const seoImage = customImage || getAssetUrl(WEBSITE_CONFIG.assets.logo);
    // Generate proper URLs instead of hash-based for better SEO
    const seoUrl = customUrl || getFullUrl(section === 'home' ? '' : `/${section}`);    // Generate structured data
    const personSchema = generatePersonSchema();
    const websiteSchema = generateWebsiteSchema();
    const organizationSchema = generateOrganizationSchema();
    const breadcrumbSchema = generateBreadcrumbSchema(section);
    const portfolioSchema = generatePortfolioSchema();
    const localBusinessSchema = section === 'contact' ? generateLocalBusinessSchema() : null;

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
            <meta name="twitter:creator" content={WEBSITE_CONFIG.socialMedia.twitter} />            {/* ========================================== */}
            {/* ADDITIONAL META TAGS */}
            {/* ========================================== */}
            <meta name="theme-color" content="#1e293b" />
            <meta name="msapplication-TileColor" content="#1e293b" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content={`${PERSONAL_INFO.name} Portfolio`} />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="application-name" content={`${PERSONAL_INFO.name} Portfolio`} />

            {/* Enhanced SEO Meta Tags */}
            <meta name="format-detection" content="telephone=no" />
            <meta name="referrer" content="strict-origin-when-cross-origin" />
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            <meta httpEquiv="X-Frame-Options" content="DENY" />
            <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

            {/* Geographic and Localization */}
            <meta name="geo.region" content="IN-RJ" />
            <meta name="geo.placename" content="Jodhpur, Rajasthan" />
            <meta name="geo.position" content="26.2389;73.0243" />
            <meta name="ICBM" content="26.2389, 73.0243" />

            {/* Professional and Business */}
            <meta name="classification" content="Portfolio" />
            <meta name="category" content="Web Development, Software Engineering" />
            <meta name="coverage" content="Worldwide" />
            <meta name="target" content="Recruiters, Employers, Clients" />
            <meta name="subject" content="Full Stack Web Development Portfolio" />
            {/* ========================================== */}
            {/* CANONICAL URL & ALTERNATE LINKS */}
            {/* ========================================== */}
            <link rel="canonical" href={seoUrl} />
            <link rel="alternate" hrefLang="en" href={seoUrl} />            {/* ========================================== */}
            {/* FAVICON & ICONS */}
            {/* ========================================== */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" type="image/svg+xml" href={WEBSITE_CONFIG.assets.favicon} />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />

            {/* Apple Touch Icons */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

            {/* Web App Manifest */}
            <link rel="manifest" href="/site.webmanifest" />

            {/* Microsoft Tiles */}
            <meta name="msapplication-TileImage" content="/icon-192x192.png" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

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
            )}            {/* ========================================== */}
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

            {/* Breadcrumb Schema */}
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema, null, 0)}
            </script>

            {/* Portfolio Schema */}
            <script type="application/ld+json">
                {JSON.stringify(portfolioSchema, null, 0)}
            </script>

            {/* Local Business Schema (for contact page) */}
            {localBusinessSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(localBusinessSchema, null, 0)}
                </script>
            )}
        </Helmet>
    );
};

// ============================================
// PROP TYPES VALIDATION
// ============================================
UnifiedSEO.propTypes = {
    section: PropTypes.oneOf(['home', 'about', 'skills', 'projects', 'education', 'contact', 'blog']),
    customTitle: PropTypes.string,
    customDescription: PropTypes.string,
    customKeywords: PropTypes.string,
    customImage: PropTypes.string,
    customUrl: PropTypes.string
};

export default UnifiedSEO;
