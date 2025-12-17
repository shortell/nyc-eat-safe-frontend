import ScoreHistogram from "@/components/ScoreHistogram";

export const revalidate = 3600; // Revalidate the page every 1 hour

async function getBins() {
    const res = await fetch("https://nyc-eat-safe-production.up.railway.app/about", {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Failed to fetch histogram: ${res.status}`);
    return res.json(); // [{ bin_value, count }, ...]
}

function StatCard({ label, value, description }) {
    return (
        <div className="bg-[#f0f4ff] rounded-xl p-5 border border-indigo-50 flex flex-col justify-center items-center text-center">
            <div className="text-3xl font-bold text-[#2a3d83] mb-1">{value}</div>
            <div className="text-sm text-slate-600">{description}</div>
        </div>
    );
}

function CategoryCard({ title, items }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 text-sm leading-relaxed">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#1655A0] mt-2" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
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
        <main className="min-h-screen bg-[#f6f3fa] text-slate-900 py-8 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Hero / Intro Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#2A3E83] via-[#1655A0] to-[#016CCE]" />
                    <div className="p-6 sm:p-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">About NYC Eat Safe</h1>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                            NYC Eat Safe helps New Yorkers make better dining decisions by presenting inspection data in a clear, searchable way. We transform complex city data into insights you can use to spot trends and choose where to eat with confidence.
                        </p>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-slate-500 text-sm italic">
                                <strong>Disclaimer:</strong> This is an independent project and is not affiliated with the NYC Department of Health and Mental Hygiene (DOHMH).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        value="80%"
                        description="of A-grade restaurants have at least one critical violation."
                    />
                    <StatCard
                        value="~10%"
                        description="of A-grade restaurants are cited for rats, mice, or roaches."
                    />
                    <StatCard
                        value="40%"
                        description="of A-grade restaurants sit at exactly 12-13 points."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* How Inspections Work */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">How Inspections Work</h2>
                        <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                            Restaurants begin each inspection with <strong>0 points</strong>. Violations add points depending on severity—the more points, the lower the grade.
                        </p>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full text-sm">A</span>
                                <span className="text-slate-700 text-sm font-medium">0 - 13 points</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 font-bold rounded-full text-sm">B</span>
                                <span className="text-slate-700 text-sm font-medium">14 - 27 points</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-700 font-bold rounded-full text-sm">C</span>
                                <span className="text-slate-700 text-sm font-medium">28+ points</span>
                            </div>
                        </div>
                    </div>

                    {/* N Restaurants */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">What is Grade "N"?</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            An <strong>N</strong> grade means a letter grade hasn’t been issued yet (e.g. pending). Over <strong>20%</strong> of restaurants fall into this category.
                        </p>
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                            <p className="text-amber-800 text-sm font-medium">
                                More than <strong>80%</strong> of "N" restaurants have too many violations to earn an A.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Score Distribution</h2>
                        <p className="text-slate-500 text-sm">Scores from each restaurant's latest inspection (0-17 range)</p>
                    </div>

                    <div className="w-full">
                        <ScoreHistogram bins={bins} height={350} />
                    </div>

                    {!bins?.length && (
                        <p className="text-sm text-slate-500 mt-2 text-center">Charts coming soon when data is available.</p>
                    )}

                    {/* Breakdown Text */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 space-y-2">
                        <p className="font-semibold text-slate-800">Observation:</p>
                        <p>
                            Restaurants heavily cluster towards the bottom of the 'A' range.
                            There’s a sharp drop from <strong>13 points</strong> ({count13.toLocaleString()} restaurants)
                            to <strong>14 points</strong> ({count14.toLocaleString()} restaurants).
                        </p>
                    </div>
                </div>

                {/* Special Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CategoryCard
                        title="Special Categories"
                        items={[
                            <><strong>Gold Star:</strong> Perfect score—no violations at the last inspection.</>,
                            <><strong>Questionable A Grades:</strong> A-grade restaurants cited with two or more critical violations.</>
                        ]}
                    />

                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex flex-col justify-center">
                        <p className="text-sm text-slate-600">
                            <strong>Data Source:</strong><br />
                            NYC Open Data / NYC Department of Health and Mental Hygiene (DOHMH).
                        </p>
                        <p className="text-sm text-slate-400 mt-2">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
