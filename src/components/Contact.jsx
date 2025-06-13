import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import UnifiedSEO from "./UnifiedSEO";
import emailjs from '@emailjs/browser'; 
import PropTypes from 'prop-types'; // Import PropTypes

const listVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-200px" });

  const [formStatus, setFormStatus] = useState({ success: false, error: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const formRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef(); // Ensure messageRef is defined

  const validateForm = () => {
    const errors = {};
    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const message = messageRef.current?.value.trim();

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!message) {
      errors.message = 'Message is required';
    } else if (message.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearFieldError = (fieldName) => {
    if (formErrors[fieldName]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setFormStatus({ success: false, error: false, message: '' });

    const serviceId = import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_REACT_APP_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      console.warn('EmailJS not configured. Environment variables missing.');
      setFormStatus({
        success: false,
        error: true,
        message: 'Email service is not configured. Please contact me directly at prateekkumar72007@gmail.com'
      });
      setLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, userId);
      setFormStatus({
        success: true,
        error: false,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      formRef.current.reset(); // Reset form using the form's reset method
      setFormErrors({}); // Clear any existing errors
    } catch (error) {
      console.error('Email sending failed:', error);
      setFormStatus({
        success: false,
        error: true,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const FormField = ({ id, label, type = "text", name, reference, placeholder, required, error, onChange, children }) => (
    <motion.div variants={itemVariant} className="formItem mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-200">{label} {required && '*'}</label>
      {type === "textarea" ? (
        <textarea
          id={id}
          ref={reference}
          name={name}
          rows={10}
          placeholder={placeholder}
          required={required}
          aria-required={required ? "true" : "false"}
          aria-describedby={`${id}-help`}
          onChange={() => onChange(name)}
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 bg-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:bg-slate-600 transition-colors duration-200 ${error ? 'border-red-500' : 'border-slate-500'}`}
        />
      ) : (
        <input
          id={id}
          ref={reference}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          aria-required={required ? "true" : "false"}
          aria-describedby={`${id}-help`}
          onChange={() => onChange(name)}
          className={`mt-1 block w-full border bg-slate-700 text-slate-100 rounded-md shadow-sm p-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:bg-slate-600 transition-colors duration-200 ${error ? 'border-red-500' : 'border-slate-500'}`}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-400" role="alert">{error}</p>
      )}
      <span id={`${id}-help`} className="sr-only">{children}</span>
    </motion.div>
  );

  // Add PropTypes validation for FormField
  FormField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    reference: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ]).isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };


  return (
    <motion.section
      ref={sectionRef} // Changed from 'ref' to 'sectionRef' to avoid conflict
      className="justify-between p-6"
      variants={listVariant}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      id="contact"
      aria-label="Contact Information and Form"
    >
      {/* SEO meta tags for Contact section */}
      <UnifiedSEO section="contact" />

      <div className="w-full p-4">
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-transparent text-slate-300 p-6 rounded-lg shadow-md"
          aria-label="Contact form to send message to Prateek Kumar"
        // Prevent browser validation, rely on custom
        >
          <header>
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="my-14 text-center text-4xl md:text-8xl text-indigo-400"
            >
              Let&apos;s Keep in Touch
            </motion.h2>
          </header>

          {formStatus.message && (
            <div
              className={`mb-4 p-3 rounded-md ${formStatus.success ? 'bg-green-500 bg-opacity-20 text-green-300' : 'bg-red-500 bg-opacity-20 text-red-300'}`}
              role="alert"
              aria-live="polite"
            >
              {formStatus.message}
            </div>
          )}

          {(!import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID ||
            !import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID ||
            !import.meta.env.VITE_REACT_APP_EMAILJS_USER_ID) && (
              <div className="mb-6 p-4 bg-yellow-500 bg-opacity-20 text-yellow-300 rounded-md border border-yellow-500 border-opacity-30">
                <p className="font-medium mb-2">📧 Alternative Contact Methods:</p>
                <p className="text-sm">
                  Email: <a href="mailto:prateekkumar72007@gmail.com" className="text-indigo-400 hover:text-indigo-300 underline">prateekkumar72007@gmail.com</a>
                </p>
                <p className="text-sm mt-1">
                  LinkedIn: <a href="https://www.linkedin.com/in/prateek-kumar-m07-d15-y2003/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">Connect with me</a>
                </p>
              </div>
            )}

          <FormField
            id="contact-name"
            label="Name"
            name="name"
            reference={nameRef}
            placeholder="Your Full Name"
            required
            error={formErrors.name}
            onChange={clearFieldError}
          >
            Enter your full name for contact purposes
          </FormField>

          <FormField
            id="contact-email"
            label="Email"
            type="email"
            name="email"
            reference={emailRef}
            placeholder="your.email@example.com"
            required
            error={formErrors.email}
            onChange={clearFieldError}
          >
            Enter a valid email address where I can respond to you
          </FormField>

          <FormField
            id="contact-message"
            label="Message"
            type="textarea"
            name="message"
            reference={messageRef} // Correctly assign messageRef here
            placeholder="Tell me about your project, question, or how we can work together..."
            required
            error={formErrors.message}
            onChange={clearFieldError}
          >
            Describe your project, question, or collaboration opportunity
          </FormField>

          <button
            type="submit"
            disabled={loading}
            className={`formButton w-full ${loading ? 'bg-opacity-85 cursor-not-allowed' : 'bg-[#00346d] hover:bg-opacity-85'} text-white font-semibold py-2 rounded-md transition duration-200 flex justify-center items-center`}
            aria-describedby="submit-help"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : 'Send Message'}
          </button>
          <span id="submit-help" className="sr-only">Submit the contact form to send your message to Prateek Kumar</span>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;
