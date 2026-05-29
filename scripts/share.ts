export function getFullQuote(
    text: string,
    title: string,
    book: string
){
    return `"${text}" - ${title}, ${book}`;
}

export async function copyQuote(fullQuote: string){
    await navigator.clipboard.writeText(fullQuote);
}

export function shareToTwitter(fullQuote: string){
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullQuote)}`;
    window.open(twitterURL);
}

export function shareToTumblr(
    text: string,
    title: string,
    book: string
){
    const tumblrUrl =
        `https://www.tumblr.com/widgets/share/tool` +
        `?canonicalUrl=https://yourwebsite.com` +
        `&title=${encodeURIComponent(title)}` +
        `&caption=${encodeURIComponent(book)}` +
        `&content=${encodeURIComponent(text)}`;

    window.open(tumblrUrl, "_blank");
}