
import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => (
  <div className="w-full">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr justify-items-center">
      {restaurants.map((restaurant) => (
        <li key={restaurant.camis} className="w-full h-full flex justify-center">
          <Link
            href={`/restaurant/${restaurant.camis}`}
            className="block w-full h-full hover:no-underline flex justify-center"
          >
            <div className="w-full max-w-[320px] h-full">
              <RestaurantCard restaurant={restaurant} compact={true} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RestaurantList;

