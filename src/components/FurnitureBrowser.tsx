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

interface FurnitureItem {
  id: string
  name: string
  measurements: string
  image: string
  colors: string[]
  type: string;
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

  useEffect(() => {
    const fetchFurnitureData = async () => {
      try {
        const response = await fetch('/api/furniture')
        const data = await response.json()
        setCategories(data.categories)
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-6xl w-full h-[80vh] flex flex-col sm:flex-row p-0 gap-0">
        <div className="w-full sm:w-64 bg-zinc-100 p-4 flex flex-col dark:bg-zinc-800">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Browse Furniture</DialogTitle>
          <ScrollArea className="flex-grow">
            <div className="flex flex-row sm:flex-col">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap]
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "ghost"}
                    className="flex-1 sm:w-full justify-start mb-2 px-2 sm:px-4"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                    <span className="hidden sm:inline">{category.name}</span>
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </div>
        <div className="flex-grow p-4 sm:p-6 bg-white overflow-y-auto dark:bg-zinc-950">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {furnitureItems[selectedCategory]?.map((item) => (
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
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="shrink-0 bg-zinc-900/10 hover:bg-zinc-900/20 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/30 dark:bg-zinc-50/10 dark:hover:bg-zinc-50/20 dark:dark:bg-zinc-50/20 dark:dark:hover:bg-zinc-50/30"
                      onClick={() => onAddFurniture({...item, type: selectedCategory})}
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

