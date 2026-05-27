import HomePage from "@/components/HomePage";
import {getRandomQuote} from "@/scripts/getRandomQuote";

export default function Home() {

    const initialQuote = getRandomQuote();

    return (
        <main>
            <HomePage initialQuote={initialQuote} />
        </main>
    );
}
