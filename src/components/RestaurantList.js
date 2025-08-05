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
  <div className="flex flex-col items-center">
    <ul className="space-y-4 w-full max-w-2xl">
      {restaurants.map((restaurant) => (
        <li key={restaurant.camis}>
          <Link href={`/restaurant/${restaurant.camis}`}>
            <RestaurantCard restaurant={restaurant} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RestaurantList;

