"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RestaurantDetail() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <RestaurantContent />
    </Suspense>
  );
}

function RestaurantContent() {
  const searchParams = useSearchParams();
  const camis = searchParams.get('camis');

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!camis) return;
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          "https://nyc-eat-safe-production.up.railway.app";
        const res = await fetch(
          `${baseUrl}/restaurant/${parseInt(camis, 10)}`
        );
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [camis]);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || data.length === 0) return <div>No data available.</div>;

  const { restaurant_details, restaurant_profile } = data[0];
  const header = restaurant_details[0];

  return (
    <div className="p-6 bg-white text-black">
      {/* Header info */}
      <h1 className="text-2xl font-bold">{header.dba}</h1>
      <p>
        {header.street}, {header.borough} {header.zipcode}
      </p>

      {/* Loop over each inspection */}
      {restaurant_profile.map((insp, idx) => (
        <section key={idx} className="mt-8">
          <h2 className="text-xl font-semibold">
            {insp.inspection_type} — {insp.inspection_date}
          </h2>
          <p>
            <strong>Score:</strong> {insp.score}
            <strong>Grade:</strong> {insp.grade}
          </p>

          {/* Violations table */}
          <table className="w-full mt-4 table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-1">Code</th>
                <th className="border px-2 py-1">Description</th>
                <th className="border px-2 py-1">Critical?</th>
              </tr>
            </thead>
            <tbody>
              {insp.violations.map((v, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{v.violation_code}</td>
                  <td className="border px-2 py-1">
                    {v.violation_description}
                  </td>
                  <td className="border px-2 py-1">{v.critical_flag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}