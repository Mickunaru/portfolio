import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Michael Le",
  description:
    "Personal website of Michael Le — problem solver by day, gamer by night.",
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
        {/* Applies the stored theme before first paint (FR-1: night default,
            persisted choice wins). */}
        <InlineScript html='(function(){try{var t=localStorage.getItem("theme");if(t==="day"||t==="night")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()' />
      </head>
      <body className="min-h-full flex flex-col font-sans">
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
