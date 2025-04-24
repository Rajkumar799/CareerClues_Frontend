import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { motion } from 'framer-motion';
import './Header.css';
import CareerClues_logo from '../assests/CareerClues_logo-02.png';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = (
    <>
      <ScrollLink to="hero" smooth duration={500} offset={-70} spy hashSpy className="home-page-nav-link" activeClass="home-page-active" onClick={() => setIsMobileMenuOpen(false)}>Home</ScrollLink>
      <ScrollLink to="services" smooth duration={500} offset={-70} spy hashSpy className="home-page-nav-link" activeClass="home-page-active" onClick={() => setIsMobileMenuOpen(false)}>Services</ScrollLink>
      <ScrollLink to="about" smooth duration={500} offset={-70} spy hashSpy className="home-page-nav-link" activeClass="home-page-active" onClick={() => setIsMobileMenuOpen(false)}>About</ScrollLink>
      <ScrollLink to="gallery" smooth duration={500} offset={-70} spy hashSpy className="home-page-nav-link" activeClass="home-page-active" onClick={() => setIsMobileMenuOpen(false)}>Gallery</ScrollLink>
      <ScrollLink to="contact" smooth duration={500} offset={-70} spy hashSpy className="home-page-nav-link" activeClass="home-page-active" onClick={() => setIsMobileMenuOpen(false)}>Contact</ScrollLink>
      <ScrollLink to="testimonials" smooth duration={500} offset={-70} spy hashSpy className="home-page-nav-link" activeClass="home-page-active" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</ScrollLink>
    </>
  );

  return (
    <>
      {/* Mini Top Bar */}
      <div className="mini-header-top-bar">
        {/* <div className="mini-header-left">
          <span>📞1233333 | 3333333333 | 333333333</span>
        </div> */}
        <div className="mini-header-right">
  <a href="https://www.facebook.com/profile.php?id=61574350258263" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook-f"></i>
  </a>
  <a href="https://www.instagram.com/careerclues?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://www.linkedin.com/in/manikandanrajendran21/" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin-in"></i>
  </a>
  <a href="https://youtube.com/@manikandanrajendran141?si=VTJ-vXjwWsSZbmN1" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-youtube"></i>
  </a>
</div>

      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="home-page-header"
      >
        <motion.div
          className="home-page-logo"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
        >
          <img src={CareerClues_logo} width={70} alt='' />
          Career Clues
        </motion.div>

        {isMobile && (
          <button
            className={`home-page-mobile-menu-toggle ${isMobileMenuOpen ? 'home-page-open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="home-page-hamburger"></span>
          </button>
        )}

        <motion.nav
          className={`home-page-nav-menu home-page-mobile ${isMobileMenuOpen ? 'home-page-open' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks}
        </motion.nav>

        <nav className="home-page-nav-menu home-page-large-screen">
          {navLinks}
        </nav>
      </motion.header>
    </>
  );
};

export default Header;
