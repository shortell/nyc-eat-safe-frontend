import { notFound } from "next/navigation";
import Paper from '@mui/material/Paper';
import GradeLetter from "@/components/GradeLetter";
import ScoreBox from "@/components/ScoreBox";
import ViolationsTable from "@/components/ViolationsTable";
import ShareButtons from "@/components/ShareButtons";
import InspectionExplanation from "@/components/InspectionExplanation";
import NGradeExplanation from "@/components/NGradeExplanation";
import ScoreGauge from "@/components/ScoreGauge";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function toTitleCase(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}

async function getRestaurant(camis) {
  const res = await fetch(`${BASE_URL}/restaurant/${parseInt(camis, 10)}`, {
    next: { revalidate: 60 }, // ISR every 1m
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

  const name = toTitleCase(header.dba) || "Restaurant";
  const displayBorough = header.borough?.toLowerCase() === 'bronx' ? 'THE Bronx' : header.borough;
  const street = toTitleCase(header.street);
  const address = `${header.building} ${street}, ${displayBorough} ${header.zipcode}`;
  const canonical = `https://nyceatsafe.com/restaurant/${camis}`;
  const description = `${name} in ${displayBorough}: Grade ${grade}${score != null ? `, Score: ${score}` : ""}. An A isn't always an A.`;

  return {
    title: `${name} - NYC Eat Safe`,
    description,
    alternates: { canonical },
    keywords: [name, "NYC Eat Safe", "NYC health inspection", header.borough, header.zipcode, grade, String(score ?? "")].filter(Boolean),
    openGraph: {
      title: `${name} - NYC Eat Safe`,
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

  const restaurantName = toTitleCase(header.dba);
  const streetName = toTitleCase(header.street);

  return (
    <div className="w-full min-h-screen bg-[#f5f2fa] py-8 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-3 sm:p-8">
        {/* Header */}
        <div className="mb-6 border-b pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a1a]">{restaurantName}</h1>
            <p className="text-gray-700 mt-1 font-medium">
              {header.building} {streetName}, {header.borough?.toLowerCase() === 'bronx' ? 'THE Bronx' : header.borough}
            </p>
          </div>
          <ShareButtons
            url={`https://nyceatsafe.com/restaurant/${camis}`}
            title={`Check out ${restaurantName}'s health inspection results on NYC Eat Safe!`}
          />
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

        {/* How Inspections Work */}
        <div className="mb-8 space-y-4">
          <InspectionExplanation collapsible />
          {(profile[0]?.grade === 'N' || !profile[0]?.grade) && (
            <NGradeExplanation />
          )}
        </div>

        {/* Inspections */}
        <div className="space-y-16">
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
            url: `https://nyceatsafe.com/restaurant/${camis}`,
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

  const isPlaceholderDate = inspection.inspection_date && String(inspection.inspection_date).startsWith('1900-01-01');

  const date = isPlaceholderDate
    ? "Restaurant Has Never Been Inspected"
    : new Date(inspection.inspection_date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const currentGrade = inspection.grade ?? "N";

  let projectedGrade = null;
  if (currentGrade === 'N' && inspection.score !== null && inspection.score !== undefined) {
    const s = inspection.score;
    if (s <= 13) projectedGrade = 'A';
    else if (s <= 27) projectedGrade = 'B';
    else projectedGrade = 'C';
  }

  return (
    <div className="relative mx-auto max-w-2xl w-full">
      {/* 
        Skeuomorphic Clipboard 
        - Board: Solid masonite-like dark slate/brown option or modern polymer.
          Let's go with a premium dark slate matte finish for "modern sleek".
        - Clip: Realistic metal gradient with holes for mounting.
      */}
      <div
        className="
          relative rounded-[24px]
          bg-[#333333]
          shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]
          pb-4 pt-4 px-2 sm:px-4
        "
      >
        {/* Board Texture/Grain (Subtle) */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        {/* 
          Clip Mechanism
          - Modeled after the reference image (silver/steel standard clip)
          - Centered top
        */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-[5] w-32 h-16 flex justify-center">
          {/* Back plate of the clip */}
          <div className="absolute top-6 w-28 h-8 bg-gradient-to-b from-slate-300 to-slate-400 rounded-sm shadow-sm" />

          {/* The main clip body (curved part) */}
          <div className="
              relative top-0
              w-24 h-12
              bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400
              rounded-t-[1.5rem] rounded-b-sm
              shadow-[0_4px_6px_rgba(0,0,0,0.4)]
              border-t border-white/40
              flex items-center justify-center
            ">
            {/* The "mounting hole" */}
            <div className="w-4 h-4 rounded-full bg-[#1a1a1a] shadow-inner mb-4 border border-slate-400" />

            {/* Rivets */}
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-slate-200 shadow-sm" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-slate-200 shadow-sm" />
          </div>
        </div>

        {/* 
          Paper Sheet using MUI Paper
          - White, clear text
          - Rounded corners slightly
        */}
        <Paper
          elevation={4}
          sx={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            minHeight: '400px',
            backgroundColor: '#ffffff',
            padding: { xs: '1rem', sm: '2rem' },
            paddingTop: { xs: '3rem', sm: '3.5rem' }, // Pushed down for clip overlap
          }}
        >
          {/* Header Area */}
          <div className="flex flex-col items-center border-b-2 border-slate-100 pb-6 mb-6">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Inspection Results</h2>
            <div className={`font-mono font-bold text-slate-800 ${isPlaceholderDate ? "text-lg text-center leading-tight" : "text-2xl"}`}>{date}</div>
          </div>

          {/* Grades - Unified Horizontal Design */}
          <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 w-full mb-8 py-6 border-y border-dashed border-slate-200">
            <div className="flex flex-col items-center sm:flex-1 sm:basis-0">
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-widest mb-2 whitespace-nowrap text-center">City Grade</span>
              <div className="scale-110">
                <GradeLetter grade={currentGrade} />
              </div>
            </div>

            <div className="w-px h-12 bg-slate-200 flex-none" />

            <div className="flex flex-col items-center sm:flex-1 sm:basis-0">
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-widest mb-2 whitespace-nowrap text-center">Violation Score</span>
              <div className="scale-110">
                <ScoreBox score={inspection.score} />
              </div>
            </div>

            {projectedGrade && (
              <>
                <div className="hidden sm:block w-px h-12 bg-slate-200 flex-none" />
                <div className="flex flex-col items-center basis-full sm:flex-1 sm:basis-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-widest mb-2 whitespace-nowrap text-center">Projected Grade</span>
                  <div className="scale-110">
                    <GradeLetter grade={projectedGrade} />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Score Gauge */}
          <div className="w-full px-4 mb-8">
            <ScoreGauge score={inspection.score} />
          </div>

          {/* Violations Mobile Scroll Wrapper */}
          <div className="w-full overflow-x-auto">
            <ViolationsTable violations={sortedViolations} />
          </div>

        </Paper>
      </div>
    </div>
  );
}

