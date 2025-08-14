// // 'use client';

// // import React, { useEffect, useState, Suspense } from 'react';
// // import { useParams } from 'next/navigation';
// // import Head from 'next/head';
// // import ScoreBox from '@/components/ScoreBox';

// // export default function RestaurantPage() {
// //   const params = useParams();
// //   const camis = params?.camis;

// //   return (
// //     <Suspense fallback={<LoadingFallback />}>
// //       <RestaurantContent camis={camis} />
// //     </Suspense>
// //   );
// // }

// // function RestaurantContent({ camis }) {
// //   const [data, setData] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (!camis) return;

// //     const fetchRestaurant = async () => {
// //       setLoading(true);
// //       try {
// //         const baseUrl =
// //           process.env.NEXT_PUBLIC_BASE_URL ||
// //           'https://nyc-eat-safe-production.up.railway.app';
// //         const res = await fetch(`${baseUrl}/restaurant/${parseInt(camis, 10)}`);
// //         if (!res.ok) throw new Error(`Network error: ${res.status}`);
// //         const json = await res.json();
// //         setData(json);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRestaurant();
// //   }, [camis]);

// //   if (loading) return <LoadingFallback />;
// //   if (error) return <ErrorMessage message={error} />;
// //   if (!data || data.length === 0) return <EmptyMessage />;

// //   const { restaurant_details, restaurant_profile } = data[0];
// //   const header = restaurant_details[0];
// //   const mostRecentScore = restaurant_profile?.[0]?.score ?? null;

// //   return (
// //     <>
// //       <SEOHead
// //         camis={camis}
// //         name={header.dba}
// //         address={`${header.building} ${header.street}, ${header.borough} ${header.zipcode}`}
// //         score={mostRecentScore}
// //       />
// //       <div className="w-full min-h-screen bg-[#f5f2fa] py-8 px-2">
// //         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
// //           {/* Header */}
// //           <div className="mb-6 border-b pb-4 flex items-center">
// //             <div>
// //               <h1 className="text-3xl font-bold text-[#2a3d83]">{header.dba}</h1>
// //               <p className="text-gray-700 mt-1 font-medium">
// //                 {header.street}, {header.borough} {header.zipcode}
// //               </p>
// //             </div>
// //             {mostRecentScore !== null && (
// //               <div className="ml-auto">
// //                 <ScoreBox score={mostRecentScore} />
// //               </div>
// //             )}
// //           </div>

// //           {/* Inspections */}
// //           <div className="space-y-8">
// //             {restaurant_profile.map((insp, idx) => (
// //               <InspectionCard key={idx} inspection={insp} />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // function InspectionCard({ inspection }) {
// //   const sortedViolations = [...inspection.violations].sort((a, b) => {
// //     const priority = (v) =>
// //       v.critical_flag === 'Pest Critical' ? 0 : v.critical_flag === 'Critical' ? 1 : 2;
// //     return priority(a) - priority(b);
// //   });

// //   return (
// //     <section className="bg-[#f9f7fc] rounded-xl shadow border p-5">
// //       <div className="flex flex-wrap items-center gap-4 mb-2">
// //         <h2 className="text-lg font-semibold text-[#2a3d83]">
// //           {inspection.inspection_type}
// //         </h2>
// //         <span className="text-gray-500">{inspection.inspection_date}</span>
// //         <div className="ml-auto flex items-center gap-3">
// //           <span className="inline-block bg-[#e4eaff] text-[#2a3d83] px-3 py-1 rounded-full font-bold">
// //             Score: {inspection.score}
// //           </span>
// //           <span className="inline-block bg-[#f7d6e0] text-[#ab224e] px-3 py-1 rounded-full font-bold">
// //             Grade: {inspection.grade}
// //           </span>
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="w-full mt-3 table-auto border-collapse rounded-xl overflow-hidden">
// //           <thead>
// //             <tr className="bg-[#e9e7f5] text-[#2a3d83]">
// //               <th className="border px-3 py-2 font-semibold w-32">Critical?</th>
// //               <th className="border px-3 py-2 font-semibold">Description</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {sortedViolations.map((v, i) => (
// //               <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f6f4fa]'}>
// //                 <td
// //                   className={`border px-3 py-2 font-bold text-base ${
// //                     v.critical_flag === 'Pest Critical' || v.critical_flag === 'Critical'
// //                       ? 'text-[#ab224e]'
// //                       : 'text-[#2a3d83]'
// //                   }`}
// //                 >
// //                   {v.critical_flag === 'Pest Critical' ? 'Critical' : v.critical_flag}
// //                 </td>
// //                 <td className="border px-3 py-2 text-gray-800 text-base leading-snug">
// //                   {v.violation_summary}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </section>
// //   );
// // }

