import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';

const RestaurantCarousel = ({ restaurants }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update current index on scroll
  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const scrollLeft = carousel.scrollLeft;
    const slideWidth = carousel.firstChild.offsetWidth + 16; // card width + gap
    const index = Math.round(scrollLeft / slideWidth);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to a specific slide
  const goToSlide = (idx) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const slideWidth = carousel.firstChild.offsetWidth + 16;
    carousel.scrollTo({ left: idx * slideWidth, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 py-4"
      >
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.camis}
            className="flex-none snap-center w-72 md:w-80 lg:w-96"
          >
            <Link href={`/restaurant/${restaurant.camis}`}>  
              <RestaurantCard restaurant={restaurant} />
            </Link>
          </div>
        ))}
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center space-x-2 mt-2">
        {restaurants.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === idx ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantCarousel;
