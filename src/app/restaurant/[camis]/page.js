// import { notFound } from "next/navigation";
// import GradeLetter from "@/components/GradeLetter";
// import ScoreBox from "@/components/ScoreBox";
// import ViolationsTable from "@/components/ViolationsTable";

// const BASE_URL =
//   process.env.NEXT_PUBLIC_BASE_URL ||
//   "https://nyc-eat-safe-production.up.railway.app";

// async function getRestaurant(camis) {
//   const res = await fetch(`${BASE_URL}/restaurant/${parseInt(camis, 10)}`, {
//     next: { revalidate: 21600 }, // ISR every 6h
//   });
//   if (!res.ok) notFound();
//   const json = await res.json();
//   if (!json || json.length === 0) notFound();
//   return json[0];
// }

// export async function generateMetadata({ params }) {
//   const { camis } = await params; // <-- await params
//   const data = await getRestaurant(camis);
//   const header = data.restaurant_details?.[0] || {};
//   const profile = data.restaurant_profile || [];
//   const score = profile[0]?.score;
//   const grade = profile[0]?.grade ?? "N";

//   const name = header.dba || "Restaurant";
//   const address = `${header.building} ${header.street}, ${header.borough} ${header.zipcode}`;
//   const canonical = `https://www.nyceatsafe.com/restaurant/${camis}`;
//   const description = `See NYC health inspection details for ${name} at ${address}. Grade: ${grade}${score != null ? `, Score: ${score}` : ""}.`;

//   return {
//     title: `${name} | NYC Health Grade | NYC Eat Safe`,
//     description,
//     alternates: { canonical },
//     keywords: [name, "NYC Eat Safe", "NYC health inspection", header.borough, header.zipcode, grade, String(score ?? "")].filter(Boolean),
//     openGraph: {
//       title: `${name} | NYC Health Grade`,
//       description,
//       url: canonical,
//       type: "website",
//     },
//   };
// }

// export default async function RestaurantPage({ params }) {
//   const { camis } = await params; // <-- await params
//   const data = await getRestaurant(camis);
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
//           {profile.map((insp, idx) => (
//             <InspectionCard key={idx} inspection={insp} />
//           ))}
//         </div>
//       </div>

//       {/* Structured data (no AggregateRating) */}
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
//               addressLocality: header.borough,
//               addressRegion: "NY",
//               postalCode: header.zipcode,
//               addressCountry: "US",
//             },
//             url: `https://www.nyceatsafe.com/restaurant/${camis}`,
//             description: `NYC health inspection information for ${header.dba} at ${header.building} ${header.street}, ${header.borough} ${header.zipcode}.`,
//             ...(profile?.[0] && (profile[0].grade || profile[0].score != null)
//               ? {
//                   additionalProperty: [
//                     ...(profile[0].grade
//                       ? [
//                           {
//                             "@type": "PropertyValue",
//                             name: "NYC Inspection Grade",
//                             value: profile[0].grade,
//                           },
//                         ]
//                       : []),
//                     ...(profile[0].score != null
//                       ? [
//                           {
//                             "@type": "PropertyValue",
//                             name: "NYC Inspection Score",
//                             value: String(profile[0].score),
//                           },
//                         ]
//                       : []),
//                   ],
//                 }
//               : {}),
//           }),
//         }}
//       />
//     </div>
//   );
// }

// /** --- Inline clipboard-styled InspectionCard (server) --- */
// function InspectionCard({ inspection }) {
//   const sortedViolations = [...(inspection.violations || [])].sort((a, b) => {
//     const pr = (v) =>
//       v.critical_flag === "Pest Critical" ? 0 : v.critical_flag === "Critical" ? 1 : 2;
//     return pr(a) - pr(b);
//   });

//   const date = new Date(inspection.inspection_date).toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });

//   return (
//     <div className="relative mx-auto max-w-2xl">
//       {/* Clipboard board */}
//       <div
//         className="
//           relative rounded-2xl border border-amber-700/30 shadow-xl
//           p-3 pb-6
//           bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200
//           dark:from-amber-300 dark:via-amber-200 dark:to-amber-300
//         "
//         style={{
//           backgroundImage:
//             "linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.02)), repeating-linear-gradient(90deg, rgba(120,53,15,0.06) 0 12px, transparent 12px 24px)",
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
//               "linear-gradient(white, white), repeating-linear-gradient(180deg, rgba(0,0,0,0.02) 0 34px, transparent 34px 68px)",
//             backgroundBlendMode: "multiply",
//           }}
//         >
//           {/* Punch holes */}
//           <div className="absolute -top-2 left-8 w-3 h-3 rounded-full bg-gray-300/70 shadow-inner" />
//           <div className="absolute -top-2 right-8 w-3 h-3 rounded-full bg-gray-300/70 shadow-inner" />

