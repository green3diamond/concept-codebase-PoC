import React, { useState } from "react"
import { Sofa, Armchair, Bed, Utensils, Lamp, Plus } from "lucide-react"
import { Button } from "@/components/separate_files/ui/button"
import { ScrollArea } from "@/components/separate_files/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/separate_files/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/separate_files/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/separate_files/ui/card"
import { Avatar, AvatarFallback } from "@/components/separate_files/ui/avatar"

interface FurnitureBrowserProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * FurnitureBrowser Component - A modal dialog for browsing and selecting furniture
 * 
 * Features:
 * - Category-based navigation (Sofas, Chairs, Beds, Tables, Lamps)
 * - Responsive grid layout for furniture items
 * - Color variants for each furniture piece
 * - Detailed measurements display
 * - Scrollable content areas
 * 
 * Props:
 * @param {boolean} isOpen - Controls the visibility of the browser dialog
 * @param {function} onClose - Callback to handle dialog closing
 * 
 * Data Structure:
 * - categories: Array of furniture categories with icons
 * - furnitureItems: Object containing arrays of items for each category
 *   - Each item has: id, name, measurements, image, and color options
 * 
 * Implementation:
 * - Uses Radix UI components for accessibility
 *   - Dialog for modal
 *   - ScrollArea for scrollable content
 *   - Tooltip for UI hints
 * - Responsive design with Tailwind CSS
 *   - Adapts layout for different screen sizes
 *   - Mobile-first approach
 * - Category sidebar with icon buttons
 * - Grid layout for furniture items
 * - Color swatches using Avatar components
 */
export function FurnitureBrowser({ isOpen, onClose }: FurnitureBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState("sofas")

  const categories = [
    { id: "sofas", name: "Sofas", icon: Sofa },
    { id: "chairs", name: "Chairs", icon: Armchair },
    { id: "beds", name: "Beds", icon: Bed },
    { id: "tables", name: "Tables", icon: Utensils },
    { id: "lamps", name: "Lamps", icon: Lamp },
  ]

  const furnitureItems = {
    sofas: [
      { id: "sofa1", name: "Comfy Couch", measurements: "200cm x 90cm 85cm", image: "/placeholder.svg?height=200&width=300", colors: ["#FF0000", "#00FF00", "#0000FF"] },
      { id: "sofa2", name: "Modern Sofa", measurements: "180cm x 85cm 80cm", image: "/placeholder.svg?height=200&width=300", colors: ["#FFA500", "#800080", "#008080"] },
      { id: "sofa3", name: "Sectional Sofa", measurements: "270cm x 200cm 85cm", image: "/placeholder.svg?height=200&width=300", colors: ["#FFD700", "#4B0082", "#00CED1"] },
    ],
    chairs: [
      { id: "chair1", name: "Dining Chair", measurements: "45cm x 55cm 85cm", image: "/placeholder.svg?height=200&width=300", colors: ["#8B4513", "#A52A2A", "#D2691E"] },
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

