import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css'; // Make sure this is imported!

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="footer"
  >
    <div className="footer-container">
      <div className="footer-section">
        <h3>Career Clues</h3>
        <p>Empowering your career journey with clarity and direction.</p>
      </div>

      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Follow Us</h4>
        <ul className="socials">
          <li><a href="#">🐦 Twitter</a></li>
          <li><a href="#">📘 Facebook</a></li>
          <li><a href="#">📸 Instagram</a></li>
          <li><a href="#">💼 LinkedIn</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: <a href="mailto:support@careerclues.com">support@careerclues.com</a></p>
        <p>Phone: +1 (800) 123-4567</p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Career Clues. All rights reserved.</p>
    </div>
  </motion.footer>
);

export default Footer;
