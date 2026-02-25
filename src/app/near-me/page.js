"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from '@/context/LocationContext';
import DynamicRestaurantPage from '../../components/DynamicRestaurantPage';
import FilterDashboard from '@/components/FilterDashboard';
import Chip from '@mui/material/Chip';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function NearMePage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <NearMeContent />
    </React.Suspense>
  );
}

function NearMeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldReset = searchParams.get('should_reset') === 'true';

  const { location, status: locationStatus, errorMsg, requestLocation } = useLocation();

  // Initialize state from URL Params or Defaults
  const [zipcode, setZipcode] = useState(searchParams.get('zipcode') || '');
  const [submittedZipcode, setSubmittedZipcode] = useState(searchParams.get('zipcode') || null);

  const initialRadius = searchParams.get('radius') ? Number(searchParams.get('radius')) : null;
  const [radius, setRadius] = useState(initialRadius);
  const [debouncedRadius, setDebouncedRadius] = useState(initialRadius);

  const [primarySort, setPrimarySort] = useState(searchParams.get('primary_sort') || 'distance');
  const [distanceDir, setDistanceDir] = useState(searchParams.get('distance_dir') || 'ASC');
  const [scoreDir, setScoreDir] = useState(searchParams.get('score_dir') || 'ASC');

  // Sync Params -> State (Handle Back Button)
  useEffect(() => {
    const pZip = searchParams.get('zipcode') || '';
    if (pZip !== zipcode) {
      setZipcode(pZip);
      setSubmittedZipcode(pZip || null);
    }

    const pRadius = searchParams.get('radius') ? Number(searchParams.get('radius')) : null;
    if (pRadius !== radius) {
      setRadius(pRadius);
      setDebouncedRadius(pRadius);
    }

    const pSort = searchParams.get('primary_sort') || 'distance';
    if (pSort !== primarySort) setPrimarySort(pSort);

    const pDistDir = searchParams.get('distance_dir') || 'ASC';
    if (pDistDir !== distanceDir) setDistanceDir(pDistDir);

    const pScoreDir = searchParams.get('score_dir') || 'ASC';
    if (pScoreDir !== scoreDir) setScoreDir(pScoreDir);

  }, [searchParams]);

  // Sync State -> URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Zipcode
    if (submittedZipcode) params.set('zipcode', submittedZipcode);
    else params.delete('zipcode');

    // Radius (Using debounced)
    if (debouncedRadius) params.set('radius', debouncedRadius);
    else params.delete('radius');

    // Sort
    params.set('primary_sort', primarySort);
    params.set('distance_dir', distanceDir);
    params.set('score_dir', scoreDir);

    // Update URL without scroll
    const newSearch = params.toString();
    if (newSearch !== searchParams.toString()) {
      router.replace(`${pathname}?${newSearch}`, { scroll: false });
    }
  }, [submittedZipcode, debouncedRadius, primarySort, distanceDir, scoreDir, pathname, router, searchParams]);

  // Debounce radius changes (Local UI -> Debounced State)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRadius(radius);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [radius]);


  const handleZipcodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipcode(val);

    if (val.length === 5) {
      setSubmittedZipcode(val);
    } else {
      if (val.length === 0 && submittedZipcode) {
        setSubmittedZipcode(null);
      }
    }
  };

  const handleSortClick = (sortType) => {
    if (submittedZipcode) return;

    if (sortType === 'distance') {
      setDistanceDir((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setScoreDir((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    }

    if (primarySort !== sortType) {
      setPrimarySort(sortType);
    }
  };

  // Determine active endpoint and params with useMemo
  const { endpoint, extraParams } = useMemo(() => {
    // Base params
    const params = {
      primary_sort: primarySort,
      distance_dir: distanceDir,
      score_dir: scoreDir,
    };
    // Use debouncedRadius for the API call
    if (debouncedRadius !== null) {
      params.radius = debouncedRadius;
    }

    if (submittedZipcode) {
      return {
        endpoint: `/zipcode/${submittedZipcode}`,
        extraParams: params
      };
    } else if (locationStatus === 'found' && location) {
      return {
        endpoint: '/near-me',
        extraParams: {
          ...params,
          latitude: location.latitude,
          longitude: location.longitude
        }
      };
    }
    return { endpoint: null, extraParams: {} };
  }, [submittedZipcode, locationStatus, location, debouncedRadius, primarySort, distanceDir, scoreDir]);

  // Show controls if we have location found (even if overridden by zip, we want to show disabled controls)
  const showLocationControls = locationStatus === 'found' && location;
  const controlsDisabled = !!submittedZipcode;

  return (
    <div className="min-h-screen bg-[#f5f2fa]">
      <div className="max-w-[1600px] mx-auto px-4 py-4 md:py-8">
        {/* Persistent Header */}
        <div className="flex flex-col gap-4 md:gap-6 mb-4 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Near Me
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>

            {/* Dashboard / Controls Area */}
            <FilterDashboard
              zipcode={zipcode}
              onZipcodeChange={handleZipcodeChange}
              locationStatus={locationStatus}
              requestLocation={requestLocation}
              showLocationControls={showLocationControls}
              radius={radius}
              setRadius={setRadius}
              controlsDisabled={controlsDisabled}
              sortChildren={
                <>
                  <Chip
                    label="Nearest"
                    onClick={() => handleSortClick('distance')}
                    color={primarySort === 'distance' ? "primary" : "default"}
                    variant={primarySort === 'distance' ? "filled" : "outlined"}
                    icon={distanceDir === 'ASC' ? <NorthIcon /> : <SouthIcon />}
                    clickable={!controlsDisabled}
                    disabled={controlsDisabled}
                  />
                  <Chip
                    label="Cleanest"
                    onClick={() => handleSortClick('score')}
                    color={primarySort === 'score' ? "primary" : "default"}
                    variant={primarySort === 'score' ? "filled" : "outlined"}
                    icon={scoreDir === 'ASC' ? <NorthIcon /> : <SouthIcon />}
                    clickable={!controlsDisabled}
                    disabled={controlsDisabled}
                  />
                </>
              }
            />
          </div>
        </div>

        {/* Status Messages for Location */}
        <div className="pl-1">
          {locationStatus === 'finding' && (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <p>Locating...</p>
            </div>
          )}
          {locationStatus === 'error' && (
            <p className="text-red-500">
              Unable to retrieve location. {errorMsg && `(${errorMsg})`} Please try zipcode.
            </p>
          )}
          {locationStatus === 'denied' && (
            <p className="text-red-500">
              Location permission denied. Please enable it or use zipcode.
            </p>
          )}
        </div>

        {/* Content Area */}
        {endpoint ? (
          <DynamicRestaurantPage
            key={endpoint + JSON.stringify(extraParams)}
            title="Near Me Results"
            endpoint={endpoint}
            extraParams={extraParams}
            hideTitle={true}
            shouldReset={shouldReset}
          />
        ) : (
          <div className="mt-8 text-gray-600 pl-2">
            <div>
              <p>Enter a zipcode or use your location to find restaurants.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
