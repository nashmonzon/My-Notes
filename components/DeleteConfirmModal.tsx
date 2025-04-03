"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import type React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
};

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "",
}: Props) => {
  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfirm();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Confirm deletion
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle size={24} className="text-red-500" />
                </div>
                <div>
                  <p className="text-gray-700">
                    Are you sure you want to delete this note?
                    {title && (
                      <span className="font-medium block mt-1">
                        &quot;{title}&quot;
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 
                    text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-5 py-2.5 rounded-xl bg-red-500 
                    text-white font-medium hover:bg-red-600 
                    active:scale-[0.98] transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
