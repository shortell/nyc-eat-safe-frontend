// app/layout.js
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";
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
        url: "/opengraph-image.png",
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
    images: ["/opengraph-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
    <html lang="en" className="h-full" style={{ scrollBehavior: 'smooth' }} data-scroll-behavior="smooth">
      <body
        className={`${manrope.variable} ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
      >
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NL8KLQVYEH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NL8KLQVYEH');
          `}
        </Script>
        <Script id="mediavine-journey" strategy="afterInteractive">
          {`
            !(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTo5MzhjNWVhYi1lMjRiLTRmMDQtYjg2My01NzI5NWZlYzAwNmI=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();
          `}
        </Script>
        <Headbar2 />
        <main id="main-content" className="flex-1 overflow-y-auto">{children}</main>
        <Bottombar />
      </body>
    </html>
  );
}
