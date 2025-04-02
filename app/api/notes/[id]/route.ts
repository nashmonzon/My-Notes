import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

// EDITAR NOTA
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await req.json();

  if (!body.title || !body.content) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const updatedAt = new Date().toISOString();

  const stmt = db.prepare(`
    UPDATE notes
    SET title = ?, content = ?, updatedAt = ?
    WHERE id = ?
  `);

  const result = stmt.run(body.title, body.content, updatedAt, id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Nota no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ id, ...body, updatedAt });
}

// ELIMINAR NOTA
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const stmt = db.prepare("DELETE FROM notes WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Nota no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
