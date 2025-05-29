import React from 'react';
import RestaurantList from './RestaurantList';

const CategoryPreview = ({ title, restaurants }) => {
  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4 bg-[#2A3E83] text-white p-3 rounded-md"> */}
        <h2 className="bg-gradient-to-b from-[#2A3E83] via-[#1655A0] to-[#016CCE] bg-gradient-to-b from-[0%] via-[90%] to-[98%] text-white p-3 rounded-md text-2xl font-bold mb-4">

        {title}
      </h2>
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default CategoryPreview;
