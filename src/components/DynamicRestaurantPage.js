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

    // ✅ Fetch page of restaurants
    const fetchRestaurants = useCallback(async (start) => {
        try {
            setIsLoading(true);
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

            // ✅ Deduplicate by camis
            setRestaurants(prev => {
                const seen = new Set(prev.map(r => r.camis));
                const uniqueNew = newData.filter(r => !seen.has(r.camis));
                return [...prev, ...uniqueNew];
            });

            if (newData.length < PAGE_SIZE) setHasMore(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [endpoint, extraParams]);

    // ✅ Load initial page
    useEffect(() => {
        setRestaurants([]);
        setOffset(0);
        setHasMore(true);
        fetchRestaurants(0);
    }, [endpoint, extraParams, fetchRestaurants]);

    // ✅ Fetch next page on scroll
    const sentinelRef = useCallback(node => {
        if (isLoading || !hasMore) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const nextOffset = offset + PAGE_SIZE;
                setOffset(nextOffset);
                fetchRestaurants(nextOffset);
            }
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

                <RestaurantList restaurants={restaurants} />

                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 justify-items-center md:justify-items-start">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="min-w-[288px] w-[288px] md:min-w-[324px] md:w-[324px]">
                                <div className="w-[320px] md:w-[360px] h-full origin-top-left scale-[0.9]">
                                    <SkeletonCard />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-6 text-center">
                        {error}
                    </div>
                )}

                {!hasMore && restaurants.length > 0 && (
                    <p className="py-12 text-center text-gray-500 font-medium">
                        You've reached the end of the list
                    </p>
                )}

                {/* Sentinel triggers next page load */}
                <div ref={sentinelRef} className="h-4" />
            </div>
        </div>
    );
}
