// import ScoreHistogram from "@/components/ScoreHistogram";

// export const revalidate = 3600; // Revalidate the page every 1 hour


// async function getBins() {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_RAILWAY_BACKEND_ENDPOINT}/about`, {
//         next: { revalidate: 3600 },
//     });

//     if (!res.ok) throw new Error(`Failed to fetch histogram: ${res.status}`);
//     return res.json(); // [{ bin_value, count }, ...]
// }



// export default async function AboutPage() {
//     const bins = await getBins();


//     // For the "Notice" section: pull the counts at 13 and 14 dynamically
//     const countAt = (n) => {
//         const match = Array.isArray(bins)
//             ? bins.find((b) => Number(b.bin_value) === Number(n))
//             : null;
//         return match ? Number(match.count) : 0;
//     };
//     const count13 = countAt(13);
//     const count14 = countAt(14);

//     return (
//         <div className="min-h-screen bg-[#f8fafc] text-black px-2 sm:px-4 py-4">
//             {/* Card wrapper with minimal padding/margin */}
//             <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
//                 {/* Title bar */}
//                 <h1 className="bg-gradient-to-b from-[#2A3E83] via-[#1655A0] to-[#016CCE] text-white px-3 py-2 rounded-md text-2xl font-bold mb-4">
//                     About
//                 </h1>

//                 {/* Two-column text on desktop; single column on mobile.
//             Children are sections that avoid breaking across columns. */}
//                 <div className="lg:columns-2 lg:gap-8 [column-fill:balance]">
//                     {/* About */}
//                     <section id="about" className="break-inside-avoid mb-6">

//                         <p className="text-gray-800 leading-relaxed mt-2">
//                             <strong>Disclaimer:</strong> NYC Eat Safe is an independent project and is not affiliated with DOHMH.
//                         </p>
//                     </section>

//                     {/* How Inspections Work */}
//                     <section id="how-it-works" className="break-inside-avoid mb-6">
//                         <h2 className="text-xl font-semibold text-black">How Inspections Work</h2>
//                         <p className="text-gray-800 leading-relaxed">
//                             Restaurants begin each inspection with <strong>0 points</strong>. Violations add points
//                             depending on severity. The more points, the lower the grade.
//                         </p>
//                         <ul className="list-disc pl-6 text-gray-800 mt-2">
//                             <li><strong>A</strong>: 0-13 points</li>
//                             <li><strong>B</strong>: 14-27 points</li>
//                             <li><strong>C</strong>: 28+ points</li>
//                             <li><strong>N</strong>: Grade not yet issued or pending</li>
//                         </ul>
//                     </section>

//                     {/* Score Distribution — span BOTH columns on desktop */}
//                     <section
//                         id="chart"
//                         className="break-inside-avoid my-8 lg:[column-span:all]"
//                     >
//                         <h2 className="text-xl font-semibold text-black mb-2">Score Distribution (0-17) from Each Restaurants Latest Inspection</h2>
//                         <div className="w-full">
//                             <ScoreHistogram bins={bins} height={300} />
//                         </div>
//                         {!bins?.length && (
//                             <p className="text-sm text-slate-500 mt-2">
//                                 Chart coming soon when data is available.
//                             </p>
//                         )}
//                     </section>

//                     {/* Notice */}
//                     <section id="notice" className="break-inside-avoid mb-6">
//                         <h2 className="text-xl font-semibold text-black">Notice</h2>
//                         <ul className="list-disc pl-6 text-gray-800 space-y-1">
//                             <li>Restaurants with an A all skew towards the bottom of the range.</li>
//                             <li>
//                                 There’s a sharp drop in counts from <strong>13</strong> to <strong>14</strong> points:&nbsp;
//                                 <strong>{count13.toLocaleString()}</strong> → <strong>{count14.toLocaleString()}</strong> restaurants. Which happens to be the threshold from an A to a B
//                             </li>
//                         </ul>
//                     </section>


