"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  nota: {
    id: number;
    title: string;
    content: string;
    updatedAt: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, data: { title: string; content: string }) => void;
};

export const NoteModal = ({ nota, isOpen, onClose, onSave }: Props) => {
  const [title, setTitle] = useState(nota.title);
  const [content, setContent] = useState(nota.content);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(nota.title);
      setContent(nota.content);
      setHasChanges(false);
    }
  }, [isOpen, nota]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(nota.id, { title, content });
      onClose();
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      if (confirm("Discard changes?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Note
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="flex flex-col gap-4 flex-grow">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setHasChanges(true);
                  }}
                  className="w-full p-3 text-lg border border-gray-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                    focus:border-indigo-500 text-gray-800 font-medium"
                  placeholder="Note title"
                />

                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setHasChanges(true);
                  }}
                  className="w-full p-4 min-h-[200px] text-base border border-gray-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                    focus:border-indigo-500 text-gray-700 resize-none flex-grow"
                  placeholder="Note content"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 
                    text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                    text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 
                    active:scale-[0.98] transition-all duration-200"
                  disabled={!title.trim() || !content.trim()}
                >
                  Save changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
