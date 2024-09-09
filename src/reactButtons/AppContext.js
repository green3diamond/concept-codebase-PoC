import React, { createContext, useState } from 'react';

/**
 * The AppContext object.
 * 
 * @type {React.Context<any>}
 */
export const AppContext = createContext();

/**
 * The AppProvider component.
 * 
 * @param {React.ReactNode} props.children - The child components which are relevant for the app context and will be globaly accessible.
 * 
 * @returns {JSX.Element} - The JSX element representing the AppProvider component. Imprt the global children through this component.
 */
export const AppProvider = ({ children }) => {
    /**
     * The shared state object. Contains information about the chosen materials of the different obejcts.
     * 
     * @type {Dictionary}
     */
    const [sharedState, setSharedState] = useState({ "bubbly": 1, "sofa": 1, "modSofa": 1 })


    /**
     * Selected item after a double click.
     * 
     * @type {string}
     */
    const [selected, setSelected] = useState("")

    /**
     * Hovered item.
     * 
     * @type {string}
     */
    const [hovered, hover] = useState("")

    return (
        <AppContext.Provider value={{ sharedState, setSharedState, selected, setSelected, hovered, hover }}>
            {children}
        </AppContext.Provider>
    )
}
