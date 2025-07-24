// "use client";
// import React, { useEffect, useState, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function RestaurantDetail() {
//   return (
//     <Suspense fallback={<div>Loading…</div>}>
//       <RestaurantContent />
//     </Suspense>
//   );
// }

// function RestaurantContent() {
//   const searchParams = useSearchParams();
//   const camis = searchParams.get('camis');

//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!camis) return;
//     const fetchRestaurant = async () => {
//       setLoading(true);
//       try {
//         const baseUrl =
//           process.env.NEXT_PUBLIC_BASE_URL ||
//           "https://nyc-eat-safe-production.up.railway.app";
//         const res = await fetch(
//           `${baseUrl}/restaurant/${parseInt(camis, 10)}`
//         );
//         if (!res.ok) throw new Error(`Network error: ${res.status}`);
//         const json = await res.json();
//         setData(json);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRestaurant();
//   }, [camis]);

//   if (loading) return <div>Loading…</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!data || data.length === 0) return <div>No data available.</div>;

//   const { restaurant_details, restaurant_profile } = data[0];
//   const header = restaurant_details[0];

//   return (
//     <div className="p-6 bg-white text-black">
//       {/* Header info */}
//       <h1 className="text-2xl font-bold">{header.dba}</h1>
//       <p>
//         {header.street}, {header.borough} {header.zipcode}
//       </p>

//       {/* Loop over each inspection */}
//       {restaurant_profile.map((insp, idx) => (
//         <section key={idx} className="mt-8">
//           <h2 className="text-xl font-semibold">
//             {insp.inspection_type} — {insp.inspection_date}
//           </h2>
//           <p>
//             <strong>Score:</strong> {insp.score}
//             <strong>Grade:</strong> {insp.grade}
//           </p>

//           {/* Violations table */}
//           <table className="w-full mt-4 table-auto border-collapse">
//             <thead>
//               <tr>
//                 <th className="border px-2 py-1">Code</th>
//                 <th className="border px-2 py-1">Description</th>
//                 <th className="border px-2 py-1">Critical?</th>
//               </tr>
//             </thead>
//             <tbody>
//               {insp.violations.map((v, i) => (
//                 <tr key={i}>
//                   <td className="border px-2 py-1">{v.violation_code}</td>
//                   <td className="border px-2 py-1">
//                     {v.violation_description}
//                   </td>
//                   <td className="border px-2 py-1">{v.critical_flag}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       ))}
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function RestaurantDetail() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a3d83] mx-auto" />
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <RestaurantContent />
    </Suspense>
  );
}

function RestaurantContent() {
  const searchParams = useSearchParams();
  const camis = searchParams.get("camis");

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a3d83] mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No data available.</p>
      </div>
    );

  const { restaurant_details, restaurant_profile } = data[0];
  const header = restaurant_details[0];

  return (
    <div className="w-full min-h-screen bg-[#f5f2fa] py-8 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header info */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-[#2a3d83]">{header.dba}</h1>
          <p className="text-gray-700 mt-1 font-medium">
            {header.street}, {header.borough} {header.zipcode}
          </p>
        </div>

        {/* Loop over each inspection */}
        <div className="space-y-8">
          {restaurant_profile.map((insp, idx) => (
            <section
              key={idx}
              className="bg-[#f9f7fc] rounded-xl shadow border p-5"
            >
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <h2 className="text-lg font-semibold text-[#2a3d83]">
                  {insp.inspection_type}
                </h2>
                <span className="text-gray-500">
                  {insp.inspection_date}
                </span>
                <span className="ml-auto">
                  <span className="inline-block bg-[#e4eaff] text-[#2a3d83] px-3 py-1 rounded-full font-bold mr-2">
                    Score: {insp.score}
                  </span>
                  <span className="inline-block bg-[#f7d6e0] text-[#ab224e] px-3 py-1 rounded-full font-bold">
                    Grade: {insp.grade}
                  </span>
                </span>
              </div>

              {/* Violations table */}
              <div className="overflow-x-auto">
                <table className="w-full mt-3 table-auto border-collapse rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-[#e9e7f5] text-[#2a3d83]">
                      <th className="border px-3 py-2 font-semibold w-32">Critical?</th>
                      <th className="border px-3 py-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insp.violations.map((v, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f6f4fa]"}>
                        <td className={`border px-3 py-2 font-bold text-base ${v.critical_flag === "Critical"
                            ? "text-[#ab224e]"
                            : "text-[#2a3d83]"
                          }`}>
                          {v.critical_flag}
                        </td>
                        <td className="border px-3 py-2 text-gray-800 text-base leading-snug">
                          {v.violation_description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
