
'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { getScoreColor } from '../utils/scoreUtils';

export default function ScoreBox({ score }) {
  const backgroundColor = getScoreColor(score);
  const isTripleDigit = score >= 100;

  return (
    <div
      className="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden ring-1 ring-black/5"
      style={{ backgroundColor }}
      aria-label={`Inspection score ${score ?? 'N/A'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
      <span
        className={`${isTripleDigit ? 'text-3xl' : 'text-5xl'
          } font-extrabold text-white drop-shadow-sm relative z-10 leading-none`}
      >
        {score ?? '—'}
      </span>
    </div>
  );
}

ScoreBox.propTypes = {
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
};
