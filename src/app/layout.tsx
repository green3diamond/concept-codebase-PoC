import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Concept demo'
  }

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/jpeg+xml" href="/concept.svg" />
                {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
            </head>
            
            <body>
                <div id="root">{children}</div>
                <script type="module" src="/index.jsx"></script>
            </body>
        
        </html>
    )
  }