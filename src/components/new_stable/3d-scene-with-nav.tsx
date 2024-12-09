import React, { Suspense, useState, useRef, useCallback, useEffect } from "'react'"
import { Canvas, useFrame, useThree } from "'@react-three/fiber'"
import { OrbitControls, PerspectiveCamera, Html } from "'@react-three/drei'"
import { PaintBucket, RotateCw, Replace, Trash2, Menu, Maximize, LayoutGrid, Lightbulb, X, ChevronLeft, ChevronRight, Sofa, Sparkles, Armchair, Bed, Utensils, Lamp, Settings, Plus, Pencil, Sun } from "'lucide-react'"
import { Button } from "@/components/new_stable/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/new_stable/ui/radio-group"
import { Label } from "@/components/new_stable/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/new_stable/ui/card"
import { Avatar, AvatarFallback } from "@/components/new_stable/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/new_stable/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/new_stable/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/new_stable/ui/accordion"
import * as THREE from "'three'"
import { ScrollArea } from "@/components/new_stable/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/new_stable/ui/tooltip"

function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[0, 2.5, -5]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </group>
  )
}

function BadgeButton({ onClick }) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="w-8 h-8 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
      onClick={onClick}
    >
      <Pencil className="h-4 w-4 text-gray-600" />
      <span className="sr-only">Edit</span>
    </Button>
  )
}

