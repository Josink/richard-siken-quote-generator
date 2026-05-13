import * as fs from 'fs';
import "@ungap/with-resolvers";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {TextItem} from "pdfjs-dist/types/src/display/api";
import {insertQuote} from "@/quotes";
import {db} from "@/db";

type Quote = {
    text: string;
    title: string;
    book: string;
}

const quotes: Quote[] = [];

async function getSentences() {

    for (let i = 1; i <= 21; i++){
        const filepath: string = `scripts/Crush/Crush (${i}).pdf` ;
        const data = new Uint8Array(fs.readFileSync(filepath));
        const pdf = await pdfjsLib.getDocument({data}).promise;

        let fullText = "";

        for (let j = 1; j <= pdf.numPages; j++) {
            const page = await pdf.getPage(j);

            const content = await page.getTextContent();
            const items = content.items as TextItem[];

            const pageText = items
                .map(item => item.str.trim())
                .join(" ");

            fullText += pageText + "\n";
        }

        const text = fullText
            .replace(/\s+/g, " ")
            .split(".")
            .map(t => t.trim())
            .filter(Boolean);
        const title = text[0];

        db.transaction(()=>{
            for (let k = 1; k < text.length; k++) {
                insertQuote(text[k], title, "Crush");
            }
        })();
    }

}

(async () => {
    await getSentences();

    const count = db.prepare("SELECT COUNT(*) as count FROM quotes").get();
    console.log(count);
})();
