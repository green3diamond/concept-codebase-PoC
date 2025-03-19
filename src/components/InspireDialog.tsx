import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Sofa, Bed, Table, Lamp, Home, Paintbrush, Check } from "lucide-react"
import { InspireAnimation } from "./InspireAnimation"
import { motion, AnimatePresence } from "framer-motion"

interface InspireDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddProposedFurniture: (furniture: string[]) => void
}

const colorPalettes = [
  {
    value: "neutral",
    label: "Neutral",
    description: "Beige, Gray, White",
    colors: ["#E8DCCC", "#A9A9A9", "#FFFFFF"],
  },
  {
    value: "warm",
    label: "Warm",
    description: "Red, Orange, Yellow",
    colors: ["#FF6B6B", "#FFA500", "#FFD700"],
  },
  {
    value: "cool",
    label: "Cool",
    description: "Blue, Green, Purple",
    colors: ["#4A90E2", "#50C878", "#9370DB"],
  },
  {
    value: "monochromatic",
    label: "Monochromatic",
    description: "Shades of Blue",
    colors: ["#E6F3FF", "#4A90E2", "#1C4F80"],
  },
  {
    value: "vibrant",
    label: "Vibrant",
    description: "Colorful Mix",
    colors: ["#FF6B6B", "#4ECDC4", "#FFD93D"],
  },
]

const materials = [
  { value: "wood", label: "Wood", image: "/placeholder.jpg" },
  { value: "metal", label: "Metal", image: "/placeholder.jpg" },
  { value: "glass", label: "Glass", image: "/placeholder.jpg" },
  { value: "leather", label: "Leather", image: "/placeholder.jpg" },
  { value: "fabric", label: "Fabric", image: "/placeholder.jpg" },
]

const roomTypes = [
  { value: "living-room", label: "Living Room", icon: <Sofa className="w-6 h-6" /> },
  { value: "bedroom", label: "Bedroom", icon: <Bed className="w-6 h-6" /> },
  { value: "dining-room", label: "Dining Room", icon: <Table className="w-6 h-6" /> },
  { value: "home-office", label: "Home Office", icon: <Home className="w-6 h-6" /> },
  { value: "kitchen", label: "Kitchen", icon: <Lamp className="w-6 h-6" /> },
]

const styles = [
  "Modern",
  "Traditional",
  "Minimalist",
  "Rustic",
  "Industrial",
  "Scandinavian",
  "Contemporary",
  "Bohemian",
  "Mid-Century Modern",
  "Art Deco",
  "Coastal",
  "Farmhouse",
  "Eclectic",
  "Transitional",
  "Zen",
]

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

