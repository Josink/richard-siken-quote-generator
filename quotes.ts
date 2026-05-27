import {db} from "./db"

const insert = db.prepare(
    `INSERT INTO quotes (text, title, book)
    VALUES (?, ?, ?)`
);

export function insertQuote(text: string, title: string, book: string) {
    insert.run(text, title, book);
}

export type Quote = {
    id: number;
    text: string;
    title: string;
    book: string;
}

const randomQuote = db.prepare(
    `SELECT * 
    FROM quotes 
    ORDER BY RANDOM() 
    LIMIT 1`
)

export function getRandomQuote() {
    return randomQuote.get() as Quote;
}

