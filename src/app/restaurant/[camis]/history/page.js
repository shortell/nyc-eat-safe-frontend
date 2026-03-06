import { notFound } from "next/navigation";
import Divider from '@mui/material/Divider';
import BackButton from '@/components/BackButton';
import HistoryChart from '@/components/HistoryChart';
import HistoryAccordions from '@/components/HistoryAccordions';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function toTitleCase(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}

async function getRestaurant(camis) {
    const res = await fetch(`${BASE_URL}/restaurant/${parseInt(camis, 10)}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) notFound();
    const json = await res.json();
    if (!json || json.length === 0) notFound();
    return json[0];
}

async function getHistory(camis) {
    const res = await fetch(`${BASE_URL}/restaurant/${parseInt(camis, 10)}/history`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : [];
}

export async function generateMetadata({ params }) {
    const { camis } = await params;
    const data = await getRestaurant(camis);
    const header = data.restaurant_details?.[0] || {};

    const name = toTitleCase(header.dba) || "Restaurant";
    const displayBorough = header.borough?.toLowerCase() === 'bronx' ? 'THE Bronx' : header.borough;
    const canonical = `https://nyceatsafe.com/restaurant/${camis}/history`;
    const description = `Full inspection history for ${name} in ${displayBorough}. View violation scores over time and detailed inspection reports.`;

    return {
        title: `${name} Inspection History - NYC Eat Safe`,
        description,
        alternates: { canonical },
        keywords: [name, "inspection history", "NYC Eat Safe", "NYC health inspection", header.borough, header.zipcode].filter(Boolean),
        openGraph: {
            title: `${name} Inspection History - NYC Eat Safe`,
            description,
            url: canonical,
            type: "website",
        },
    };
}

export default async function HistoryPage({ params }) {
    const { camis } = await params;
    const [data, history] = await Promise.all([
        getRestaurant(camis),
        getHistory(camis),
    ]);

    const header = data.restaurant_details[0];
    const restaurantName = toTitleCase(header.dba);
    const streetName = toTitleCase(header.street);
    const displayBorough = header.borough?.toLowerCase() === 'bronx' ? 'THE Bronx' : header.borough;

    return (
        <div className="w-full min-h-screen bg-[#f5f2fa] pt-4 pb-8 px-2 relative">
            <BackButton />
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-3 sm:p-8 mt-2">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-[#1a1a1a]">{restaurantName}</h1>
                    <p className="text-gray-700 mt-1 font-medium">
                        {header.building} {streetName}, {displayBorough}
                    </p>
                </div>
                <Divider sx={{ mb: 4, borderColor: 'rgba(0,0,0,0.18)' }} />

                {/* Score Over Time Chart */}
                <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-2 sm:p-6 shadow-sm">
                    <HistoryChart inspections={history} />
                </div>

                {/* Inspection Accordions */}
                <HistoryAccordions inspections={history} />
            </div>
        </div>
    );
}
