"use client";

import { BookPlus, FileText } from "lucide-react";
import { motion } from "framer-motion";

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <FileText className="w-10 h-10 text-indigo-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No notes yet</h3>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Start by creating your first note using the form above.
      </p>
      <div className="flex items-center gap-2 text-indigo-600 font-medium">
        <BookPlus className="w-5 h-5" />
        <span>Create your first note</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="ml-1"
        >
          ➔
        </motion.div>
      </div>
    </motion.div>
  );
};
