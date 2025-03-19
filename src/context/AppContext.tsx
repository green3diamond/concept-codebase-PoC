import { createContext, JSX, useState, type Dispatch, type SetStateAction } from 'react';
import { ReactNode } from 'react'
import type { FurnitureItem } from "../../types/furniture"
import { v4 as uuidv4 } from "uuid"

interface AppContextType {
    furniture: FurnitureItem[],
    setFurniture: Dispatch<SetStateAction<FurnitureItem[]>>,
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
    hover: (hovered: string) => void,
    roomDimensions: RoomDimensions,
    setRoomDimensions: (dimensions: RoomDimensions) => void,
    showMeasurements: boolean,
    toggleMeasurements: () => void,
    scale: number,
    backgroundColor: string,
    setBackgroundColor: (color: string) => void,
}

/**
 * The AppContext object.
 * 
 * @type {AppContextType}
 */
export const AppContext = createContext<AppContextType>({
    furniture: [],
    setFurniture: () => {},
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
    hover: () =>{},
    roomDimensions: { width: 0, length: 0, height: 0 },
    setRoomDimensions: () => {},
    showMeasurements: false,
    toggleMeasurements: () => {},
    scale: 1,
    backgroundColor: "#ffffff",
    setBackgroundColor: () => {},
});


interface AppProviderProps {
    children: ReactNode
}

interface RoomDimensions {
    width: number
    length: number
    height: number
}

/**
 * The AppProvider component.
 * 
 * @param {React.ReactNode} props.children - The child components which are relevant for the app context and will be globaly accessible.
 * @returns {JSX.Element} - The JSX element representing the AppProvider component.
 *  * 
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
export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
    // Only UI-related states
    const [menuState, setMenuState] = useState("closed")
    const [isDragging, setIsDragging] = useState(false)
    const [activeAccordion, setActiveAccordion] = useState("")
    const [isFurnitureBrowserOpen, setIsFurnitureBrowserOpen] = useState(false)
    const [isInspireDialogOpen, setIsInspireDialogOpen] = useState(false)
    const [isRoomSettingsOpen, setIsRoomSettingsOpen] = useState(false)
    const [selected, setSelected] = useState("")
    const [hovered, hover] = useState("")
    const [furniture, setFurniture] = useState<FurnitureItem[]>([
        {
            id: uuidv4(),
            color: "#8A9A5B",
            rotation:0,
            originalSize: 1.4,
            size: "medium",
            position: [-2, -0.5, 2],
            name: "Bubbly Couch",
            isEditVisible: false,
            nickname: "bubbly",
            type: "sofa",
            fileName: './bubblyRot2.glb'
        },
        {
            id: uuidv4(),
            color: "#8A9A5B",
            rotation: 0,
            originalSize: 2.5,
            size: "medium",
            position: [0, -1, -3],
            name: "Modern Sofa",
            isEditVisible: false,
            nickname: "modSofa",
            type: "sofa",
            fileName: './modernSofa2.glb'
        }
      ])
    const [roomDimensions, setRoomDimensions] = useState<RoomDimensions>({
    width: 10,
    length: 10,
    height: 5,
    })
    const [showMeasurements, setShowMeasurements] = useState(false)
    const toggleMeasurements = () => setShowMeasurements(prev => !prev)
    const [scale, setScale] = useState(1)
    const [backgroundColor, setBackgroundColor] = useState("#ffffff")

    return (
        <AppContext.Provider value={{
            furniture,
            setFurniture,
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
            hover,
            roomDimensions,
            setRoomDimensions,
            showMeasurements,
            toggleMeasurements, 
            scale, 
            backgroundColor,
            setBackgroundColor
        }}>
            {children}
        </AppContext.Provider>
    )
}
