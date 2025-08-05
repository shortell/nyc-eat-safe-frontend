// import React from 'react';
// import Link from 'next/link';
// import { capitalizeWords } from '../utils/scoreUtils';
// import GradeLetter from './GradeLetter';

// const RestaurantCard = ({ restaurant }) => {
//   const {
//     camis,
//     dba,
//     street,
//     borough,
//     building,
//     grade,
//     has_mice,
//     has_rats,
//     has_roaches,
//     critical_count,
//   } = restaurant;

//   const pestLabels = [];
//   if (has_mice) pestLabels.push('Mice');
//   if (has_rats) pestLabels.push('Rats');
//   if (has_roaches) pestLabels.push('Roaches');

//   function formatWithOxfordComma(arr) {
//     if (arr.length === 0) return '';
//     if (arr.length === 1) return arr[0];
//     if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
//     return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
//   }

//   const finePrint = [];
//   const pests = formatWithOxfordComma(pestLabels);
//   if (pests) finePrint.push(pests);
//   if (critical_count > 0) {
//     finePrint.push(`${critical_count} Critical Violation${critical_count > 1 ? 's' : ''}`);
//   }

//   return (
//     <Link href={`/restaurant/${camis}`}>

//       <li className="bg-white px-6 py-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 w-full
//                  max-w-2xl md:max-w-3xl mx-auto space-y-4"> {/* wider card */}

//         {/* Header */}
//         <div className="space-y-1 border-b border-gray-200 pb-3">
//           <h3 className="text-lg font-bold text-[#222222]">{capitalizeWords(dba)}</h3>
//           <p className="text-gray-700 truncate">
//             {building && `${building} `}{capitalizeWords(street)}, {capitalizeWords(borough)}
//           </p>
//         </div>

//         {/* Grade & Fine Print */}
//         <div className="grid grid-cols-1 md:grid-cols-[96px_minmax(0,1fr)] gap-4 md:gap-5 items-start">
//           {/* Grade */}
//           <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
//             <GradeLetter grade={grade || 'N'} />
//           </div>

//           {/* Fine Print */}
//           <div className="border border-gray-200 rounded-md p-3 md:pr-6 bg-gray-50 w-full">
//             <p className="font-semibold mb-1 text-black">
//               {grade === 'A' ? 'Behind the "A"' : 'Red Flags'}
//             </p>
//             <ul className="list-disc pl-4 space-y-2 text-sm">
//               {finePrint.map((item, index) => (
//                 <li
//                   key={index}
//                   className={`break-words leading-tight ${item.includes('Critical') ? 'text-orange-600' : 'text-red-600'
//                     }`}
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </li>
//     </Link>

//   );
// };

// export default RestaurantCard;

import React from 'react';
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
    critical_count,
  } = restaurant;

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
    <div className="bg-white px-6 py-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 w-full
                  max-w-2xl md:max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="space-y-1 border-b border-gray-200 pb-3">
        <h3 className="text-lg font-bold text-[#222222]">{capitalizeWords(dba)}</h3>
        <p className="text-gray-700 truncate">
          {building && `${building} `}{capitalizeWords(street)}, {capitalizeWords(borough)}
        </p>
      </div>

      {/* Grade & Fine Print */}
      <div className="grid grid-cols-1 md:grid-cols-[96px_minmax(0,1fr)] gap-4 md:gap-5 items-start">
        {/* Grade */}
        <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
          <GradeLetter grade={grade || 'N'} />
        </div>

        {/* Fine Print */}
        <div className="border border-gray-200 rounded-md p-3 md:pr-6 bg-gray-50 w-full">
          <p className="font-semibold mb-1 text-black">
            {grade === 'A' ? 'Behind the "A"' : 'Red Flags'}
          </p>

          {/* ✅ This is the internal list (keep it) */}
          <ul className="list-disc pl-4 space-y-2 text-sm">
            {finePrint.map((item, index) => (
              <li
                key={index}
                className={`break-words leading-tight ${item.includes('Critical') ? 'text-orange-600' : 'text-red-600'
                  }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

