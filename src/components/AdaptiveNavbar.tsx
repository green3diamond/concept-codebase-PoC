import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { FloatingMenu } from "./FloatingMenu"
import { FloatingNavigation } from "./FloatingNavigation"
import { FurnitureBrowser } from "./FurnitureBrowser"
import { InspireDialog } from "./InspireDialog"
import { RoomSettingsDialog } from "./RoomSettingsDialog"
import type { FurnitureItem as FurnitureItemType } from "../../types/furniture"

function AdaptiveNavbar() {
    const {
        furniture,
        setFurniture,
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
        roomDimensions,
    } = useContext(AppContext)
    
    
    const handleDuplicate = () => {
        console.log('dup')
    }

    const handleColorChange = (newColor: string) => {
        setFurniture((prev: FurnitureItemType[]) =>
          prev.map((item) => {
            if (item.id === activeAccordion) {
              return {
                ...item,
                color: newColor,
              }
            }
            return item
          }),
        )
      }
    
      const handleRemove = () => {
        setFurniture((prev: FurnitureItemType[]) => prev.filter((item) => item.id !== activeAccordion))
      }
    
      const handleSizeChange = (newSize: "small" | "medium" | "large") => {
        setFurniture((prev: FurnitureItemType[]) =>
          prev.map((item) => {
            if (item.id === activeAccordion) {
              return {
                ...item,
                size: newSize,
              }
            }
            return item
          }),
        )
      }
    
      const handleRotate = () => {
        setFurniture((prev: FurnitureItemType[]) =>
          prev.map((item) => {
            if (item.id === activeAccordion) {
              return {
                ...item,
                rotation: (item.rotation + Math.PI / 2) % (2 * Math.PI),
              }
            }
            return item
          }),
        )
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