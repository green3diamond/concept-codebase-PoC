'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { AppProvider } from '../../context/AppContext'

const App = dynamic(() => import('../../App'), { ssr: false })

export function ClientOnly() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  )
}