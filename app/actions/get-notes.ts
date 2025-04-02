"use server";

import db from "@/db";
import { Nota } from "@/types/utils";

export async function getNotes(): Promise<Nota[]> {
  const notas = db
    .prepare("SELECT * FROM notes ORDER BY updatedAt DESC")
    .all() as Nota[];

  return notas;
}
