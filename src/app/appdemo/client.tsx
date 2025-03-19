'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { AppProvider } from '../../context/AppContext'
import App from '../../App'

// const App = dynamic(() => import('../../App'), { ssr: false })
// leads to problems in the build process of next 15

export function ClientOnly() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  )
}