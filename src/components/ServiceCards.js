import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './ServiceCards.css';

const ServiceCards = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([
          {
            title: 'Personal Development',
            description: 'Enhance your skills and confidence to navigate your career path effectively and achieve your goals',
            imageUrl: '/images/personal-dev.jpg'
          },
          {
            title: 'Technical Skills',
            description: 'Acquire essential technical skills that help industry demands and boost your employability in the job market',
            imageUrl: '/images/technical-skills.jpg'
          },
          {
            title: 'Career Advice',
            description: 'Receive personalized advice to align your academic knowledge with real-world career opportunities for success',
            imageUrl: '/images/career-advice.jpg'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="services-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <section className="services-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        Our Services
      </motion.h2>
      
      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <div className="card-image">
              <img src={`${process.env.REACT_APP_API_URL}${service.imageUrl}`} alt={service.title} />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServiceCards;