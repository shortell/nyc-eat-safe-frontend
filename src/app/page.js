import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "NYC Eat Safe - Restaurant Health Inspection Grades & Violations",
  description: "Search NYC restaurant health inspection grades. Find out if your favorite restaurant has hidden violations despite having an 'A' grade.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NYC Eat Safe - Restaurant Health Inspection Grades",
    description: "Don't just trust the A. See the full inspection history, violations, and scores for NYC restaurants.",
    url: "https://www.nyceatsafe.com",
    images: ["/opengraph-image.png"],
  },
};

async function getHomeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!res.ok) {
    throw new Error("Failed to fetch home data");
  }
  return res.json();
}

export default async function Home() {
  let initialData = null;
  try {
    initialData = await getHomeData();
  } catch (error) {
    console.error("Error fetching home data:", error);
    // You might want to handle error state gracefully here or in the client component
  }

  return <HomeClient initialData={initialData} />;
}
