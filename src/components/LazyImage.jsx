import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const LazyImage = ({
    src,
    alt,
    className = '',
    width,
    height,
    loading = 'lazy',
    onLoad,
    onError,
    placeholder = '/placeholder.svg',
    fallback,
    ...props
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(placeholder);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setImageSrc(src);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [src]);

    const handleLoad = (e) => {
        setImageLoaded(true);
        onLoad?.(e);
    };

    const handleError = (e) => {
        setImageError(true);
        if (fallback) {
            setImageSrc(fallback);
        }
        onError?.(e);
    };

    return (
        <motion.div
            ref={imgRef}
            className={`relative overflow-hidden ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Loading skeleton */}
            {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
            )}

            {/* Main image */}
            <motion.img
                src={imageSrc}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
                className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                initial={{ scale: 1.1 }}
                animate={{ scale: imageLoaded ? 1 : 1.1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                {...props}
            />

            {/* Error state */}
            {imageError && !fallback && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-400">
                    <div className="text-center">
                        <svg
                            className="w-12 h-12 mx-auto mb-2 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-sm">Image unavailable</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    loading: PropTypes.oneOf(['eager', 'lazy']),
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    placeholder: PropTypes.string,
    fallback: PropTypes.string,
};

export default LazyImage;
