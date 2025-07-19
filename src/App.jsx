import { Suspense, useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { frame, cancelFrame } from "framer-motion";
import AnimatedCursor from "react-animated-cursor";

// Core Components
import Preloader from "./components/Preloader";
import ErrorFallback from "./components/ErrorFallback";
import LoadingSpinner from "./components/LoadingSpinner";

// SEO Components (Centralized)
import UnifiedSEO from "./components/UnifiedSEO";
import SimpleFAQSchema from "./components/SimpleFAQSchema";

// Performance & Service Worker
import PreloadHints from "./components/PreloadHints";
import PerformanceMonitor from "./components/PerformanceMonitor";
import SEOAnalytics from "./components/SEOAnalytics";

// Import all components directly to fix dynamic import issues
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import NotFound from "./components/NotFound";

const App = () => {
  // Check if the app has already been loaded once in this session
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('appLoaded');
  });
  const lenisRef = useRef(null);

  // Handle GitHub Pages routing
  useEffect(() => {
    // Check if this is a GitHub Pages redirect
    const query = window.location.search;
    if (query.slice(1).indexOf('/?/') === 0) {
      // Remove the redirect parameter and navigate to the intended path
      const route = query.slice(4).replace(/~and~/g, '&');
      window.history.replaceState(null, null, route);
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Mark the app as loaded for this session
    sessionStorage.setItem('appLoaded', 'true');
  };

  // Framer Motion integration with Lenis
  useEffect(() => {
    function update(data) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  if (isLoading) {
    return <Preloader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          {/* Global SEO Components */}
          <SimpleFAQSchema />

          {/* Performance & Service Worker */}
          <PreloadHints />
          <PerformanceMonitor />
          <SEOAnalytics />

          <Suspense fallback={<LoadingSpinner />}>
            <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-x-hidden text-slate-300 antialiased selection:bg-indigo-500/50 selection:text-rose-300 bg-slate-900"
              >
                {/* Background Component */}

                {/* Grid pattern overlay */}
                {/* <div className="absolute -z-10
                 inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div> */}
                {/* Main Content with Enhanced Layout */}
                <div className="container mx-auto px-4 md:px-8 space-y-16 max-w-6xl">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={
                      <>
                        <UnifiedSEO section="home" />
                        <Hero />
                      </>
                    } />
                    <Route path="/about" element={
                      <>
                        <UnifiedSEO section="about" />
                        <About />
                      </>
                    } />
                    <Route path="/skills" element={
                      <>
                        <UnifiedSEO section="skills" />
                        <Skills />
                      </>
                    } />
                    <Route path="/projects" element={
                      <>
                        <UnifiedSEO section="projects" />
                        <Projects />
                      </>
                    } />
                    <Route path="/contact" element={
                      <>
                        <UnifiedSEO section="contact" />
                        <Contact />
                      </>
                    } />
                    <Route path="/education" element={
                      <>
                        <UnifiedSEO section="education" />
                        <Education />
                      </>
                    } />

                    <Route path="*" element={
                      <>
                        <UnifiedSEO section="home" customTitle="Page Not Found - Prateek Kumar Portfolio" />
                        <NotFound />
                      </>
                    } />
                  </Routes>
                  <Footer />
                  {/* SEO-Enhanced Footer */}

                </div>
                {/* Optimized Animated Cursor */}
                <AnimatedCursor
                  innerSize={12}
                  outerSize={20}
                  color="99, 102, 241"
                  outerAlpha={0.4}
                  innerScale={1.5}
                  outerScale={3}
                  outerStyle={{
                    border: "2px solid rgba(255, 255, 250, 0.7)",
                    backgroundColor: "transparent",
                    mixBlendMode: "screen",
                  }}
                  innerStyle={{
                    backgroundColor: "#00346d",
                    mixBlendMode: "screen",
                  }}
                  clickables={[
                    "a",
                    'input[type="text"]',
                    'input[type="email"]',
                    'input[type="number"]',
                    'input[type="submit"]',
                    'input[type="image"]',
                    "label[for]",
                    "select",
                    "textarea",
                    "button",
                    ".link",
                  ]}
                />
              </motion.div>
            </ReactLenis>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
};

export default App;
