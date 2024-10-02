import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppProvider } from './context/AppContext.tsx'


// Re-exporting the components and context for convenience
import withIsMobileView from "./context/withIsMobileView.tsx"
import withIsMobileViewProvider from "./context/withIsMobileVIewProvider.tsx"
import IsMobileContext from "./context/IsMobileContext.tsx"
export { IsMobileContext, withIsMobileView, withIsMobileViewProvider }

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
)
