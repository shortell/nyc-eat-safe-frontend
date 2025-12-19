import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';
// import RestaurantCarousel from './RestaurantCarousel';

export default function CategoryPreview({ title, endpoint, restaurants }) {
  const [page, setPage] = React.useState(0);
  const href =
    '/category?' +
    new URLSearchParams({
      category_name: title,
      category_endpoint: endpoint,
    }).toString();

  const maxPages = 3;
  const itemsPerPage = 4;
  // Ensure we have a stable set of items for desktop, max 12
  const desktopRestaurants = restaurants.slice(0, maxPages * itemsPerPage);
  const currentItems = desktopRestaurants.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const nextPage = () => {
    if (page < maxPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <Link
          href={href}
          className="text-xs font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors shadow-sm border border-gray-200"
        >
          See all
        </Link>
      </div>

      {/* Desktop Carousel (Hidden on mobile) */}
      <div className="hidden md:flex flex-col w-full relative group">
        <div className="flex items-center w-full">
          {/* Left Arrow */}
          <button
            onClick={prevPage}
            disabled={page === 0}
            className={`mr-2 p-1 transition-all duration-200 focus:outline-none ${page === 0
              ? 'opacity-20 cursor-not-allowed text-gray-300'
              : 'text-gray-400 hover:text-gray-900 hover:scale-110'
              }`}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 16 6 L 10 12 L 16 18" />
            </svg>
          </button>

          {/* Grid Items */}
          <div className="grid grid-cols-4 gap-4 flex-1">
            {currentItems.map((restaurant) => (
              <Link
                key={restaurant.camis}
                href={`/restaurant/${restaurant.camis}`}
                className="w-full"
              >
                <div className="w-full h-full">
                  <RestaurantCard restaurant={restaurant} compact />
                </div>
              </Link>
            ))}
            {/* Fill empty slots if less than 4 items on last page to maintain layout */}
            {Array.from({ length: Math.max(0, 4 - currentItems.length) }).map(
              (_, i) => (
                <div key={`empty-${i}`} className="w-full" />
              )
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextPage}
            disabled={page === maxPages - 1}
            className={`ml-2 p-1 transition-all duration-200 focus:outline-none ${page === maxPages - 1
              ? 'opacity-20 cursor-not-allowed text-gray-300'
              : 'text-gray-400 hover:text-gray-900 hover:scale-110'
              }`}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 8 6 L 14 12 L 8 18" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center space-x-2 mt-1">
          {Array.from({ length: maxPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${page === index
                ? 'bg-gray-800 scale-110'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Scroll (Hidden on desktop) */}
      <div className="flex md:hidden overflow-x-auto gap-3 pb-2 px-1 snap-x scroll-pl-1 hide-scrollbar pt-1">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.camis}
            href={`/restaurant/${restaurant.camis}`}
            className="min-w-[288px] w-[288px] snap-start"
          >
            <div className="w-[320px] h-full">
              <RestaurantCard restaurant={restaurant} compact />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
