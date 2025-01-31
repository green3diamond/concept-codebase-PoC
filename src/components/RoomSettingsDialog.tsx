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

interface RoomDimensions {
  width: number
  length: number
  height: number
}

interface RoomSettingsDialogProps {
  isOpen: boolean
  onClose: () => void
  initialDimensions: RoomDimensions
  onDimensionsChange: (dimensions: RoomDimensions) => void
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
  onDimensionsChange,
}: RoomSettingsDialogProps) {
  const [dimensions, setDimensions] = useState<RoomDimensions>(initialDimensions)

  useEffect(() => {
    setDimensions(initialDimensions)
  }, [initialDimensions])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDimensions((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const handleSave = () => {
    onDimensionsChange(dimensions)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby="room-settings-description">
        <DialogHeader>
          <DialogTitle>Room Settings</DialogTitle>
          <DialogDescription id="room-settings-description">
            Adjust the size and layout of your room. Changes will be reflected in the 3D view.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Width (m)
            </Label>
            <Input
              id="width"
              name="width"
              value={dimensions.width}
              onChange={handleInputChange}
              type="number"
              min="1"
              max="20"
              step="0.1"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="length" className="text-right">
              Length (m)
            </Label>
            <Input
              id="length"
              name="length"
              value={dimensions.length}
              onChange={handleInputChange}
              type="number"
              min="1"
              max="20"
              step="0.1"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height (m)
            </Label>
            <Input
              id="height"
              name="height"
              value={dimensions.height}
              onChange={handleInputChange}
              type="number"
              min="1"
              max="5"
              step="0.1"
              className="col-span-3"
            />
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

