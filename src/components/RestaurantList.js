import React from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => (
  <ul className="space-y-4">
    {restaurants.map((restaurant, idx) => (
      <RestaurantCard key={idx} restaurant={restaurant} />
    ))}
  </ul>
);

export default RestaurantList;
