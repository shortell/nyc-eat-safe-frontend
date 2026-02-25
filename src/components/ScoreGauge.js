'use client';

import React from 'react';
import PropTypes from 'prop-types';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

export default function ScoreGauge({ score }) {
    // Grades: A (0-13), B (14-27), C (28+)
    // New Scale: 0 to 28
    // 0  -> 0%   (Green)
    // 14 -> 50%  (Yellow)
    // 28 -> 100% (Red)

    const getPercentage = (s) => {
        if (s == null) return 0;
        const clamped = Math.max(0, s);
        // Visual cap at 28. Scores higher than 28 stay at the end.
        const effectiveScore = Math.min(clamped, 28);

        // Simple linear interpolation over 0-28 range
        const p = (effectiveScore / 28) * 100;

        return Math.min(Math.max(p, 0), 100);
    };

    const percentage = getPercentage(score);

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 mb-8 pt-4">
            <div className="relative h-3 w-full rounded-full bg-slate-200">
                {/* Smooth Gradient 0-28 */}
                <div
                    className="absolute inset-0 rounded-full shadow-sm"
                    style={{
                        background: 'linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%)'
                    }}
                />

                {/* Grade Labels */}
                {/* A starts at 0% */}
                <div className="absolute -top-6 left-0 text-xs font-bold text-slate-600">A</div>
                {/* B is centered at 14 (50%) */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">B</div>
                {/* C starts at 28 (100%) */}
                <div className="absolute -top-6 right-0 text-xs font-bold text-slate-600">C</div>

                {/* Indicator (MUI Arrow) */}
                <div
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                        left: `${percentage}%`,
                        top: '50%',
                        transform: 'translateX(-50%)'
                    }}
                >
                    <ArrowDropUpOutlinedIcon
                        style={{
                            fontSize: 50,
                            color: 'white',
                            stroke: 'black',
                            strokeWidth: 0.5,
                            filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))',
                            marginTop: '-18px' // Pull it up so tip is inside bar
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

ScoreGauge.propTypes = {
    score: PropTypes.number,
};