// // function LoadingFallback() {
// //   return (
// //     <div className="flex items-center justify-center min-h-screen">
// //       <div className="text-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a3d83] mx-auto" />
// //         <p className="mt-4 text-gray-600">Loading...</p>
// //       </div>
// //     </div>
// //   );
// // }

// // function ErrorMessage({ message }) {
// //   return (
// //     <div className="flex items-center justify-center min-h-screen">
// //       <p className="text-red-500">{message}</p>
// //     </div>
// //   );
// // }

// // function EmptyMessage() {
// //   return (
// //     <div className="flex items-center justify-center min-h-screen">
// //       <p className="text-gray-500">No data available.</p>
// //     </div>
// //   );
// // }

// // function SEOHead({ camis, name, address, score }) {
// //   const canonicalUrl = `https://www.nyceatsafe.com/restaurant/${camis}`;
// //   const description = `See NYC health inspection scores and violations for ${name}, located at ${address}.`;

// //   const structuredData = {
// //     "@context": "https://schema.org",
// //     "@type": "Restaurant",
// //     "name": name,
// //     "address": {
// //       "@type": "PostalAddress",
// //       "streetAddress": address,
// //       "addressLocality": "New York City",
// //       "addressRegion": "NY",
// //       "addressCountry": "US",
// //     },
// //     "url": canonicalUrl,
// //     ...(score && {
// //       aggregateRating: {
// //         "@type": "AggregateRating",
// //         "ratingValue": score,
// //       },
// //     }),
// //   };

// //   return (
// //     <Head>
// //       <title>{name} | NYC Health Grade | NYC Eat Safe</title>
// //       <meta name="description" content={description} />
// //       <link rel="canonical" href={canonicalUrl} />

// //       {/* Open Graph */}
// //       <meta property="og:title" content={`${name} | NYC Health Grade`} />
// //       <meta property="og:description" content={description} />
// //       <meta property="og:type" content="website" />
// //       <meta property="og:url" content={canonicalUrl} />

// //       {/* Structured Data */}
// //       <script type="application/ld+json">
// //         {JSON.stringify(structuredData)}
// //       </script>
// //     </Head>
// //   );
// // }
// 'use client';

// import React, { useEffect, useState, Suspense } from 'react';
// import { useParams } from 'next/navigation';
// import Head from 'next/head';
// import ScoreBox from '@/components/ScoreBox';
// import GradeLetter from '@/components/GradeLetter';
// import ViolationsTable from '@/components/ViolationsTable'; // ✅ New import
// import GradeScoreCard from '@/components/GradeScoreCard';

// export default function RestaurantPage() {
//   const params = useParams();
//   const camis = params?.camis;

//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <RestaurantContent camis={camis} />
//     </Suspense>
//   );
// }

// function RestaurantContent({ camis }) {
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
//           'https://nyc-eat-safe-production.up.railway.app';
//         const res = await fetch(`${baseUrl}/restaurant/${parseInt(camis, 10)}`);
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

//   if (loading) return <LoadingFallback />;
//   if (error) return <ErrorMessage message={error} />;
//   if (!data || data.length === 0) return <EmptyMessage />;

//   const { restaurant_details, restaurant_profile } = data[0];
//   const header = restaurant_details[0];
//   const mostRecentScore = restaurant_profile?.[0]?.score ?? null;

