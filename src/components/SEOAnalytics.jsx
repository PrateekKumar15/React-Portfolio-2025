import { useEffect } from 'react';

const SEOAnalytics = () => {
    useEffect(() => {
        // SEO Performance Tracking (No External Analytics)
        const trackPerformanceMetrics = () => {
            // Log performance metrics to console for development
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;

                console.log('📊 Performance Metrics:', {
                    loadTime: `${loadTime}ms`,
                    domContentLoadedTime: `${domContentLoadedTime}ms`,
                    page: window.location.pathname
                });
            }
        };        // Track Core Web Vitals (Local Logging Only)
        const trackWebVitals = async () => {
            try {
                // Try different import syntax for web-vitals
                const webVitalsModule = await import('web-vitals');

                // Handle both default and named exports
                const getCLS = webVitalsModule.getCLS || webVitalsModule.default?.getCLS;
                const getFID = webVitalsModule.getFID || webVitalsModule.default?.getFID;
                const getFCP = webVitalsModule.getFCP || webVitalsModule.default?.getFCP;
                const getLCP = webVitalsModule.getLCP || webVitalsModule.default?.getLCP;
                const getTTFB = webVitalsModule.getTTFB || webVitalsModule.default?.getTTFB;

                function logMetric(metric) {
                    // Log to console for development (no external analytics)
                    console.log(`🚀 ${metric.name}: ${metric.value}`, {
                        id: metric.id,
                        value: metric.value,
                        rating: metric.rating
                    });
                }

                // Only call functions if they exist
                if (getCLS) getCLS(logMetric);
                if (getFID) getFID(logMetric);
                if (getFCP) getFCP(logMetric);
                if (getLCP) getLCP(logMetric);
                if (getTTFB) getTTFB(logMetric);
            } catch (error) {
                console.warn('Web Vitals library not available:', error);
            }
        };

        // Track SEO-related events (Local Logging Only)
        const trackSEOEvents = () => {
            // Track external link clicks
            document.addEventListener('click', (event) => {
                const link = event.target.closest('a');
                if (link && link.hostname !== window.location.hostname) {
                    console.log('🔗 External link clicked:', link.href);
                }
            });

            // Track social media shares
            document.addEventListener('click', (event) => {
                const shareButton = event.target.closest('[data-share]');
                if (shareButton) {
                    const platform = shareButton.dataset.share;
                    console.log('📱 Share button clicked:', platform);
                }
            });

            // Track form submissions
            document.addEventListener('submit', (event) => {
                const form = event.target;
                if (form.tagName === 'FORM') {
                    console.log('📝 Form submitted:', form.action || 'contact form');
                }
            });

            // Track scroll depth
            let maxScroll = 0;
            const trackScrollDepth = () => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );

                if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                    maxScroll = scrollPercent;
                    console.log(`📜 Scroll depth: ${scrollPercent}%`);
                }
            };

            window.addEventListener('scroll', trackScrollDepth, { passive: true });
        };

        // Initialize performance tracking
        trackPerformanceMetrics();
        trackWebVitals();
        trackSEOEvents();

        // Track page visibility for engagement metrics
        let visibilityStart = Date.now();

        const handleVisibilityChange = () => {
            if (document.hidden) {
                const timeSpent = Date.now() - visibilityStart;
                if (timeSpent > 1000) {
                    console.log(`⏱️ Page view time: ${Math.round(timeSpent / 1000)}s on ${window.location.pathname}`);
                }
            } else {
                visibilityStart = Date.now();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default SEOAnalytics;
