// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Optional: nicer fonts
import { BookOpen } from 'lucide-react';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Interview Compendium",
  description: "Curated LeetCode questions by company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-amber-500/30">
        
        {/* Sticky Header */}
        <header className="border-b border-stone-800 bg-stone-950/95 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-amber-600" />
                <h1 className="text-xl font-semibold tracking-tight font-serif">
                  Interview Compendium
                </h1>
              </div>
              <nav className="flex items-center gap-6 text-sm font-medium">
                <a href="/" className="text-stone-400 hover:text-stone-200 transition">Companies</a>
                <span className="text-stone-600 cursor-not-allowed">Statistics</span>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}