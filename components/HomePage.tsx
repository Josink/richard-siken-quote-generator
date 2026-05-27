"use client";
import Image from "next/image";

import {JSX, useState} from "react"
import {Playfair_Display_SC} from 'next/font/google'

const playfair = Playfair_Display_SC({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    variable: '--font-playfair',
})

type Quote = {
    text: string
    title: string
    book: string
}

type HomePageProps = {
    initialQuote: Quote
}

export default function HomePage({initialQuote}: HomePageProps): JSX.Element {
    const [quote, setQuote] = useState(initialQuote);

    async function generateQuote() {
        const response = await fetch('/api/quote')
        const data = await response.json()

        setQuote(data);
    }

    return (
        <section className={`${playfair.className} home-page`}>

            <div className = "info">
                <div className = "info-bar">
                    <h1 className= "title">
                        Richard Siken Quote Generator
                    </h1>

                    <div className = "links">
                        <div className = "rS">
                            <a href="https://richard-siken.com/">
                            Richard Siken
                            </a>
                        </div>

                        <div className = "github">
                            <a href="https://github.com/Josink">
                            Github
                        </a></div>
                    </div>

                </div>

                <p className= "description">
                    This is a website that randomly generates a line of code from the first two
                    bodies of work from the Poet Richard Siken, Crush and War Of The Foxes.
                </p>

                <Image loading="eager"
                    src="/quote.png"
                    alt='An image of the quote "You’re in a car with a beautiful boy, and he won’t tell you that he loves you, but he loves you."'
                    width={1000}
                    height={500}
                    className="quote-image"
                />

            </div>

            <div className="quote-container">

                <button className="quote-button" onClick={generateQuote}>
                    Generate Quote!
                </button>

                <div className="quote">
                    <blockquote>
                        &#34;{quote.text}&#34;
                    </blockquote>

                    <p className = "quote-details">
                        — {quote.title}, {quote.book}
                    </p>

                </div>


            </div>

        </section>
    )
}