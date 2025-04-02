// lib/getNotes.ts
import db from "@/db";

export function getNotes() {
  const notes = db.prepare("SELECT * FROM notes ORDER BY updatedAt DESC").all();
  return notes;
}
