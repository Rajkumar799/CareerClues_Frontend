import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const [content, setContent] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/content`)
      .then(res => {
        const aboutData = res.data.find(c => c.sectionId === 'about') || {};
        setContent(aboutData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="about-section"
      id="about"
    >
      <div className="about-container">
        <div className="about-text">
          <h2>{content.title || 'About Career Clues'}</h2>
          <p>{content.content || 'We empower students and professionals with career guidance to achieve their dreams and goals with clarity and confidence.'}</p>
          {/* <button className="learn-button">Learn More</button> */}
        </div>
        {content.imageUrl && (
          <div className="about-image">
            <img src={`${process.env.REACT_APP_API_URL}${content.imageUrl}`} alt="About" />
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default About;
