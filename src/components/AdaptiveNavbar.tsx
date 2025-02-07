import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { FloatingMenu } from "./FloatingMenu"
import { FloatingNavigation } from "./FloatingNavigation"
import { FurnitureBrowser } from "./FurnitureBrowser"
import { InspireDialog } from "./InspireDialog"
import { RoomSettingsDialog } from "./RoomSettingsDialog"

function AdaptiveNavbar() {
    const {
        furniture,
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
        setIsRoomSettingsOpen,
        roomDimensions
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

    const handleDuplicate = () => {
        console.log('dup')
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
    
//   const handleAddProposedFurniture = useCallback((proposedFurniture: string[]) => {
//     const newFurniture = proposedFurniture.map((item) => ({
//       id: uuidv4(),
//       name: item,
//       rotation: 0,
//       color: "#8A9A5B",
//       size: "medium",
//       position: [Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5] as [number, number, number],
//       type: "couch",
//     }))
//     setFurniture((prev) => [...prev, ...newFurniture])
//   }, [])

//   const handleRoomDimensionsChange = useCallback((newDimensions: RoomDimensions) => {
//     setRoomDimensions(newDimensions)
//   }, [])
    const handleAddFurniture = () => {console.log('add')}
    const handleRoomDimensionsChange = () => {console.log('change')}


    return (
        <>
            <FloatingMenu 
                furniture={furniture}
                onRotate={handleRotate}
                onColorChange={handleColorChange}
                onSizeChange={handleSizeChange}
                onDuplicate={handleDuplicate}
                onRemove={handleRemove}
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
            <FurnitureBrowser
                isOpen={isFurnitureBrowserOpen}
                onClose={() => setIsFurnitureBrowserOpen(false)}
                onAddFurniture={handleAddFurniture}
            />
            <InspireDialog
                    isOpen={isInspireDialogOpen}
                    onClose={() => setIsInspireDialogOpen(false)}
                    onAddProposedFurniture={handleAddFurniture}
            />            
            <RoomSettingsDialog
                    isOpen={isRoomSettingsOpen}
                    onClose={() => setIsRoomSettingsOpen(false)}
                    initialDimensions={roomDimensions}
                    onDimensionsChange={handleRoomDimensionsChange}
            />
        </>
    )
}

export default AdaptiveNavbar