function Couch({ color, rotation, size, position, onDrag, onDragStart, onDragEnd, onModelClick, onEditClick }) {
  const group = useRef()
  const { camera, raycaster, gl } = useThree()
  const [isDragging, setIsDragging] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const dragStart = useRef(new THREE.Vector3())
  const dragOffset = useRef(new THREE.Vector3())
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  const intersectionPoint = new THREE.Vector3()

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotation, 0.1)
    }
  })

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation()
    setIsDragging(true)
    gl.domElement.style.cursor = "'grabbing'"

    raycaster.setFromCamera(e.pointer, camera)
    raycaster.ray.intersectPlane(plane, intersectionPoint)
    dragStart.current.copy(intersectionPoint)
    dragOffset.current.subVectors(group.current.position, intersectionPoint)
    onDragStart()
  }, [camera, gl, raycaster, onDragStart])

  const handlePointerUp = useCallback((e) => {
    setIsDragging(false)
    gl.domElement.style.cursor = "'grab'"
    onDragEnd()

    if (e.delta <= 2) {
      setIsButtonVisible(true)
      onModelClick()
    }
  }, [gl, onDragEnd, onModelClick])

  const handlePointerMove = useCallback((e) => {
    if (isDragging) {
      raycaster.setFromCamera(e.pointer, camera)
      raycaster.ray.intersectPlane(plane, intersectionPoint)
      const newPosition = intersectionPoint.add(dragOffset.current)
      onDrag([newPosition.x, 0, newPosition.z])
    }
  }, [isDragging, camera, raycaster, onDrag])

  const length = {
    small: 2.4,
    medium: 3,
    large: 3.6,
    xl: 4.2
  }[size]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isButtonVisible) {
        const canvas = gl.domElement;
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        raycaster.setFromCamera(
          new THREE.Vector2(
            (mouseX / canvas.clientWidth) * 2 - 1,
            -(mouseY / canvas.clientHeight) * 2 + 1
          ),
          camera
        );
        
        const intersects = raycaster.intersectObject(group.current, true);
        
        if (intersects.length === 0) {
          setIsButtonVisible(false);
        }
      }
    };

    window.addEventListener("'click'", handleClickOutside);
    return () => {
      window.removeEventListener("'click'", handleClickOutside);
    };
  }, [isButtonVisible, camera, raycaster, gl.domElement, group]);

  return (
    <group 
      ref={group} 
      position={position}
    >
      <mesh
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerOver={() => { gl.domElement.style.cursor = "'grab'" }}
        onPointerOut={() => { gl.domElement.style.cursor = "'auto'" }}
      >
        <boxGeometry args={[length, 1.5, 1.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh position={[0, 0.375, 0]}>
        <boxGeometry args={[length, 0.75, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.125, -0.6]}>
        <boxGeometry args={[length, 1.2, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-length/2 + 0.15, 0.675, 0]}>
        <boxGeometry args={[0.3, 0.6, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[length/2 - 0.15, 0.675, 0]}>
        <boxGeometry args={[0.3, 0.6, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html
        position={[length/2 - 0.3, 1.8, 0]}
        style={{
          transition: "'all 0.2s'",
          transform: `scale(${isButtonVisible ? 1 : 0.5})`,
          opacity: isButtonVisible ? 1 : 0,
          pointerEvents: isButtonVisible ? "'auto'" : "'none'",
        }}
      >
        <BadgeButton onClick={(e) => { e.stopPropagation(); onEditClick(); }} />
      </Html>
    </group>
  )
}

function FloatingMenu({ couchName, couchColor, onRotate, onColorChange, onRemove, onSizeChange, menuState, onToggleMenu, activeAccordion, setActiveAccordion }) {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)

  const colorOptions = [
    { label: "Sage", color: "bg-[#8A9A5B]", value: "#8A9A5B", name: "Herbal Sage" },
    { label: "Taupe", color: "bg-[#8B7E66]", value: "#8B7E66", name: "Earthy Taupe" },
    { label: "Slate", color: "bg-[#708090]", value: "#708090", name: "Stormy Slate" },
  ];

  const sizeOptions = [
    { label: "Small", measurement: "160 cm", value: "small" },
    { label: "Medium", measurement: "200 cm", value: "medium" },
    { label: "Large", measurement: "240 cm", value: "large" },
    { label: "XL", measurement: "280 cm", value: "xl" },
  ]

  const handleRemove = () => {
    onRemove()
    setIsRemoveDialogOpen(false)
  }

  return (
    <div className={`fixed top-4 right-4 z-50 transition-transform duration-300 ${menuState === "'open'" ? "'translate-x-0'" : "'translate-x-full'"}`}>
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-12 top-0"
        onClick={onToggleMenu}
      >
        {menuState === "'open'" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      <Card className="w-[90vw] max-w-[320px] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Living Room
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible value={activeAccordion} onValueChange={setActiveAccordion}>
            <AccordionItem value="comfy-couch">
              <AccordionTrigger>{couchName}</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Color</h4>
                    <div className="flex space-x-3">
                      {colorOptions.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex flex-col items-center">
                          <button
                            className={`w-8 h-8 rounded-full ${option.color} border-2 transition-colors mb-1`}
                            style={{
                              borderColor: couchColor === option.value ? "'black'" : "'transparent'",
                            }}
                            onClick={() => onColorChange(option.value)}
                          />
                          <span className="text-xs text-center w-16 break-words">{option.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Size</h4>
                    <RadioGroup onValueChange={onSizeChange} defaultValue="medium" className="space-y-2">
                      {sizeOptions.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="text-sm">
                            {option.label} - {option.measurement}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={onRotate}
                  >
                    <RotateCw className="mr-2 h-4 w-4" />
                    Rotate
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsRemoveDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
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
    </div>
  )
}

function FurnitureBrowser({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("sofas")

  const categories = [
    { id: "sofas", name: "Sofas", icon: Sofa },
    { id: "chairs", name: "Chairs", icon: Armchair },
    { id: "beds", name: "Beds", icon: Bed },
    { id: "tables", name: "Tables", icon: Utensils },
    { id:  "lamps", name: "Lamps", icon: Lamp },
  ]

  const furnitureItems = {
    sofas: [
      { id: "sofa1", name: "Comfy Couch", measurements: "200cm x 90cm 85cm", image: "/placeholder.svg?height=200&width=300", colors: ["#FF0000", "#00FF00", "#0000FF"] },
      { id: "sofa2", name: "Modern Sofa", measurements: "180cm x 85cm 80cm", image: "/placeholder.svg?height=200&width=300", colors: ["#FFA500", "#800080", "#008080"] },
      { id: "sofa3", name: "Sectional Sofa", measurements: "270cm x 200cm 85cm", image: "/placeholder.svg?height=200&width=300", colors: ["#FFD700", "#4B0082", "#00CED1"] },
    ],
    chairs: [
      { id: "chair1", name: "Dining Chair", measurements: "45cm x 55cm 85cm", image: "/placeholder.svg?height=200&width=300", colors: ["#8B4513",   "#A52A2A", "#D2691E"] },
      { id: "chair2", name: "Office Chair", measurements: "65cm x 110cm", image: "/placeholder.svg?height=200&width=300", colors: ["#000000", "#808080", "#C0C0C0"] },
      { id: "chair3", name: "Accent Chair", measurements: "70cm x 75cm 80cm", image: "/placeholder.svg?height=200&width=300", colors: ["#FF69B4", "#FF1493", "#C71585"] },
    ],
    beds: [
      { id: "bed1", name: "Queen Bed", measurements: "160cm x 200cm", image: "/placeholder.svg?height=200&width=300", colors: ["#8B4513", "#D2691E", "#CD853F"] },
      { id: "bed2", name: "King Bed", measurements: "180cm x 200cm", image: "/placeholder.svg?height=200&width=300", colors: ["#2F4F4F", "#708090", "#778899"] },
      { id: "bed3", name: "Bunk Bed", measurements: "90cm x 200cm (each bed)", image: "/placeholder.svg?height=200&width=300", colors: ["#FF6347", "#FF4500", "#FF8C00"] },
    ],
    tables: [
      { id: "table1", name: "Dining Table", measurements: "180cm x 90cm 75cm", image: "/placeholder.svg?height=200&width=300", colors: ["#8B4513", "#D2691E", "#CD853F"] },
      { id: "table2", name: "Coffee Table", measurements: "120cm x 60cm 45cm", image: "/placeholder.svg?height=200&width=300", colors: ["#2F4F4F", "#708090", "#778899"] },
      { id: "table3", name: "Side Table", measurements: "45cm x 55cm", image: "/placeholder.svg?height=200&width=300", colors: ["#B8860B", "#DAA520", "#FFD700"] },
    ],
    lamps: [
      { id: "lamp1", name: "Floor Lamp", measurements: "35cm x 150cm", image: "/placeholder.svg?height=200&width=300", colors: ["#FFD700", "#FFA500", "#FF8C00"] },
      { id: "lamp2", name: "Table Lamp", measurements: "30cm x 50cm", image: "/placeholder.svg?height=200&width=300", colors: ["#00CED1", "#48D1CC", "#40E0D0"] },
      { id: "lamp3", name: "Pendant Light", measurements: "40cm diameter x 50cm height", image: "/placeholder.svg?height=200&width=300", colors: ["#FF69B4", "#FF1493", "#C71585"] },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-6xl w-full h-[80vh] flex flex-col sm:flex-row p-0 gap-0">
        <div className="w-full sm:w-64 bg-zinc-100 p-4 flex flex-col dark:bg-zinc-800">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Browse Furniture</DialogTitle>
          <ScrollArea className="flex-grow">
            <div className="flex flex-row sm:flex-col">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "secondary" : "ghost"}
                  className="flex-1 sm:w-full justify-start mb-2 px-2 sm:px-4"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex-grow p-4 sm:p-6 bg-white overflow-y-auto dark:bg-zinc-950">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {furnitureItems[selectedCategory].map((item) => (
                <Card key={item.id} className="overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-36 md:h-48 object-cover" />
                  <CardHeader className="p-2 md:p-4">
                    <div>
                      <CardTitle className="text-base md:text-lg">{item.name}</CardTitle>
                      <CardDescription className="text-xs md:text-sm">{item.measurements}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 md:p-4">
                    <div className="flex space-x-2">
                      {item.colors.map((color, index) => (
                        <Avatar key={index} className="w-6 h-6 md:w-8 md:h-8 border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                          <AvatarFallback style={{ backgroundColor: color }}></AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </CardContent>
                  <div className="absolute bottom-2 right-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            disabled 
                            className="shrink-0 bg-zinc-900/10 hover:bg-zinc-900/20 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/30 disabled:opacity-50 dark:bg-zinc-50/10 dark:hover:bg-zinc-50/20 dark:dark:bg-zinc-50/20 dark:dark:hover:bg-zinc-50/30"
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add to room</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to room (disabled)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LightingSettingsDialog({ open, onOpenChange }) {
  const [selectedLighting, setSelectedLighting] = useState("daylight")

  const lightingOptions = [
    { id: "daylight", label: "Daylight", icon: Sun },
    { id: "indoor-bright", label: "Indoor Bright", icon: Lightbulb },
    { id: "indoor-mood", label: "Indoor Mood", icon: Lamp },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>Edit Room Lighting</DialogTitle>
          <DialogDescription>
            Choose the lighting setting for your room.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup
            defaultValue="daylight"
            value={selectedLighting}
            onValueChange={setSelectedLighting}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {lightingOptions.map((option) => (
              <div key={option.id} className="relative">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={option.id}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-100 bg-white p-4 hover:bg-zinc-100 hover:text-zinc-900 peer-data-[state=checked]:border-zinc-900 [&:has([data-state=checked])]:border-zinc-900 h-full dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:peer-data-[state=checked]:border-zinc-50 dark:[&:has([data-state=checked])]:border-zinc-50"
                >
                  <option.icon className="mb-3 h-6 w-6" />
                  <span className="text-center text-sm font-medium leading-none">{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function InspireDialog({ isOpen, onClose }) {
  const [displayedText, setDisplayedText] = useState("")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const fullText = "Concept is here to help you get inspired."
  const subtitle = "Let's find out what you are looking for together."

  useEffect(() => {
    if (isOpen) {
      setDisplayedText("")
      setShowSubtitle(false)
      let index = 0
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText((prev) => prev + fullText[index])
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowSubtitle(true), 500)
        }
      }, 1000 / fullText.length)

      return () => clearInterval(interval)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[90vw]">
        <DialogHeader>
          <DialogTitle className="sr-only">Get Inspired</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <p className="text-xl sm:text-2xl font-bold text-center" style={{ textShadow: "0 10px rgba(255,255,255,0.5)" }}>
            {displayedText.split("''").map((char, index) => (
              <span
                key={index}
                style={{
                  color: `hsl(${index * (360 / fullText.length)}, 70%, 50%)`,
                }}
              >
                {char}
              </span>
            ))}
          </p>
          {showSubtitle && (
            <p
              className="text-base sm:text-lg text-center"
              style={{
                animation: "fadeIn 0.5s ease-out",
              }}
            >
              {subtitle}
            </p>
          )}
          {showSubtitle && (
            <Button
              className="mt-4"
              style={{
                animation: "bounceIn 0.5s ease-out",
              }}
            >
              Start
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FloatingNavigation({ isFurnitureBrowserOpen, setIsFurnitureBrowserOpen, isInspireDialogOpen, setIsInspireDialogOpen }) {
  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] max-w-md">
        <Card className="shadow-lg">
          <CardContent className="p-2">
            <div className="flex justify-between space-x-2">
              <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center" onClick={() => setIsFurnitureBrowserOpen(true)}>
                <Sofa className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Browse</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center" onClick={() => setIsInspireDialogOpen(true)}>
                <Sparkles className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Inspire</span>
              </Button>
              <RoomSettingsDropdown />
            </div>
          </CardContent>
        </Card>
      </div>
      <FurnitureBrowser isOpen={isFurnitureBrowserOpen} onClose={() => setIsFurnitureBrowserOpen(false)} />
      <InspireDialog isOpen={isInspireDialogOpen} onClose={() => setIsInspireDialogOpen(false)} />
    </>
  )
}

function RoomSettingsDropdown() {
  const [isLightingDialogOpen, setIsLightingDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center">
            <Settings className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onSelect={() => console.log("Change room size")}>
            <Maximize className="mr-2 h-4 w-4" />
            <span>Change room size</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("Edit room layout")}>
            <LayoutGrid className="mr-2 h-4 w-4" />
            <span>Edit room layout</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsLightingDialogOpen(true)}>
            <Lightbulb className="mr-2 h-4 w-4" />
            <span>Edit room lighting</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LightingSettingsDialog open={isLightingDialogOpen} onOpenChange={setIsLightingDialogOpen} />
    </>
  )
}

export function 3dSceneWithNav() {
  const [rotation, setRotation] = useState(0)
  const [couchColor, setCouchColor] = useState("'#8A9A5B'")
  const [isCouchVisible, setIsCouchVisible] = useState(true)
  const [couchSize, setCouchSize] = useState("'medium'")
  const [couchPosition, setCouchPosition] = useState([0, 0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const [menuState, setMenuState] = useState("'closed'")
  const [activeAccordion, setActiveAccordion] = useState("")
  const [couchName, setCouchName] = useState("Comfy Couch")
  const [isFurnitureBrowserOpen, setIsFurnitureBrowserOpen] = useState(false)
  const [isInspireDialogOpen, setIsInspireDialogOpen] = useState(false)

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

  const handleDrag = (newPosition) => {
    setCouchPosition(newPosition)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const toggleMenu = () => {
    setMenuState(prevState => prevState === "'open'" ? "'closed'" : "'open'")
  }

  const handleModelClick = () => {
    setMenuState("'open'")
    setActiveAccordion("comfy-couch")
  }

  const handleEditClick = () => {
    setMenuState("'open'")
    setActiveAccordion("comfy-couch")
  }

  const handleCanvasClick = (event) => {
    if (menuState === "'open'") {
      setMenuState("'closed'")
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
      />
    </div>
  )
}