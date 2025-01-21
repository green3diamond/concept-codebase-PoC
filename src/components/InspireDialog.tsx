import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'
import { Sofa, Bed, Table, Lamp, DollarSign, Home, Paintbrush } from 'lucide-react'
import { InspireAnimation } from './InspireAnimation'

interface InspireDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddProposedFurniture: (furniture: string[]) => void
}

const colorPalettes = [
  { 
    value: 'neutral', 
    label: 'Neutral', 
    description: 'Beige, Gray, White',
    colors: ['#E8DCCC', '#A9A9A9', '#FFFFFF']
  },
  { 
    value: 'warm', 
    label: 'Warm', 
    description: 'Red, Orange, Yellow',
    colors: ['#FF6B6B', '#FFA500', '#FFD700']
  },
  { 
    value: 'cool', 
    label: 'Cool', 
    description: 'Blue, Green, Purple',
    colors: ['#4A90E2', '#50C878', '#9370DB']
  },
  { 
    value: 'monochromatic', 
    label: 'Monochromatic', 
    description: 'Shades of Blue',
    colors: ['#E6F3FF', '#4A90E2', '#1C4F80']
  },
  { 
    value: 'vibrant', 
    label: 'Vibrant', 
    description: 'Colorful Mix',
    colors: ['#FF6B6B', '#4ECDC4', '#FFD93D']
  },
]

const materials = [
  { value: 'wood', label: 'Wood', image: '/placeholder.svg?height=50&width=50' },
  { value: 'metal', label: 'Metal', image: '/placeholder.svg?height=50&width=50' },
  { value: 'glass', label: 'Glass', image: '/placeholder.svg?height=50&width=50' },
  { value: 'leather', label: 'Leather', image: '/placeholder.svg?height=50&width=50' },
  { value: 'fabric', label: 'Fabric', image: '/placeholder.svg?height=50&width=50' },
]

const priceRanges = [
  { value: 0, label: 'Budget-friendly', icon: <DollarSign className="w-4 h-4" /> },
  { value: 1, label: 'Mid-range', icon: <DollarSign className="w-4 h-4" />, secondIcon: <DollarSign className="w-4 h-4" /> },
  { value: 2, label: 'High-end', icon: <DollarSign className="w-4 h-4" />, secondIcon: <DollarSign className="w-4 h-4" />, thirdIcon: <DollarSign className="w-4 h-4" /> },
  { value: 3, label: 'Luxury', icon: <DollarSign className="w-4 h-4" />, secondIcon: <DollarSign className="w-4 h-4" />, thirdIcon: <DollarSign className="w-4 h-4" />, fourthIcon: <DollarSign className="w-4 h-4" /> },
]

const roomTypes = [
  { value: 'living-room', label: 'Living Room', icon: <Sofa className="w-6 h-6" /> },
  { value: 'bedroom', label: 'Bedroom', icon: <Bed className="w-6 h-6" /> },
  { value: 'dining-room', label: 'Dining Room', icon: <Table className="w-6 h-6" /> },
  { value: 'home-office', label: 'Home Office', icon: <Home className="w-6 h-6" /> },
  { value: 'kitchen', label: 'Kitchen', icon: <Lamp className="w-6 h-6" /> },
]

const styles = [
  { value: 'modern', label: 'Modern' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'scandinavian', label: 'Scandinavian' },
]

