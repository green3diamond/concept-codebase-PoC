import React, { Suspense, useState, useRef, useEffect } from "'react'"
import { Canvas, useFrame } from "'@react-three/fiber'"
import { OrbitControls, PerspectiveCamera, Outlines } from "'@react-three/drei'"
import { PaintBucket, RotateCw, Replace, Trash2, Menu, Maximize, LayoutGrid, Lightbulb, Ruler } from "lucide-react"
import { Button } from "@/components/outline/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/outline/ui/radio-group"
import { Label } from "@/components/outline/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/outline/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/outline/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/outline/ui/dialog"
import * as THREE from "'three'"

function Couch({ color = "'#8B4513'", rotation, size, onHover }) {
  const group = useRef()
  const [hovered, setHovered] = useState(false)
  const [outlineScale, setOutlineScale] = useState(1)

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotation, 0.1)
    }
    setOutlineScale(THREE.MathUtils.lerp(outlineScale, hovered ? 1.05 : 1, 0.1))
  })

  // Calculate scale based on size
  const scale = {
    small: 0.8,
    medium: 1,
    large: 1.2,
    xl: 1.4
  }[size]

  useEffect(() => {
    document.body.style.cursor = hovered ? "'pointer'" : "'auto'"
  }, [hovered])

  const CouchPart = ({ position, args, castShadow = true, receiveShadow = false }) => (
    <mesh position={position} castShadow={castShadow} receiveShadow={receiveShadow}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
      <Outlines 
        thickness={0.05}
        color="white"
        scale={outlineScale}
        transparent
        opacity={hovered ? 1 : 0}
      />
    </mesh>
  )

  return (
    <group 
      ref={group} 
      position={[0, 0.5, 0]} 
      scale={[scale, scale, scale]}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        onHover(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        onHover(false)
      }}
    >
      <CouchPart position={[0, 0.25, 0]} args={[2, 0.5, 1]} receiveShadow />
      <CouchPart position={[0, 0.75, -0.4]} args={[2, 0.8, 0.2]} />
      <CouchPart position={[-0.9, 0.45, 0]} args={[0.2, 0.4, 1]} />
      <CouchPart position={[0.9, 0.45, 0]} args={[0.2, 0.4, 1]} />
    </group>
  )
}

function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  )
}

