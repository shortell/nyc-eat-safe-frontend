"use client";

import React, { useState, useEffect } from 'react';
import DynamicRestaurantPage from '../../components/DynamicRestaurantPage';
import { useSearchParams } from 'next/navigation';

export default function SearchChainsByParamsPage() {
  const searchParams = useSearchParams();
  const [dba, setDba] = useState(null);
  const [boroughFilter, setBoroughFilter] = useState(null);

  useEffect(() => {
    setDba(searchParams.get('dba'));
    setBoroughFilter(searchParams.get('borough_filter'));
    
    console.log('Borough Filter:', searchParams.get('borough_filter'));
    console.log('Datatype of Borough Filter:', typeof searchParams.get('borough_filter')); // Print datatype
  }, [searchParams]);

  if (dba === null || boroughFilter === null) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Restaurant Chains</h1>
        <p>Fetching search parameters...</p>
      </div>
    );
  }

  return (
    <DynamicRestaurantPage
      title={dba ? `${dba} Locations` : "Restaurant Chains"}
      endpoint="/search-chains"
      extraParams={{
        dba: dba,
        borough_filter: boroughFilter
      }}
    />
  );
}