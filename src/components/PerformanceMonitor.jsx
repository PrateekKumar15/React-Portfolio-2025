import { useEffect } from 'react';

const PerformanceMonitor = () => {
    useEffect(() => {
        // Web Vitals monitoring
        const measureWebVitals = () => {
            if ('performance' in window && 'PerformanceObserver' in window) {
                // Monitor Largest Contentful Paint (LCP)
                const lcpObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.startTime < performance.now()) {
                            // Log LCP for debugging (remove in production)
                            console.log('LCP:', entry.startTime);
                        }
                    });
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                // Monitor First Input Delay (FID)
                const fidObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        // Log FID for debugging (remove in production)
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });

                // Monitor Cumulative Layout Shift (CLS)
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            // Log CLS for debugging (remove in production)
                            console.log('CLS:', clsValue);
                        }
                    });
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });

                // Monitor resource loading
                const resourceObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.transferSize > 100000) { // Log large resources
                            console.log(`Large resource loaded: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`);
                        }
                    });
                });
                resourceObserver.observe({ entryTypes: ['resource'] });

                // Cleanup observers
                return () => {
                    lcpObserver.disconnect();
                    fidObserver.disconnect();
                    clsObserver.disconnect();
                    resourceObserver.disconnect();
                };
            }
        };

        // Only run in development
        if (import.meta.env.DEV) {
            const cleanup = measureWebVitals();
            return cleanup;
        }
    }, []);

    // Preload critical resources
    useEffect(() => {
        const preloadCriticalResources = () => {
            // Preload hero image
            const heroImageLink = document.createElement('link');
            heroImageLink.rel = 'preload';
            heroImageLink.as = 'image';
            heroImageLink.href = '/src/assets/myprofile.png';
            document.head.appendChild(heroImageLink);

            // Preload font
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.as = 'font';
            fontLink.type = 'font/woff2';
            fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2';
            fontLink.crossOrigin = 'anonymous';
            document.head.appendChild(fontLink);
        };

        preloadCriticalResources();
    }, []);

    return null; // This component doesn't render anything
};

export default PerformanceMonitor;