//                     {/* Key Insights */}
//                     <section id="key-insights" className="break-inside-avoid mb-6">
//                         <h2 className="text-xl font-semibold text-black">Key Stats</h2>
//                         <ul className="list-disc pl-6 text-gray-800 space-y-1">
//                             <li><strong>80%</strong> of A-grade restaurants have at least one critical violation.</li>
//                             <li>Nearly <strong>10%</strong> of A-grade restaurants are cited for rats, mice, or roaches. (Or multiple at once)</li>
//                             <li>About <strong>40%</strong> of A-grade restaurants sit at 12-13 points (the lower end of A).</li>
//                         </ul>
//                     </section>

//                     {/* Restaurants with an “N” */}
//                     <section id="n-restaurants" className="break-inside-avoid mb-6">
//                         <h2 className="text-xl font-semibold text-black">Restaurants with an “N”</h2>
//                         <p className="text-gray-800 leading-relaxed">
//                             An <strong>N</strong> grade means a restaurant’s letter grade hasn’t been issued yet even though an inspection occurred.
//                         </p>
//                         <p className="text-gray-800 leading-relaxed mt-2">
//                             Over <strong>20%</strong> of inspected restaurants fall into this category for several reasons.
//                         </p>
//                         <p className="text-gray-800 leading-relaxed mt-2">
//                             More than <strong>80%</strong> of these have too many violations to earn an A.
//                         </p>
//                     </section>

//                     {/* Special Categories */}
//                     <section id="categories" className="break-inside-avoid mb-6">
//                         <h2 className="text-xl font-semibold text-black">Special Categories</h2>
//                         <ul className="list-disc pl-6 text-gray-800 space-y-1">
//                             <li><strong>Gold Star:</strong> Perfect score—no violations at the last inspection.</li>
//                             <li><strong>Questionable A Grades:</strong> A-grade restaurants cited with two or more critical violations.</li>
//                         </ul>
//                     </section>

//                     {/* Sources */}
//                     <section id="sources" className="break-inside-avoid">
//                         <p className="text-sm text-slate-600">
//                             <strong>Source:</strong> NYC Open Data / NYC Department of Health and Mental Hygiene (DOHMH).
//                         </p>
//                     </section>
//                 </div>
//             </div>
//         </div>
//     );
// }
import ScoreHistogram from "@/components/ScoreHistogram";

export const revalidate = 3600; // Revalidate the page every 1 hour


