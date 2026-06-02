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

export function shareToTumblr(fullQuote: string){
    const tumblrUrl =
        `https://www.tumblr.com/widgets/share/tool` +
        `?canonicalUrl=https://yourwebsite.com` +
        `&content=${encodeURIComponent(fullQuote)}`;

    window.open(tumblrUrl, "_blank");
}