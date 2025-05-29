import React, { useState, useEffect, useRef, useCallback } from 'react';
import RestaurantList from '../components/RestaurantList';

const DynamicRestaurantPage = ({ title, endpoint, extraParams }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    // Fetch restaurants whenever offset changes
    useEffect(() => {
        const fetchRestaurants = async () => {
            if (!hasMore) return;
            setIsLoading(true);
            setError(null);
            try {
                const body = { limit: 10, offset, ...extraParams };
                const fullEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
                const res = await fetch(fullEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                if (!res.ok) {
                    const txt = await res.text();
                    throw new Error(`${res.status} ${txt}`);
                }

                const newData = await res.json();
                // Parse newData into an array
                const newRestaurants = Array.isArray(newData)
                    ? newData
                    : (newData.restaurants || []);

                if (newRestaurants.length < 10) {
                    setHasMore(false);
                }
                setRestaurants(prev => [...prev, ...newRestaurants]);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRestaurants();
    }, [offset, endpoint, extraParams, hasMore]);

    // Use an IntersectionObserver to trigger loading more when the sentinel is visible.
    const observer = useRef();
    const sentinelRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset(prev => prev + 10);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <RestaurantList restaurants={restaurants} />
            {isLoading && <p className="py-4">Loading more…</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!hasMore && <p className="py-4">No more restaurants</p>}
            {/* Sentinel element to trigger infinite loading */}
            <div ref={sentinelRef} style={{ height: '1px' }}></div>
        </div>
    );
};

export default DynamicRestaurantPage;
