// app/layout.js
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Headbar2 from "@/components/Headbar2";
import Bottombar from "@/components/Bottombar";
import { Providers } from "@/context/Providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata = {
  // Use full origin so all relative asset URLs (OG/Twitter images) resolve correctly
  metadataBase: new URL("https://nyceatsafe.com"),

  // Clean defaults + page-specific override support
  title: {
    default: "NYC Eat Safe - An A isn't always an A",
    template: "%s | NYC Eat Safe",
  },
  description:
    "An A isn't always an A. Explore NYC restaurant health inspection grades, scores, and violations.",

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
    url: "https://nyceatsafe.com/",
    siteName: "NYC Eat Safe",
    title: "NYC Eat Safe - An A isn't always an A",
    description:
      "An A isn't always an A. Explore NYC restaurant health inspection grades, scores, and violations.",
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
    title: "NYC Eat Safe - An A isn't always an A",
    description:
      "An A isn't always an A. Explore NYC restaurant health inspection grades, scores, and violations.",
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
        <Providers>
          <div id="hide-grow-widget"></div>
          {/* Google tag (gtag.js) */}
          {process.env.NODE_ENV === "production" && (
            <>
              <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-NL8KLQVYEH"
                strategy="lazyOnload"
              />
              <Script id="google-analytics" strategy="lazyOnload">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
    
                  gtag('config', 'G-NL8KLQVYEH');
                `}
              </Script>
              <Script id="mediavine-journey" strategy="lazyOnload">
                {`
                  !(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTo5MzhjNWVhYi1lMjRiLTRmMDQtYjg2My01NzI5NWZlYzAwNmI=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();
                `}
              </Script>
              <Script
                src="//scripts.scriptwrapper.com/tags/938c5eab-e24b-4f04-b863-57295fec006b.js"
                strategy="afterInteractive"
                data-noptimize="1"
                data-cfasync="false"
              />
            </>
          )}
          <Headbar2 />
          <main id="main-content" className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <footer className="w-full py-8 pb-24 text-center text-xs text-gray-500 mt-auto flex items-center justify-center space-x-2">
              <span>&copy; {new Date().getFullYear()} NYC Eat Safe</span>
              <span>&bull;</span>
              <a href="/privacy" className="hover:text-gray-700 hover:underline transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 outline-none rounded px-1 py-1">Privacy Policy</a>
            </footer>
          </main>
          <Bottombar />
        </Providers>
      </body>
    </html>
  );
}
