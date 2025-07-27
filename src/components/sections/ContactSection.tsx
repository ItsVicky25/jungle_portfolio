import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Twitter, Linkedin, Github } from 'lucide-react';
import BirdHouse from '../features/BirdHouse';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [birdAnimation, setBirdAnimation] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setBirdAnimation(true);
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setBirdAnimation(false);
      }, 4000);
      
      // Reset form after delay
      if (formRef.current) {
        formRef.current.reset();
      }
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };
  
  const hasFilled = formData.name && formData.email && formData.message;
  
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-container relative min-h-screen py-20"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl mb-12 text-center text-green-800 dark:text-green-300"
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 jungle-card p-6 md:p-8"
          >
            <h3 className="text-2xl mb-6 text-green-800 dark:text-green-300">
              Send Me a Message
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="relative">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="john@example.com"
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Project Inquiry"
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Hello, I'm interested in working together..."
                  onChange={handleChange}
                />
              </div>
              
              <div className="relative">
                <motion.button
                  whileHover={{ scale: hasFilled && !isSubmitting ? 1.05 : 1 }}
                  whileTap={{ scale: hasFilled && !isSubmitting ? 0.95 : 1 }}
                  type="submit"
                  className={`wooden-btn px-8 py-3 flex items-center gap-2 ${
                    (isSubmitting || !hasFilled) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting || !hasFilled}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                {/* Flying bird animation */}
                {birdAnimation && (
                  <motion.div
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ 
                      x: [0, 50, 100, 200, 300], 
                      y: [0, -30, -50, -70, -100], 
                      opacity: [1, 1, 1, 0.7, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
                  >
                    <div className="w-12 h-12 relative flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M22 2L15 6.5M22 2L15 22M22 2L2 9L9 12L12 22L15 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="absolute inset-0 w-4 h-4 bg-green-100 rounded-full left-1 top-1/2 transform -translate-y-1/2 animate-pulse"></div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Success message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md text-center"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </form>
          </motion.div>
          
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <div className="jungle-card p-6">
              <h3 className="text-2xl mb-6 text-green-800 dark:text-green-300">
                Contact Information
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a href="mailto:hello@example.com" className="text-green-700 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                      hello@example.com
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a href="tel:+11234567890" className="text-green-700 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p>San Francisco, California</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="jungle-card p-6">
              <h3 className="text-2xl mb-6 text-green-800 dark:text-green-300">
                Social Links
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                  <span className="text-sm">Twitter</span>
                </a>
                
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <BirdHouse />
        
        {/* Footer */}
        <footer className="text-center mt-20 pt-8 border-t border-green-200 dark:border-green-800">
          <p>&copy; {new Date().getFullYear()} Your Name. All Rights Reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;