"use client";

import { useState } from "react";

export default function GetLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy  // you can display this too
        });
        setError(null);
      },
      (err) => {
        setError("Unable to retrieve your location. " + err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="p-4">
      <button
        onClick={handleGetLocation}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Get My Location
      </button>

      {location && (
        <div className="mt-4">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lon}</p>
        </div>
      )}

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
}