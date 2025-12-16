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
          `${process.env.NEXT_PUBLIC_BASE_URL}/home`
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
    <main className="min-h-screen w-full flex flex-col items-center bg-[#f6f3fa] px-0 pb-12">
      {/* Header */}
      <div className="w-full max-w-5xl mx-auto px-4 mt-2 mb-1">
        <p className="text-sm text-center text-gray-500">
          Public data from the NYC Dept. of Health.
        </p>
      </div>

      {/* Category Previews */}
      <section className="w-full max-w-[1600px] mx-auto flex flex-col gap-y-2 px-4 md:px-8 lg:px-12">
        {/* Risky A */}
        <div className="w-full">
          <CategoryPreview
            title="Questionable A Grades"
            endpoint="/risky-a-grades"
            restaurants={categoriesData.risky_a_grades}
          />
        </div>

        {/* Gold Star */}
        <div className="w-full">
          <CategoryPreview
            title="Gold Star Restaurants"
            endpoint="/goldstar-a-grades"
            restaurants={categoriesData.goldstar_a_grades}
          />
        </div>
      </section>
    </main>

  );
}


