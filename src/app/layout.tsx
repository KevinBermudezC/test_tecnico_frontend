import type { Metadata } from "next";
import React from "react";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/Navigation/sidebarNav";

// Optimizar la carga de fuentes
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "TRC Akademy",
  description: "Plataforma educativa TRC Akademy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-[#1A0B26] overflow-hidden">
      <body className={`${geist.className} overflow-hidden`}>
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
