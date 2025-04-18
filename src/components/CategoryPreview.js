import React from 'react';
import RestaurantList from './RestaurantList';

const CategoryPreview = ({ title, restaurants }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 bg-[#2a3d83] text-white p-3 rounded-md">
        {title}
      </h2>
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default CategoryPreview;
