import ScoreHistogram from "@/components/ScoreHistogram";
import GradePieChart from "@/components/GradePieChart";
import InspectionExplanation from "@/components/InspectionExplanation";
import NGradeExplanation from "@/components/NGradeExplanation";

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
                                <strong>Disclaimer:</strong> This is an independent project and is not affiliated with the NYC Department of Health and Mental Hygiene (DOHMH). We use the <a href="https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j/about_data" target="_blank" rel="noopener noreferrer" className="text-[#016CCE] underline hover:text-[#1655A0]">publicly available data they publish</a>.
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
                        value="10%"
                        description="of A-grade restaurants have rats, mice, or roaches."
                    />
                    <StatCard
                        value="40%"
                        description="of A-grade restaurants have exactly 12-13 points."
                    />
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Score Distribution</h2>
                        <p className="text-slate-500 text-sm">Scores from each restaurant&apos;s latest inspection (0-16 range)</p>
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
                            Restaurants heavily cluster towards the bottom of the &apos;A&apos; range.
                            There's a sharp drop from <strong>13 points</strong> ({count13.toLocaleString()} restaurants)
                            to <strong>14 points</strong> ({count14.toLocaleString()} restaurants).
                        </p>
                    </div>
                </div>

                {/* Grade Distribution Pie Chart */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-900">Grade Distribution</h2>
                        <p className="text-slate-500 text-sm">Breakdown of grades from each restaurant&apos;s most recent inspection</p>
                    </div>
                    <GradePieChart />
                </div>

                {/* How Inspections Work + N Grade */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InspectionExplanation />
                    <NGradeExplanation />
                </div>

                {/* Special Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CategoryCard
                        title="Special Categories"
                        items={[
                            <><strong>Spotless Kitchen:</strong> No violations at the last inspection up to two non-critical violations.</>,
                            <><strong>Is This an A to You?:</strong> A-grade restaurants cited with two or more critical violations.</>
                        ]}
                    />


                </div>

            </div>
        </main>
    );
}