function NavBar({ onRotate, onColorChange, onRemove, onSizeChange }) {
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false)
  const [isSizeMenuOpen, setIsSizeMenuOpen] = useState(false)
  const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [selectedCouch, setSelectedCouch] = useState("")

  const navItems = [
    { icon: PaintBucket, label: "Color" },
    { icon: Ruler, label: "Size" },
    { icon: RotateCw, label: "Rotate" },
    { icon: Replace, label: "Replace" },
    { icon: Trash2, label: "Remove" },
    { icon: Menu, label: "More" },
  ]

  const colorOptions = [
    { label: "Red", color: "bg-red-500", value: "#FF0000" },
    { label: "Green", color: "bg-green-500", value: "#00FF00" },
    { label: "Blue", color: "bg-blue-500", value: "#0000FF" },
  ]

  const sizeOptions = [
    { label: "Small", measurement: "152 x 89 cm", value: "small" },
    { label: "Medium", measurement: "183 x 97 cm", value: "medium" },
    { label: "Large", measurement: "213 x 102 cm", value: "large" },
    { label: "XL", measurement: "244 x 107 cm", value: "xl" },
  ]

  const couchModels = [
    { id: "bjorn", name: "Björn" },
    { id: "freya", name: "Freya" },
    { id: "odin", name: "Odin" },
    { id: "astrid", name: "Astrid" },
  ]

  const handleRemove = () => {
    onRemove()
    setIsRemoveDialogOpen(false)
  }

  const handleReplace = () => {
    console.log(`Replacing with ${selectedCouch} model`)
    setIsReplaceDialogOpen(false)
    setSelectedCouch("")
  }

  const handleChangeRoomSize = () => {
    console.log("Change room size")
    setIsMoreMenuOpen(false)
  }

  const handleEditRoomLayout = () => {
    console.log("Edit room layout")
    setIsMoreMenuOpen(false)
  }

  const handleEditRoomLighting = () => {
    console.log("Edit room lighting")
    setIsMoreMenuOpen(false)
  }

  const buttonClasses = `
    flex items-center justify-center h-10 px-3 rounded-md
    transition-all duration-200 ease-in-out
    hover:bg-primary/10 focus-visible:bg-primary/10
    active:bg-primary/20
    focus:outline-none
  `

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-white border border-zinc-200 rounded-md shadow-lg dark:bg-zinc-950 dark:border-zinc-800" aria-label="Main Navigation">
        <ul className="flex items-center h-12 px-2">
          {navItems.map((item, index) => (
            <li key={index} className="mx-1">
              {index === 0 ? (
                <DropdownMenu open={isColorMenuOpen} onOpenChange={setIsColorMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-28">
                    {colorOptions.map((option, optionIndex) => (
                      <DropdownMenuItem 
                        key={optionIndex} 
                        className="flex items-center space-x-2"
                        onClick={() => onColorChange(option.value)}
                      >
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className={option.color}></AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{option.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : index === 1 ? (
                <DropdownMenu open={isSizeMenuOpen} onOpenChange={setIsSizeMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    {sizeOptions.map((option, optionIndex) => (
                      <DropdownMenuItem 
                        key={optionIndex} 
                        className="flex flex-col items-start"
                        onClick={() => onSizeChange(option.value)}
                      >
                        <span className="text-sm font-medium">{option.label}</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{option.measurement}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : index === 2 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className={buttonClasses}
                  onClick={onRotate}
                >
                  <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ) : index === 3 ? (
                <Dialog open={isReplaceDialogOpen} onOpenChange={setIsReplaceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Replace Furniture</DialogTitle>
                      <DialogDescription>
                        Select a couch model to replace the current furniture piece.
                      </DialogDescription>
                    </DialogHeader>
                    <RadioGroup value={selectedCouch} onValueChange={setSelectedCouch} className="grid gap-4 mt-4">
                      {couchModels.map((model) => (
                        <div key={model.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={model.id} id={model.id} />
                          <Label htmlFor={model.id}>{model.name}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <DialogFooter className="mt-6">
                      <Button variant="outline" onClick={() => setIsReplaceDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleReplace} disabled={!selectedCouch}>
                        Replace
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : index === 4 ? (
                <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Remove Model</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to remove this model? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsRemoveDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleRemove}>
                        Remove
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : index === 5 ? (
                <DropdownMenu open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44">
                    <DropdownMenuItem onClick={handleChangeRoomSize} className="flex items-center space-x-2">
                      <Maximize className="h-4 w-4" />
                      <span className="text-sm">Change room size</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEditRoomLayout} className="flex items-center space-x-2">
                      <LayoutGrid className="h-4 w-4" />
                      <span className="text-sm">Edit room layout</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEditRoomLighting} className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4" />
                      <span className="text-sm">Edit room lighting</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className={buttonClasses}
                >
                  <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export function 3dSceneWithNav() {
  const [rotation, setRotation] = useState(0)
  const [couchColor, setCouchColor] = useState("'#8B4513'")
  const [isCouchVisible, setIsCouchVisible] = useState(true)
  const [couchSize, setCouchSize] = useState("'medium'")
  const [isHovered, setIsHovered] = useState(false)

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + Math.PI / 2)
  }

  const handleColorChange = (newColor) => {
    setCouchColor(newColor)
  }

  const handleRemove = () => {
    setIsCouchVisible(false)
  }

  const handleSizeChange = (newSize) => {
    setCouchSize(newSize)
  }

  const handleHover = (hovered) => {
    setIsHovered(hovered)
  }

  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <color attach="background" args={["#f0f0f0"]} />
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <Suspense fallback={null}>
          {isCouchVisible && (
            <Couch 
              rotation={rotation} 
              color={couchColor} 
              size={couchSize} 
              onHover={handleHover}
            />
          )}
          <Plane />
        </Suspense>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      </Canvas>
      <NavBar 
        onRotate={handleRotate} 
        onColorChange={handleColorChange} 
        onRemove={handleRemove}
        onSizeChange={handleSizeChange}
      />
    </div>
  )
}