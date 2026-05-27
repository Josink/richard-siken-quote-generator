import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">

      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Richard Siken Quote Generator</title>
        <meta name="description"
              content="A website that randomly generates quotes from 'Crush' and 'War Of The Foxes' by Richard Siken"/>
      </head>

      <body>{children}</body>

      </html>
  );
}
