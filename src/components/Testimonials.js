import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Testimonials.css';

const Testimonials = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollInterval = useRef(null);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const startAutoScroll = useCallback(() => {
    if (scrollInterval.current) return;
    scrollInterval.current = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
      }
    }, 5000); // Change slide every 5 seconds
  }, [isHovered, totalPages]);

  const stopAutoScroll = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll; // Cleanup on unmount or dependency change
  }, [startAutoScroll]); // Only depend on startAutoScroll

  const handleMouseEnter = () => {
    setIsHovered(true);
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startAutoScroll();
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={index < (rating || 0) ? 'star-filled' : 'star-empty'}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <div
          className="testimonials-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="testimonials-grid">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="testimonial-card"
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)')}
              >
                <div className="card-content">
                  <div className="testimonial-header">
                    <div className="testimonial-image">
                      <img
                        src={testimonial.imageUrl || 'https://via.placeholder.com/150'}
                        alt={testimonial.name}
                        className="image"
                      />
                    </div>
                    <div className="testimonial-info">
                      <h3 className="testimonial-name">{testimonial.name}</h3>
                      <p className="testimonial-position">
                        {testimonial.position || 'Professional'}
                      </p>
                    </div>
                  </div>
                  <div className="testimonial-stars">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonial-quote">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="navigation-dots">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={currentIndex === index ? 'dot active' : 'dot'}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
            }
            className="nav-arrow prev"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arrow-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % totalPages)}
            className="nav-arrow next"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arrow-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;