//   return (
//     <>
//       <SEOHead
//         camis={camis}
//         name={header.dba}
//         address={`${header.building} ${header.street}, ${header.borough} ${header.zipcode}`}
//         score={mostRecentScore}
//       />
//       <div className="w-full min-h-screen bg-[#f5f2fa] py-8 px-2">
//         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//           {/* Header */}
//           <div className="mb-6 border-b pb-4 flex items-center">
//             <div>
//               <h1 className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>
//                 {header.dba}
//               </h1>
//               <p className="text-gray-700 mt-1 font-medium">
//                 {header.building} {header.street}, {header.borough}
//               </p>
//             </div>
//           </div>

//           {/* Grade ↔ Score ranges explainer */}
//           <div className="mb-8">
//             <GradeScoreCard />
//           </div>

//           {/* Inspections */}
//           <div className="space-y-10">
//             {restaurant_profile.map((insp, idx) => (
//               <InspectionCard key={idx} inspection={insp} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// /** --- UPDATED: Clipboard-styled InspectionCard --- */
// function InspectionCard({ inspection }) {
//   const sortedViolations = [...inspection.violations].sort((a, b) => {
//     const priority = (v) =>
//       v.critical_flag === 'Pest Critical' ? 0 : v.critical_flag === 'Critical' ? 1 : 2;
//     return priority(a) - priority(b);
//   });

//   const formatDate = (dateStr) =>
//     new Date(dateStr).toLocaleDateString('en-US', {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//     });

//   return (
//     <div className="relative mx-auto max-w-2xl">
//       {/* Clipboard board (wood) */}
//       <div
//         className="
//           relative rounded-2xl border border-amber-700/30 shadow-xl
//           p-3 pb-6
//           bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200
//           dark:from-amber-300 dark:via-amber-200 dark:to-amber-300
//         "
//         style={{
//           backgroundImage:
//             'linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.02)), repeating-linear-gradient(90deg, rgba(120,53,15,0.06) 0 12px, transparent 12px 24px)',
//         }}
//       >
//         {/* Metal clip */}
//         <div
//           className="
//             absolute -top-5 left-1/2 -translate-x-1/2
//             w-44 h-10 rounded-b-xl border border-slate-400
//             bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400
//             shadow-[0_8px_16px_rgba(0,0,0,0.25)]
//           "
//         >
//           <div className="absolute inset-x-3 top-1 h-1.5 rounded bg-white/60" />
//           <div className="absolute left-3 top-2 w-2.5 h-2.5 rounded-full bg-slate-500/70 shadow-inner" />
//           <div className="absolute right-3 top-2 w-2.5 h-2.5 rounded-full bg-slate-500/70 shadow-inner" />
//         </div>

//         {/* Paper sheet */}
//         <section
//           className="
//             relative mt-6 rounded-xl border border-gray-200
//             bg-white shadow-md
//             p-3 sm:p-4
//           "
//           style={{
//             backgroundImage:
//               'linear-gradient(white, white), repeating-linear-gradient(180deg, rgba(0,0,0,0.02) 0 34px, transparent 34px 68px)',
//             backgroundBlendMode: 'multiply',
//           }}
//         >
//           {/* Paper top punch holes (decorative) */}
//           <div className="absolute -top-2 left-8 w-3 h-3 rounded-full bg-gray-300/70 shadow-inner" />
//           <div className="absolute -top-2 right-8 w-3 h-3 rounded-full bg-gray-300/70 shadow-inner" />

//           {/* Centered date */}
//           <div className="mb-4 pb-2 border-b border-gray-200 w-full bg-blue-50 py-2">
//             <h2 className="text-xl font-semibold text-center text-neutral-900">
//               {formatDate(inspection.inspection_date)}
//             </h2>
//           </div>




//           {/* Centered score + grade */}
//           <div className="w-full flex justify-center gap-8 mb-6">
//             {/* City Grade */}
//             <div className="flex flex-col items-center scale-110">
//               <p className="font-semibold text-black whitespace-nowrap mb-1">City Grade</p>
//               <GradeLetter grade={inspection.grade ?? 'N'} />
//             </div>

//             {/* Score Given */}
//             <div className="flex flex-col items-center scale-110">
//               <p className="font-semibold text-black whitespace-nowrap mb-1">Score Given</p>
//               <ScoreBox score={inspection.score} />
//             </div>
//           </div>



