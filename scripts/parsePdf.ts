import * as fs from 'fs';
import "@ungap/with-resolvers";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {TextItem} from "pdfjs-dist/types/src/display/api";

async function getSentences() {
    const filepath: string = "scripts/Crush Richard Siken.pdf";
    const data = new Uint8Array(fs.readFileSync(filepath));

    const pdf = await pdfjsLib.getDocument({data}).promise;

    let fullText: string = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const line = content.items.map((item) => (item as TextItem).str)
            .join("");

        fullText += line + "\n";
    }

    return fullText;

}

(async () => {
    const text = await getSentences();

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

    console.log(lines);
})();