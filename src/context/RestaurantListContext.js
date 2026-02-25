'use client';

import React, { createContext, useContext, useRef, useCallback } from 'react';

const RestaurantListContext = createContext();

export function RestaurantListProvider({ children }) {
    // We use a Ref to store state so it doesn't trigger re-renders of the provider
    // effectively acting as a global mutable cache.
    const cacheRef = useRef(new Map());

    // Save state for a specific key (endpoint + params hash)
    const saveSnapshot = useCallback((key, state) => {
        // state = { restaurants, offset, hasMore, scrollPosition }
        cacheRef.current.set(key, {
            ...state,
            timestamp: Date.now()
        });

        // Optional: Prune old entries if map gets too big (e.g., > 10 lists)
        if (cacheRef.current.size > 10) {
            const sortedKeys = [...cacheRef.current.keys()].sort((a, b) => {
                return cacheRef.current.get(a).timestamp - cacheRef.current.get(b).timestamp;
            });
            // Delete oldest
            cacheRef.current.delete(sortedKeys[0]);
        }
    }, []);

    const getSnapshot = useCallback((key) => {
        return cacheRef.current.get(key);
    }, []);

    const clearSnapshot = useCallback((key) => {
        cacheRef.current.delete(key);
    }, []);

    return (
        <RestaurantListContext.Provider value={{ saveSnapshot, getSnapshot, clearSnapshot }}>
            {children}
        </RestaurantListContext.Provider>
    );
}

export function useRestaurantList() {
    return useContext(RestaurantListContext);
}
