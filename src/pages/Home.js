import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import About from '../components/About';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import api from '../services/api';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, testimonialsRes] = await Promise.all([
          api.get('/gallery'),
          api.get('/testimonials')
        ]);
        setGalleryItems(galleryRes.data);
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Header />
      <section id="hero"><Hero /></section>
      <section id="services"><ServiceCards /></section>
      <section id="about"><About /></section>
      <section id="gallery"><Gallery items={galleryItems} /></section>
      <section id="contact"><ContactForm /></section>
      <section id="testimonials"><Testimonials testimonials={testimonials} /></section>
      <Footer />
    </div>
  );
};

export default Home;