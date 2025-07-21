// import React from 'react';
// import Link from 'next/link';

// // Anchor scores with their corresponding hex colors
// const anchors = [
//   { score: 0,   hex: '#22c55e' },  // green-500
//   { score: 14,  hex: '#eab308' },  // yellow-500
//   { score: 28,  hex: '#ef4444' },  // red-500
//   { score: 42,  hex: '#991b1b' },  // red-800
// ];

// // Convert hex string to RGB object
// function hexToRgb(hex) {
//   const [r, g, b] = hex.replace(/^#/, '')
//     .match(/.{1,2}/g)
//     .map(x => parseInt(x, 16));
//   return { r, g, b };
// }

// // Interpolate two RGB colors by factor t (0 to 1)
// function mixRgb(a, b, t) {
//   return {
//     r: Math.round(a.r + (b.r - a.r) * t),
//     g: Math.round(a.g + (b.g - a.g) * t),
//     b: Math.round(a.b + (b.b - a.b) * t),
//   };
// }

// // Main gradient function: returns CSS rgb() string
// export function getScoreColor(score) {
//   const clamped = Math.max(0, score);
//   let lower = anchors[0];
//   let upper = anchors[anchors.length - 1];

//   // Find enclosing anchors
//   for (let i = 0; i < anchors.length - 1; i++) {
//     if (clamped >= anchors[i].score && clamped <= anchors[i + 1].score) {
//       lower = anchors[i];
//       upper = anchors[i + 1];
//       break;
//     }
//   }

//   // If beyond highest boundary, return last color
//   if (clamped >= upper.score && upper === anchors[anchors.length - 1]) {
//     return upper.hex;
//   }

//   // Compute interpolation factor
//   const range = upper.score - lower.score;
//   const t = range === 0 ? 0 : (clamped - lower.score) / range;

//   // Mix and return
//   const c1 = hexToRgb(lower.hex);
//   const c2 = hexToRgb(upper.hex);
//   const mixed = mixRgb(c1, c2, t);
//   return `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;
// }

// // Utility: convert score to percentage (0 -> best, 41 -> worst)
// export const convertScoreToPercentage = (score) => {
//   const percentage = (1 - score / 41) * 100;
//   return Math.round(percentage);
// };

// // Utility: capitalize each word
// export const capitalizeWords = (text) =>
//   text
//     .toLowerCase()
//     .split(' ')
//     .map(w => w.charAt(0).toUpperCase() + w.slice(1))
//     .join(' ');

// // RestaurantList component
// const RestaurantList = ({ restaurants }) => (
//   <ul className="space-y-4">
//     {restaurants.map((restaurant, idx) => (
//       <Link key={idx} href={`/restaurant?camis=${restaurant.camis}`} legacyBehavior>
//         <li className="bg-[#F0F8FF] p-4 flex items-center shadow-md rounded-lg cursor-pointer hover:bg-[#E6EEF7]">
//           <div
//             className="w-16 h-16 flex items-center justify-center text-white font-bold text-2xl rounded-md"
//             style={{ 
//               backgroundColor: getScoreColor(restaurant.score),
//               boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.35)'
//             }}
//           >
//             <span className="inline-flex items-center justify-center">
//               <span className="text-2xl font-bold">
//                 {convertScoreToPercentage(restaurant.score)}
//               </span>
//               <span className="text-base font-bold">%</span>
//             </span>
//           </div>

//           <div className="ml-4 flex-1">
//             <h3 className="text-base font-semibold text-black">
//               {capitalizeWords(restaurant.dba)}
//             </h3>
//             <p className="text-gray-600">
//               {capitalizeWords(restaurant.street)}, <span className="font-medium">{restaurant.borough}</span>
//             </p>
//             {restaurant.distance_miles && (
//               <p className="text-sm text-gray-500 flex items-center">
//                 {restaurant.distance_miles} miles away
//               </p>
//             )}
//           </div>

