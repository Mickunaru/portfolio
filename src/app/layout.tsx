import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { AmbientWater } from "@/components/ambient-water";
import { InlineScript } from "@/components/inline-script";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lemichael.vercel.app"),
  title: "Michael Le",
  description:
    "I build software the way I play games — all the way to 100%. Problem solver by day, gamer by night.",
  openGraph: {
    title: "Michael Le",
    description:
      "I build software the way I play games — all the way to 100%. Problem solver by day, gamer by night.",
    url: "https://lemichael.vercel.app",
    siteName: "Michael Le",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Le",
    description:
      "I build software the way I play games — all the way to 100%.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="night"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html='(function(){try{var t=localStorage.getItem("theme");if(t==="day"||t==="night")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()' />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AmbientWater />
        <SiteNav />
        {children}
        <footer className="mx-auto flex w-full max-w-3xl flex-col gap-1 px-6 pb-10 pt-20">
          <p className="font-sans text-xs text-muted">
            Built with Next.js · deployed on Vercel
          </p>
          <p className="font-sans text-xs text-muted">I also hate portals.</p>
        </footer>
      </body>
    </html>
  );
}
