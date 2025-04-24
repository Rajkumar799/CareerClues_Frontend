import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Gallery.css';

const Gallery = ({ items = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const itemsPerPage = 3;
  const totalItems = items.length;
  const cardWidthRef = useRef(0);

  const startAutoScroll = useCallback(() => {
    if (!scrollRef.current || animationRef.current) return;

    const scrollContainer = scrollRef.current;
    const calculateCardWidth = () => scrollContainer.querySelector('.home-page-gallery-card')?.offsetWidth || 300;
    cardWidthRef.current = calculateCardWidth();
    let scrollPosition = 0;
    let lastTime = null;

    const scroll = (currentTime) => {
      if (!isHovered && scrollRef.current) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        if (deltaTime > 0) { // Adjust speed by increasing this value (e.g., 50ms for slower scroll)
          scrollPosition += 0.5; // Reduced scrollStep for slower movement
          if (scrollPosition >= cardWidthRef.current * itemsPerPage) {
            scrollPosition = 0; // Reset to start for continuous scrolling
            scrollContainer.scrollLeft = 0; // Instant reset
            scrollPosition = 0.5; // Start moving again
          }
          scrollContainer.scrollLeft = scrollPosition;
          lastTime = currentTime;
        }
        animationRef.current = requestAnimationFrame(scroll);
      }
    };

    animationRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered, totalItems]);

  const stopAutoScroll = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const cleanup = startAutoScroll();
      return () => {
        stopAutoScroll();
        if (cleanup) cleanup();
      };
    }
  }, [startAutoScroll, stopAutoScroll]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (scrollRef.current) {
      startAutoScroll();
    }
  };

  return (
    <section className="home-page-gallery-section">
      <div className="home-page-gallery-container">
        <h2 className="home-page-gallery-title">Our Gallery</h2>
        <div
          className="home-page-gallery-wrapper"
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="home-page-gallery-grid">
            {items.map((item) => (
              <div
                key={item._id}
                className="home-page-gallery-card"
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)')}
              >
                <div className="home-page-card-media">
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="home-page-media-content"
                      controls
                      poster={item.thumbnailUrl || ''}
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="home-page-media-content"
                    />
                  )}
                  <div className="home-page-card-overlay">
                    <h3 className="home-page-card-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;