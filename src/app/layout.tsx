import type { Metadata } from 'next'
import './globals.css'

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
            <body suppressHydrationWarning={true} >
                <div id="root">
                    {children}
                  </div>
            </body>        
        </html>
    )
  }