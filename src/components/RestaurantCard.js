
import React from 'react';
import { capitalizeWords, formatMiles } from '../utils/scoreUtils';
import GradeLetter from './GradeLetter';

/**
 * @param {{ restaurant: {
 *   camis: number|string,
 *   dba?: string,
 *   street?: string,
 *   borough?: string,
 *   building?: string,
 *   grade?: string,
 *   has_mice?: boolean,
 *   has_rats?: boolean,
 *   has_roaches?: boolean,
 *   critical_count?: number,
 *   distance_miles?: number|string|null
 * }}} props
 */
const RestaurantCard = ({ restaurant, compact = false }) => {
  const {
    camis,
    dba,
    street,
    borough,
    building,
    grade,
    has_mice,
    has_rats,
    has_roaches,
    critical_count = 0,
    distance_miles,
  } = restaurant;

  const distanceText = formatMiles(distance_miles);

  const pestLabels = [];
  if (has_mice) pestLabels.push('Mice');
  if (has_rats) pestLabels.push('Rats');
  if (has_roaches) pestLabels.push('Roaches');

  function formatWithOxfordComma(arr) {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
    return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
  }

  const finePrint = [];
  const pests = formatWithOxfordComma(pestLabels);

  // Push pests first (if any)
  if (pests) finePrint.push(pests);

  // If there is at least one pest AND at least 1 critical violation,
  // prefix the critical text with '+' (no space). Otherwise, no '+'.
  const hasAnyPest = Boolean(has_mice || has_rats || has_roaches);
  if (critical_count > 0) {
    const critBase = `${critical_count} Critical Violation${critical_count > 1 ? 's' : ''}`;
    finePrint.push(hasAnyPest ? `+${critBase}` : critBase);
  }

  return (
    <div
      className={`
        bg-white font-inter text-base antialiased 
        rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 
        border border-gray-100 
        w-full relative
        max-w-[320px] md:max-w-[320px]
        min-w-[290px]
        ${compact ? 'p-4 pb-1 flex flex-col' : 'p-6 pb-1 space-y-4'}
      `}
    >
      {/* Header */}
      <div className="space-y-1 border-b-2 border-gray-300 pb-3">
        <h3 className="text-xl font-semibold text-[#232323] tracking-tight truncate">
          {capitalizeWords(dba)}
        </h3>

        <div className="flex items-center w-full text-sm font-medium text-gray-700 gap-2">
          <span className="truncate flex-1 min-w-0">
            {building && `${building} `}
            {street && capitalizeWords(street)}
            {borough && `, ${borough.toLowerCase() === 'bronx' ? 'THE Bronx' : capitalizeWords(borough)}`}
          </span>

          {distanceText && (
            <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
              {distanceText}
            </span>
          )}
        </div>
      </div>

      {/* Grade & Fine Print */}
      <div className={`flex flex-row gap-2 md:gap-3 items-stretch ${compact ? 'pt-3' : ''}`}>
        {/* Grade Panel */}
        <div className="border border-gray-100 rounded-xl p-3 pb-5 bg-gray-50 shadow flex flex-col items-center justify-start min-w-[70px]">
          <p className="text-xs sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
            City Grade
          </p>
          <div className="scale-110">
            <GradeLetter grade={grade || 'N'} />
          </div>
        </div>

        {/* Fine Print Panel */}
        <div className="border border-gray-100 rounded-xl p-3 bg-gray-50 shadow flex-1 flex flex-col items-start justify-start min-w-0">
          <p className="text-xs sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            {finePrint.length > 0 ? 'Red Flags' : 'Eat Safe'}
          </p>

          {finePrint.length > 0 ? (
            <ul className="list-none pl-0 space-y-1 text-sm font-medium text-slate-600 w-full">
              {finePrint.map((item, index) => {
                const isCritical = item.includes('Critical');
                const isPest = item.includes('Mice') || item.includes('Rats') || item.includes('Roaches');

                return (
                  <li
                    key={index}
                    className={`leading-relaxed ${isPest ? 'text-red-600' : isCritical ? 'text-orange-600' : 'text-slate-600'
                      } ${item.includes('Critical Violation') ? 'whitespace-nowrap' : 'break-words'}`}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed">
              No critical violations found.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center !mt-1 gap-2">
        <div className="flex-1 border-b-2 border-gray-300"></div>
        <span className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">
          Details
        </span>
      </div>
    </div >
  );
};

export default React.memo(RestaurantCard);

