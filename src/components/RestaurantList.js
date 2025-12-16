// import React from 'react';
// import RestaurantCard from './RestaurantCard';

// const RestaurantList = ({ restaurants }) => (
//   <div className="flex flex-col items-center">
//     <ul className="space-y-4 w-full max-w-2xl">
//       {restaurants.map((restaurant, idx) => (
//         <RestaurantCard key={idx} restaurant={restaurant} />
//       ))}
//     </ul>
//   </div>
// );

// export default RestaurantList;
import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => (
  <div className="w-full">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {restaurants.map((restaurant) => (
        <li key={restaurant.camis} className="h-full">
          <Link href={`/restaurant/${restaurant.camis}`} className="block h-full hover:no-underline">
            <RestaurantCard restaurant={restaurant} compact={true} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RestaurantList;

