"use client";

import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { NoteItem } from "./NoteItem";

type Note = {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
};

type Props = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export const NoteList = ({ notes = [], onEdit, onDelete }: Props) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
        {notes.length > 0
          ? `${notes.length} note${notes.length !== 1 ? "s" : ""} saved`
          : "No notes saved"}
      </h2>

      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {notes.map((note) => (
            <motion.li
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.5 },
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                opacity: { duration: 0.5 },
              }}
              className="h-[240px]"
            >
              <NoteItem note={note} onEdit={onEdit} onDelete={onDelete} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <BookIcon className="w-10 h-10 text-indigo-500" />
          </div>
          <p className="text-gray-500 text-center max-w-md">
            Start by creating your first note using the form above.
          </p>
        </div>
      )}
    </div>
  );
};

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
