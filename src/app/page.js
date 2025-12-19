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

export default function Home() {
  return <HomeClient />;
}
