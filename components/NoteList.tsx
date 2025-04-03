"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NoteItem } from "./NoteItem";
import { EmptyState } from "./EmptyState";
import { useState } from "react";
import { Search, X } from "lucide-react";

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

export const NoteList = ({ notes, onEdit, onDelete }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-700">
          {notes.length > 0
            ? `${notes.length} note${notes.length !== 1 ? "s" : ""} saved`
            : "No notes saved"}
        </h2>

        {notes.length > 1 && (
          <div className="flex items-center gap-2">
            {showSearch ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-8 py-2 rounded-full border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </motion.div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
                aria-label="Search notes"
              >
                <Search className="w-5 h-5 text-indigo-600" />
              </button>
            )}
          </div>
        )}
      </div>

      {notes.length > 0 ? (
        <>
          {searchTerm && filteredNotes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No notes found that match &quot;{searchTerm}&quot;
              </p>
            </div>
          ) : (
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredNotes.map((note) => (
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
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
