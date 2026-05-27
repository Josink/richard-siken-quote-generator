import quotes from "@/data/quotes.json";

export type Quote = {
    text: string;
    title: string;
    book: string;
};

export function getRandomQuote(): Quote{
    return quotes[Math.floor(Math.random() * quotes.length)];
}