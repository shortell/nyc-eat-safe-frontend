// import React from 'react';
// import Link from 'next/link';
// import { capitalizeWords } from '../utils/scoreUtils';
// import ScoreBox from './ScoreBox';

// const RestaurantCard = ({ restaurant }) => {
//   return (
//     <Link href={`/restaurant?camis=${restaurant.camis}`} legacyBehavior>
//       <li className="bg-[#F0F8FF] p-4 flex items-center shadow-md rounded-lg cursor-pointer hover:bg-[#E6EEF7]">
//         <ScoreBox score={restaurant.score} />

//         <div className="ml-4 flex-1">
//           <h3 className="text-base font-semibold text-black">
//             {capitalizeWords(restaurant.dba)}
//           </h3>
//           <p className="text-gray-600">
//             {capitalizeWords(restaurant.street)}, <span className="font-medium">{restaurant.borough}</span>
//           </p>
//           {restaurant.distance_miles && (
//             <p className="text-sm text-gray-500 flex items-center">
//               {restaurant.distance_miles} miles away
//             </p>
//           )}
//         </div>

//         <div className="text-gray-600 text-sm text-right">
//           <span className="font-bold">Inspected on:</span> <br />
//           <span className="font-medium text-gray-800">{restaurant.inspection_date}</span>
//         </div>
//       </li>
//     </Link>
//   );
// };

// export default RestaurantCard;
import React from 'react';
import Link from 'next/link';
import { capitalizeWords } from '../utils/scoreUtils';
import GradeLetter from './GradeLetter';

const RestaurantCard = ({ restaurant }) => {
  const {
    camis,
    dba,
    street,
    borough,
    building,
    grade,
    has_mice,
    has_rats,
    has_roaches,
    critical_count
  } = restaurant;

  // Format pests using Oxford comma rules
  const pestLabels = [];
  if (has_mice) pestLabels.push('Mice');
  if (has_rats) pestLabels.push('Rats');
  if (has_roaches) pestLabels.push('Roaches');

  function formatWithOxfordComma(arr) {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
    return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
  }

  const finePrint = [];
  const pests = formatWithOxfordComma(pestLabels);
  if (pests) finePrint.push(pests);

  if (critical_count > 0) {
    finePrint.push(`${critical_count} Critical Violation${critical_count > 1 ? 's' : ''}`);
  }


  return (
    <Link href={`/restaurant?camis=${camis}`} legacyBehavior>
      <li className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer w-full max-w-xl">
        {/* Top: Restaurant Name + Address */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black">{capitalizeWords(dba)}</h3>
          <p className="text-gray-700">{capitalizeWords(street)}, {capitalizeWords(borough)}</p>
          <p className="text-sm text-gray-500">Building: {building}</p>
        </div>

        {/* Bottom Grid: Grade + Fine Print */}
        <div className="grid grid-cols-[auto_1fr] gap-8 items-start">
          {/* Grade */}
          <div className="justify-self-start">
            <GradeLetter grade={grade || 'N'} />
          </div>

          {/* Fine Print */}
          <div className="ml-16 justify-self-end text-left">
            <p className="font-semibold mb-1 text-black">Fine Print</p>
            <ul className="list-disc pl-5 text-sm">
              {finePrint.map((item, index) => (
                <li key={index} className={item.includes('Critical') ? 'text-orange-600' : 'text-red-600'}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default RestaurantCard;

