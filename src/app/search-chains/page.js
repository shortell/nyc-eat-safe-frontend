"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DynamicRestaurantPage from '../../components/DynamicRestaurantPage';

export default function SearchChainsByParamsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchChainsByParamsContent />
    </Suspense>
  );
}

function SearchChainsByParamsContent() {
  const searchParams = useSearchParams();
  const [dba, setDba] = useState(null);
  const [boroughFilter, setBoroughFilter] = useState(null);

  useEffect(() => {
    setDba(searchParams.get('dba'));
    setBoroughFilter(searchParams.get('borough_filter'));
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