import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import withIsMobileView from "../context/withIsMobileView.tsx"
import { FloatingMenu } from "./separate_files/FloatingMenu"
import { FloatingNavigation } from "./separate_files/FloatingNavigation"
import { FurnitureBrowser } from "./separate_files/FurnitureBrowser"
import { InspireDialog } from "./separate_files/InspireDialog"
import { RoomSettingsDialog } from "./separate_files/RoomSettingsDialog"
import { prepare } from "@react-three/fiber/dist/declarations/src/core/renderer"

function AdaptiveNavbar() {
    const {
        sharedState,
        setSharedState,
        menuState,
        setMenuState,
        activeAccordion,
        setActiveAccordion,
        isFurnitureBrowserOpen,
        setIsFurnitureBrowserOpen,
        isInspireDialogOpen,
        setIsInspireDialogOpen,
        isRoomSettingsOpen,
        setIsRoomSettingsOpen
    } = useContext(AppContext)
    
    const selectedCouch = activeAccordion ? sharedState[activeAccordion] : sharedState.modSofa
    
    const handleRotate = () => {
        setSharedState(prev => ({
            ...prev,
            [activeAccordion]: {
                ...prev[activeAccordion],
                rotation: [0, prev[activeAccordion].rotation[1] + Math.PI / 2, 0]
            }
        }))
    }

    const handleColorChange = (newColor: string) => {
        setSharedState(prev => ({
            ...prev,
            [activeAccordion]: {
                ...prev[activeAccordion],
                color: newColor
            }
        }))
    }

    const handleRemove = () => {
        setSharedState(prev => ({
            ...prev,
            [activeAccordion]: {
                ...prev[activeAccordion],
                isVisible: false
            }
        }))
    }

    const handleSizeChange = (newSize: string) => {
        setSharedState(prev => ({
            ...prev,
            [activeAccordion]: {
                ...prev[activeAccordion],
                size: newSize
            }
        }))
    }

    const toggleMenu = () => {
        console.log(menuState)
        setMenuState(prevState => prevState === "open" ? "closed" : "open")
    }

    return (
        <>
            <FloatingMenu 
                couchName={selectedCouch['name']}
                couchColor={selectedCouch['name']}
                onRotate={handleRotate} 
                onColorChange={handleColorChange} 
                onRemove={handleRemove}
                onSizeChange={handleSizeChange}
                menuState={menuState}
                onToggleMenu={toggleMenu}
                activeAccordion={activeAccordion}
                setActiveAccordion={setActiveAccordion}
            />
            <FloatingNavigation 
                isFurnitureBrowserOpen={isFurnitureBrowserOpen}
                setIsFurnitureBrowserOpen={setIsFurnitureBrowserOpen}
                isInspireDialogOpen={isInspireDialogOpen}
                setIsInspireDialogOpen={setIsInspireDialogOpen}
                isRoomSettingsOpen={isRoomSettingsOpen}
                setIsRoomSettingsOpen={setIsRoomSettingsOpen}
                setIsCouchEditVisible={(isVisible) => {
                    setSharedState(prev => ({
                        ...prev,
                        [activeAccordion]: {
                            ...prev[activeAccordion],
                            isEditVisible: isVisible
                        }
                    }))
                }}
            />
            <FurnitureBrowser isOpen={isFurnitureBrowserOpen} onClose={() => setIsFurnitureBrowserOpen(false)} />
            <InspireDialog isOpen={isInspireDialogOpen} onClose={() => setIsInspireDialogOpen(false)} />
            <RoomSettingsDialog isOpen={isRoomSettingsOpen} onClose={() => setIsRoomSettingsOpen(false)} />
        </>
    )
}

export default withIsMobileView(AdaptiveNavbar)