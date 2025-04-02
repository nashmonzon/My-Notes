"use client";

import { useState, useTransition } from "react";
import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";
import { Nota } from "@/types/utils";
import { createNote, updateNote, deleteNote } from "@/app/actions/notes";

type Props = {
  initialNotes: Nota[];
};

export const NoteManager = ({ initialNotes }: Props) => {
  const [notas, setNotas] = useState<Nota[]>(initialNotes);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: { title: string; content: string }) => {
    startTransition(async () => {
      try {
        if (editandoId) {
          const updated = await updateNote(editandoId, data);
          setNotas((prev) =>
            prev.map((n) => (n.id === editandoId ? updated : n))
          );
        } else {
          const nueva = await createNote(data);
          setNotas((prev) => [{ ...nueva, id: Number(nueva.id) }, ...prev]);
        }

        setFormData({ title: "", content: "" });
        setEditandoId(null);
      } catch (err) {
        console.error("Error:", err);
      }
    });
  };

  const handleEdit = (nota: Nota) => {
    setFormData({ title: nota.title, content: nota.content });
    setEditandoId(nota.id);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    startTransition(async () => {
      try {
        await deleteNote(id);
        setNotas((prev) => prev.filter((nota) => nota.id !== id));
      } catch (err) {
        console.error("Error deleting note:", err);
      }
    });
  };

  return (
    <>
      {isPending && <div className="text-sm text-indigo-600">Saving...</div>}
      <NoteForm
        onSubmit={handleSubmit}
        initialData={formData}
        modoEdicion={!!editandoId}
      />

      <NoteList notas={notas} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};
