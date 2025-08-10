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
const RestaurantCard = ({ restaurant }) => {
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

  // Distance text (null when not renderable)
  const distanceText = formatMiles(distance_miles);

  // Pest label generation
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
  if (pests) finePrint.push(pests);
  if (critical_count > 0) {
    finePrint.push(`${critical_count} Critical Violation${critical_count > 1 ? 's' : ''}`);
  }

  return (
    <div className="bg-white font-inter text-base antialiased rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200 border border-gray-100 w-full max-w-2xl md:max-w-3xl mx-auto p-6 space-y-4">
      {/* Header */}
      <div className="space-y-1 border-b-2 border-gray-300 pb-3">
        <h3 className="text-xl font-semibold text-[#232323] tracking-tight">
          {capitalizeWords(dba)}
        </h3>

        <div className="flex flex-wrap items-center text-sm font-medium text-gray-700 gap-x-1">
          {building && <span>{building}</span>}
          <span className="truncate max-w-[160px]">{capitalizeWords(street)},</span>
          <span>{capitalizeWords(borough)}</span>

          {/* Distance (only when finite) */}
          {distanceText && (
            <span className="text-gray-400 ml-2 text-xs font-normal">
              &bull; {distanceText}
            </span>
          )}
        </div>
      </div>

      {/* Grade & Fine Print */}
      <div className="flex flex-row gap-4 md:gap-5 items-stretch">
        {/* Grade Panel */}
        <div className="border border-gray-100 rounded-xl p-2 bg-gray-50 shadow-sm flex flex-col items-center justify-start min-w-[96px] h-full">
          <GradeLetter grade={grade || 'N'} />
        </div>

        {/* Fine Print Panel */}
        <div className="border border-gray-100 rounded-xl p-4 md:pr-6 bg-gray-50 shadow-sm flex-1 flex flex-col items-start justify-start h-full">
          <p className="font-semibold text-[#222222] tracking-wide">
            {grade === 'A' ? "Behind the 'A'" : 'Red Flags'}
          </p>

          <ul className="list-none pl-0 space-y-1 text-[15px]">
            {finePrint.map((item, index) => (
              <li
                key={index}
                className={`break-words leading-snug ${
                  item.includes('Critical') ? 'text-orange-600' : 'text-red-600'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

