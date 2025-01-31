// import type React from "react"
// import { Suspense, useState, useCallback, useEffect, useMemo } from "react"
// import { Canvas } from "@react-three/fiber"
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
// import { Room } from "./Room"
// import { FurnitureItem } from "./FurnitureItem"
// import { FloatingMenu } from "./FloatingMenu"
// import { FloatingNavigation } from "./FloatingNavigation"
// import { FurnitureBrowser } from "./FurnitureBrowser"
// import { InspireDialog } from "./InspireDialog"
// import { RoomSettingsDialog } from "./RoomSettingsDialog"
// import { v4 as uuidv4 } from "uuid"
// import type { FurnitureItem as FurnitureItemType } from "../../types/furniture"

// interface RoomDimensions {
//   width: number
//   length: number
//   height: number
// }

// function useRoomDesigner() {
//   const [furniture, setFurniture] = useState<FurnitureItemType[]>([
//     {
//       id: uuidv4(),
//       name: "Comfy Couch",
//       rotation: 0,
//       color: "#8A9A5B",
//       size: "small",
//       position: [0, 0, 0],
//       type: "couch",
//     },
//   ])
//   const [isDragging, setIsDragging] = useState(false)
//   const [menuState, setMenuState] = useState<"open" | "closed">("closed")
//   const [activeAccordion, setActiveAccordion] = useState("")
//   const [isFurnitureBrowserOpen, setIsFurnitureBrowserOpen] = useState(false)
//   const [isInspireDialogOpen, setIsInspireDialogOpen] = useState(false)
//   const [isRoomSettingsOpen, setIsRoomSettingsOpen] = useState(false)
//   const [isEditVisible, setIsEditVisible] = useState(false)
//   const [isAnyDialogOpen, setIsAnyDialogOpen] = useState(false)
//   const [roomDimensions, setRoomDimensions] = useState<RoomDimensions>({
//     width: 10,
//     length: 10,
//     height: 3,
//   })

//   const openInspireDialog = useCallback(() => {
//     setIsInspireDialogOpen(true)
//   }, [])

//   useEffect(() => {
//     setIsAnyDialogOpen(isInspireDialogOpen || isRoomSettingsOpen || isFurnitureBrowserOpen)
//   }, [isInspireDialogOpen, isRoomSettingsOpen, isFurnitureBrowserOpen])

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

//   return {
//     furniture,
//     setFurniture,
//     isDragging,
//     setIsDragging,
//     menuState,
//     setMenuState,
//     activeAccordion,
//     setActiveAccordion,
//     isFurnitureBrowserOpen,
//     setIsFurnitureBrowserOpen,
//     isInspireDialogOpen,
//     setIsInspireDialogOpen,
//     isRoomSettingsOpen,
//     setIsRoomSettingsOpen,
//     isEditVisible,
//     setIsEditVisible,
//     handleAddProposedFurniture,
//     openInspireDialog,
//     isAnyDialogOpen,
//     roomDimensions,
//     handleRoomDimensionsChange,
//   }
// }

// function useRoomDesignerHandlers(
//   setFurniture: React.Dispatch<React.SetStateAction<FurnitureItemType[]>>,
//   setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
//   setMenuState: React.Dispatch<React.SetStateAction<"open" | "closed">>,
//   setActiveAccordion: React.Dispatch<React.SetStateAction<string>>,
// ) {
//   const handleRotate = useCallback(
//     (id: string) => {
//       setFurniture((prevFurniture) =>
//         prevFurniture.map((item) => (item.id === id ? { ...item, rotation: item.rotation + Math.PI / 2 } : item)),
//       )
//     },
//     [setFurniture],
//   )

//   const handleColorChange = useCallback(
//     (id: string, newColor: string) => {
//       setFurniture((prevFurniture) =>
//         prevFurniture.map((item) => (item.id === id ? { ...item, color: newColor } : item)),
//       )
//     },
//     [setFurniture],
//   )

//   const handleSizeChange = useCallback(
//     (id: string, newSize: string) => {
//       setFurniture((prevFurniture) => prevFurniture.map((item) => (item.id === id ? { ...item, size: newSize } : item)))
//     },
//     [setFurniture],
//   )

//   const handleDrag = useCallback(
//     (id: string, newPosition: [number, number, number]) => {
//       setFurniture((prevFurniture) =>
//         prevFurniture.map((item) => (item.id === id ? { ...item, position: newPosition } : item)),
//       )
//     },
//     [setFurniture],
//   )

//   const handleDragStart = useCallback(() => {
//     setIsDragging(true)
//   }, [setIsDragging])

//   const handleDragEnd = useCallback(() => {
//     setIsDragging(false)
//   }, [setIsDragging])

//   const toggleMenu = useCallback(() => {
//     setMenuState((prevState) => (prevState === "open" ? "closed" : "open"))
//   }, [setMenuState])

//   const handleModelClick = useCallback(
//     (id: string) => {
//       setActiveAccordion(id)
//     },
//     [setActiveAccordion],
//   )

//   const handleEditClick = useCallback(
//     (id: string) => {
//       setMenuState("open")
//       setActiveAccordion(id)
//     },
//     [setMenuState, setActiveAccordion],
//   )

//   const handleCanvasClick = useCallback(() => {
//     setMenuState("closed")
//     setActiveAccordion("")
//   }, [setMenuState, setActiveAccordion])

//   const handleDuplicate = useCallback(
//     (id: string) => {
//       setFurniture((prevFurniture) => {
//         const itemToDuplicate = prevFurniture.find((item) => item.id === id)
//         if (itemToDuplicate) {
//           const newItem = {
//             ...itemToDuplicate,
//             id: uuidv4(),
//             position: [
//               itemToDuplicate.position[0] + 1,
//               itemToDuplicate.position[1],
//               itemToDuplicate.position[2] + 1,
//             ] as [number, number, number],
//           }
//           return [...prevFurniture, newItem]
//         }
//         return prevFurniture
//       })
//     },
//     [setFurniture],
//   )

