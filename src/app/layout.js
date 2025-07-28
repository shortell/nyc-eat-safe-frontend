import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Headbar2 from "@/components/Headbar2";
import Bottombar from "@/components/Bottombar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: {
    default: "NYC Eat Safe",
    template: "%s | NYC Eat Safe",
  },
  description: "An A isn't always an A",
  metadataBase: new URL("https://nyceatsafe.com"), // ✅ This is the key line that fixes the warning
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NYC Eat Safe",
    description: "An A isn't always an A",
    url: "https://nyceatsafe.com",
    siteName: "NYC Eat Safe",
    images: ["/og-image.png"], // 1200x630
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NYC Eat Safe",
    description: "An A isn't always an A",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}>
        <Headbar2 />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Bottombar />
      </body>
    </html>
  );
}
