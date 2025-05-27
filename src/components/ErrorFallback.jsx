import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full text-center shadow-2xl"
            >
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-indigo-500 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-indigo-400 mb-2">
                        Unexpected Error
                    </h2>
                </div>
                <pre className="text-sm text-slate-300 bg-slate-900 p-4 rounded-lg mb-6 max-h-40 overflow-auto">
                    {error?.message || String(error) || 'An unexpected error occurred'}
                </pre>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetErrorBoundary}
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-all duration-300"
                >
                    Reload Application
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

// PropTypes for ErrorFallback
ErrorFallback.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.instanceOf(Error)
    ]),
    resetErrorBoundary: PropTypes.func.isRequired
};

export default ErrorFallback;
