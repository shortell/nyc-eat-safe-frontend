import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';
// import RestaurantCarousel from './RestaurantCarousel';

export default function CategoryPreview({ title, endpoint, restaurants }) {
  const href =
    '/category?' +
    new URLSearchParams({
      category_name: title,
      category_endpoint: endpoint,
    }).toString();

  return (
    <div className="w-full flex flex-col space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
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

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-3 pb-6 px-1 snap-x scroll-pl-1 hide-scrollbar pt-1">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.camis}
            href={`/restaurant/${restaurant.camis}`}
            className="min-w-[288px] w-[288px] md:min-w-[324px] md:w-[324px] snap-start"
          >
            <div className="w-[320px] md:w-[360px] h-full">
              <RestaurantCard restaurant={restaurant} compact />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
