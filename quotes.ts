import {db} from "./db"

const insert = db.prepare(
    `INSERT INTO quotes (text, title, book)
    VALUES (?, ?, ?)`
);

export function insertQuote(text: string, title: string, book: string) {
    insert.run(text, title, book);
}