async function getBins() {
    const res = await fetch("https://nyc-eat-safe-production.up.railway.app/about", {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Failed to fetch histogram: ${res.status}`);
    return res.json(); // [{ bin_value, count }, ...]
}



export default async function AboutPage() {
    const bins = await getBins();


    // For the "Notice" section: pull the counts at 13 and 14 dynamically
    const countAt = (n) => {
        const match = Array.isArray(bins)
            ? bins.find((b) => Number(b.bin_value) === Number(n))
            : null;
        return match ? Number(match.count) : 0;
    };
    const count13 = countAt(13);
    const count14 = countAt(14);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-black px-2 sm:px-4 py-4">
            {/* Card wrapper with minimal padding/margin */}
            <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
                {/* Title bar */}
                <h1 className="bg-gradient-to-b from-[#2A3E83] via-[#1655A0] to-[#016CCE] text-white px-3 py-2 rounded-md text-2xl font-bold mb-4">
                    About
                </h1>

                {/* Two-column text on desktop; single column on mobile.
            Children are sections that avoid breaking across columns. */}
                <div className="lg:columns-2 lg:gap-8 [column-fill:balance]">
                    {/* About */}
                    <section id="about" className="break-inside-avoid mb-6">

                        <p className="text-gray-800 leading-relaxed mt-2">
                            <strong>Disclaimer:</strong> NYC Eat Safe is an independent project and is not affiliated with DOHMH.
                        </p>
                    </section>

                    {/* How Inspections Work */}
                    <section id="how-it-works" className="break-inside-avoid mb-6">
                        <h2 className="text-xl font-semibold text-black">How Inspections Work</h2>
                        <p className="text-gray-800 leading-relaxed">
                            Restaurants begin each inspection with <strong>0 points</strong>. Violations add points
                            depending on severity. The more points, the lower the grade.
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 mt-2">
                            <li><strong>A</strong>: 0-13 points</li>
                            <li><strong>B</strong>: 14-27 points</li>
                            <li><strong>C</strong>: 28+ points</li>
                            <li><strong>N</strong>: Grade not yet issued or pending</li>
                        </ul>
                    </section>

                    {/* Score Distribution — span BOTH columns on desktop */}
                    <section
                        id="chart"
                        className="break-inside-avoid my-8 lg:[column-span:all]"
                    >
                        <h2 className="text-xl font-semibold text-black mb-2">Score Distribution (0-17) from Each Restaurants Latest Inspection</h2>
                        <div className="w-full">
                            <ScoreHistogram bins={bins} height={300} />
                        </div>
                        {!bins?.length && (
                            <p className="text-sm text-slate-500 mt-2">
                                Chart coming soon when data is available.
                            </p>
                        )}
                    </section>

                    {/* Notice */}
                    <section id="notice" className="break-inside-avoid mb-6">
                        <h2 className="text-xl font-semibold text-black">Notice</h2>
                        <ul className="list-disc pl-6 text-gray-800 space-y-1">
                            <li>Restaurants with an A all skew towards the bottom of the range.</li>
                            <li>
                                There’s a sharp drop in counts from <strong>13</strong> to <strong>14</strong> points:&nbsp;
                                <strong>{count13.toLocaleString()}</strong> → <strong>{count14.toLocaleString()}</strong> restaurants. Which happens to be the threshold from an A to a B
                            </li>
                        </ul>
                    </section>


                    {/* Key Insights */}
                    <section id="key-insights" className="break-inside-avoid mb-6">
                        <h2 className="text-xl font-semibold text-black">Key Stats</h2>
                        <ul className="list-disc pl-6 text-gray-800 space-y-1">
                            <li><strong>80%</strong> of A-grade restaurants have at least one critical violation.</li>
                            <li>Nearly <strong>10%</strong> of A-grade restaurants are cited for rats, mice, or roaches. (Or multiple at once)</li>
                            <li>About <strong>40%</strong> of A-grade restaurants sit at 12-13 points (the lower end of A).</li>
                        </ul>
                    </section>

                    {/* Restaurants with an “N” */}
                    <section id="n-restaurants" className="break-inside-avoid mb-6">
                        <h2 className="text-xl font-semibold text-black">Restaurants with an “N”</h2>
                        <p className="text-gray-800 leading-relaxed">
                            An <strong>N</strong> grade means a restaurant’s letter grade hasn’t been issued yet even though an inspection occurred.
                        </p>
                        <p className="text-gray-800 leading-relaxed mt-2">
                            Over <strong>20%</strong> of inspected restaurants fall into this category for several reasons.
                        </p>
                        <p className="text-gray-800 leading-relaxed mt-2">
                            More than <strong>80%</strong> of these have too many violations to earn an A.
                        </p>
                    </section>

                    {/* Special Categories */}
                    <section id="categories" className="break-inside-avoid mb-6">
                        <h2 className="text-xl font-semibold text-black">Special Categories</h2>
                        <ul className="list-disc pl-6 text-gray-800 space-y-1">
                            <li><strong>Gold Star:</strong> Perfect score—no violations at the last inspection.</li>
                            <li><strong>Questionable A Grades:</strong> A-grade restaurants cited with two or more critical violations.</li>
                        </ul>
                    </section>

                    {/* Sources */}
                    <section id="sources" className="break-inside-avoid">
                        <p className="text-sm text-slate-600">
                            <strong>Source:</strong> NYC Open Data / NYC Department of Health and Mental Hygiene (DOHMH).
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}