//           {/* Violations table */}
//           <ViolationsTable violations={sortedViolations} />
//         </section>
//       </div>
//     </div>
//   );
// }
// /** --- /UPDATED --- */

// function LoadingFallback() {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a3d83] mx-auto" />
//         <p className="mt-4 text-gray-600">Loading...</p>
//       </div>
//     </div>
//   );
// }

// function ErrorMessage({ message }) {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-red-500">{message}</p>
//     </div>
//   );
// }

// function EmptyMessage() {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-gray-500">No data available.</p>
//     </div>
//   );
// }

// function SEOHead({ camis, name, address, score }) {
//   const canonicalUrl = `https://www.nyceatsafe.com/restaurant/${camis}`;
//   const description = `See NYC health inspection scores and violations for ${name}, located at ${address}.`;

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "Restaurant",
//     "name": name,
//     "address": {
//       "@type": "PostalAddress",
//       "streetAddress": address,
//       "addressLocality": "New York City",
//       "addressRegion": "NY",
//       "addressCountry": "US",
//     },
//     "url": canonicalUrl,
//     ...(score && {
//       aggregateRating: {
//         "@type": "AggregateRating",
//         "ratingValue": score,
//       },
//     }),
//   };

//   return (
//     <Head>
//       <title>{name} | NYC Health Grade | NYC Eat Safe</title>
//       <meta name="description" content={description} />
//       <link rel="canonical" href={canonicalUrl} />

//       {/* Open Graph */}
//       <meta property="og:title" content={`${name} | NYC Health Grade`} />
//       <meta property="og:description" content={description} />
//       <meta property="og:type" content="website" />
//       <meta property="og:url" content={canonicalUrl} />

//       {/* Structured Data */}
//       <script type="application/ld+json">
//         {JSON.stringify(structuredData)}
//       </script>
//     </Head>
//   );
// }

// import GradeLetter from "@/components/GradeLetter";        // server-safe (no hooks)
// import ScoreBox from "@/components/ScoreBox";              // server-safe
// import GradeScoreCard from "@/components/GradeScoreCard";  // server-safe
// import ViolationsTable from "@/components/ViolationsTable"; // CAN be a client component
// import { notFound } from "next/navigation";

// const BASE_URL =
//   process.env.NEXT_PUBLIC_BASE_URL ||
//   "https://nyc-eat-safe-production.up.railway.app";

// async function getRestaurant(camis) {
//   const res = await fetch(`${BASE_URL}/restaurant/${parseInt(camis, 10)}`, {
//     next: { revalidate: 21600 }, // ISR every 6h; use cache:"no-store" if you need always-fresh
//   });
//   if (!res.ok) notFound();
//   const json = await res.json();
//   if (!json || json.length === 0) notFound();
//   return json[0];
// }

// export async function generateMetadata({ params }) {
//   const data = await getRestaurant(params.camis);
//   const header = data.restaurant_details?.[0] || {};
//   const profile = data.restaurant_profile || [];
//   const score = profile[0]?.score;

//   const name = header.dba || "Restaurant";
//   const address = `${header.building} ${header.street}, ${header.borough} ${header.zipcode}`;
//   const canonical = `https://www.nyceatsafe.com/restaurant/${params.camis}`;
//   const description = `See NYC health inspection scores and violations for ${name}, located at ${address}.`;

//   return {
//     title: `${name} | NYC Health Grade | NYC Eat Safe`,
//     description,
//     alternates: { canonical },
//     openGraph: {
//       title: `${name} | NYC Health Grade`,
//       description,
//       url: canonical,
//       type: "website",
//     },
//   };
// }

// export default async function RestaurantPage({ params }) {
//   const data = await getRestaurant(params.camis);
//   const header = data.restaurant_details[0];
//   const profile = data.restaurant_profile || [];

//   return (
//     <div className="w-full min-h-screen bg-[#f5f2fa] py-8 px-2">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//         {/* Header */}
//         <div className="mb-6 border-b pb-4 flex items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-[#1a1a1a]">{header.dba}</h1>
//             <p className="text-gray-700 mt-1 font-medium">
//               {header.building} {header.street}, {header.borough}
//             </p>
//           </div>
//         </div>

