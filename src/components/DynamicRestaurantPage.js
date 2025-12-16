// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import RestaurantList from '../components/RestaurantList';

// const DynamicRestaurantPage = ({ title, endpoint, extraParams }) => {
//     const [restaurants, setRestaurants] = useState([]);
//     const [offset, setOffset] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch restaurants whenever offset changes
//     useEffect(() => {
//         let isActive = true; // Flag to track if the effect is still active

//         // console.log('Current offset:', offset);
//         // console.log("Extra Params:", extraParams);
//         const fetchRestaurants = async () => {
//             if (!hasMore) return;
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const body = { limit: 10, offset, ...extraParams };
//                 const fullEndpoint = `https://nyc-eat-safe-production.up.railway.app${endpoint}`;
//                 const res = await fetch(fullEndpoint, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json'
//                     },
//                     body: JSON.stringify(body)
//                 });

//                 if (!res.ok) {
//                     const txt = await res.text();
//                     throw new Error(`${res.status} ${txt}`);
//                 }

//                 const newData = await res.json();

//                 if (isActive) { // Only process and set state if the effect is still active
//                     // Parse newData into an array
//                     const newRestaurants = Array.isArray(newData)
//                         ? newData
//                         : (newData.restaurants || []);

//                     if (newRestaurants.length < 10) {
//                         setHasMore(false);
//                     }
//                     setRestaurants(prev => [...prev, ...newRestaurants]);
//                 }
//             } catch (err) {
//                 if (isActive) { // Only set error if active
//                     setError(err.message);
//                 }
//             } finally {
//                 if (isActive) { // Only set loading if active
//                     setIsLoading(false);
//                 }
//             }
//         };

//         fetchRestaurants();

//         return () => {
//             isActive = false; // Cleanup function: mark effect as inactive
//         };
//     }, [offset, endpoint, extraParams, hasMore]);

//     // Use an IntersectionObserver to trigger loading more when the sentinel is visible.
//     const observer = useRef();
//     const sentinelRef = useCallback(node => {
//         if (isLoading) return;
//         if (observer.current) observer.current.disconnect();
//         observer.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting && hasMore) {
//                 setOffset(prev => prev + 10);
//             }
//         });
//         if (node) observer.current.observe(node);
//     }, [isLoading, hasMore]);

//     return (
//         <div className="p-4 bg-[#f5f2fa]">
//             <h1 className="bg-gradient-to-b from-[#2A3E83] via-[#1655A0] to-[#016CCE] bg-gradient-to-b from-[0%] via-[90%] to-[98%] text-white p-3 rounded-md text-2xl font-bold mb-4">{title}</h1>
//             <RestaurantList restaurants={restaurants} />
//             {isLoading && <p className="py-4">Loading more…</p>}
//             {error && <p className="text-red-500">{error}</p>}
//             {!hasMore && <p className="py-4">No more restaurants</p>}
//             {/* Sentinel element to trigger infinite loading */}
//             <div ref={sentinelRef} style={{ height: '1px' }}></div>
//         </div>
//     );
// };

// export default DynamicRestaurantPage;
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import RestaurantList from '../components/RestaurantList';
import SkeletonCard from './SkeletonCard';

const PAGE_SIZE = 10;

export default function DynamicRestaurantPage({ title, endpoint, extraParams }) {
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
            const fullEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
            const res = await fetch(fullEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ limit: PAGE_SIZE, offset: start, ...extraParams }),
            });

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
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {title}
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                </div>

                <RestaurantList restaurants={restaurants} />

                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
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
