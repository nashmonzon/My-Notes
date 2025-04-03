import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Notes | Modern note-taking app",
  description: "An elegant and modern note-taking app to organize your ideas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50`}>
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <main className="flex-grow">{children}</main>
          <footer className="py-6 border-t border-indigo-100 bg-white/50">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-400"></span>
                </div>
                <p>
                  © {new Date().getFullYear()} My Notes. All rights reserved.
                </p>
              </div>
            </div>
            ;
          </footer>
        </div>
      </body>
    </html>
  );
}
