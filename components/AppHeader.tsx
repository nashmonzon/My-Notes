"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      setShowTip(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setShowTip(false);
    }, 7000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </div>
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              My Notes
            </Link>
          </div>

          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
              onClick={() => setShowTip((prev) => !prev)}
              aria-label="Information"
            >
              <Info className="h-5 w-5 text-indigo-600" />
            </button>

            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg p-4 text-sm text-gray-600 border border-indigo-100"
                >
                  <p>
                    <span className="font-medium text-indigo-600">Tip:</span>{" "}
                    Click on any note to edit it or view its full content.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
