'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import RestaurantList from '../components/RestaurantList';
import SkeletonCard from './SkeletonCard';

const PAGE_SIZE = 12;

export default function DynamicRestaurantPage({ title, endpoint, extraParams, hideTitle }) {
    const [restaurants, setRestaurants] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const observerRef = useRef(null);

    const lastFetchTime = useRef(0);
    const isFetchingRef = useRef(false);
    const MIN_LOAD_TIME = 300; // REDUCED: Show spinner for less time to feel snappier
    const FETCH_THROTTLE_MS = 500; // REDUCED: Allow ~2 requests/sec to prevent "sticking"

    // ✅ Fetch page of restaurants
    const fetchRestaurants = useCallback(async (start) => {
        // Strict lock to prevent parallel or rapid-fire requests
        if (isFetchingRef.current) return;

        const now = Date.now();
        // Throttle rapid repeated calls (except the very first one)
        if (start > 0 && now - lastFetchTime.current < FETCH_THROTTLE_MS) {
            return;
        }

        let lockTimeout = null;

        try {
            isFetchingRef.current = true;
            setIsLoading(true);

            // PHYSICAL LOCK: Stop scrolling (inertia kill) - DELAYED
            // CSS 'scrollbar-gutter: stable' prevents the layout shift.
            // DELAY: 150ms allows a bit of "slide" to reveal skeletons before stopping.
            lockTimeout = setTimeout(() => {
                const scrollContainer = document.getElementById('main-content');
                if (scrollContainer && isFetchingRef.current) {
                    scrollContainer.style.overflow = 'hidden';
                }
            }, 150);

            lastFetchTime.current = Date.now();

            const loadStartTime = Date.now();

            const isGet = (extraParams.method === 'GET' || endpoint.startsWith('/zipcode/'));

            let fullEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
            let fetchOptions = {
                method: isGet ? 'GET' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };

            if (isGet) {
                const params = new URLSearchParams({
                    limit: PAGE_SIZE,
                    offset: start,
                    ...extraParams
                });
                // Remove method from params if it was passed in extraParams
                params.delete('method');
                fullEndpoint += `?${params.toString()}`;
            } else {
                fetchOptions.body = JSON.stringify({ limit: PAGE_SIZE, offset: start, ...extraParams });
            }

            const res = await fetch(fullEndpoint, fetchOptions);

            if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
            const json = await res.json();
            const newData = Array.isArray(json) ? json : json.restaurants || [];

            // Enforce minimum loading time for smoothness
            const elapsed = Date.now() - loadStartTime;
            if (elapsed < MIN_LOAD_TIME) {
                await new Promise(resolve => setTimeout(resolve, MIN_LOAD_TIME - elapsed));
            }

            // ✅ Deduplicate by camis
            setRestaurants(prev => {
                const seen = new Set(prev.map(r => r.camis));
                const uniqueNew = newData.filter(r => !seen.has(r.camis));
                return [...prev, ...uniqueNew];
            });

            if (newData.length < PAGE_SIZE) setHasMore(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        } finally {
            // Clear the lock timer if fetch finished fast
            if (lockTimeout) clearTimeout(lockTimeout);

            setIsLoading(false);
            // UNLOCK: Restore scrolling
            const scrollContainer = document.getElementById('main-content');
            if (scrollContainer) {
                scrollContainer.style.overflow = '';
            }

            // Only release lock AFTER everything is done
            isFetchingRef.current = false;
        }
    }, [endpoint, extraParams]);

    // ✅ Load initial page
    useEffect(() => {
        // Sync background color to prevent "black flicker" in scrollbar gutter
        const scrollContainer = document.getElementById('main-content');
        if (scrollContainer) {
            scrollContainer.style.backgroundColor = '#f5f2fa';
        }

        setRestaurants([]);
        setOffset(0);
        setHasMore(true);
        // Reset locks for fresh load
        isFetchingRef.current = false;
        lastFetchTime.current = 0;
        // Ensure scroll is unlocked if component remounts quickly
        if (scrollContainer) {
            scrollContainer.style.overflow = '';
        }
        fetchRestaurants(0);

        return () => {
            // Reset background on unmount so it doesn't affect other pages
            if (scrollContainer) {
                scrollContainer.style.backgroundColor = '';
            }
        };
    }, [endpoint, extraParams, fetchRestaurants]);

    // ✅ Fetch next page on scroll
    const sentinelRef = useCallback(node => {
        if (isLoading || !hasMore) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            // Check lock immediately. If locked, do NOTHING (Stop user).
            if (entries[0].isIntersecting && !isFetchingRef.current) {
                const nextOffset = offset + PAGE_SIZE;
                setOffset(nextOffset);
                fetchRestaurants(nextOffset);
            }
        }, {
            rootMargin: '100px', // REDUCED: Fetch later for smoother stop
        });

        if (node) observerRef.current.observe(node);
    }, [offset, isLoading, hasMore, fetchRestaurants]);

    return (
        <div className="min-h-screen bg-[#f5f2fa]">
            <div className="max-w-[1600px] mx-auto px-4 py-8">
                {!hideTitle && (
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {title}
                        </h1>
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                    </div>
                )}

                <RestaurantList restaurants={restaurants} isLoading={isLoading} />

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-6 text-center">
                        {error}
                    </div>
                )}

                {!hasMore && restaurants.length > 0 && (
                    <p className="py-12 text-center text-gray-500 font-medium">
                        You&apos;ve reached the end of the list
                    </p>
                )}

                {/* Sentinel triggers next page load */}
                <div ref={sentinelRef} className="h-4" />
            </div>
        </div>
    );
}
