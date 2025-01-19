import { createContext, useState } from 'react';
import { Params } from 'react-router-dom';


interface AppContextType {
    sharedState: any,
    setSharedState: (state: any) => void,
    isDragging: boolean,
    setIsDragging: (isDragging: boolean) => void,
    menuState: string,
    setMenuState: (state: string) => void,
    activeAccordion: string,
    setActiveAccordion: (accordion: string) => void,
    isFurnitureBrowserOpen: boolean,
    setIsFurnitureBrowserOpen: (isOpen: boolean) => void,
    isInspireDialogOpen: boolean,
    setIsInspireDialogOpen: (isOpen: boolean) => void,
    isRoomSettingsOpen: boolean,
    setIsRoomSettingsOpen: (isOpen: boolean) => void,
    selected: string,
    setSelected: (selected: string) => void,
    hovered: string,
    hover: (hovered: string) => void
}

/**
 * The AppContext object.
 * 
 * @type {AppContextType}
 */
export const AppContext = createContext<AppContextType>({
    sharedState: {},
    setSharedState: () => {},
    isDragging: false,
    setIsDragging: () => {},
    menuState: "closed",
    setMenuState: () => {},
    activeAccordion: "",
    setActiveAccordion: () => {},
    isFurnitureBrowserOpen: false,
    setIsFurnitureBrowserOpen: () => {},
    isInspireDialogOpen: false,
    setIsInspireDialogOpen: () => {},
    isRoomSettingsOpen: false,
    setIsRoomSettingsOpen: () => {},
    selected: "",
    setSelected: () => {},
    hovered: "",
    hover: () =>{}
});



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
    const [menuState, setMenuState] = useState("closed")
    const [isDragging, setIsDragging] = useState(false)
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
