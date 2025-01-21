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
            </head>
            
            <body>
                <div id="root">{children}</div>
            </body>
        
        </html>
    )
  }