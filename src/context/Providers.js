'use client';

import React from 'react';
import { LocationProvider } from './LocationContext';
import { RestaurantListProvider } from './RestaurantListContext';

export function Providers({ children }) {
    return (
        <LocationProvider>
            <RestaurantListProvider>
                {children}
            </RestaurantListProvider>
        </LocationProvider>
    );
}