//   const handleAddFurniture = useCallback(
//     (item: FurnitureItemType) => {
//       const newFurniture = {
//         id: uuidv4(),
//         name: item.name,
//         rotation: 0,
//         color: item.color,
//         size: "medium",
//         position: [0, 0, 0] as [number, number, number],
//         type: item.type,
//       }
//       setFurniture((prevFurniture) => [...prevFurniture, newFurniture])
//     },
//     [setFurniture],
//   )

//   const handleRemove = useCallback(
//     (id: string) => {
//       setFurniture((prevFurniture) => prevFurniture.filter((item) => item.id !== id))
//     },
//     [setFurniture],
//   )

//   return {
//     handleRotate,
//     handleColorChange,
//     handleSizeChange,
//     handleDrag,
//     handleDragStart,
//     handleDragEnd,
//     toggleMenu,
//     handleModelClick,
//     handleEditClick,
//     handleCanvasClick,
//     handleDuplicate,
//     handleAddFurniture,
//     handleRemove,
//   }
// }

// export default function RoomDesigner() {
//   const {
//     furniture,
//     setFurniture,
//     isDragging,
//     setIsDragging,
//     menuState,
//     setMenuState,
//     activeAccordion,
//     setActiveAccordion,
//     isFurnitureBrowserOpen,
//     setIsFurnitureBrowserOpen,
//     isInspireDialogOpen,
//     setIsInspireDialogOpen,
//     isRoomSettingsOpen,
//     setIsRoomSettingsOpen,
//     isEditVisible,
//     setIsEditVisible,
//     handleAddProposedFurniture,
//     openInspireDialog,
//     isAnyDialogOpen,
//     roomDimensions,
//     handleRoomDimensionsChange,
//   } = useRoomDesigner()

//   const {
//     handleRotate,
//     handleColorChange,
//     handleSizeChange,
//     handleDrag,
//     handleDragStart,
//     handleDragEnd,
//     toggleMenu,
//     handleModelClick,
//     handleEditClick,
//     handleCanvasClick,
//     handleDuplicate,
//     handleAddFurniture,
//     handleRemove,
//   } = useRoomDesignerHandlers(setFurniture, setIsDragging, setMenuState, setActiveAccordion)

//   const memoizedFurniture = useMemo(() => furniture, [furniture])

//   return (
//     <div className="w-full h-screen relative">
//       <Canvas
//         shadows
//         onClick={handleCanvasClick}
//         gl={{ alpha: false, antialias: false }}
//         dpr={[1, 2]}
//         performance={{ min: 0.5 }}
//       >
//         <color attach="background" args={["#f0f0f0"]} />
//         <PerspectiveCamera makeDefault position={[0, 5, 10]} />
//         <Suspense fallback={null}>
//           <Room width={roomDimensions.width} length={roomDimensions.length} height={roomDimensions.height} />
//           {memoizedFurniture.map((item) => (
//             <FurnitureItem
//               key={item.id}
//               {...item}
//               onDrag={(newPosition) => handleDrag(item.id, newPosition)}
//               onDragStart={handleDragStart}
//               onDragEnd={handleDragEnd}
//               onModelClick={() => handleModelClick(item.id)}
//               onEditClick={() => handleEditClick(item.id)}
//               isEditVisible={isEditVisible}
//               setIsEditVisible={setIsEditVisible}
//               isDialogOpen={isAnyDialogOpen}
//               roomDimensions={{ width: roomDimensions.width, length: roomDimensions.length }}
//             />
//           ))}
//         </Suspense>
//         {!isDragging && <OrbitControls target={[0, 0, 0]} zoomSpeed={0.4} />}
//         <ambientLight intensity={0.5} />
//         <directionalLight
//           castShadow
//           position={[2, 5, 2]}
//           intensity={1.5}
//           shadow-mapSize-width={1024}
//           shadow-mapSize-height={1024}
//         />
//       </Canvas>
//       <FloatingMenu
//         furniture={furniture}
//         onRotate={handleRotate}
//         onColorChange={handleColorChange}
//         onSizeChange={handleSizeChange}
//         onDuplicate={handleDuplicate}
//         onRemove={handleRemove}
//         menuState={menuState}
//         onToggleMenu={toggleMenu}
//         activeAccordion={activeAccordion}
//         setActiveAccordion={setActiveAccordion}
//       />
//       <FloatingNavigation
//         isFurnitureBrowserOpen={isFurnitureBrowserOpen}
//         setIsFurnitureBrowserOpen={setIsFurnitureBrowserOpen}
//         openInspireDialog={openInspireDialog}
//         isRoomSettingsOpen={isRoomSettingsOpen}
//         setIsRoomSettingsOpen={setIsRoomSettingsOpen}
//       />
//       <FurnitureBrowser
//         isOpen={isFurnitureBrowserOpen}
//         onClose={() => setIsFurnitureBrowserOpen(false)}
//         onAddFurniture={handleAddFurniture}
//       />
//       <InspireDialog
//         isOpen={isInspireDialogOpen}
//         onClose={() => setIsInspireDialogOpen(false)}
//         onAddProposedFurniture={handleAddProposedFurniture}
//       />
//       <RoomSettingsDialog
//         isOpen={isRoomSettingsOpen}
//         onClose={() => setIsRoomSettingsOpen(false)}
//         initialDimensions={roomDimensions}
//         onDimensionsChange={handleRoomDimensionsChange}
//       />
//     </div>
//   )
// }