export function InspireDialog({ isOpen, onClose, onAddProposedFurniture }: InspireDialogProps) {
  const [step, setStep] = useState(-1) // Start at -1 to show the animation first
  const [selectedColorPalettes, setSelectedColorPalettes] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number>(1)
  const [roomType, setRoomType] = useState('')
  const [style, setStyle] = useState('')
  const [recommendedItems, setRecommendedItems] = useState<{
    furniture: string[];
    decorations: string[];
  }>({ furniture: [], decorations: [] });
  const [excludedItems, setExcludedItems] = useState<string[]>([]);
  const [selections, setSelections] = useState<{
    colorPalettes: string[];
    materials: string[];
    priceRange: string;
    roomType: string;
    style: string;
    includedItems: string[];
  }>({
    colorPalettes: [],
    materials: [],
    priceRange: '',
    roomType: '',
    style: '',
    includedItems: [],
  });

  useEffect(() => {
    if (isOpen) {
      setStep(-1)
      setSelectedColorPalettes([])
      setSelectedMaterials([])
      setPriceRange(1)
      setRoomType('')
      setStyle('')
      setRecommendedItems({ furniture: [], decorations: [] });
      setExcludedItems([]);
    }
  }, [isOpen])

  const handleColorPaletteChange = (palette: string) => {
    setSelectedColorPalettes(prev => 
      prev.includes(palette)
        ? prev.filter(p => p !== palette)
        : [...prev, palette]
    )
  }

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    )
  }

  const handleItemExclusion = (item: string) => {
    setExcludedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const getRecommendedItems = (selectedRoomType: string) => {
    // This is a simplified example. In a real application, you'd have more comprehensive recommendations.
    const recommendations = {
      'living-room': {
        furniture: ['Sofa', 'Coffee Table', 'TV Stand', 'Armchair', 'Bookshelf'],
        decorations: ['Area Rug', 'Wall Art', 'Table Lamp', 'Throw Pillows', 'Plants']
      },
      'bedroom': {
        furniture: ['Bed', 'Nightstand', 'Dresser', 'Wardrobe', 'Desk'],
        decorations: ['Bedside Lamp', 'Curtains', 'Wall Mirror', 'Throw Blanket', 'Wall Clock']
      },
      'dining-room': {
        furniture: ['Dining Table', 'Dining Chairs', 'Sideboard', 'China Cabinet'],
        decorations: ['Chandelier', 'Table Runner', 'Wall Art', 'Centerpiece', 'Area Rug']
      },
      'home-office': {
        furniture: ['Desk', 'Office Chair', 'Bookshelf', 'Filing Cabinet'],
        decorations: ['Desk Lamp', 'Wall Calendar', 'Desk Organizer', 'Plants', 'Wall Art']
      },
      'kitchen': {
        furniture: ['Kitchen Island', 'Bar Stools', 'Dining Table', 'Chairs'],
        decorations: ['Pendant Lights', 'Wall Clock', 'Kitchen Rug', 'Wall Art', 'Plants']
      }
    };

    return recommendations[selectedRoomType as keyof typeof recommendations] || { furniture: [], decorations: [] };
  };

  const questions = [
    {
      title: "What color palettes do you prefer? (Choose multiple)",
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
      title: "What materials do you prefer? (Choose multiple)",
      component: (
        <div className="space-y-4">
          {materials.map((m) => (
            <div key={m.value} className="flex items-center justify-between space-x-3">
              <Label 
                htmlFor={`material-${m.value}`}
                className="flex items-center space-x-3 cursor-pointer flex-grow"
              >
                <Image
                  src={m.image || "/placeholder.svg"}
                  alt={m.label}
                  width={50}
                  height={50}
                  className="rounded-md border border-gray-300"
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
      title: "What is your price range?",
      component: (
        <div className="space-y-4">
          <Slider
            min={0}
            max={3}
            step={1}
            value={[priceRange]}
            onValueChange={(value) => setPriceRange(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            {priceRanges.map((range) => (
              <div key={range.value} className="text-center">
                <div className={`font-medium ${priceRange === range.value ? 'text-primary' : ''}`}>
                  {range.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Which room are you furnishing?",
      component: (
        <Select value={roomType} onValueChange={setRoomType}>
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
      component: (
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            {styles.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
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
                    <Label htmlFor={`furniture-${item}`} className="text-sm">{item}</Label>
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
                    <Label htmlFor={`decoration-${item}`} className="text-sm">{item}</Label>
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
                  const paletteInfo = colorPalettes.find(p => p.value === palette);
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
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Materials</h3>
              <div className="flex flex-wrap gap-2">
                {selections.materials.map((material) => {
                  const materialInfo = materials.find(m => m.value === material);
                  return (
                    <div key={material} className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                      <Image
                        src={materialInfo?.image || "/placeholder.svg"}
                        alt={materialInfo?.label || ""}
                        width={24}
                        height={24}
                        className="rounded-md border border-gray-300"
                      />
                      <span className="text-sm">{materialInfo?.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <div className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                {priceRanges.find(r => r.label === selections.priceRange)?.icon}
                {priceRanges.find(r => r.label === selections.priceRange)?.secondIcon}
                {priceRanges.find(r => r.label === selections.priceRange)?.thirdIcon}
                {priceRanges.find(r => r.label === selections.priceRange)?.fourthIcon}
                <span className="text-sm">{selections.priceRange}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Room Type</h3>
              <div className="flex items-center space-x-2 bg-secondary rounded-md p-2">
                {roomTypes.find(r => r.value === selections.roomType)?.icon}
                <span className="text-sm">{roomTypes.find(r => r.value === selections.roomType)?.label}</span>
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

  const currentQuestion = questions[step]

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      if (step === 3 && roomType) {  // After selecting room type
        setRecommendedItems(getRecommendedItems(roomType));
      }
      if (step === questions.length - 2) {  // Before the summary step
        const includedItems = [...recommendedItems.furniture, ...recommendedItems.decorations].filter(item => !excludedItems.includes(item));
        setSelections({
          colorPalettes: selectedColorPalettes,
          materials: selectedMaterials,
          priceRange: priceRanges[priceRange].label,
          roomType,
          style,
          includedItems,
        });
      }
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleAddProposedFurniture = () => {
    onAddProposedFurniture(selections.includedItems.filter(item => recommendedItems.furniture.includes(item)));
    onClose();
  }

  const handleStartInspire = () => {
    setStep(0); // Move to the first question after the animation
  }

  if (step === -1) {
    return (
      <InspireAnimation
        onStart={handleStartInspire}
        onClose={() => {
          setStep(0);
          onClose();
        }}
      />
    );
  }

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

