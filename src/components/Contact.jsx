import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

import emailjs from 'emailjs-com';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const [formStatus, setFormStatus] = useState({ success: false, error: false, message: '' });
  const [loading, setLoading] = useState(false);

  const formRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ success: false, error: false, message: '' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_REACT_APP_EMAILJS_USER_ID
      );

      setFormStatus({
        success: true,
        error: false,
        message: 'Message sent successfully!'
      });

      // Reset form fields
      nameRef.current.value = '';
      emailRef.current.value = '';
      messageRef.current.value = '';
    } catch (error) {
      console.error('Email sending failed:', error);
      setFormStatus({
        success: false,
        error: true,
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      className=" justify-between p-6"
      variants={listVariant}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
    >
      <div className="w-full p-4">
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-transparent text-slate-300 p-6 rounded-lg shadow-md"
        >
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="my-20 text-center text-4xl text-indigo-400"
          >
            Let's Keep in Touch
          </motion.h2>

          {formStatus.success && (
            <div className="mb-4 p-3 bg-green-500 bg-opacity-20 text-green-300 rounded-md">
              {formStatus.message}
            </div>
          )}

          {formStatus.error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-300 rounded-md">
              {formStatus.message}
            </div>
          )}

          <motion.div variants={itemVariant} className="formItem mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              ref={nameRef}
              name="name" // Important for EmailJS
              type="text"
              placeholder="Your Name"
              required
              className="mt-1 block w-full border bg-transparent border-slate-600 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:backdrop-blur-sm focus:ring-indigo-500"
            />
          </motion.div>
          <motion.div variants={itemVariant} className="formItem mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              ref={emailRef}
              name="email" // Important for EmailJS
              type="email"
              placeholder="Your Email"
              required
              className="mt-1 block w-full border border-slate-600 bg-transparent rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:backdrop-blur-sm focus:ring-indigo-500"
            />
          </motion.div>
          <motion.div variants={itemVariant} className="formItem mb-4">
            <label className="block text-sm font-medium">Message</label>
            <textarea
              ref={messageRef}
              name="message" // Important for EmailJS
              rows={10}
              placeholder="Write Your Message..."
              required
              className="mt-1 block w-full border border-slate-600 rounded-md shadow-sm p-2 bg-transparent text-slate-300 focus:outline-none focus:ring focus:backdrop-blur-sm focus:ring-indigo-500"
            ></textarea>
          </motion.div>
          <button
            type="submit"
            disabled={loading}
            className={`formButton w-full ${loading ? 'bg-opacity-85' : 'bg-[#00346d]'} text-white font-semibold py-2 rounded-md hover:bg-opacity-85 transition duration-200 flex justify-center items-center`}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </motion.form>
      </div>

      
    </motion.div>
  );
};

export default Contact;
