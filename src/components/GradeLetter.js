
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
      className="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden ring-1 ring-black/5"
      style={{ backgroundColor }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
      <span className="text-5xl font-extrabold text-white drop-shadow-sm relative z-10 leading-none">
        {grade}
      </span>
    </div>
  );
}

GradeLetter.propTypes = {
  grade: PropTypes.oneOf(['A', 'B', 'C', 'N']).isRequired,
};
