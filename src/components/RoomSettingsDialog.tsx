import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HexColorPicker } from "react-colorful"
import { Plus, Minus } from "lucide-react"
import { Description } from "@radix-ui/react-dialog"

interface RoomDimensions {
  width: number
  length: number
  height: number
}

interface RoomSettingsDialogProps {
  isOpen: boolean
  onClose: () => void
  initialDimensions: RoomDimensions
  initialColor: string
  onDimensionsChange: (dimensions: RoomDimensions) => void
  onColorChange: (color: string) => void
  scale: number
}
/**
 * RoomSettingsDialog Component - A modal dialog for configuring room dimensions
 * 
 * Features:
 * - Input fields for room width, length, and height
 * - Grid layout for form elements
 * - Responsive design
 * - Save functionality
 * 
 * Props:
 * @param {boolean} isOpen - Controls dialog visibility
 * @param {function} onClose - Callback for closing the dialog
 * 
 * Implementation:
 * - Uses Radix UI Dialog components
 * - Form layout using CSS Grid
 * - Labeled inputs with default values
 * - Responsive sizing with Tailwind CSS
 * - Save button with close action
 */
export function RoomSettingsDialog({
  isOpen,
  onClose,
  initialDimensions,
  initialColor,
  onDimensionsChange,
  onColorChange,
  scale,
}: RoomSettingsDialogProps) {
  const [dimensions, setDimensions] = useState<RoomDimensions>(initialDimensions)
  const [color, setColor] = useState<string>(initialColor)

  useEffect(() => {
    setDimensions(initialDimensions)
    setColor(initialColor)
  }, [initialDimensions, initialColor])

  const handleSizeChange = (dimension: keyof RoomDimensions, change: number) => {
    setDimensions((prev) => {
      const newValue = Math.max(0.1, prev[dimension] / scale + change)
      return { ...prev, [dimension]: newValue * scale }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDimensions((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const scaledWidth = dimensions.width / scale
  const scaledLength = dimensions.length / scale
  const scaledHeight = dimensions.height / scale

  const handleSave = () => {
    onDimensionsChange(dimensions)
    onColorChange(color)
    onClose()
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>Room Settings</DialogTitle>
          <DialogDescription >
            Adjust the size, layout, and color of your room. Changes will be reflected in the 3D view.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Width (m)
            </Label>
            <div className="col-span-3 flex items-center">
                <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => handleSizeChange("width", -1)}
                >
                <Minus className="h-4 w-4" />
                </Button>
                <Input
                id="width"
                name="width"
                value={scaledWidth}
                onChange={handleInputChange}
                type="number"
                min="1"
                max="20"
                className="h-8 rounded-none text-center"
                onWheel={(e) => {
                  const delta = e.deltaY < 0 ? 1 : -1;
                  handleSizeChange("width", delta);
                }}
                />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => handleSizeChange("width", 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="length" className="text-right">
              Length (m)
            </Label>
            <div className="col-span-3 flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => handleSizeChange("length", -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="length"
                name="length"
                value={scaledLength}
                onChange={handleInputChange}
                type="number"
                min="1"
                max="20"
                step="0.1"
                className="h-8 rounded-none text-center"
                onWheel={(e) => {
                  const delta = e.deltaY < 0 ? 1 : -1;
                  handleSizeChange("length", delta);
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => handleSizeChange("length", 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height (m)
            </Label>
            <div className="col-span-3 flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => handleSizeChange("height", -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="height"
                name="height"
                value={scaledHeight}
                onChange={handleInputChange}
                type="number"
                min="1"
                max="5"
                step="0.1"
                className="h-8 rounded-none text-center"
                onWheel={(e) => {
                  const delta = e.deltaY < 0 ? 1 : -1;
                  handleSizeChange("height", delta);
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => handleSizeChange("height", 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="room-color" className="text-right">
              Room Color
            </Label>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  id="room-color"
                  variant="outline"
                  className="w-[280px] justify-start text-left font-normal"
                  style={{ backgroundColor: color }}
                >
                  <div
                    className="w-4 h-4 rounded-full mr-2 border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <span>{color}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" >
                <HexColorPicker color={color} onChange={setColor} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

