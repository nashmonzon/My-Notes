"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Calendar, Clock } from "lucide-react";

type Props = {
  note: {
    id: number;
    title: string;
    content: string;
    updatedAt: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, data: { title: string; content: string }) => void;
};

type FormState = {
  title: string;
  content: string;
  hasChanges: boolean;
  errors: { title: boolean; content: boolean };
  submitted: boolean;
  viewMode: boolean;
};

const initialFormState: FormState = {
  title: "",
  content: "",
  hasChanges: false,
  errors: { title: false, content: false },
  submitted: false,
  viewMode: true,
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInputClasses = (hasError: boolean) => {
  const base =
    "w-full p-3 text-lg border rounded-xl focus:outline-none focus:ring-2";
  const error = "border-red-300 focus:ring-red-500/20 focus:border-red-500";
  const normal =
    "border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500";
  return `${base} ${hasError ? error : normal}`;
};

const DateTimeDisplay = ({ date, time }: { date: string; time: string }) => (
  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
    <div className="flex items-center gap-1">
      <Calendar className="w-4 h-4" />
      <span>{date}</span>
    </div>
    <span>•</span>
    <div className="flex items-center gap-1">
      <Clock className="w-4 h-4" />
      <span>{time}</span>
    </div>
  </div>
);

export const NoteModal = ({ note, isOpen, onClose, onSave }: Props) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  useEffect(() => {
    if (isOpen) {
      setFormState({
        ...initialFormState,
        title: note.title,
        content: note.content,
      });
    }
  }, [isOpen, note.id]);

  const handleSave = () => {
    setFormState((prev) => ({ ...prev, submitted: true }));

    const newErrors = {
      title: !formState.title.trim(),
      content: !formState.content.trim(),
    };

    if (newErrors.title || newErrors.content) {
      setFormState((prev) => ({ ...prev, errors: newErrors }));
      return;
    }

    onSave(note.id, { title: formState.title, content: formState.content });
    onClose();
  };

  const handleInputChange = (field: "title" | "content", value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      hasChanges: true,
      errors: {
        ...prev.errors,
        [field]: prev.submitted && !value.trim(),
      },
    }));
  };

  const toggleViewMode = () => {
    setFormState((prev) => ({ ...prev, viewMode: !prev.viewMode }));
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
            onClick={() => onClose()}
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
                  {formState.viewMode ? "View Note" : "Edit Note"}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleViewMode}
                    className="px-3 py-1.5 rounded-lg border border-indigo-100 
                      text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors"
                  >
                    {formState.viewMode ? "Edit" : "View"}
                  </button>
                  <button
                    onClick={() => onClose()}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {formState.viewMode ? (
                <div className="flex flex-col gap-4 flex-grow">
                  <DateTimeDisplay
                    date={formatDate(note.updatedAt)}
                    time={formatTime(note.updatedAt)}
                  />
                  <h3 className="text-2xl font-bold text-gray-800">
                    {note.title}
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5 flex-grow overflow-auto">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 flex-grow">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        Title <span className="text-indigo-500">*</span>
                      </label>
                      {formState.submitted && formState.errors.title && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Required field
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formState.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className={getInputClasses(
                        formState.submitted && formState.errors.title
                      )}
                      placeholder="Note title"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        Content <span className="text-indigo-500">*</span>
                      </label>
                      {formState.submitted && formState.errors.content && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Required field
                        </span>
                      )}
                    </div>
                    <textarea
                      value={formState.content}
                      onChange={(e) =>
                        handleInputChange("content", e.target.value)
                      }
                      className={`${getInputClasses(
                        formState.submitted && formState.errors.content
                      )} min-h-[200px] resize-none`}
                      placeholder="Note content"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => onClose()}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 
                    text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>

                {!formState.viewMode && (
                  <button
                    onClick={handleSave}
                    className={`px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                      text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 
                      active:scale-[0.98] transition-all duration-200
                      ${
                        !formState.title.trim() || !formState.content.trim()
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                    disabled={
                      !formState.title.trim() || !formState.content.trim()
                    }
                  >
                    Save changes
                  </button>
                )}
              </div>

              {!formState.viewMode && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Fields marked with <span className="text-indigo-500">*</span>{" "}
                  are required
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