//         {/* Inspections */}
//         <div className="space-y-10">
//           {profile.map((insp, idx) => {
//             const sorted = [...(insp.violations || [])].sort((a, b) => {
//               const pr = (v) =>
//                 v.critical_flag === "Pest Critical" ? 0 :
//                 v.critical_flag === "Critical" ? 1 : 2;
//               return pr(a) - pr(b);
//             });

//             const date = new Date(insp.inspection_date).toLocaleDateString("en-US", {
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//             });

//             return (
//               <div key={idx} className="relative mx-auto max-w-2xl">
//                 {/* clipboard wrapper + paper — your existing markup */}
//                 <section className="relative mt-6 rounded-xl border border-gray-200 bg-white shadow-md p-3 sm:p-4">
//                   {/* date */}
//                   <div className="mb-4 pb-2 border-b border-gray-200 w-full bg-blue-50 py-2">
//                     <h2 className="text-xl font-semibold text-center text-neutral-900">
//                       {date}
//                     </h2>
//                   </div>

//                   {/* grade + score */}
//                   <div className="w-full flex justify-center gap-8 mb-6">
//                     <div className="flex flex-col items-center scale-110">
//                       <p className="font-semibold text-black whitespace-nowrap mb-1">City Grade</p>
//                       <GradeLetter grade={insp.grade ?? "N"} />
//                     </div>
//                     <div className="flex flex-col items-center scale-110">
//                       <p className="font-semibold text-black whitespace-nowrap mb-1">Score Given</p>
//                       <ScoreBox score={insp.score} />
//                     </div>
//                   </div>

//                   {/* Violations table (client component OK) */}
//                   <ViolationsTable violations={sorted} />
//                 </section>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Structured data in SSR HTML */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Restaurant",
//             name: header.dba,
//             address: {
//               "@type": "PostalAddress",
//               streetAddress: `${header.building} ${header.street}`,
//               addressLocality: "New York City",
//               addressRegion: "NY",
//               addressCountry: "US",
//               postalCode: header.zipcode,
//             },
//             url: `https://www.nyceatsafe.com/restaurant/${params.camis}`,
//             ...(profile[0]?.score != null && {
//               aggregateRating: { "@type": "AggregateRating", ratingValue: profile[0].score },
//             }),
//           }),
//         }}
//       />
//     </div>
//   );
// }
// app/restaurant/[camis]/page.js
import { notFound } from "next/navigation";
import GradeLetter from "@/components/GradeLetter";
import ScoreBox from "@/components/ScoreBox";
import ViolationsTable from "@/components/ViolationsTable"; // can remain a client component

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://nyc-eat-safe-production.up.railway.app";

async function getRestaurant(camis) {
  const res = await fetch(`${BASE_URL}/restaurant/${parseInt(camis, 10)}`, {
    next: { revalidate: 21600 }, // ISR every 6h; use cache: "no-store" if you need always-fresh
  });
  if (!res.ok) notFound();
  const json = await res.json();
  if (!json || json.length === 0) notFound();
  return json[0];
}

export async function generateMetadata({ params }) {
  const data = await getRestaurant(params.camis);
  const header = data.restaurant_details?.[0] || {};
  const profile = data.restaurant_profile || [];
  const score = profile[0]?.score;

  const name = header.dba || "Restaurant";
  const address = `${header.building} ${header.street}, ${header.borough} ${header.zipcode}`;
  const canonical = `https://www.nyceatsafe.com/restaurant/${params.camis}`;
  const description = `See NYC health inspection scores and violations for ${name}, located at ${address}.`;

  return {
    title: `${name} | NYC Health Grade | NYC Eat Safe`,
    description,
    alternates: { canonical },
    openGraph: { title: `${name} | NYC Health Grade`, description, url: canonical, type: "website" },
  };
}