//           {/* Date */}
//           <div className="mb-4 pb-2 border-b border-gray-200 w-full bg-blue-50 py-2">
//             <h2 className="text-xl font-semibold text-center text-neutral-900">{date}</h2>
//           </div>

//           {/* Grade + Score */}
//           <div className="w-full flex justify-center gap-8 mb-6">
//             <div className="flex flex-col items-center scale-110">
//               <p className="font-semibold text-black whitespace-nowrap mb-1">City Grade</p>
//               <GradeLetter grade={inspection.grade ?? "N"} />
//             </div>
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
import { notFound } from "next/navigation";
import GradeLetter from "@/components/GradeLetter";
import ScoreBox from "@/components/ScoreBox";
import ViolationsTable from "@/components/ViolationsTable";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://nyc-eat-safe-production.up.railway.app";

async function getRestaurant(camis) {
  const res = await fetch(`${BASE_URL}/restaurant/${parseInt(camis, 10)}`, {
    next: { revalidate: 21600 }, // ISR every 6h
  });
  if (!res.ok) notFound();
  const json = await res.json();
  if (!json || json.length === 0) notFound();
  return json[0];
}

export async function generateMetadata({ params }) {
  const { camis } = await params; // <-- await params
  const data = await getRestaurant(camis);
  const header = data.restaurant_details?.[0] || {};
  const profile = data.restaurant_profile || [];
  const score = profile[0]?.score;
  const grade = profile[0]?.grade ?? "N";

  const name = header.dba || "Restaurant";
  const address = `${header.building} ${header.street}, ${header.borough} ${header.zipcode}`;
  const canonical = `https://www.nyceatsafe.com/restaurant/${camis}`;
  const description = `See NYC health inspection details for ${name} at ${address}. Grade: ${grade}${score != null ? `, Score: ${score}` : ""}.`;

  return {
    title: `${name} | NYC Health Grade | NYC Eat Safe`,
    description,
    alternates: { canonical },
    keywords: [name, "NYC Eat Safe", "NYC health inspection", header.borough, header.zipcode, grade, String(score ?? "")].filter(Boolean),
    openGraph: {
      title: `${name} | NYC Health Grade`,
      description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function RestaurantPage({ params }) {
  const { camis } = await params; // <-- await params
  const data = await getRestaurant(camis);
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

        {/* Disclaimer */}
        <div className="mb-8">
          <div
            role="note"
            aria-label="Disclaimer"
            className="flex items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-amber-900"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mt-0.5 h-5 w-5 flex-none"
            >
              <path
                d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm0 5.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm-1.25 4h2.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 .75-.75z"
                fill="currentColor"
              />
            </svg>
            <p className="text-sm leading-6">
              <span className="font-semibold">Note: </span>
              Critical violations are those most likely to contribute to food-borne illness
            </p>
          </div>
        </div>

        {/* Inspections */}
        <div className="space-y-10">
          {profile.map((insp, idx) => (
            <InspectionCard key={idx} inspection={insp} />
          ))}
        </div>
      </div>

      {/* Structured data (no AggregateRating) */}
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
              addressLocality: header.borough,
              addressRegion: "NY",
              postalCode: header.zipcode,
              addressCountry: "US",
            },
            url: `https://www.nyceatsafe.com/restaurant/${camis}`,
            description: `NYC health inspection information for ${header.dba} at ${header.building} ${header.street}, ${header.borough} ${header.zipcode}.`,
            ...(profile?.[0] && (profile[0].grade || profile[0].score != null)
              ? {
                  additionalProperty: [
                    ...(profile[0].grade
                      ? [
                          {
                            "@type": "PropertyValue",
                            name: "NYC Inspection Grade",
                            value: profile[0].grade,
                          },
                        ]
                      : []),
                    ...(profile[0].score != null
                      ? [
                          {
                            "@type": "PropertyValue",
                            name: "NYC Inspection Score",
                            value: String(profile[0].score),
                          },
                        ]
                      : []),
                  ],
                }
              : {}),
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

          {/* Violations table */}
          <ViolationsTable violations={sortedViolations} />
        </section>
      </div>
    </div>
  );
}

