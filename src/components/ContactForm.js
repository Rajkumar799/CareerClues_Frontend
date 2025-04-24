import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <section className="home-page-contact-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="home-page-contact-container"
      >
        <h2>Get in Touch</h2>
        <p className="home-page-contact-subtitle">Have questions? We'd love to hear from you.</p>

        <motion.form
          className="home-page-contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="home-page-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'home-page-error' : ''}
              placeholder="Your name"
            />
            {errors.name && <span className="home-page-error-message">{errors.name}</span>}
          </div>

          <div className="home-page-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'home-page-error' : ''}
              placeholder="Your email"
            />
            {errors.email && <span className="home-page-error-message">{errors.email}</span>}
          </div>

          <div className="home-page-form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'home-page-error' : ''}
              placeholder="Your phone number"
            />
            {errors.phone && <span className="home-page-error-message">{errors.phone}</span>}
          </div>

          <div className="home-page-form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'home-page-error' : ''}
              placeholder="Your message"
              rows="5"
            />
            {errors.message && <span className="home-page-error-message">{errors.message}</span>}
          </div>

          <motion.button
            type="submit"
            className="home-page-submit-btn"
            disabled={status.loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status.loading ? (
              <span className="home-page-loading-spinner"></span>
            ) : (
              'Send Message'
            )}
          </motion.button>

          {status.success && (
            <motion.div
              className="home-page-status-message home-page-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Message sent successfully! We'll get back to you soon.
            </motion.div>
          )}

          {status.error && (
            <motion.div
              className="home-page-status-message home-page-error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {status.error}
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default ContactForm;