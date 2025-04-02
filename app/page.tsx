"use client";

import { useEffect, useState } from "react";
import { NoteForm } from "@/components/NoteForm";
import { NoteList } from "@/components/NoteList";

export type Nota = {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
};

export default function Page() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const fetchNotas = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotas(data);
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  const handleSubmit = async (data: { title: string; content: string }) => {
    const url = editandoId ? `/api/notes/${editandoId}` : "/api/notes";
    const method = editandoId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setFormData({ title: "", content: "" });
      setEditandoId(null);
      fetchNotas();
    }
  };

  const handleEdit = (nota: Nota) => {
    setFormData({ title: nota.title, content: nota.content });
    setEditandoId(nota.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta nota?")) return;

    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (res.ok) fetchNotas();
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <NoteForm
          onSubmit={handleSubmit}
          initialData={formData}
          modoEdicion={!!editandoId}
        />

        <NoteList notas={notas} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </main>
  );
}
