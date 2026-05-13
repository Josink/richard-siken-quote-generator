import * as fs from 'fs';
import "@ungap/with-resolvers";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {TextItem, TextStyle} from "pdfjs-dist/types/src/display/api";

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

        for (let j = 1; j <= pdf.numPages; j++) {
            const page = await pdf.getPage(j);
            const content = await page.getTextContent();

            const items = content.items as TextItem[];
            const styles = content.styles;

            const strings = items.map(item => item.str);

            const boldItems = items.filter( item => isBold(item, styles))

            const title = boldItems
                .map(item => item.str)
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();

            const text = strings
                .slice(1)
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();

            quotes.push({
                title,
                text,
                book: "Crush"
            });
        }
    }

}

function isBold(item: TextItem, styles: Record<string, TextStyle>) {
    const style = styles[item.fontName];

    const fontFamily = style?.fontFamily?.toLowerCase() || "";
    const fontName = item.fontName.toLowerCase();

    return (
        fontFamily.includes("bold") ||
        fontName.includes("bold")
    )
}

(async () => {
    await getSentences();
    console.log(quotes);
})();