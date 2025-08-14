// // import React from 'react';
// // import PropTypes from 'prop-types';

// // const colorMap = {
// //   A: '#2a3d83',
// //   B: '#58944c',
// //   C: '#c6673e',
// //   N: '#6b7280',
// // };

// // export default function GradeLetter({ grade }) {
// //   const backgroundColor = colorMap[grade] || colorMap.N;

// //   return (
// //     <div className="flex flex-col items-center text-left">
// //       <p className="font-semibold text-black whitespace-nowrap">City Grade</p>

// //       <div
// //         className="w-16 h-16 border border-gray-200 rounded-md shadow-sm flex items-center justify-center"
// //         style={{ backgroundColor }}
// //       >
// //         <span className="text-[2.5rem] font-bold text-white">
// //           {grade}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// // GradeLetter.propTypes = {
// //   grade: PropTypes.oneOf(['A', 'B', 'C', 'N']).isRequired,
// // };
// // components/GradeLetter.js
// 'use client';

// import React from 'react';
// import PropTypes from 'prop-types';

// const colorMap = {
//   A: '#2a3d83',
//   B: '#58944c',
//   C: '#c6673e',
//   N: '#6b7280',
// };

// export default function GradeLetter({ grade }) {
//   const backgroundColor = colorMap[grade] || colorMap.N;

//   return (
//     <div
//       className="w-16 h-16 border border-gray-200 rounded-md shadow-sm flex items-center justify-center"
//       style={{ backgroundColor }}
//     >
//       <span className="text-[2.5rem] font-bold text-white">
//         {grade}
//       </span>
//     </div>
//   );
// }

// GradeLetter.propTypes = {
//   grade: PropTypes.oneOf(['A', 'B', 'C', 'N']).isRequired,
// };
// components/GradeLetter.js
'use client';

import React from 'react';
import PropTypes from 'prop-types';

const colorMap = {
  A: '#2a3d83',
  B: '#58944c',
  C: '#c6673e',
  N: '#6b7280',
};

export default function GradeLetter({ grade }) {
  const backgroundColor = colorMap[grade] || colorMap.N;

  return (
    <div
      className="w-16 h-16 border border-gray-200 rounded-md shadow-sm flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <span className="text-[2.5rem] font-bold text-white">
        {grade}
      </span>
    </div>
  );
}

GradeLetter.propTypes = {
  grade: PropTypes.oneOf(['A', 'B', 'C', 'N']).isRequired,
};
