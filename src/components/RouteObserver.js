"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RouteObserver() {
    const pathname = usePathname();

    useEffect(() => {
        if (!document) return;

        // Specific class for privacy page to control Mediavine injected text
        if (pathname === '/privacy') {
            document.body.classList.add('is-privacy-page');
        } else {
            document.body.classList.remove('is-privacy-page');
        }
    }, [pathname]);

    return null;
}
