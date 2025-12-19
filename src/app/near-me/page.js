"use client";

import React, { useState, useEffect, useMemo } from 'react';
import DynamicRestaurantPage from '../../components/DynamicRestaurantPage';
import TextField from '@mui/material/TextField';

export default function NearMePage() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, finding, found, error
  const [zipcode, setZipcode] = useState('');
  const [submittedZipcode, setSubmittedZipcode] = useState(null);

  useEffect(() => {
    setLocationStatus('finding');
    if (typeof window !== 'undefined' && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationStatus('found');
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
  }, []);

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

  // Determine active endpoint and params with useMemo
  const { endpoint, extraParams } = useMemo(() => {
    if (submittedZipcode) {
      return {
        endpoint: `/zipcode/${submittedZipcode}`,
        extraParams: {}
      };
    } else if (locationStatus === 'found' && coords.latitude && coords.longitude) {
      return {
        endpoint: '/near-me',
        extraParams: {
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      };
    }
    return { endpoint: null, extraParams: {} };
  }, [submittedZipcode, locationStatus, coords.latitude, coords.longitude]);

  return (
    <div className="min-h-screen bg-[#f5f2fa]">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Persistent Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Near Me
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
          </div>

          <div className="md:ml-4">
            <TextField
              id="zipcode-input"
              label="Zipcode"
              variant="outlined"
              size="small"
              value={zipcode}
              onChange={handleZipcodeChange}
              sx={{ backgroundColor: 'white' }}
              placeholder="Enter Zipcode"
            />
          </div>
        </div>

        {/* Content Area */}
        {endpoint ? (
          <DynamicRestaurantPage
            key={endpoint} // Force remount on endpoint change
            title="Near Me Results"
            endpoint={endpoint}
            extraParams={extraParams}
            hideTitle={true} // We provide our own header
          />
        ) : (
          <div className="mt-8 text-gray-600 pl-2">
            {locationStatus === 'finding' ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p>Locating...</p>
              </div>
            ) : (
              <p>Enter a valid 5-digit zipcode to search for restaurants.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
