"use client";

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

export const NoteList = ({ notes, onEdit, onDelete }: Props) => {
  return (
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
            <NoteItem nota={note} onEdit={onEdit} onDelete={onDelete} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};
