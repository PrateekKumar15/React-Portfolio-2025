import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    };

    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | Prateek Kumar Portfolio</title>
                <meta
                    name="description"
                    content="Sorry, the page you're looking for doesn't exist. Return to Prateek Kumar's portfolio homepage to explore projects and skills."
                />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="canonical" href="https://react-portfolio-2025.onrender.com/404" />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                <motion.div
                    className="text-center max-w-2xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* 404 Animation */}
                    <motion.div
                        className="relative mb-8"
                        animate={floatingAnimation}
                    >
                        <motion.h1
                            className="text-9xl md:text-[12rem] font-bold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text mb-4"
                            variants={itemVariants}
                        >
                            404
                        </motion.h1>

                        {/* Glitch effect overlay */}
                        <motion.div
                            className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-red-500 opacity-20"
                            animate={{
                                x: [0, -2, 2, 0],
                                y: [0, 1, -1, 0],
                            }}
                            transition={{
                                duration: 0.3,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                        >
                            404
                        </motion.div>
                    </motion.div>

                    {/* Error Icon */}
                    <motion.div
                        className="flex justify-center mb-6"
                        variants={itemVariants}
                    >
                        <FaExclamationTriangle className="text-6xl text-yellow-500" />
                    </motion.div>

                    {/* Error Message */}
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                        variants={itemVariants}
                    >
                        Oops! Page Not Found
                    </motion.h2>

                    <motion.p
                        className="text-lg text-slate-300 mb-8 leading-relaxed"
                        variants={itemVariants}
                    >
                        The page you&apos;re looking for seems to have vanished into the digital void.
                        <br />
                        Don&apos;t worry, it happens to the best of us!
                    </motion.p>

                    {/* Navigation Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        variants={itemVariants}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            <FaHome className="mr-2" />
                            Back to Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center px-6 py-3 border-2 border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-slate-500 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            <FaArrowLeft className="mr-2" />
                            Go Back
                        </button>
                    </motion.div>

                    {/* Helpful Links */}
                    <motion.div
                        className="mt-12 p-6 bg-slate-800/50 rounded-xl border border-slate-700"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-semibold text-white mb-4">
                            Popular Pages
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            {[  
                                { name: 'About', href: '/about' },
                                { name: 'Projects', href: '/projects' },
                                { name: 'Skills', href: '/skills' },
                                { name: 'Contact', href: '/contact' },
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 underline-offset-4 hover:underline"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Fun fact */}
                    <motion.p
                        className="mt-8 text-sm text-slate-500 italic"
                        variants={itemVariants}
                    >
                        Fun fact: HTTP 404 errors were named after room 404 at CERN,
                        where the original web servers were located!
                    </motion.p>
                </motion.div>

                {/* Background decoration */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-indigo-500 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default NotFound;
