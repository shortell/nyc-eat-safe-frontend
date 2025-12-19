
import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => (
  <div className="w-full">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr justify-items-center md:justify-items-start">
      {restaurants.map((restaurant) => (
        <li key={restaurant.camis} className="h-full">
          <Link
            href={`/restaurant/${restaurant.camis}`}
            className="block h-full hover:no-underline min-w-[288px] w-[288px] md:min-w-[324px] md:w-[324px]"
          >
            <div className="w-[320px] md:w-[360px] h-full">
              <RestaurantCard restaurant={restaurant} compact={true} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RestaurantList;

