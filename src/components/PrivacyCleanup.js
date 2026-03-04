"use client";

import { useEffect, useRef } from 'react';

export default function PrivacyCleanup({ containerSelector = '#main-content' }) {
    const initializedRef = useRef(false);

    useEffect(() => {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // On mount, mark all existing children as "original"
        const originalChildren = new Set(Array.from(container.children));

        // This is to prevent re-running in Strict Mode double invocations
        if (!initializedRef.current) {
            initializedRef.current = true;
        }

        // On unmount, remove anything that wasn't in the original set
        return () => {
            const currentChildren = Array.from(container.children);
            currentChildren.forEach(child => {
                if (!originalChildren.has(child)) {
                    child.remove();
                }
            });
        };
    }, [containerSelector]);

    return null;
}
