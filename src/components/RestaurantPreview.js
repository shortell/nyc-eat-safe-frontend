import React from 'react';
import Link from 'next/link';

import { getScoreColor, convertScoreToPercentage, capitalizeWords } from '../utils/scoreUtils';

// RestaurantList component
const RestaurantList = ({ restaurants }) => (
  <ul className="space-y-4">
    {restaurants.map((restaurant, idx) => (
      <Link key={idx} href={`/restaurant?camis=${restaurant.camis}`} legacyBehavior>
        <li className="bg-[#F0F8FF] p-4 flex items-center shadow-md rounded-lg cursor-pointer hover:bg-[#E6EEF7]">
          <div
            className="w-16 h-16 flex items-center justify-center text-white font-bold text-2xl rounded-md"
            style={{
              backgroundColor: getScoreColor(restaurant.score),
              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.35)'
            }}
          >
            <span className="inline-flex items-center justify-center">
              <span className="text-2xl font-bold">
                {convertScoreToPercentage(restaurant.score)}
              </span>
              <span className="text-base font-bold">%</span>
            </span>
          </div>

          <div className="ml-4 flex-1">
            <h3 className="text-base font-semibold text-black">
              {capitalizeWords(restaurant.dba)}
            </h3>
            <p className="text-gray-600">
              {capitalizeWords(restaurant.street)}, <span className="font-medium">{restaurant.borough}</span>
            </p>
            {restaurant.distance_miles && (
              <p className="text-sm text-gray-500 flex items-center">
                {restaurant.distance_miles} miles away
              </p>
            )}
          </div>

          <div className="text-gray-600 text-sm text-right">
            <span className="font-bold">Inspected on:</span> <br />
            <span className="font-medium text-gray-800">{restaurant.inspection_date}</span>
          </div>
        </li>
      </Link>
    ))}
  </ul>
);

export default RestaurantList;