//           <div className="text-gray-600 text-sm text-right">
//             <span className="font-bold">Inspected on:</span> <br />
//             <span className="font-medium text-gray-800">{restaurant.inspection_date}</span>
//           </div>
//         </li>
//       </Link>
//     ))}
//   </ul>
// );

// export default RestaurantList;
// components/RestaurantList.jsx



// WITH GRADE LETTER ORIGINAL
// import React from 'react';
// import Link from 'next/link';
// import GradeLetter from '@/components/GradeLetter';

// // Utility: capitalize each word
// function capitalizeWords(text) {
//   return text
//     .toLowerCase()
//     .split(' ')
//     .map(w => w.charAt(0).toUpperCase() + w.slice(1))
//     .join(' ');
// }

// export default function RestaurantList({ restaurants }) {
//   return (
//     <ul className="space-y-4">
//       {restaurants.map((restaurant) => {
//         const grade = (restaurant.grade || 'N').toUpperCase();

//         return (
//           <Link
//             key={restaurant.camis}
//             href={`/restaurant?camis=${restaurant.camis}`}
//             legacyBehavior
//           >
//             <li className="bg-[#F0F8FF] p-4 flex items-center shadow-md rounded-lg cursor-pointer hover:bg-[#E6EEF7]">

//               {/* Grade letter box */}
//               <GradeLetter grade={grade} />

//               {/* Restaurant info */}
//               <div className="ml-4 flex-1">
//                 <h3 className="text-base font-semibold text-black">
//                   {capitalizeWords(restaurant.dba)}
//                 </h3>
//                 <p className="text-gray-600">
//                   {capitalizeWords(restaurant.street)},{' '}
//                   <span className="font-medium">
//                     {capitalizeWords(restaurant.borough)}
//                   </span>
//                 </p>
//                 {restaurant.distance_miles && (
//                   <p className="text-sm text-gray-500">
//                     {restaurant.distance_miles} miles away
//                   </p>
//                 )}
//               </div>

//               {/* Inspection date */}
//               <div className="text-gray-600 text-sm text-right">
//                 <div className="font-bold">Inspected on:</div>
//                 <div className="font-medium text-gray-800">
//                   {restaurant.inspection_date}
//                 </div>
//               </div>
//             </li>
//           </Link>
//         );
//       })}
//     </ul>
//   );
// }

// WITH GRADE LETTER MODIFIED
import React from 'react';
import Link from 'next/link';
import GradeLetter from '@/components/GradeLetter';

// Utility: capitalize each word
function capitalizeWords(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function RestaurantList({ restaurants }) {
  return (
    <ul className="space-y-4">
      {restaurants.map((restaurant) => {
        const grade = (restaurant.grade || 'N').toUpperCase();
        return (
          <Link
            key={restaurant.camis}
            href={`/restaurant?camis=${restaurant.camis}`}
            legacyBehavior
          >
            <li className="bg-[#F0F8FF] pl-2 pr-4 py-4 flex items-center shadow-md rounded-lg cursor-pointer hover:bg-[#E6EEF7]">
              {/* Grade letter box */}
              <GradeLetter grade={grade} />

              {/* Restaurant info */}
              <div className="ml-2 flex-1">
                <h3 className="text-base font-semibold text-black">
                  {capitalizeWords(restaurant.dba)}
                </h3>
                <p className="text-gray-600">
                  {capitalizeWords(restaurant.street)},{' '}
                  <span className="font-medium">
                    {capitalizeWords(restaurant.borough)}
                  </span>
                </p>
                {restaurant.distance_miles && (
                  <p className="text-sm text-gray-500">
                    {restaurant.distance_miles} miles away
                  </p>
                )}
              </div>

              {/* Inspection date */}
              <div className="text-gray-600 text-sm text-right">
                <div className="font-bold">Inspected on:</div>
                <div className="font-medium text-gray-800">
                  {restaurant.inspection_date}
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
