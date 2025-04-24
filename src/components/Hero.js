import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import carrer_clues from '../assests/carrer_clues.png'

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-container" ref={heroRef}>
      <div className="hero-content">
      <img src={carrer_clues} width={300} alt='' />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Empowering Students, Professionals, and Dreamers to Achieve Career Success
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          Transform your career journey with expert guidance and personalized support
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-buttons"
        >
          {/* <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button> */}
        </motion.div>

        <div className="hero-stats">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="stat-item"
          >
            <h3>1000+</h3>
            <p>Students Guided</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="stat-item"
          >
            <h3>95%</h3>
            <p>Success Rate</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="stat-item"
          >
            {/* <h3>50+</h3>
            <p>Expert Mentors</p> */}
          </motion.div>
        </div>
      </div>
      
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        <div className="animated-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;