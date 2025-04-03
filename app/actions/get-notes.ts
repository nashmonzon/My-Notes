"use server";
import db from "@/db";
import { Note } from "@/types/utils";

export async function getNotes(): Promise<Note[]> {
  try {
    const notes = db
      .prepare("SELECT * FROM notes ORDER BY updatedAt DESC")
      .all() as Note[];

    return notes;
  } catch (err) {
    console.error("Failed to fetch notes", err);
    return [];
  }
}
