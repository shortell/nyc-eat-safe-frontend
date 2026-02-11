"use client";

import { useState } from "react";

export default function InspectionExplanation({ className = "", collapsible = false }) {
    const [isOpen, setIsOpen] = useState(!collapsible);

    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
            <div
                onClick={() => collapsible && setIsOpen(!isOpen)}
                className={`flex items-center justify-between py-4 px-6 ${collapsible ? 'cursor-pointer hover:bg-slate-50 transition-colors' : ''}`}
            >
                <h2 className="text-xl font-bold text-slate-900">
                    {collapsible ? "How Do Inspections Work?" : "How Do Inspections Work"}
                </h2>
                {collapsible && (
                    <svg
                        className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </div>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                        Restaurants start an inspection with a score of <strong>0</strong>. Violations add points depending on severity. The more points, the lower the grade.
                    </p>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full text-sm">A</span>
                            <span className="text-slate-700 text-sm font-medium">0 - 13 points</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 font-bold rounded-full text-sm">B</span>
                            <span className="text-slate-700 text-sm font-medium">14 - 27 points</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-700 font-bold rounded-full text-sm">C</span>
                            <span className="text-slate-700 text-sm font-medium">28+ points</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
