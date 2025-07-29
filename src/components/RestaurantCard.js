import React from 'react';
import Link from 'next/link';
import { capitalizeWords } from '../utils/scoreUtils';
import ScoreBox from './ScoreBox';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link href={`/restaurant?camis=${restaurant.camis}`} legacyBehavior>
      <li className="bg-[#F0F8FF] p-4 flex items-center shadow-md rounded-lg cursor-pointer hover:bg-[#E6EEF7]">
        <ScoreBox score={restaurant.score} />

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
  );
};

export default RestaurantCard;
