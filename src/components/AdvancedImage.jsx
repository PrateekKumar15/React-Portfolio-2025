import  { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AdvancedImage = ({
    src,
    alt,
    className = '',
    width,
    height,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority = false,
    loading = 'lazy',
    onLoad,
    onError
}) => {
    const [currentSrc, setCurrentSrc] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    // Generate WebP and fallback sources
    const generateSources = (originalSrc) => {
        if (!originalSrc) return { webp: '', fallback: originalSrc };

        const ext = originalSrc.split('.').pop().toLowerCase();
        const basePath = originalSrc.replace(`.${ext}`, '');

        return {
            webp: `${basePath}.webp`,
            avif: `${basePath}.avif`,
            fallback: originalSrc
        };
    };

    const sources = generateSources(src);

    useEffect(() => {
        if (!src) return;

        // Test WebP support
        const testWebP = () => {
            return new Promise((resolve) => {
                const webP = new Image();
                webP.onload = webP.onerror = () => resolve(webP.height === 2);
                webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            });
        };

        // Test AVIF support
        const testAVIF = () => {
            return new Promise((resolve) => {
                const avif = new Image();
                avif.onload = avif.onerror = () => resolve(avif.height === 2);
                avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
            });
        };

        const loadOptimalImage = async () => {
            try {
                const [supportsWebP, supportsAVIF] = await Promise.all([
                    testWebP(),
                    testAVIF()
                ]);

                if (supportsAVIF && sources.avif) {
                    // Test if AVIF version exists
                    const avifTest = new Image();
                    avifTest.onload = () => setCurrentSrc(sources.avif);
                    avifTest.onerror = () => {
                        if (supportsWebP && sources.webp) {
                            const webpTest = new Image();
                            webpTest.onload = () => setCurrentSrc(sources.webp);
                            webpTest.onerror = () => setCurrentSrc(sources.fallback);
                            webpTest.src = sources.webp;
                        } else {
                            setCurrentSrc(sources.fallback);
                        }
                    };
                    avifTest.src = sources.avif;
                } else if (supportsWebP && sources.webp) {
                    // Test if WebP version exists
                    const webpTest = new Image();
                    webpTest.onload = () => setCurrentSrc(sources.webp);
                    webpTest.onerror = () => setCurrentSrc(sources.fallback);
                    webpTest.src = sources.webp;
                } else {
                    setCurrentSrc(sources.fallback);
                }
            } catch (error) {
                console.warn('Error testing image format support:', error);
                setCurrentSrc(sources.fallback);
            }
        };

        loadOptimalImage();
    }, [src, sources.webp, sources.avif, sources.fallback]);

    const handleLoad = (e) => {
        setIsLoaded(true);
        if (onLoad) onLoad(e);
    };

    const handleError = (e) => {
        setHasError(true);
        // Fallback to original source if optimized version fails
        if (currentSrc !== sources.fallback) {
            setCurrentSrc(sources.fallback);
            setHasError(false);
        }
        if (onError) onError(e);
    };

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!imgRef.current || loading !== 'lazy' || priority) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = currentSrc;
                        observer.unobserve(img);
                    }
                });
            },
            { rootMargin: '50px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [currentSrc, loading, priority]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading placeholder */}
            {!isLoaded && !hasError && (
                <div
                    className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center"
                    style={{ width, height }}
                >
                    <svg
                        className="w-8 h-8 text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                </div>
            )}

            {/* Error fallback */}
            {hasError && (
                <div
                    className="absolute inset-0 bg-slate-800 flex items-center justify-center border-2 border-dashed border-slate-600"
                    style={{ width, height }}
                >
                    <span className="text-slate-400 text-sm">Image unavailable</span>
                </div>
            )}

            {/* Main image */}
            <img
                ref={imgRef}
                src={priority || loading === 'eager' ? currentSrc : undefined}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
                className={`
          transition-opacity duration-300 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'hidden' : 'block'}
        `}
                style={{
                    maxWidth: '100%',
                    height: 'auto'
                }}
            />
        </div>
    );
};

AdvancedImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sizes: PropTypes.string,
    priority: PropTypes.bool,
    loading: PropTypes.oneOf(['lazy', 'eager']),
    onLoad: PropTypes.func,
    onError: PropTypes.func
};

export default AdvancedImage;
