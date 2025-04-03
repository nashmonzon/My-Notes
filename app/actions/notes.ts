"use server";

import db from "@/db";
import { revalidatePath } from "next/cache";

export async function createNote(data: { title: string; content: string }) {
  try {
    const newNote = {
      title: data.title,
      content: data.content,
      updatedAt: new Date().toISOString(),
    };

    const stmt = db.prepare(`
      INSERT INTO notes (title, content, updatedAt)
      VALUES (@title, @content, @updatedAt)
    `);
    const info = stmt.run(newNote);

    revalidatePath("/");
    return { id: info.lastInsertRowid, ...newNote };
  } catch (err) {
    console.error("Failed to create note", err);
    throw new Error("Failed to create note");
  }
}

export async function updateNote(
  id: number,
  data: { title: string; content: string }
) {
  try {
    const updatedNote = {
      title: data.title,
      content: data.content,
      updatedAt: new Date().toISOString(),
      id,
    };

    const stmt = db.prepare(`
      UPDATE notes
      SET title = @title, 
          content = @content, 
          updatedAt = @updatedAt
      WHERE id = @id
    `);

    const result = stmt.run(updatedNote);

    if (result.changes === 0) {
      throw new Error("Note not found");
    }

    revalidatePath("/");
    return updatedNote;
  } catch (err) {
    console.error("Failed to update note", err);
    throw new Error("Failed to update note");
  }
}

export async function deleteNote(id: number) {
  try {
    const stmt = db.prepare(`
      DELETE FROM notes 
      WHERE id = @id
    `);

    const result = stmt.run({ id });

    if (result.changes === 0) {
      throw new Error("Note not found");
    }

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete note", err);
    throw new Error("Failed to delete note");
  }
}
