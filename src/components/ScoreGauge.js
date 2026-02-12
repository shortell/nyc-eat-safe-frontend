'use client';

import React from 'react';
import PropTypes from 'prop-types';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

export default function ScoreGauge({ score }) {
    // Grades: A (0-13), B (14-27), C (28+)
    // Anchors from scoreUtils: 0 (Green), 14 (Yellow), 28 (Red), 42 (Dark Red)
    // We map these anchors to:
    // 0  -> 0%
    // 14 -> 33.33%
    // 28 -> 66.66%
    // 42 -> 100%

    const getPercentage = (s) => {
        if (s == null) return 0;
        const clamped = Math.max(0, s);
        const maxScore = 41; // The top of our "C" range for visualization (Dark Red)

        // Linear interpolation based on the 3 segments (0-14, 14-28, 28-41)
        // A: 0-13 (14 pts), B: 14-27 (14 pts), C: 28-41 (14 pts? No, 28 to 41 is 14 numbers inclusively? 41-28=13. 14 steps? No.
        // 0 to 14 is 14 units distance. 14 to 28 is 14 units.
        // 28 to 41 is 13 units distance.
        // For visual balance we map them to equal thirds.

        let p = 0;
        if (clamped <= 14) {
            p = (clamped / 14) * 33.33;
        } else if (clamped <= 28) {
            p = 33.33 + ((clamped - 14) / 14) * 33.33;
        } else {
            // 28+
            // Cap at 41 for the graph calculation to keep it 100% at the end
            const local = Math.min((clamped - 28) / 13, 1);
            p = 66.66 + (local * 33.34);
        }
        return Math.min(Math.max(p, 0), 100);
    };

    const percentage = getPercentage(score);

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 mb-8 pt-4">
            <div className="relative h-3 w-full rounded-full bg-slate-200">
                {/* Smooth Gradient matching scoreUtils anchors */}
                <div
                    className="absolute inset-0 rounded-full shadow-sm"
                    style={{
                        background: 'linear-gradient(90deg, #22c55e 0%, #eab308 33.33%, #ef4444 66.66%, #991b1b 100%)'
                    }}
                />

                {/* Grade Labels (Aligned to start of range) */}
                {/* A starts at 0% */}
                <div className="absolute -top-6 left-0 text-xs font-bold text-slate-600">A</div>
                {/* B starts at 33.3% */}
                <div className="absolute -top-6 left-[33.33%] -translate-x-1/2 text-xs font-bold text-slate-600">B</div>
                {/* C starts at 66.6% */}
                <div className="absolute -top-6 left-[66.66%] -translate-x-1/2 text-xs font-bold text-slate-600">C</div>

                {/* Indicator (MUI Arrow) */}
                <div
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                        left: `${percentage}%`,
                        top: '50%',
                        transform: 'translateX(-50%)'
                    }}
                >
                    {/* 
            Icon needs to point INTO the gauge. 
            ArrowDropUp points UP. 
            If we place it below, pointing up, it works.
            Bar height is 12px (h-3).
            We want tip inside.
            We can just position it so the tip overlaps.
            
            Material Icons are usually 24px by default.
            Let's scale it slightly if needed, or just position it.
            White color, drop shadow.
          */}
                    <ArrowDropUpOutlinedIcon
                        style={{
                            fontSize: 50,
                            color: 'white',
                            stroke: 'black',
                            strokeWidth: 0.5,
                            filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))',
                            marginTop: '-18px' // Pull it up so tip is inside bar (adjusted for larger size)
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
