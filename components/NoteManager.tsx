"use client";

import { useState, useTransition } from "react";
import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";
import type { Note } from "@/types/utils";
import { createNote, updateNote, deleteNote } from "@/app/actions/notes";
import { Loader2 } from "lucide-react";

type Props = {
  initialNotes: Note[];
};

export const NoteManager = ({ initialNotes }: Props) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: { title: string; content: string }) => {
    startTransition(async () => {
      try {
        if (editingId) {
          await updateNote(editingId, data);
          setEditingId(null);
          setFormData({ title: "", content: "" });
        } else {
          await createNote(data);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    });
  };

  const handleEdit = (note: Note) => {
    startTransition(async () => {
      try {
        await updateNote(note.id, {
          title: note.title,
          content: note.content,
        });
      } catch (err) {
        console.error("Error updating note:", err);
      }
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      try {
        await deleteNote(id);
        if (editingId === id) {
          setEditingId(null);
          setFormData({ title: "", content: "" });
        }
      } catch (err) {
        console.error("Error deleting note:", err);
      }
    });
  };

  return (
    <>
      {isPending && (
        <div className="fixed top-4 right-4 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving...
        </div>
      )}
      <NoteForm
        onSubmit={handleSubmit}
        initialData={formData}
        editMode={!!editingId}
      />

      <div className="max-w-7xl mx-auto">
        <NoteList
          notes={initialNotes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};
