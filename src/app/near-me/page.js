"use client";

import React, { useState, useEffect, useMemo } from 'react';
import DynamicRestaurantPage from '../../components/DynamicRestaurantPage';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function NearMePage() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, finding, found, error
  const [zipcode, setZipcode] = useState('');
  const [submittedZipcode, setSubmittedZipcode] = useState(null);

  // New state for NearMeRequest
  const [radius, setRadius] = useState(1); // radius in miles, default 1
  const [debouncedRadius, setDebouncedRadius] = useState(1); // Debounced radius for API calls
  const [primarySort, setPrimarySort] = useState('distance'); // 'distance' or 'score'
  const [distanceDir, setDistanceDir] = useState('ASC'); // 'ASC' or 'DESC'
  const [scoreDir, setScoreDir] = useState('ASC'); // 'ASC' or 'DESC'

  const handleUseLocation = () => {
    setLocationStatus('finding');
    if (typeof window !== 'undefined' && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationStatus('found');
          setSubmittedZipcode(null);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          setLocationStatus('error');
        },
        { timeout: 10000 }
      );
    } else {
      setLocationStatus('error');
    }
  };

  // Debounce radius changes
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
      if (val !== submittedZipcode) {
        setSubmittedZipcode(val);
        // Reset location status to avoid conflict if user manually enters zipcode while location is active
        setLocationStatus('user_override');
      }
    }
  };

  const handleSortClick = (sortType) => {
    // Always toggle direction for the clicked sort type
    if (sortType === 'distance') {
      setDistanceDir((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setScoreDir((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    }

    // Switch primary sort if it's different
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
    } else if (locationStatus === 'found' && coords.latitude && coords.longitude) {
      return {
        endpoint: '/near-me',
        extraParams: {
          ...params,
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      };
    }
    return { endpoint: null, extraParams: {} };
  }, [submittedZipcode, locationStatus, coords.latitude, coords.longitude, debouncedRadius, primarySort, distanceDir, scoreDir]);

  return (
    <div className="min-h-screen bg-[#f5f2fa]">
      <div className="max-w-[1600px] mx-auto px-4 py-4 md:py-8">
        {/* Persistent Header */}
        <div className="flex flex-col gap-4 md:gap-6 mb-4 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Near Me
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>

            {locationStatus !== 'found' && (
              <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                <TextField
                  id="zipcode-input"
                  label="Zipcode"
                  variant="outlined"
                  size="small"
                  value={zipcode}
                  onChange={handleZipcodeChange}
                  sx={{ backgroundColor: 'white', width: { xs: '100%', md: '200px' } }}
                  placeholder="Enter Zipcode"
                />
                <span className="text-gray-500 font-medium">OR</span>
                <Button
                  variant="contained"
                  onClick={handleUseLocation}
                  startIcon={<MyLocationIcon />}
                  sx={{
                    backgroundColor: '#2563eb',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: '#1d4ed8'
                    }
                  }}
                >
                  Use My Location
                </Button>
              </div>
            )}
          </div>

          {/* Controls Area (Radius & Sorting) */}
          {/* Show when we have a valid endpoint, but HIDE if in zipcode mode */}
          {(endpoint && !submittedZipcode) && (
            <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">

              {/* Radius Slider */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full md:w-auto min-w-[300px]">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Search Radius (Miles)
                </span>
                <Slider
                  value={radius || 11}
                  onChange={(e, val) => setRadius(val === 11 ? null : val)}
                  min={1}
                  max={11}
                  step={1}
                  marks={[
                    { value: 1, label: '1 Mile' },
                    { value: 11, label: <span className="mr-3">Citywide</span> }
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(val) => val === 11 ? 'Citywide' : val}
                  sx={{ width: '92%', mx: 'auto' }}
                />
              </div>

              <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

              {/* Sorting Chips */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">Sort by:</span>

                <Chip
                  label="Nearest"
                  onClick={() => handleSortClick('distance')}
                  color={primarySort === 'distance' ? "primary" : "default"}
                  variant={primarySort === 'distance' ? "filled" : "outlined"}
                  icon={distanceDir === 'ASC' ? <NorthIcon /> : <SouthIcon />}
                  clickable
                />

                <Chip
                  label="Cleanest"
                  onClick={() => handleSortClick('score')}
                  color={primarySort === 'score' ? "primary" : "default"}
                  variant={primarySort === 'score' ? "filled" : "outlined"}
                  icon={scoreDir === 'ASC' ? <NorthIcon /> : <SouthIcon />}
                  clickable
                />
              </div>

            </div>
          )}
        </div>

        {/* Content Area */}
        {endpoint ? (
          <DynamicRestaurantPage
            key={endpoint}
            title="Near Me Results"
            endpoint={endpoint}
            extraParams={extraParams}
            hideTitle={true}
          />
        ) : (
          <div className="mt-8 text-gray-600 pl-2">
            {locationStatus === 'finding' ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p>Locating...</p>
              </div>
            ) : (
              <p>Enter a zipcode or use your location to find restaurants.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
