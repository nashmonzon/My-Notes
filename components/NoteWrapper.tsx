"use client";

import { useState } from "react";
import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";
import type { Nota } from "@/app/page";

type Props = {
  initialNotas: Nota[];
};

export function NoteWrapper({ initialNotas }: Props) {
  const [notas, setNotas] = useState<Nota[]>(initialNotas);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleSubmit = async (data: { title: string; content: string }) => {
    const url = editandoId ? `/api/notes/${editandoId}` : "/api/notes";
    const method = editandoId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const updatedNota = await res.json();

      setNotas((prevNotas) => {
        if (editandoId) {
          return prevNotas.map((nota) =>
            nota.id === editandoId ? updatedNota : nota
          );
        }
        return [updatedNota, ...prevNotas];
      });

      setFormData({ title: "", content: "" });
      setEditandoId(null);
    }
  };

  const handleEdit = (nota: Nota) => {
    setFormData({ title: nota.title, content: nota.content });
    setEditandoId(nota.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta nota?")) return;

    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (res.ok) {
      setNotas((prevNotas) => prevNotas.filter((nota) => nota.id !== id));
    }
  };

  return (
    <>
      <NoteForm
        onSubmit={handleSubmit}
        initialData={formData}
        modoEdicion={!!editandoId}
      />
      <NoteList notas={notas} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