export function InspireDialog({ isOpen, onClose, onAddProposedFurniture }: InspireDialogProps) {
  const [step, setStep] = useState(0)
  const [selectedColorPalettes, setSelectedColorPalettes] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [roomType, setRoomType] = useState("")
  const [style, setStyle] = useState("")
  const [recommendedItems, setRecommendedItems] = useState<{
    furniture: string[]
    decorations: string[]
  }>({ furniture: [], decorations: [] })
  const [excludedItems, setExcludedItems] = useState<string[]>([])
  const [selections, setSelections] = useState<{
    colorPalettes: string[]
    materials: string[]
    roomType: string
    style: string
    includedItems: string[]
  }>({
    colorPalettes: [],
    materials: [],
    roomType: "",
    style: "",
    includedItems: [],
  })
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])

  const handleColorPaletteChange = (palette: string) => {
    setSelectedColorPalettes((prev) =>
      prev.includes(palette) ? prev.filter((p) => p !== palette) : [...prev, palette],
    )
  }

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  const handleItemExclusion = (item: string) => {
    setExcludedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const getRecommendedItems = (selectedRoomType: string) => {
    const recommendations = {
      "living-room": {
        furniture: ["Sofa", "Coffee Table", "TV Stand", "Armchair", "Bookshelf"],
        decorations: ["Area Rug", "Wall Art", "Table Lamp", "Throw Pillows", "Plants"],
      },
      bedroom: {
        furniture: ["Bed", "Nightstand", "Dresser", "Wardrobe", "Desk"],
        decorations: ["Bedside Lamp", "Curtains", "Wall Mirror", "Throw Blanket", "Wall Clock"],
      },
      "dining-room": {
        furniture: ["Dining Table", "Dining Chairs", "Sideboard", "China Cabinet"],
        decorations: ["Chandelier", "Table Runner", "Wall Art", "Centerpiece", "Area Rug"],
      },
      "home-office": {
        furniture: ["Desk", "Office Chair", "Bookshelf", "Filing Cabinet"],
        decorations: ["Desk Lamp", "Wall Calendar", "Desk Organizer", "Plants", "Wall Art"],
      },
      kitchen: {
        furniture: ["Kitchen Island", "Bar Stools", "Dining Table", "Chairs"],
        decorations: ["Pendant Lights", "Wall Clock", "Kitchen Rug", "Wall Art", "Plants"],
      },
    }

    return recommendations[selectedRoomType as keyof typeof recommendations] || { furniture: [], decorations: [] }
  }

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  const StyleSelector = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">What style do you want?</h3>
      <motion.div className="flex flex-wrap gap-3 overflow-visible" layout transition={transitionProps}>
        {styles.map((style) => {
          const isSelected = selectedStyles.includes(style)
          return (
            <motion.button
              key={style}
              onClick={() => toggleStyle(style)}
              initial={false}
              animate={{
                backgroundColor: isSelected ? "#e0f2fe" : "white",
                color: isSelected ? "#0284c7" : "#64748b",
                borderColor: isSelected ? "#0284c7" : "#e2e8f0",
              }}
              whileHover={{
                backgroundColor: isSelected ? "#e0f2fe" : "#f8fafc",
              }}
              whileTap={{
                backgroundColor: isSelected ? "#bae6fd" : "#f1f5f9",
              }}
              transition={{
                backgroundColor: { duration: 0.1 },
                color: { duration: 0.1 },
                borderColor: { duration: 0.1 },
              }}
              className={`
                inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                whitespace-nowrap overflow-hidden border
              `}
            >
              <motion.div
                className="relative flex items-center"
                animate={{
                  paddingRight: isSelected ? "1.5rem" : "0",
                }}
                transition={{
                  paddingRight: { duration: 0.2 },
                }}
              >
                <span>{style}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 w-4 h-4"
                    >
                      <div className="w-full h-full rounded-full bg-sky-600 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )

  const questions = [
    {
      title: "What color palettes do you prefer?",
      component: (
        <div className="space-y-4">
          {colorPalettes.map((palette) => (
            <div key={palette.value} className="flex items-center justify-between space-x-3">
              <Label
                htmlFor={`color-${palette.value}`}
                className="flex items-center space-x-3 cursor-pointer flex-grow"
              >
                <div className="flex space-x-1">
                  {palette.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-medium">{palette.label}</div>
                  <div className="text-sm text-gray-500">{palette.description}</div>
                </div>
              </Label>
              <Checkbox
                id={`color-${palette.value}`}
                checked={selectedColorPalettes.includes(palette.value)}
                onCheckedChange={() => handleColorPaletteChange(palette.value)}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "What materials do you prefer?",
      component: (
        <div className="space-y-4">
          {materials.map((m) => (
            <div key={m.value} className="flex items-center justify-between space-x-3">
              <Label htmlFor={`material-${m.value}`} className="flex items-center space-x-3 cursor-pointer flex-grow">
                <Image
                  src={m.image || "/placeholder.svg?height=50&width=50"}
                  alt={m.label}
                  width={50}
                  height={50}
                  className="rounded-md border border-gray-300 object-cover"
                />
                <div className="font-medium">{m.label}</div>
              </Label>
              <Checkbox
                id={`material-${m.value}`}
                checked={selectedMaterials.includes(m.value)}
                onCheckedChange={() => handleMaterialChange(m.value)}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Which room are you furnishing?",
      component: (
        <Select
          value={roomType}
          onValueChange={(value) => {
            setRoomType(value)
            setRecommendedItems(getRecommendedItems(value))
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select room type" />
          </SelectTrigger>
          <SelectContent>
            {roomTypes.map((room) => (
              <SelectItem key={room.value} value={room.value}>
                {room.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      title: "What style do you want?",
      component: <StyleSelector />,
    },
    {
      title: "Recommended Items",
      component: (
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Furniture</h3>
              <div className="grid grid-cols-2 gap-2">
                {recommendedItems.furniture.map((item) => (
                  <div key={item} className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                    <Checkbox
                      id={`furniture-${item}`}
                      checked={!excludedItems.includes(item)}
                      onCheckedChange={() => handleItemExclusion(item)}
                    />
                    <Label htmlFor={`furniture-${item}`} className="text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Decorations</h3>
              <div className="grid grid-cols-2 gap-2">
                {recommendedItems.decorations.map((item) => (
                  <div key={item} className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                    <Checkbox
                      id={`decoration-${item}`}
                      checked={!excludedItems.includes(item)}
                      onCheckedChange={() => handleItemExclusion(item)}
                    />
                    <Label htmlFor={`decoration-${item}`} className="text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      ),
    },
    {
      title: "Summary of Your Selections",
      component: (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Color Palettes</h3>
              <div className="flex flex-wrap gap-2">
                {selections.colorPalettes.map((palette) => {
                  const paletteInfo = colorPalettes.find((p) => p.value === palette)
                  return (
                    <div key={palette} className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                      <div className="flex space-x-1">
                        {paletteInfo?.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-sm">{paletteInfo?.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Materials</h3>
              <div className="flex flex-wrap gap-2">
                {selections.materials.map((material) => {
                  const materialInfo = materials.find((m) => m.value === material)
                  return (
                    <div key={material} className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                      <Image
                        src={materialInfo?.image || "/placeholder.svg?height=24&width=24"}
                        alt={materialInfo?.label || ""}
                        width={24}
                        height={24}
                        className="rounded-md border border-gray-300 object-cover"
                      />
                      <span className="text-sm">{materialInfo?.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Room Type</h3>
              <div className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                {roomTypes.find((r) => r.value === selections.roomType)?.icon}
                <span className="text-sm">{roomTypes.find((r) => r.value === selections.roomType)?.label}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Style</h3>
              <div className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                <Paintbrush className="w-4 h-4" />
                <span className="text-sm">{selections.style}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Included Items</h3>
              <div className="grid grid-cols-2 gap-2">
                {selections.includedItems.map((item) => (
                  <div key={item} className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      ),
    },
  ]

  const currentQuestion = questions[step - 1]

  const handleNext = () => {
    if (step <= questions.length) {
      // If we're on the room type question (step 3) and moving to recommended items
      if (step === 3) {
        const items = getRecommendedItems(roomType)
        setRecommendedItems(items)
      }

      // If we're moving to summary step
      if (step === questions.length) {
        const includedItems = [...recommendedItems.furniture, ...recommendedItems.decorations].filter(
          (item) => !excludedItems.includes(item),
        )
        setSelections({
          colorPalettes: selectedColorPalettes,
          materials: selectedMaterials,
          roomType,
          style,
          includedItems,
        })
      }

      setStep(step + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleAddProposedFurniture = () => {
    onAddProposedFurniture(selections.includedItems.filter((item) => recommendedItems.furniture.includes(item)))
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setStep(1)
    }
  }, [isOpen])

  return (
    <>
      {step === 1 && (
        <InspireAnimation
          onStart={() => setStep(2)}
          onClose={() => {
            setStep(1)
            onClose()
          }}
        />
      )}
      {step > 1 && (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) {
              setStep(1)
              onClose()
            }
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{questions[step - 2].title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">{questions[step - 2].component}</div>
            <div className="mt-6 flex justify-between items-center">
              <Button onClick={handlePrevious} disabled={step === 2}>
                Previous
              </Button>
              <div className="text-sm text-gray-500">
                Step {step - 1} of {questions.length}
              </div>
              {step === questions.length + 1 ? (
                <Button onClick={handleAddProposedFurniture}>
                  Add to {roomTypes.find((r) => r.value === selections.roomType)?.label || "Room"}
                </Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

