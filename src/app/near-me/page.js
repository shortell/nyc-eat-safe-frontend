"use client";

import React, { useState, useEffect } from 'react';
import DynamicRestaurantPage from '../../components/DynamicRestaurantPage';

export default function NearMePage() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
  }, []);

  if (coords.latitude === null || coords.longitude === null) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Near Me</h1>
        <p>Fetching your location...</p>
      </div>
    );
  }

  return (
    <DynamicRestaurantPage
      title="Near me"
      endpoint="/near-me"
      extraParams={{
        latitude: coords.latitude,
        longitude: coords.longitude
      }}
    />
  );
}