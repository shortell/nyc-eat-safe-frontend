import React from 'react';

const getScoreColor = (score) => {
    // Updated score threshold logic
    if (score >= 0 && score <= 13) return 'bg-green-500';
    if (score >= 14 && score <= 27) return 'bg-yellow-500';
    if (score >= 28 && score <= 41) return 'bg-red-500';
    if (score >= 42) return 'bg-red-800'; // Dark red for 42+
    return 'bg-gray-500'; // Default fallback
};

const capitalizeWords = (text) => {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// const RestaurantList = ({ restaurants }) => {
//     return (
//         <ul className="space-y-4">
//             {restaurants.map((restaurant, index) => (
//                 <li
//                     key={index}
//                     className="bg-white p-4 flex items-center shadow-md rounded-lg"
//                 >
//                     <div
//                         className={`w-16 h-16 flex items-center justify-center text-white font-bold text-2xl rounded-full ${getScoreColor(
//                             restaurant.score
//                         )}`}
//                     >
//                         {restaurant.score}
//                     </div>
//                     <div className="ml-4 flex-1">
//                         <h3 className="text-lg font-semibold text-black">{restaurant.dba}</h3>
//                         <p className="text-gray-600">
//                             {restaurant.street},{' '}
//                             <span className="font-medium">{restaurant.borough}</span>
//                         </p>
//                         {restaurant.distance && (
//                             <p className="text-sm text-gray-500 flex items-center">
//                                 {restaurant.distance} miles away
//                             </p>
//                         )}
//                     </div>
//                     <div className="text-gray-600 text-sm text-right">
//                         <span className="font-bold">Inspected on:</span> <br />
//                         <span className="font-medium text-gray-800">{restaurant.inspection_date}</span>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default RestaurantList;
const RestaurantList = ({ restaurants }) => {
    return (
        <ul className="space-y-4">
            {restaurants.map((restaurant, index) => (
                <li
                    key={index}
                    className="bg-[#F0F8FF] p-4 flex items-center shadow-md rounded-lg"
                >
                    <div
                        className={`w-14 h-14 flex items-center justify-center text-white font-bold text-2xl rounded-full ${getScoreColor(
                            restaurant.score
                        )} flex items-center justify-center`}
                    >
                        <span className="inline-flex items-center justify-center">{restaurant.score}</span>
                    </div>
                    <div className="ml-4 flex-1">
                        <h3 className="text-base font-semibold text-black">{capitalizeWords(restaurant.dba)}</h3>
                        <p className="text-gray-600">
                            {capitalizeWords(restaurant.street)},{' '}
                            <span className="font-medium">{restaurant.borough}</span>
                        </p>
                        {restaurant.distance && (
                            <p className="text-sm text-gray-500 flex items-center">
                                {restaurant.distance} miles away
                            </p>
                        )}
                    </div>
                    <div className="text-gray-600 text-sm text-right">
                        <span className="font-bold">Inspected on:</span> <br />
                        <span className="font-medium text-gray-800">{restaurant.inspection_date}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default RestaurantList;