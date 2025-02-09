import { useCallback, useContext } from "react"
import { AppContext } from "../context/AppContext"
import { FloatingMenu } from "./FloatingMenu"
import { FloatingNavigation } from "./FloatingNavigation"
import { FurnitureBrowser } from "./FurnitureBrowser"
import { InspireDialog } from "./InspireDialog"
import { RoomSettingsDialog } from "./RoomSettingsDialog"
import type { FurnitureItem as FurnitureItemType } from "../../types/furniture"
import { v4 as uuidv4 } from "uuid"

function AdaptiveNavbar() {
    const {
        furniture,
        setFurniture,
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
    
    
    const handleDuplicate = (id:string) => {
      const itemToDuplicate = furniture.find((f) => f.id === id)
      if (itemToDuplicate) {
        handleAddFurniture({
          ...itemToDuplicate,
          id: uuidv4(),
          position: [itemToDuplicate.position[0]+3, itemToDuplicate.position[1], itemToDuplicate.position[2]],
        })
      }
    }

    const handleColorChange = (id:string, newColor: string) => {
        setFurniture((prev: FurnitureItemType[]) =>
          prev.map((item) => {
            if (item.id === id) {
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
    
      const handleSizeChange = ( id:string, newSize: string) => {
        setFurniture((prev: FurnitureItemType[]) =>
            prev.map((item) => {
              if (item.id === id) {
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
    
    const handleAddFurniture = useCallback(
      (item: FurnitureItemType) => {
        const newFurniture = {
          id: uuidv4(),
          color: item.color,
          rotation: 0,
          originalSize: item.originalSize,
          size: item.size,
          position: item.position,
          name: item.name,
          isEditVisible: false,
          type: item.type,
          fileName: item.fileName
        }
        setFurniture((prevFurniture) => [...prevFurniture, newFurniture])
      },
      [setFurniture],
    )

    
  const handleAddProposedFurniture = useCallback(
    (proposedFurniture: string[]) => {
      proposedFurniture.forEach((item) => {
        handleAddFurniture({
          id: uuidv4(),
          color: "#8A9A5B",
          rotation: 0,
          originalSize: 1,
          size: "medium",
          position: [Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5],
          name: item,
          isEditVisible: false,
          type: "sofa",
          fileName: './bubblyRot2.glb'
        })
      })
    },
    [handleAddFurniture],
  )
  
  const updateFurnitureEditVisibility = (isVisible: boolean) => {
    setFurniture(prevFurniture => 
      prevFurniture.map(item => 
        item.id === activeAccordion
          ? { ...item, isEditVisible: isVisible }
          : item
      )
    );
  };

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
                setIsCouchEditVisible={updateFurnitureEditVisibility}
            />
            <FurnitureBrowser
                isOpen={isFurnitureBrowserOpen}
                onClose={() => setIsFurnitureBrowserOpen(false)}
                onAddFurniture={handleAddFurniture}
            />
            <InspireDialog
                    isOpen={isInspireDialogOpen}
                    onClose={() => setIsInspireDialogOpen(false)}
                    onAddProposedFurniture={handleAddProposedFurniture}
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