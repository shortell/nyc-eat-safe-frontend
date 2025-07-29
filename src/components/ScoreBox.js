import React from 'react';
import { getScoreColor, convertScoreToPercentage } from '../utils/scoreUtils';

const ScoreBox = ({ score }) => {
  const percentage = convertScoreToPercentage(score);
  const bgColor = getScoreColor(score);

  return (
    <div
      className="w-16 h-16 flex items-center justify-center text-white font-bold text-2xl rounded-md"
      style={{
        backgroundColor: bgColor,
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.35)'
      }}
    >
      <span className="inline-flex items-center justify-center">
        <span className="text-2xl font-bold">{percentage}</span>
        <span className="text-base font-bold">%</span>
      </span>
    </div>
  );
};

export default ScoreBox;
