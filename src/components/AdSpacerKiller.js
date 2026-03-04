'use client';
import { useEffect } from 'react';

export default function AdSpacerKiller() {
    useEffect(() => {
        const kill = () => {
            const spacer = document.getElementById('fixed_container_bottom');
            if (spacer) {
                spacer.style.setProperty('height', '0', 'important');
                spacer.style.setProperty('min-height', '0', 'important');
                spacer.style.setProperty('display', 'none', 'important');
            }
        };

        const observer = new MutationObserver(kill);
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        kill();

        return () => observer.disconnect();
    }, []);

    return null;
}
