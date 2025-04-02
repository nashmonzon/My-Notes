"use client";
import { NoteCard as NoteCardWC } from "../web-components/note-card";
import { createComponent } from "@lit/react";

import React from "react";

type Nota = {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
};

type Props = {
  nota: Nota;
  onEdit: (nota: Nota) => void;
  onDelete: (id: number) => void;
};

const NoteCard = createComponent({
  react: React,
  tagName: "note-card",
  elementClass: NoteCardWC,
});

export const NoteItem = ({ nota, onEdit, onDelete }: Props) => {
  return (
    <div>
      <NoteCard
        title={nota?.title}
        content={nota?.content}
        updatedat={nota?.updatedAt}
        onEdit={() => onEdit(nota)}
        onDelete={() => onDelete(nota.id)}
      />
    </div>
  );
};
