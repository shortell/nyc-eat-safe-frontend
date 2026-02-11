"use client";
import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 pb-8 h-full flex flex-col space-y-4 animate-pulse max-w-[320px] md:max-w-[360px] mx-auto md:mx-0">
            {/* Header Skeleton */}
            <div className="space-y-2 border-b-2 border-gray-100 pb-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="flex gap-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="flex gap-4 mt-auto pt-3">
                {/* Grade Box */}
                <div className="w-[90px] h-24 bg-gray-200 rounded-xl"></div>
                {/* Text Box */}
                <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
