"use server";

import db from "@/db";
import { Note } from "@/types/utils";

export async function getNotes(): Promise<Note[]> {
  const notes = db
    .prepare("SELECT * FROM notes ORDER BY updatedAt DESC")
    .all() as Note[];

  return notes;
}
