import Database from "better-sqlite3";

export const db = new Database("quotes.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS quotes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        title TEXT,
        book TEXT
    )
`);