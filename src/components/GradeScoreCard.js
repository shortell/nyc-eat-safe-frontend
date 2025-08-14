// GradeScoreCard.js
import React, { useMemo } from 'react';
import GradeLetter from './GradeLetter';
import { getScoreColor } from '@/utils/scoreUtils';

// Build a smooth gradient by sampling getScoreColor across the range
function buildGradientBySampling(fn, max = 42, steps = 30) {
  const stops = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const score = Math.round(t * max);
    stops.push(`${fn(score)} ${Math.round(t * 100)}%`);
  }
  // Ensure it ends at 100%
  if (!stops[stops.length - 1].endsWith('100%')) {
    stops.push(`${fn(max)} 100%`);
  }
  return `linear-gradient(90deg, ${stops.join(', ')})`;
}

export default function GradeScoreCard() {
  const items = [
    { grade: 'A', range: '0–13 points', sampleScore: 6 },
    { grade: 'B', range: '14–27 points', sampleScore: 20 },
    { grade: 'C', range: '28+ points', sampleScore: 32 },
    { grade: 'N', range: 'No grade / pending', sampleScore: null },
  ];

  const gradientStyle = useMemo(() => ({
    backgroundImage: buildGradientBySampling(getScoreColor, 42, 36),
  }), []);

  const tickMarks = [
    { label: '0', value: 0 },
    { label: '14', value: 14 },
    { label: '28', value: 28 },
    { label: '42+', value: 42 },
  ];

  const maxScore = 42;

  return (
    <section className="w-full rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm" aria-labelledby="grade-scorecard-title">
      <header className="mb-5 md:mb-6">
        <h2 id="grade-scorecard-title" className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          NYC Inspection Scoring — Lower is Better
        </h2>
        <p className="mt-1 text-sm md:text-base text-gray-600">
          Every restaurant starts at <span className="font-semibold text-gray-900">0 points</span>. Each violation adds points. Fewer points = better grade.
        </p>
      </header>

      <div className="mb-5 md:mb-6">
        <div className="relative h-3 rounded-full shadow-inner" style={gradientStyle} aria-hidden="true">
          <div className="absolute inset-0 rounded-full bg-white/10 mix-blend-soft-light pointer-events-none" />
        </div>

        <div className="relative mt-2 flex justify-between text-xs text-gray-600">
          {tickMarks.map(({ label, value }) => (
            <div key={label} className="relative flex items-center" style={{ width: 0 }}>
              <div className="absolute -left-px h-3 w-0.5 bg-gray-300 rounded" style={{ left: `${(value / maxScore) * 100}%` }} aria-hidden="true" />
              <span className="absolute -translate-x-1/2 top-3 select-none" style={{ left: `${(value / maxScore) * 100}%` }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {items.map(({ grade, range, sampleScore }) => (
          <div key={grade} className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow" aria-label={`Grade ${grade} corresponds to ${range}`}>
            <div className="shrink-0">
              <GradeLetter grade={grade} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-base md:text-lg font-semibold text-gray-900">{range}</div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border border-black/5" style={{ background: sampleScore == null ? '#9ca3af' : getScoreColor(sampleScore) }} aria-hidden="true" />
                <span className="text-xs text-gray-600">Typical color for this band</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500">Tip: Points accumulate per violation during inspections; fewer points lead to higher grades.</p>
    </section>
  );
}
