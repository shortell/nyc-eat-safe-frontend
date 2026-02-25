// ... imports
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRestaurantList } from '@/context/RestaurantListContext';
import RestaurantList from '../components/RestaurantList';
import SkeletonCard from './SkeletonCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

const PAGE_SIZE = 12;

export default function DynamicRestaurantPage({ title, endpoint, extraParams, hideTitle, shouldReset = false }) {
    const { saveSnapshot, getSnapshot, clearSnapshot } = useRestaurantList();
    const storageKey = `${endpoint}?${JSON.stringify(extraParams)}`; // Unique key for this list view

    const [restaurants, setRestaurants] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const observerRef = useRef(null);
    const lastFetchTime = useRef(0);
    const isFetchingRef = useRef(false);
    const isRestoringRef = useRef(false); // Flag to prevent double-fetching during restoration
    const scrollSaveTimeoutRef = useRef(null);
    const prevEndpointRef = useRef(endpoint); // Track previous endpoint to detect major context switches

    const MIN_LOAD_TIME = 300;
    const FETCH_THROTTLE_MS = 500;

    // --- Persistence Logic ---

    // --- Persistence Logic ---



    // Save state helper
    const persistState = useCallback((newRestaurants, newOffset, newHasMore) => {
        const scrollContainer = document.getElementById('main-content');
        saveSnapshot(storageKey, {
            restaurants: newRestaurants,
            offset: newOffset,
            hasMore: newHasMore,
            scrollPosition: scrollContainer ? scrollContainer.scrollTop : 0
        });
    }, [saveSnapshot, storageKey]);

    // Save scroll position on scroll (throttled) 
    // AND on unmount to capture the exact exit state
    useEffect(() => {
        const scrollContainer = document.getElementById('main-content');
        if (!scrollContainer) return;

        const handleScroll = () => {
            const currentY = scrollContainer.scrollTop;
            setShowBackToTop(currentY > 1500);

            if (scrollSaveTimeoutRef.current) return;
            scrollSaveTimeoutRef.current = setTimeout(() => {
                if (restaurants.length > 0) {
                    saveSnapshot(storageKey, {
                        restaurants,
                        offset,
                        hasMore,
                        scrollPosition: currentY
                    });
                }
                scrollSaveTimeoutRef.current = null;
            }, 500);
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (scrollSaveTimeoutRef.current) clearTimeout(scrollSaveTimeoutRef.current);
        };
    }, [saveSnapshot, storageKey, restaurants, offset, hasMore]);


    // --- Fetching Logic ---

    const fetchRestaurants = useCallback(async (start, isReset = false) => {
        if (isFetchingRef.current) return;

        const now = Date.now();
        if (start > 0 && now - lastFetchTime.current < FETCH_THROTTLE_MS && !isReset) {
            return;
        }

        let lockTimeout = null;

        try {
            isFetchingRef.current = true;
            setIsLoading(true);

            // Scroll lock logic (only if not resetting/initial load)
            if (start > 0) {
                lockTimeout = setTimeout(() => {
                    const scrollContainer = document.getElementById('main-content');
                    if (scrollContainer && isFetchingRef.current) {
                        scrollContainer.style.overflow = 'hidden';
                    }
                }, 150);
            }

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
                params.delete('method');
                fullEndpoint += `?${params.toString()}`;
            } else {
                fetchOptions.body = JSON.stringify({ limit: PAGE_SIZE, offset: start, ...extraParams });
            }

            const res = await fetch(fullEndpoint, fetchOptions);
            if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);

            const json = await res.json();
            const newData = Array.isArray(json) ? json : json.restaurants || [];

            // Minimum load time for UX
            const elapsed = Date.now() - loadStartTime;
            if (elapsed < MIN_LOAD_TIME) {
                await new Promise(resolve => setTimeout(resolve, MIN_LOAD_TIME - elapsed));
            }

            let finalRestaurants = [];
            if (isReset || start === 0) {
                finalRestaurants = newData;
            } else {
                setRestaurants(prev => {
                    const seen = new Set(prev.map(r => r.camis));
                    const uniqueNew = newData.filter(r => !seen.has(r.camis));
                    finalRestaurants = [...prev, ...uniqueNew];
                    return finalRestaurants;
                });
            }

            // If we reset/start:0, we set it directly
            if (isReset || start === 0) {
                setRestaurants(finalRestaurants);
                // If reset, we also need to explicitly prompt state save after render
                // But we'll do it via the effect dependency or explicit call below
            }

            const newHasMore = newData.length >= PAGE_SIZE;
            setHasMore(newHasMore);

            // Persist immediately after fetch
            persistState(finalRestaurants, start, newHasMore);

        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        } finally {
            if (lockTimeout) clearTimeout(lockTimeout);
            setIsLoading(false);
            const scrollContainer = document.getElementById('main-content');
            if (scrollContainer) scrollContainer.style.overflow = '';
            isFetchingRef.current = false;
        }
    }, [endpoint, extraParams, persistState]);


    // --- Initialization & Restore ---

    const isInitialMount = useRef(true);

    useEffect(() => {
        // Disable browser's native scroll restoration to prevent fighting
        if (typeof window !== 'undefined' && window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // 1. Check if we have a saved snapshot for this exact view
        // ONLY restore on initial mount (e.g. back button). 
        // If we are just changing filters/zip (updates), we want fresh search behavior (top of page).
        // If shouldReset is true, we explicitly want to ignore/clear cache (e.g. "See all" link).
        let snapshot = null;
        if (isInitialMount.current) {
            if (shouldReset) {
                clearSnapshot(storageKey);
                // Clean up the URL to remove should_reset param so reload doesn't keep resetting?
                // Actually, if the URL keeps reset=true, a reload *should* probably reset too.
                // But navigating *back* to this URL would also reset. 
                // That might be desired for "See all". 
            } else {
                snapshot = getSnapshot(storageKey);
            }
        }

        if (snapshot) {
            // Restore from cache
            console.log("Restoring from cache:", storageKey);
            isRestoringRef.current = true;
            setRestaurants(snapshot.restaurants);
            setOffset(snapshot.offset);
            setHasMore(snapshot.hasMore);

            // Restore scroll position with robust timing to ensure DOM is ready
            // We use a small timeout + requestAnimationFrame to ensure React has committed the render
            // and the browser has calculated the layout.
            setTimeout(() => {
                requestAnimationFrame(() => {
                    const scrollContainer = document.getElementById('main-content');
                    if (scrollContainer) {
                        scrollContainer.scrollTop = snapshot.scrollPosition;
                    }
                    isRestoringRef.current = false;
                });
            }, 100);



        } else {
            // New load (either no snapshot, or not initial mount)
            // Only clear if the primary endpoint path has changed, 
            // NOT if only params changed (sort/radius filter)
            // This prevents the "jump" to top caused by height collapse
            if (prevEndpointRef.current !== endpoint) {
                setRestaurants([]);
            }
            // If we are NOT restoring, we can ensure isRestoring is false
            isRestoringRef.current = false;

            setOffset(0);
            setHasMore(true);
            isFetchingRef.current = false;
            lastFetchTime.current = 0;
            fetchRestaurants(0);

            prevEndpointRef.current = endpoint;
        }

        isInitialMount.current = false;

    }, [storageKey, getSnapshot, fetchRestaurants]); // Dependencies ensure this runs when key changes


    // --- Intersection Observer (Infinite Scroll) ---

    const sentinelRef = useCallback(node => {
        if (isLoading || !hasMore || isRestoringRef.current) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetchingRef.current) {
                const nextOffset = offset + PAGE_SIZE;
                setOffset(nextOffset);
                fetchRestaurants(nextOffset);
            }
        }, {
            rootMargin: '100px',
        });

        if (node) observerRef.current.observe(node);
    }, [offset, isLoading, hasMore, fetchRestaurants]);


    // --- Handlers ---

    const handleScrollToTop = () => {
        const scrollContainer = document.getElementById('main-content');
        if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Reset state
        clearSnapshot(storageKey);
        setRestaurants([]);
        setOffset(0);
        setHasMore(true);
        setIsLoading(true); // Show loader immediately

        // Fetch fresh
        setTimeout(() => {
            fetchRestaurants(0, true);
        }, 500); // Wait for scroll to visually complete/start
    };

    return (
        <div className="min-h-screen bg-[#f5f2fa] relative">
            <div className={`max-w-[1600px] mx-auto px-4 ${hideTitle ? 'pb-8 pt-0' : 'py-8'}`}>
                {/* Back to Top Button */}
                <div className="sticky top-6 z-50 flex justify-end pointer-events-none h-0">
                    <Zoom in={showBackToTop}>
                        <div
                            onClick={handleScrollToTop}
                            role="presentation"
                            className="pointer-events-auto shadow-lg rounded-full"
                        >
                            <Fab
                                color="secondary"
                                size="medium"
                                aria-label="scroll back to top"
                                sx={{
                                    backgroundColor: '#2850B7', // Midpoint blue
                                    color: '#fff',
                                    boxShadow: '0 4px 12px rgba(40, 80, 183, 0.4)',
                                    '&:hover': { backgroundColor: '#1A52BC' }
                                }}
                            >
                                <ArrowUpwardIcon sx={{ fontSize: '28px', stroke: "#fff", strokeWidth: 1 }} />
                            </Fab>
                        </div>
                    </Zoom>
                </div>

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

                {/* Sentinel */}
                <div ref={sentinelRef} className="h-4" />
            </div>


        </div>
    );
}
