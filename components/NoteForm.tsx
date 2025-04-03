"use client";
import { useState } from "react";
import type React from "react";

type Props = {
  onSubmit: (data: { title: string; content: string }) => void;
  initialData?: { title: string; content: string };
  modoEdicion?: boolean;
};

export const NoteForm = ({ onSubmit, initialData, modoEdicion }: Props) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({ title, content });

    if (!modoEdicion) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-10 relative">
        <div className="absolute -top-24 -z-10 w-full h-48 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/10 blur-3xl rounded-full"></div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          My Notes
        </h1>
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
            <input
              className="w-full p-4 pl-5 text-lg bg-gray-50/50 border-1 border-indigo-200 rounded-2xl 
                focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                placeholder:text-gray-400 text-gray-800 font-medium transition-all"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          <div className="relative">
            <textarea
              className="w-full p-5 min-h-[160px] text-base bg-gray-50/50 border-1 border-indigo-200 rounded-2xl 
                focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                placeholder:text-gray-400 text-gray-700 resize-none transition-all"
              placeholder="What do you want to note today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          <button
            className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold 
              py-4 px-6 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 
              active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            type="submit"
          >
            {modoEdicion ? <>Save changes</> : <>Create new note</>}
          </button>
        </div>
      </form>
    </div>
  );
};
