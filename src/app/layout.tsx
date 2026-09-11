import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MannRakshak",
  description: "AI-Powered Dynamic Mental Health Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 pb-24">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
