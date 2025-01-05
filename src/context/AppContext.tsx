import { createContext, useState } from 'react';
import { Params } from 'react-router-dom';

/**
 * The AppContext object.
 * 
 * @type {React.Context<any>}
 */
export const AppContext = createContext({});

/**
 * The AppProvider component.
 * 
 * @param {React.ReactNode} props.children - The child components which are relevant for the app context and will be globaly accessible.
 * @returns {JSX.Element} - The JSX element representing the AppProvider component.
 * 
 * State Structure:
 * sharedState: {
 *   bubbly: {
 *     color: string - Couch color in hex
 *     rotation: number[] - [x, y, z] rotation values
 *     isVisible: boolean - Visibility toggle
 *     size: string - Couch size ('small'|'medium'|'large'|'xl')
 *     position: number[] - [x, y, z] position coordinates
 *     name: string - Display name
 *     isEditVisible: boolean - Edit controls visibility
 *   },
 *   modSofa: {
 *     // Same structure as bubbly
 *   }
 * }
 * 
 * UI States:
 * - isDragging: boolean - Tracks drag state
 * - menuState: string - Menu visibility state ('open'|'closed')
 * - activeAccordion: string - Currently active accordion section
 * - isFurnitureBrowserOpen: boolean - Furniture browser dialog state
 * - isInspireDialogOpen: boolean - Inspiration dialog state
 * - isRoomSettingsOpen: boolean - Room settings dialog state
 * - selected: string - Currently selected item
 * - hovered: string - Currently hovered item
 */
export const AppProvider = ({ children }: Params): JSX.Element => {
    /**
     * The shared state object. Contains information about the chosen materials of the different obejcts.
     * 
     * @type {Dictionary}
     */
    const [sharedState, setSharedState] = useState({
        "bubbly": {
            "color": "#8A9A5B",
            "rotation": [0, 0, 0],
            "isVisible": true,
            "size": "medium",
            "position": [0, 0, 0],
            "name": "Bubbly Couch",
            "isEditVisible": false
        },
        "modSofa": {
            "color": "#8A9A5B",
            "rotation": [0, 0, 0],
            "isVisible": true,
            "size": "medium",
            "position": [0, 0, 0],
            "name": "Modern Sofa",
            "isEditVisible": false
        }
    })

    // Only UI-related states
    const [isDragging, setIsDragging] = useState(false)
    const [menuState, setMenuState] = useState("closed")
    const [activeAccordion, setActiveAccordion] = useState("")
    const [isFurnitureBrowserOpen, setIsFurnitureBrowserOpen] = useState(false)
    const [isInspireDialogOpen, setIsInspireDialogOpen] = useState(false)
    const [isRoomSettingsOpen, setIsRoomSettingsOpen] = useState(false)
    const [selected, setSelected] = useState("")
    const [hovered, hover] = useState("")

    return (
        <AppContext.Provider value={{
            sharedState,
            setSharedState,
            isDragging,
            setIsDragging,
            menuState,
            setMenuState,
            activeAccordion,
            setActiveAccordion,
            isFurnitureBrowserOpen,
            setIsFurnitureBrowserOpen,
            isInspireDialogOpen,
            setIsInspireDialogOpen,
            isRoomSettingsOpen,
            setIsRoomSettingsOpen,
            selected,
            setSelected,
            hovered,
            hover
        }}>
            {children}
        </AppContext.Provider>
    )
}
