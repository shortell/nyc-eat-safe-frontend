// import React from 'react';
// import PropTypes from 'prop-types';
// import { getScoreColor } from '../utils/scoreUtils';

// export default function ScoreBox({ score, title = 'Score Given' }) {
//   const backgroundColor = getScoreColor(score);

//   return (
//     <div className="flex flex-col items-center text-left">
//       <p className="font-semibold text-black whitespace-nowrap">{title}</p>

//       <div
//         className="w-16 h-16 border border-gray-200 rounded-md shadow-sm flex items-center justify-center"
//         style={{ backgroundColor }}
//         aria-label={`Inspection score ${score ?? 'N/A'}`}
//       >
//         <span className="text-[2.5rem] font-bold text-white leading-none">
//           {score ?? '—'}
//         </span>
//       </div>
//     </div>
//   );
// }

// ScoreBox.propTypes = {
//   score: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
//   title: PropTypes.string,
// };
// components/ScoreBox.js
'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { getScoreColor } from '../utils/scoreUtils';

export default function ScoreBox({ score }) {
  const backgroundColor = getScoreColor(score);

  return (
    <div
      className="w-16 h-16 border border-gray-200 rounded-md shadow-sm flex items-center justify-center"
      style={{ backgroundColor }}
      aria-label={`Inspection score ${score ?? 'N/A'}`}
    >
      <span className="text-[2.5rem] font-bold text-white leading-none">
        {score ?? '—'}
      </span>
    </div>
  );
}

ScoreBox.propTypes = {
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
};
