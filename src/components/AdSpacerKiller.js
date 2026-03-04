'use client';
import { useEffect } from 'react';

export default function AdSpacerKiller() {
    useEffect(() => {
        const kill = () => {
            const spacer = document.getElementById('fixed_container_bottom');
            if (spacer) {
                spacer.style.setProperty('height', '0', 'important');
                spacer.style.setProperty('min-height', '0', 'important');
                spacer.style.setProperty('max-height', '0', 'important');
                spacer.style.setProperty('overflow', 'hidden', 'important');
                spacer.style.setProperty('padding', '0', 'important');
                spacer.style.setProperty('margin', '0', 'important');
            }
        };

        const observer = new MutationObserver(kill);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style'],
        });

        const interval = setInterval(kill, 500);
        kill();

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, []);

    return null;
}
