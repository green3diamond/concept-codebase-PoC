import { createContext, useState } from 'react';
import { Params } from 'react-router-dom';

/**
 * The AppContext object.
 * 
 * @type {React.Context<any>}
 */
export const AppContext = createContext(null);

/**
 * The AppProvider component.
 * 
 * @param {React.ReactNode} props.children - The child components which are relevant for the app context and will be globaly accessible.
 * 
 * @returns {JSX.Element} - The JSX element representing the AppProvider component. Imprt the global children through this component.
 */
export const AppProvider = ({ children }: Params): JSX.Element => {
    /**
     * The shared state object. Contains information about the chosen materials of the different obejcts.
     * 
     * @type {Dictionary}
     */
    const [sharedState, setSharedState] = useState(
        {
            "bubbly": {
                "color": 1,
                "rotation": [- Math.PI * 1 / 2, 0, -Math.PI * 1 / 2]
            },
            "modSofa": {
                "color": 1,
                "rotation": [0, 0, 0]
            }
        }
    )


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
