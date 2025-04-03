"use client";
import { useState } from "react";
import { NoteCard as NoteCardWC } from "../web-components/note-card";
import { createComponent } from "@lit/react";
import { NoteModal } from "./NoteModal";

import React from "react";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

type Note = {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
};

type Props = {
  note: Note;
  onEdit: (nota: Note) => void;
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
      <div className="h-[240px] w-full">
        <NoteCard
          title={note?.title}
          content={note?.content}
          updatedat={note?.updatedAt}
          onDelete={handleDeleteClick}
          onClick={handleCardClick}
        />
      </div>

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
