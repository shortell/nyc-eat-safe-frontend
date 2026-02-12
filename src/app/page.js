import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "NYC Eat Safe - An A isn't always an A",
  description: "An A isn't always an A. Search NYC restaurant health inspection grades to find hidden violations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NYC Eat Safe - An A isn't always an A",
    description: "An A isn't always an A. Search NYC restaurant health inspection grades to find hidden violations.",
    url: "https://nyceatsafe.com",
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
