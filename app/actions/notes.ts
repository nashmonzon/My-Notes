"use server";

import db from "@/db";
import { revalidatePath } from "next/cache";

export async function createNote(data: { title: string; content: string }) {
  const nuevaNota = {
    title: data.title,
    content: data.content,
    updatedAt: new Date().toISOString(),
  };

  const stmt = db.prepare(`
    INSERT INTO notes (title, content, updatedAt)
    VALUES (@title, @content, @updatedAt)
  `);
  const info = stmt.run(nuevaNota);

  revalidatePath("/");
  return { id: info.lastInsertRowid, ...nuevaNota };
}

export async function updateNote(
  id: number,
  data: { title: string; content: string }
) {
  const updatedAt = new Date().toISOString();

  const stmt = db.prepare(`
    UPDATE notes
    SET title = ?, content = ?, updatedAt = ?
    WHERE id = ?
  `);

  const result = stmt.run(data.title, data.content, updatedAt, id);

  if (result.changes === 0) throw new Error("Note not found");

  revalidatePath("/");
  return { id, ...data, updatedAt };
}

export async function deleteNote(id: number) {
  const stmt = db.prepare("DELETE FROM notes WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) throw new Error("Note not found");

  revalidatePath("/");
  return { success: true };
}
