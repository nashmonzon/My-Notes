"use client";
import { useState } from "react";
import type React from "react";
import { PlusCircle, Sparkles, AlertCircle } from "lucide-react";

type Props = {
  onSubmit: (data: { title: string; content: string }) => void;
  initialData?: { title: string; content: string };
  editMode?: boolean;
};

export const NoteForm = ({ onSubmit, initialData, editMode }: Props) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isFocused, setIsFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const titleError = submitted && !title.trim();
  const contentError = submitted && !content.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!title.trim() || !content.trim()) return;

    onSubmit({ title, content });

    if (!editMode) {
      setTitle("");
      setContent("");
      setSubmitted(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-10 relative">
        <div className="absolute -top-24 -z-10 w-full h-48 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/10 blur-3xl rounded-full"></div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            My Notes
          </h1>
        </div>
        <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`w-full p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl 
          transition-all duration-300 mb-10
          ${
            isFocused
              ? "shadow-indigo-500/10 ring-1 ring-indigo-500/20"
              : "shadow-gray-200/80"
          }
        `}
      >
        <div className="flex flex-col gap-5">
          <div className="relative">
            <div className="flex justify-between mb-1.5">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title <span className="text-indigo-500">*</span>
              </label>
              {titleError && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Required field
                </span>
              )}
            </div>
            <input
              id="title"
              className={`w-full p-4 pl-5 text-lg bg-gray-50/50 border ${
                titleError
                  ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                  : "border-indigo-100 focus:ring-indigo-500/20 focus:border-indigo-500"
              } rounded-2xl 
                focus:outline-none focus:ring-2 
                placeholder:text-gray-400 text-gray-800 font-medium transition-all`}
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
              }}
            />
          </div>

          <div className="relative">
            <div className="flex justify-between mb-1.5">
              <label
                htmlFor="content"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Content <span className="text-indigo-500">*</span>
              </label>
              {contentError && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Required field
                </span>
              )}
            </div>
            <textarea
              id="content"
              className={`w-full p-5 min-h-[160px] text-base bg-gray-50/50 border ${
                contentError
                  ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                  : "border-indigo-100 focus:ring-indigo-500/20 focus:border-indigo-500"
              } rounded-2xl 
                focus:outline-none focus:ring-2 
                placeholder:text-gray-400 text-gray-700 resize-none transition-all`}
              placeholder="What do you want to note today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
              }}
            />
          </div>

          <div className="mt-2">
            <button
              className={`group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold 
                py-4 px-6 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 
                active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2
                ${
                  !title.trim() || !content.trim()
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              type="submit"
              disabled={submitted && (!title.trim() || !content.trim())}
            >
              <PlusCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              {editMode ? "Save changes" : "Create new note"}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Fields marked with <span className="text-indigo-500">*</span> are
              required
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
