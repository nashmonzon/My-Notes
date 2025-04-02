import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
  const notas = db.prepare("SELECT * FROM notes ORDER BY updatedAt DESC").all();
  return NextResponse.json(notas);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title || !body.content) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const nuevaNota = {
    title: body.title,
    content: body.content,
    updatedAt: new Date().toISOString(),
  };

  const stmt = db.prepare(`
    INSERT INTO notes (title, content, updatedAt)
    VALUES (@title, @content, @updatedAt)
  `);
  const info = stmt.run(nuevaNota);

  return NextResponse.json({
    id: info.lastInsertRowid,
    ...nuevaNota,
  });
}
