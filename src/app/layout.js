// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Headbar2 from "@/components/Headbar2";
// import Bottombar from "@/components/Bottombar";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export const metadata = {
//   title: {
//     default: "NYC Eat Safe",
//     template: "%s | NYC Eat Safe",
//   },
//   description: "An A isn't always an A",
//   metadataBase: new URL("https://nyceatsafe.com"), // ✅ This is the key line that fixes the warning
//   icons: {
//     icon: [
//       { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
//       { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
//     ],
//     apple: "/apple-touch-icon.png",
//   },
//   openGraph: {
//     title: "NYC Eat Safe",
//     description: "An A isn't always an A",
//     url: "https://nyceatsafe.com",
//     siteName: "NYC Eat Safe",
//     images: ["/og-image.png"], // 1200x630
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "NYC Eat Safe",
//     description: "An A isn't always an A",
//     images: ["/og-image.png"],
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="h-full">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}>
//         <Headbar2 />
//         <main className="flex-1 overflow-y-auto">{children}</main>
//         <Bottombar />
//       </body>
//     </html>
//   );
// }
// app/layout.js
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Headbar2 from "@/components/Headbar2";
import Bottombar from "@/components/Bottombar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata = {
  // Use full origin so all relative asset URLs (OG/Twitter images) resolve correctly
  metadataBase: new URL("https://www.nyceatsafe.com"),

  // Clean defaults + page-specific override support
  title: {
    default: "NYC Eat Safe",
    template: "%s | NYC Eat Safe",
  },
  description:
    "Explore NYC restaurant health inspection grades, scores, and violations. Public records from the NYC Dept. of Health.",

  keywords: [
    "NYC restaurants",
    "restaurant grades",
    "health inspection",
    "NYC DOHMH",
    "violations",
  ],

  // Let children override if they set their own canonical
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://www.nyceatsafe.com/",
    siteName: "NYC Eat Safe",
    title: "NYC Eat Safe – Restaurant Health Inspection Records",
    description:
      "Find inspection grades, scores, and violations for NYC restaurants.",
    images: [
      {
        // Place a 1200x630 image in /public/preview.png (or change to your file)
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "NYC Eat Safe preview",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "NYC Eat Safe – Restaurant Health Inspection Records",
    description:
      "Find inspection grades, scores, and violations for NYC restaurants.",
    images: ["/preview.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${manrope.variable} ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
      >
        <Headbar2 />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Bottombar />
      </body>
    </html>
  );
}
