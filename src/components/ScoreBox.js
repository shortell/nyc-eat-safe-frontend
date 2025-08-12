// import React from 'react';
// import { getScoreColor, convertScoreToPercentage } from '../utils/scoreUtils';

// const ScoreBox = ({ score }) => {
//   const percentage = convertScoreToPercentage(score);
//   const bgColor = getScoreColor(score);

//   return (
//     <div
//       className="w-16 h-16 flex items-center justify-center text-white font-bold text-2xl rounded-md"
//       style={{
//         backgroundColor: bgColor,
//         boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.35)'
//       }}
//     >
//       <span className="inline-flex items-center justify-center">
//         <span className="text-2xl font-bold">{score}</span>
//         {/* <span className="text-base font-bold">%</span> */}
//       </span>
//     </div>
//   );
// };

// export default ScoreBox;
// components/ScoreBox.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { getScoreColor } from '../utils/scoreUtils';

export default function ScoreBox({ score, title = 'Score Given' }) {
  const backgroundColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center text-left">
      <p className="font-semibold text-black whitespace-nowrap">{title}</p>

      <div
        className="w-16 h-16 border border-gray-200 rounded-md shadow-sm flex items-center justify-center"
        style={{ backgroundColor }}
        aria-label={`Inspection score ${score ?? 'N/A'}`}
      >
        <span className="text-[2.5rem] font-bold text-white leading-none">
          {score ?? '—'}
        </span>
      </div>
    </div>
  );
}

ScoreBox.propTypes = {
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  title: PropTypes.string,
};
