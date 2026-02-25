'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null); // { latitude, longitude }
    const [status, setStatus] = useState('idle'); // idle, finding, found, error, denied
    const [errorMsg, setErrorMsg] = useState(null);

    // On mount, check sessionStorage
    useEffect(() => {
        try {
            const cached = sessionStorage.getItem('userLocation');
            if (cached) {
                const { latitude, longitude } = JSON.parse(cached);
                if (latitude && longitude) {
                    setLocation({ latitude, longitude });
                    setStatus('found');
                }
            }
        } catch (e) {
            console.error("Failed to parse cached location", e);
        }
    }, []);

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setStatus('error');
            setErrorMsg('Geolocation is not supported by your browser');
            return;
        }

        setStatus('finding');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                setLocation(coords);
                setStatus('found');
                sessionStorage.setItem('userLocation', JSON.stringify(coords));
            },
            (error) => {
                console.error("Geolocation error:", error);
                if (error.code === error.PERMISSION_DENIED) {
                    setStatus('denied');
                } else {
                    setStatus('error');
                }
                setErrorMsg(error.message);
            },
            { timeout: 10000 }
        );
    };

    return (
        <LocationContext.Provider value={{ location, status, errorMsg, requestLocation }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    return useContext(LocationContext);
}
