import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve(process.cwd(), "db/notes.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`);

export default db;
