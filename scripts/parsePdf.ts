import * as fs from 'fs';
import "@ungap/with-resolvers";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {TextItem} from "pdfjs-dist/types/src/display/api";
import path from "path";

type Quote = {
    text: string;
    title: string;
    book: string;
};

async function getSentences() {

    const quotes: Quote[] = [];

    for (let i = 1; i <= 21; i++){
        const filepath: string = `./public/Crush/Crush (${i}).pdf` ;
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
        
        for (let k = 1; k < text.length; k++) {
            quotes.push({
                text: text[k],
                title,
                book: "Crush"
            });
        }
    }

    for (let i = 1; i <= 28; i++){
        const filepath: string = `./public/War of the Foxes/War of the Foxes (${i}).pdf` ;
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

        for (let k = 1; k < text.length; k++) {
            quotes.push({
                text: text[k],
                title,
                book: "War of the Foxes"
            });
        }
    }

    const outputPath = path.join(
        process.cwd(),
        "data",
        "quotes.json"
    );

    fs.writeFileSync(
        outputPath,
        JSON.stringify(quotes, null, 2),
        "utf8"
    );

    console.log(`Saved ${quotes.length} quotes`);

}

(async () => {
    await getSentences();
})();
