"use client";

import { useState } from "react";

export default function NGradeExplanation({ className = "" }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between py-4 px-6 cursor-pointer hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-900">
                        What Does an N Grade Mean?
                    </h2>
                </div>
                <svg
                    className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed space-y-4">
                    <p>
                        An <strong>N</strong> grade means that an inspection has happened, the inspector found violations and gave a score, but did not assign a letter grade.
                    </p>
                    <p>
                        This status often allows restaurants to keep their previous grade displayed in their window.
                    </p>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                        <p className="text-amber-900 font-medium mb-2">Important Context:</p>
                        <ul className="list-disc list-outside space-y-1 ml-5 text-amber-800">
                            <li>There are more <strong>&quot;N&quot;</strong> grades than all <strong>&quot;B&quot;</strong> and <strong>&quot;C&quot;</strong> grades combined.</li>
                            <li><strong>80%</strong> of &quot;N&quot; grade restaurants have too many violations to get an A.</li>
                            <li>A few exceptions get an &quot;N&quot; despite having a low enough score for an A.</li>
                            <li>Restaurants with an &quot;N&quot; and <strong>no score</strong> usually haven&apos;t been inspected yet.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
