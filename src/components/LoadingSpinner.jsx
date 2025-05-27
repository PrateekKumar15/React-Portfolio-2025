import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Loading Spinner Component with Optimized Animation
const LoadingSpinner = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900"
        >
            <div className="relative">
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="w-24 h-24 border-4 border-transparent border-t-indigo-600 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-indigo-400 font-bold text-xl">
                    Loading{dots}
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingSpinner;
