import { useState } from "react"
import { RotateCw, Trash2, Copy, Pencil, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { colorOptions, sizeOptions } from "./utils/furnitureOptions"
import type { FurnitureItem } from "./types/furniture"

interface FloatingMenuProps {
  furniture: FurnitureItem[]
  onRotate: (id: string) => void
  onColorChange: (id: string, color: string) => void
  onRemove: (id: string) => void
  onSizeChange: (id: string, size: string) => void
  onDuplicate: (id: string) => void
  menuState: string
  onToggleMenu: () => void
  activeAccordion: string
  setActiveAccordion: (value: string) => void
}

/**
 * FloatingMenu Component - A sliding side panel for couch customization
 * 
 * Features:
 * - Collapsible side panel with smooth animations
 * - Color selection with visual swatches
 * - Size selection with radio buttons
 * - Rotation and removal controls
 * - Confirmation dialog for model removal
 * 
 * Props:
 * @param {string} couchName - Display name of the couch
 * @param {string} couchColor - Current color value of the couch
 * @param {function} onRotate - Callback for rotating the couch
 * @param {function} onColorChange - Callback for changing couch color
 * @param {function} onRemove - Callback for removing the couch
 * @param {function} onSizeChange - Callback for changing couch size
 * @param {string} menuState - Current state of menu ('open' | 'closed')
 * @param {function} onToggleMenu - Callback for toggling menu state
 * @param {string} activeAccordion - Currently active accordion section
 * @param {function} setActiveAccordion - Sets the active accordion section
 * 
 * Features:
 * - Responsive design with tailwind classes
 * - Uses Radix UI components for accessibility
 * - Animated transitions for menu states
 * - Color swatches with visual feedback
 * - Size selection with measurements
 * - Confirmation dialog for destructive actions
 */

export function FloatingMenu({
  furniture,
  onRotate,
  onColorChange,
  onRemove,
  onSizeChange,
  onDuplicate,
  menuState,
  onToggleMenu,
  activeAccordion,
  setActiveAccordion,
}: FloatingMenuProps) {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<string | null>(null)
  //const [isMenuVisible, setIsMenuVisible] = useState(true) //Removed as per update 3

  const handleRemove = () => {
    if (selectedFurnitureId) {
      onRemove(selectedFurnitureId)
      setIsRemoveDialogOpen(false)
      setSelectedFurnitureId(null)
      setActiveAccordion("")
    }
  }

  return (
    <div
      className={`fixed top-4 right-4 z-20 transition-all duration-300 ${menuState === "open" ? "translate-x-0" : "translate-x-[calc(100%-0.5rem)]"}`}
    >
      <Card
        className={`w-[calc(90vw-0.5rem)] max-w-[319.5px] shadow-lg relative ${menuState === "open" ? "z-50" : ""} max-h-[calc(100vh-2rem)]`}
      >
        <Button
          variant="outline"
          size="icon"
          className={`absolute -left-12 top-0 transition-all duration-300 ${
            menuState === "open" ? "-translate-x-1 z-40" : "z-50"
          }`}
          onClick={onToggleMenu}
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${menuState === "open" ? "rotate-180" : ""}`} />
        </Button>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-primary">Room Designer</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <Accordion type="single" collapsible value={activeAccordion} onValueChange={setActiveAccordion}>
              {furniture.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="py-4">
                    <div className="flex justify-between items-center w-full">
                      <span>
                        {item.name} #
                        {furniture.filter((f) => f.type === item.type).findIndex((f) => f.id === item.id) + 1} (
                        {item.type})
                      </span>
                      <Pencil className="h-4 w-4 text-gray-600" />
                    </div>
                  </AccordionTrigger>
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
                                  borderColor: item.color === option.value ? "black" : "transparent",
                                }}
                                onClick={() => onColorChange(item.id, option.value)}
                                aria-label={`Select ${option.name} color`}
                              />
                              <span className="text-xs text-center w-16 break-words">{option.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Size</h4>
                        <RadioGroup
                          onValueChange={(value) => onSizeChange(item.id, value)}
                          value={item.size}
                          className="space-y-2"
                        >
                          {sizeOptions.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`${item.id}-${option.value}`} />
                              <Label htmlFor={`${item.id}-${option.value}`} className="text-sm">
                                {option.label} - {option.measurement}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      <Button variant="outline" className="w-full justify-start" onClick={() => onRotate(item.id)}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        Rotate
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => onDuplicate(item.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedFurnitureId(item.id)
                          setIsRemoveDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Furniture</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this furniture item? This action cannot be undone.
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

