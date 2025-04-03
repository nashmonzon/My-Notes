"use client";
import { useState } from "react";
import { NoteCard as NoteCardWC } from "../web-components/note-card";
import { createComponent } from "@lit/react";
import { NoteModal } from "./NoteModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { motion } from "framer-motion";
import React from "react";

type Note = {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
};

type Props = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

const NoteCard = createComponent({
  react: React,
  tagName: "note-card",
  elementClass: NoteCardWC,
});

export const NoteItem = ({ note, onEdit, onDelete }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(note.id);
    setIsDeleteModalOpen(false);
  };

  const handleSave = (id: number, data: { title: string; content: string }) => {
    onEdit({ ...note, ...data });
  };

  return (
    <>
      <motion.div
        className="h-[240px] w-full relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <NoteCard
          title={note?.title}
          content={note?.content}
          updatedat={note?.updatedAt}
          onDelete={handleDeleteClick}
          onClick={handleCardClick}
        />

        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-2 bg-indigo-100 rounded-full p-1"
          >
            <span className="block w-2 h-2 rounded-full bg-indigo-500"></span>
          </motion.div>
        )}
      </motion.div>

      <NoteModal
        note={note}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={note.title}
      />
    </>
  );
};
