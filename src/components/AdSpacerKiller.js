'use client';
import { useEffect, useState } from 'react';

export default function AdSpacerKiller() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const kill = () => {
            // Target empty divs in body that exist only to reserve space
            // Leave #fixed_container_bottom alone since it holds the actual ad
            document.querySelectorAll('body > div').forEach(el => {
                if (el.id === 'fixed_container_bottom') return; // skip the ad
                const isEmpty = el.children.length === 0 && el.innerText.trim() === '';
                const height = el.getBoundingClientRect().height;
                if (isEmpty && height > 20) {
                    el.style.setProperty('height', '0', 'important');
                    el.style.setProperty('min-height', '0', 'important');
                    el.style.setProperty('max-height', '0', 'important');
                    el.style.setProperty('overflow', 'hidden', 'important');
                }
            });
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
    }, [mounted]);

    return null;
}
