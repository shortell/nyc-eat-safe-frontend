"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import DynamicRestaurantPage from '../../components/DynamicRestaurantPage';
import { useLocation } from '@/context/LocationContext';
import FilterDashboard from '@/components/FilterDashboard';
import Chip from '@mui/material/Chip';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

export default function CategoryByParamsPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CategoryByParamsContent />
    </React.Suspense>
  );
}

function CategoryByParamsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categoryName, setCategoryName] = useState(null);
  const [baseEndpoint, setBaseEndpoint] = useState(null);

  const { location, status: locationStatus, errorMsg, requestLocation } = useLocation();

  // State Init
  const [zipcode, setZipcode] = useState(searchParams.get('zipcode') || '');
  const [submittedZipcode, setSubmittedZipcode] = useState(searchParams.get('zipcode') || null);

  const initialRadius = searchParams.get('radius') ? Number(searchParams.get('radius')) : null;
  const [radius, setRadius] = useState(initialRadius);
  const [debouncedRadius, setDebouncedRadius] = useState(initialRadius);

  const [distanceDir, setDistanceDir] = useState(searchParams.get('distance_dir') || 'ASC');

  useEffect(() => {
    setCategoryName(searchParams.get('category_name'));
    setBaseEndpoint(searchParams.get('category_endpoint'));
  }, [searchParams]);

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

    const pDistDir = searchParams.get('distance_dir') || 'ASC';
    if (pDistDir !== distanceDir) setDistanceDir(pDistDir);
  }, [searchParams]);

  // Sync State -> URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Zipcode
    if (submittedZipcode) params.set('zipcode', submittedZipcode);
    else params.delete('zipcode');

    // Radius
    if (debouncedRadius) params.set('radius', debouncedRadius);
    else params.delete('radius');

    // Sort
    params.set('distance_dir', distanceDir);

    // Update URL
    const newSearch = params.toString();
    if (newSearch !== searchParams.toString()) {
      router.replace(`${pathname}?${newSearch}`, { scroll: false });
    }
  }, [submittedZipcode, debouncedRadius, distanceDir, pathname, router, searchParams]);

  // Debounce radius
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

  const handleSortClick = () => {
    if (submittedZipcode) return; // Disable click
    setDistanceDir((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
  };

  // Determine active endpoint and params
  const { endpoint, extraParams } = useMemo(() => {
    if (!baseEndpoint) return { endpoint: null, extraParams: {} };

    // 1. Zipcode Search (Highest Priority if entered)
    if (submittedZipcode) {
      return {
        endpoint: `/zipcode/${submittedZipcode}${baseEndpoint}`,
        extraParams: {} // Zipcode endpoints don't support sort/radius
      };
    }

    // 2. Geolocation (If location found and NOT using zipcode)
    if (locationStatus === 'found' && location) {
      const nearbyEndpoint = `${baseEndpoint}-nearby`;

      const params = {
        latitude: location.latitude,
        longitude: location.longitude,
        distance_dir: distanceDir
      };

      if (debouncedRadius !== null) {
        params.radius = debouncedRadius;
      }

      return {
        endpoint: nearbyEndpoint,
        extraParams: params
      };
    }

    // 3. Default (Original Category List)
    return {
      endpoint: baseEndpoint,
      extraParams: {}
    };

  }, [baseEndpoint, submittedZipcode, location, locationStatus, debouncedRadius, distanceDir]);


  if (categoryName === null || baseEndpoint === null) {
    return (
      <div className="container mx-auto px-4 py-6">
      </div>
    );
  }

  // Show controls if we have location found (even if overridden by zip, we want to show disabled controls)
  const showLocationControls = locationStatus === 'found' && location;
  const controlsDisabled = !!submittedZipcode;

  return (
    <div className="min-h-screen bg-[#f5f2fa]">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header Area */}
        <div className="flex flex-col gap-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {categoryName}
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
                <Chip
                  label="Distance"
                  onClick={handleSortClick}
                  color="primary"
                  variant="filled"
                  icon={distanceDir === 'ASC' ? <NorthIcon /> : <SouthIcon />}
                  clickable={!controlsDisabled}
                  disabled={controlsDisabled}
                />
              }
            />


          </div>
        </div>

        {/* Status Messages for Location */}
        <div className="pl-1 mb-2">
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

        <DynamicRestaurantPage
          title={categoryName}
          endpoint={endpoint}
          extraParams={extraParams}
          hideTitle={true}
          shouldReset={searchParams.get('should_reset') === 'true'}
        />
      </div>
    </div>
  );
}