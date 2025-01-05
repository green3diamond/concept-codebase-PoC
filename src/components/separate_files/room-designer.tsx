import React, { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Room } from "./Room"
import { Couch } from "./Couch"
import { FloatingMenu } from "./FloatingMenu"
import { FloatingNavigation } from "./FloatingNavigation"
import { FurnitureBrowser } from "./FurnitureBrowser"
import { InspireDialog } from "./InspireDialog"
import { RoomSettingsDialog } from "./RoomSettingsDialog"

export default function Component() {
  const [rotation, setRotation] = useState(0)
  const [couchColor, setCouchColor] = useState("#8A9A5B")
  const [isCouchVisible, setIsCouchVisible] = useState(true)
  const [couchSize, setCouchSize] = useState("medium")
  const [couchPosition, setCouchPosition] = useState([0, 0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const [menuState, setMenuState] = useState("closed")
  const [activeAccordion, setActiveAccordion] = useState("")
  const [couchName, setCouchName] = useState("Comfy Couch")
  const [isFurnitureBrowserOpen, setIsFurnitureBrowserOpen] = useState(false)
  const [isInspireDialogOpen, setIsInspireDialogOpen] = useState(false)
  const [isRoomSettingsOpen, setIsRoomSettingsOpen] = useState(false)
  const [isCouchEditVisible, setIsCouchEditVisible] = useState(false)

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + Math.PI / 2)
  }

  const handleColorChange = (newColor: string) => {
    setCouchColor(newColor)
  }

  const handleRemove = () => {
    setIsCouchVisible(false)
  }

  const handleSizeChange = (newSize: string) => {
    setCouchSize(newSize)
  }

  const handleDrag = (newPosition: [number, number, number]) => {
    setCouchPosition(newPosition)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const toggleMenu = () => {
    setMenuState(prevState => prevState === "open" ? "closed" : "open")
  }

  const handleModelClick = () => {
    setMenuState("open")
    setActiveAccordion("comfy-couch")
  }

  const handleEditClick = () => {
    setMenuState("open")
    setActiveAccordion("comfy-couch")
  }

  const handleCanvasClick = () => {
    if (menuState === "open") {
      setMenuState("closed")
    }
    setActiveAccordion("")
  }

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows onClick={handleCanvasClick}>
        <color attach="background" args={["#f0f0f0"]} />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <Suspense fallback={null}>
          <Room />
          {isCouchVisible && (
            <Couch
              rotation={rotation}
              color={couchColor}
              size={couchSize}
              position={couchPosition}
              onDrag={handleDrag}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onModelClick={handleModelClick}
              onEditClick={handleEditClick}
              isEditVisible={isCouchEditVisible}
              setIsEditVisible={setIsCouchEditVisible}
            />
          )}
        </Suspense>
        {!isDragging && <OrbitControls target={[0, 0, 0]} />}
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[2, 5, 2]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      </Canvas>
      <FloatingMenu 
        couchName={couchName}
        couchColor={couchColor}
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
        setIsCouchEditVisible={setIsCouchEditVisible}
      />
      <FurnitureBrowser isOpen={isFurnitureBrowserOpen} onClose={() => setIsFurnitureBrowserOpen(false)} />
      <InspireDialog isOpen={isInspireDialogOpen} onClose={() => setIsInspireDialogOpen(false)} />
      <RoomSettingsDialog isOpen={isRoomSettingsOpen} onClose={() => setIsRoomSettingsOpen(false)} />
    </div>
  )
}

