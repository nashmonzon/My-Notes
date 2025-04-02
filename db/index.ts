import Database from "better-sqlite3";
import path from "path";

// Conexión a la base
const db = new Database(path.resolve(process.cwd(), "db/notes.db"));

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`);

export default db;
