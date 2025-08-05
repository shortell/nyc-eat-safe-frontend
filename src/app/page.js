"use client";

import { useState, useEffect } from "react";
import CategoryPreview from "@/components/CategoryPreview";

export default function Home() {
  const [categoriesData, setCategoriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(
          "https://nyc-eat-safe-production.up.railway.app/home"
        );
        if (!res.ok) throw new Error("Failed to fetch home data");
        setCategoriesData(await res.json());
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f3fa]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a3d83] mx-auto" />
          <p className="mt-4 text-gray-600">Loading NYC restaurant data…</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f3fa]">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-[#f6f3fa] px-2">
      {/* Header */}
      <div className="w-full max-w-5xl mx-auto px-3 my-1">
        <p className="text-sm text-center text-gray-500">
          Public data from the NYC Dept. of Health.
        </p>
      </div>

      {/* Category Previews */}
      <section className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center">
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-y-6 
            md:gap-y-0 
            md:gap-x-3 
            justify-center 
            items-stretch 
            px-2
            "
        >
          {/* Risky A comes first on mobile and desktop */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[420px]">
              <CategoryPreview
                title="Is This an A to You?"
                endpoint="/risky-a-grades"
                restaurants={categoriesData.risky_a_grades}
                bgColor="bg-red-100"
                className="rounded-2xl shadow-xl border border-red-100 transition hover:scale-[1.015] duration-150"
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-[420px]">
              <CategoryPreview
                title="Gold Star Restaurants"
                endpoint="/goldstar-a-grades"
                restaurants={categoriesData.goldstar_a_grades}
                bgColor="bg-green-100"
                className="rounded-2xl shadow-xl border border-green-100 transition hover:scale-[1.015] duration-150"
              />
            </div>
          </div>
        </div>
        {/* You can add more categories here if needed */}
      </section>
    </main>
  );
}


