import "@/db";
import HomePage from "@/components/HomePage";
import {getRandomQuote} from "@/quotes"


export default function Home() {
    const quote = getRandomQuote();

    return (
      <main>
          <HomePage initialQuote={quote}/>
      </main>
  );
}
