"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DynamicRestaurantPage from '../../components/DynamicRestaurantPage';

export default function CategoryByParamsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryByParamsContent />
    </Suspense>
  );
}

function CategoryByParamsContent() {
  const searchParams = useSearchParams();
  const [categoryName, setCategoryName] = useState(null);
  const [categoryEndpoint, setCategoryEndpoint] = useState();

  useEffect(() => {
    setCategoryName(searchParams.get('category_name'))
    setCategoryEndpoint(searchParams.get('category_endpoint'))

  }, [searchParams]);

  if (categoryName === null || categoryEndpoint === null) {
    return (
      <div className="container mx-auto px-4 py-6">
      </div>
    );
  }

  return (
    <DynamicRestaurantPage
      title={categoryName}
      endpoint={categoryEndpoint}
      extraParams={{
      }}
    />
  );
}