import React, { useEffect, useState } from "react"
import { Sofa, Armchair, Bed, Utensils, Lamp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { FurnitureItem } from "../../types/furniture"

interface FurnitureBrowserProps {
  isOpen: boolean
  onClose: () => void
  onAddFurniture: (item: FurnitureItem) => void
}

interface Category {
  id: string
  name: string
  icon: string
}


const iconMap = {
  Sofa,
  Armchair,
  Bed,
  Utensils,
  Lamp,
}

export function FurnitureBrowser({ isOpen, onClose, onAddFurniture }: FurnitureBrowserProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [furnitureItems, setFurnitureItems] = useState<Record<string, FurnitureItem[]>>({})
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchFurnitureData = async () => {
      try {
        const response = await fetch('/api/furniture')
        const data = await response.json()
        const updatedCategories = data.categories.map((category: Category) => ({
          id: category.id,
          name: category.name,
        }))
        setCategories(updatedCategories)
        setFurnitureItems(data.furniture)
        setSelectedCategory(data.categories[0]?.id || "")
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching furniture data:', error)
        setIsLoading(false)
      }
    }

    if (isOpen) {
      fetchFurnitureData()
    }
  }, [isOpen])

  const handleColorSelect = (itemId: string, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [itemId]: color,
    }))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-6xl w-full h-[80vh] flex flex-col sm:flex-row p-0 gap-0">
        <div className="w-full sm:w-48 bg-secondary p-4 flex flex-col flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg font-bold mb-4 leading-tight">
            Browse
            <br />
            Furniture
          </DialogTitle>
          <ScrollArea className="flex-grow">
            <div className="flex flex-row sm:flex-col">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className={`flex-1 sm:w-full justify-start mb-2 px-2 sm:px-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      : "hover:bg-secondary-hover"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="truncate">{category.name}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex-grow p-4 sm:p-6 bg-background overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {furnitureItems[selectedCategory]?.map((item) => (
                <Card key={item.id} className="overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 md:h-48 object-cover"
                  />
                  <CardHeader className="p-2 md:p-4">
                    <div>
                      <CardTitle className="text-base md:text-lg">{item.name}</CardTitle>
                      <CardDescription className="text-xs md:text-sm">{item.measurements}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 md:p-4">
                    <div className="flex space-x-2">
                      {item.colors.map((color, index) => (
                        <Avatar
                          key={index}
                          className={`w-6 h-6 md:w-8 md:h-8 cursor-pointer transition-all duration-200 ease-in-out ${
                            selectedColors[item.id] === color ? "ring-2 ring-primary ring-offset-2" : "hover:scale-110"
                          }`}
                          onClick={() => handleColorSelect(item.id, color)}
                        >
                          <AvatarFallback style={{ backgroundColor: color }}></AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </CardContent>
                  <div className="absolute bottom-2 right-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full w-8 h-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() =>
                        onAddFurniture({...item, color: selectedColors[item.id], position: [Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5], type: selectedCategory})
                      }
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add to room</span>
                    </Button>
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

