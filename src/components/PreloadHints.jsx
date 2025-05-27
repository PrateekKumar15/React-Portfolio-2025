import { Helmet } from 'react-helmet-async';

const PreloadHints = () => {
    return (
        <Helmet>            {/* Preload critical fonts */}
            <link
                rel="preload"
                href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />

            {/* Preload critical images */}
            <link
                rel="preload"
                href="/assets/myprofile.png"
                as="image"
                type="image/png"
            />

            {/* Preload hero background image */}
            <link
                rel="preload"
                href="/assets/about.png"
                as="image"
                type="image/png"
            />

            {/* Prefetch other pages for faster navigation */}
            <link rel="prefetch" href="/about" />
            <link rel="prefetch" href="/skills" />
            <link rel="prefetch" href="/projects" />
            <link rel="prefetch" href="/experience" />
            <link rel="prefetch" href="/contact" />

            {/* DNS prefetch for external resources */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
            <link rel="dns-prefetch" href="//api.emailjs.com" />

            {/* Preconnect to critical third-party domains */}
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link rel="preconnect" href="https://api.emailjs.com" />

            {/* Critical CSS inline (if needed) */}
            <style type="text/css">{`
        /* Critical CSS for above-the-fold content */
        .critical-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #0f172a;
          color: #e2e8f0;
        }
        
        /* Prevent layout shift */
        .hero-container {
          min-height: 100vh;
          contain: layout style paint;
        }
        
        .nav-container {
          contain: layout style;
        }
      `}</style>

            {/* Resource hints for better performance */}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

            {/* Performance optimization meta tags */}
            <meta httpEquiv="x-dns-prefetch-control" content="on" />
            <meta name="referrer" content="strict-origin-when-cross-origin" />
        </Helmet>
    );
};

export default PreloadHints;