export default async function RestaurantPage({ params }) {
  const data = await getRestaurant(params.camis);
  const header = data.restaurant_details[0];
  const profile = data.restaurant_profile || [];

  return (
    <div className="w-full min-h-screen bg-[#f5f2fa] py-8 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6 border-b pb-4 flex items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a1a]">{header.dba}</h1>
            <p className="text-gray-700 mt-1 font-medium">
              {header.building} {header.street}, {header.borough}
            </p>
          </div>
        </div>

        {/* Inspections (inline clipboard-styled card) */}
        <div className="space-y-10">
          {profile.map((insp, idx) => (
            <InspectionCard key={idx} inspection={insp} />
          ))}
        </div>
      </div>

      {/* Structured data (SSR) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: header.dba,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${header.building} ${header.street}`,
              addressLocality: "New York City",
              addressRegion: "NY",
              addressCountry: "US",
              postalCode: header.zipcode,
            },
            url: `https://www.nyceatsafe.com/restaurant/${params.camis}`,
            ...(profile[0]?.score != null && {
              aggregateRating: { "@type": "AggregateRating", ratingValue: profile[0].score },
            }),
          }),
        }}
      />
    </div>
  );
}

/** --- Inline clipboard-styled InspectionCard (server) --- */
function InspectionCard({ inspection }) {
  const sortedViolations = [...(inspection.violations || [])].sort((a, b) => {
    const pr = (v) =>
      v.critical_flag === "Pest Critical" ? 0 : v.critical_flag === "Critical" ? 1 : 2;
    return pr(a) - pr(b);
  });

  const date = new Date(inspection.inspection_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Clipboard board */}
      <div
        className="
          relative rounded-2xl border border-amber-700/30 shadow-xl
          p-3 pb-6
          bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200
          dark:from-amber-300 dark:via-amber-200 dark:to-amber-300
        "
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.02)), repeating-linear-gradient(90deg, rgba(120,53,15,0.06) 0 12px, transparent 12px 24px)",
        }}
      >
        {/* Metal clip */}
        <div
          className="
            absolute -top-5 left-1/2 -translate-x-1/2
            w-44 h-10 rounded-b-xl border border-slate-400
            bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400
            shadow-[0_8px_16px_rgba(0,0,0,0.25)]
          "
        >
          <div className="absolute inset-x-3 top-1 h-1.5 rounded bg-white/60" />
          <div className="absolute left-3 top-2 w-2.5 h-2.5 rounded-full bg-slate-500/70 shadow-inner" />
          <div className="absolute right-3 top-2 w-2.5 h-2.5 rounded-full bg-slate-500/70 shadow-inner" />
        </div>

        {/* Paper sheet */}
        <section
          className="
            relative mt-6 rounded-xl border border-gray-200
            bg-white shadow-md
            p-3 sm:p-4
          "
          style={{
            backgroundImage:
              "linear-gradient(white, white), repeating-linear-gradient(180deg, rgba(0,0,0,0.02) 0 34px, transparent 34px 68px)",
            backgroundBlendMode: "multiply",
          }}
        >
          {/* Punch holes */}
          <div className="absolute -top-2 left-8 w-3 h-3 rounded-full bg-gray-300/70 shadow-inner" />
          <div className="absolute -top-2 right-8 w-3 h-3 rounded-full bg-gray-300/70 shadow-inner" />

          {/* Date */}
          <div className="mb-4 pb-2 border-b border-gray-200 w-full bg-blue-50 py-2">
            <h2 className="text-xl font-semibold text-center text-neutral-900">{date}</h2>
          </div>

          {/* Grade + Score */}
          <div className="w-full flex justify-center gap-8 mb-6">
            <div className="flex flex-col items-center scale-110">
              <p className="font-semibold text-black whitespace-nowrap mb-1">City Grade</p>
              <GradeLetter grade={inspection.grade ?? "N"} />
            </div>
            <div className="flex flex-col items-center scale-110">
              <p className="font-semibold text-black whitespace-nowrap mb-1">Score Given</p>
              <ScoreBox score={inspection.score} />
            </div>
          </div>

          {/* Violations table (client component OK) */}
          <ViolationsTable violations={sortedViolations} />
        </section>
      </div>
    </div>
  );
}
