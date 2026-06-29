"use client";
import Image from "next/image";

import {JSX, useState} from "react"
import {Playfair_Display_SC} from 'next/font/google'

import quotes from "@/data/quotes.json";

import {copyQuote, shareToTumblr, shareToTwitter, getFullQuote} from "@/scripts/share"

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

    function generateQuote() {
        const randomQuote =
            quotes[Math.floor(Math.random() * quotes.length)];

        setQuote(randomQuote);
    }

    const fullQuote = getFullQuote(
        quote.text,
        quote.title,
        quote.book
    )

    async function handleCopy(){
        try{
            await copyQuote(fullQuote);
            alert("Copied to clipboard!");
        } catch(err){
            console.error("Failed to copy quote to clipboard",err);
        }
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
                            <a href="https://github.com/Josink/richard-siken-quote-generator">
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

                <div className = "sharing">
                    <button className = "share-button" onClick={handleCopy}>
                        <img src= "/Icons/copy.svg" alt ="Copy icon" className= "icon"/>
                             Copy Quote
                    </button>
                    <button className = "share-button" onClick={()=> shareToTwitter(fullQuote)}>
                        <img src= "/Icons/twitter.svg" alt ="X icon" className= "icon"/>
                        Share to Twitter
                    </button>
                    <button className = "share-button" onClick={()=> shareToTumblr(fullQuote)}>
                        <img src= "/Icons/tumblr.svg" alt ="X icon" className= "icon"/>
                        Share to Tumblr
                    </button>
                </div>

                <div className="quote">
                    <blockquote>
                        &#34;{quote.text}&#34;
                    </blockquote>

                    <p className = "quote-details">
                        — {quote.title}, {quote.book}
                    </p>

                </div>

                <button className="quote-button" onClick={generateQuote}>
                    Generate Quote!
                </button>

            </div>

        </section>
    )
}