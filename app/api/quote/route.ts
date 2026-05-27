import {NextResponse} from "next/server";
import {getRandomQuote} from "@/quotes";

export async function GET(){
    const quote = getRandomQuote();
    return NextResponse.json(quote);
}