'use client'
 
import React from 'react'
import dynamic from 'next/dynamic'
import { AppProvider } from '../../context/AppContext.tsx'
 
const App = dynamic(() => import('../../App.tsx'), { ssr: false })
 
export function ClientOnly() {
  return <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
}