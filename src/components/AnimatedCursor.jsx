import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const AnimatedCursor = () => {
  const cursorRef = useRef(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Use spring animation for smooth movement
  const cursorX = useSpring(0, { damping: 25, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 250 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      if (e.target.closest('button, a, input, textarea, select, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      // Clean up event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Hide cursor on mobile devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Main cursor circle */}
      <motion.div
        className="relative"
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
          opacity: 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer circle */}
        <motion.div
          className="absolute"
          style={{
            width: "40px",
            height: "40px",
            border: "2px solid #F28D9F",
            borderRadius: "50%",
            opacity: 0.8,
          }}
          animate={{
            scale: isHovering ? 1.2 : 1,
            opacity: isHovering ? 0.5 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Crosshair lines with improved positioning */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Horizontal lines */}
          <motion.div
            className="absolute bg-[#F28D9F]"
            style={{
              width: isHovering ? "12px" : "20px",
              height: "2px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            animate={{
              width: isHovering ? "12px" : "20px",
              opacity: isClicking ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Vertical lines */}
          <motion.div
            className="absolute bg-[#F28D9F]"
            style={{
              width: "2px",
              height: isHovering ? "12px" : "20px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            animate={{
              height: isHovering ? "12px" : "20px",
              opacity: isClicking ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCursor;
