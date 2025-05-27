import  { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadComplete();
          }, 1500); // Give time for final animation before completing
          return 100;
        }
        // Accelerate progress as we go
        const increment = Math.floor(Math.random() * 3) + (prevProgress > 80 ? 5 : 1);
        return Math.min(prevProgress + increment, 100);
      });
    }, 80);

    // Update loading text
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const texts = ["Initializing", "Loading Assets", "Preparing UI", "Almost Ready"];
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 z-50"
    >
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        {/* Atom Loader - inspired by uiverse.io */}
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0">
            {/* Electron Orbits */}
            {[1, 2, 3].map((orbit) => (
              <motion.div
                key={orbit}
                className="absolute inset-0 border-2 border-transparent rounded-full"
                style={{
                  borderTopColor: `rgba(99, 102, 241, ${0.2 * orbit})`,
                  borderRightColor: `rgba(99, 102, 241, ${0.1 * orbit})`,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3 - orbit * 0.5,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            ))}

            {/* Electrons */}
            {[1, 2, 3].map((electron) => (
              <motion.div
                key={`e-${electron}`}
                className="absolute w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3 - electron * 0.5,
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{
                  left: "50%",
                  top: electron === 1 ? "0%" : electron === 2 ? "15%" : "30%",
                  marginLeft: -6,
                  transformOrigin: `0 ${16 * electron}px`
                }}
              />
            ))}

            {/* Nucleus */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-full -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-indigo-300 font-medium text-lg mb-6"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {loadingText}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2">
          <motion.div
            className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 background-animate"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <p className="text-sm text-slate-400">{progress}% Completed</p>
      </div>
    </motion.div>
  );
};

export default Preloader;
