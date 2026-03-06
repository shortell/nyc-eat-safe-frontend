'use client';

import React, { useState } from 'react';

export default function HistoryBanner() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleScroll = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
        setVisible(false);
    };

    return (
        <div className="max-w-3xl mx-auto mb-4 bg-blue-50 border border-blue-200 text-blue-900 px-4 py-3 rounded-xl flex items-start sm:items-center justify-between shadow-sm relative pr-10">
            <div className="text-sm font-medium leading-relaxed">
                <span className="font-bold mr-1">New:</span>
                You can now see a restaurant&apos;s inspection history!{' '}
                <button
                    onClick={handleScroll}
                    className="underline hover:text-blue-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors"
                >
                    Scroll to the bottom of the page
                </button>
            </div>
            <button
                onClick={() => setVisible(false)}
                className="absolute right-2 top-2 p-1 text-blue-400 hover:text-blue-700 hover:bg-blue-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close message"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}
