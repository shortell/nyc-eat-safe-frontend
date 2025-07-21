// // components/GradeLetter.jsx
// import React from 'react';
// import PropTypes from 'prop-types';

// const colorMap = {
//   A: '#2a3d83',
//   B: '#58944c',
//   C: '#c6673e',
//   N: '#6b7280',
// };

// export default function GradeLetter({ grade }) {
//   const color = colorMap[grade] || colorMap.N;

//   return (
//     <div
//       className="w-10 h-10 bg-white border border-gray-200 rounded-md shadow-sm
//                  flex items-center justify-center"
//     >
//       <span className="text-lg font-semibold" style={{ color }}>
//         {grade}
//       </span>
//     </div>
//   );
// }

// GradeLetter.propTypes = {
//   grade: PropTypes.oneOf(['A', 'B', 'C', 'N']).isRequired,
// };
// components/GradeLetter.jsx
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
      className="w-10 h-10 border border-gray-200 rounded-md shadow-sm flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <span className="text-lg font-semibold text-white">
        {grade}
      </span>
    </div>
  );
}

GradeLetter.propTypes = {
  grade: PropTypes.oneOf(['A', 'B', 'C', 'N']).isRequired,
};
