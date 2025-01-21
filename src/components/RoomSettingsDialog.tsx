import React from 'react'
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

interface RoomSettingsDialogProps {
  isOpen: boolean
  onClose: () => void
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
export function RoomSettingsDialog({ isOpen, onClose }: RoomSettingsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Room Settings</DialogTitle>
          <DialogDescription>
            Adjust the size and layout of your room.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Width
            </Label>
            <Input
              id="width"
              defaultValue="5"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="length" className="text-right">
              Length
            </Label>
            <Input
              id="length"
              defaultValue="5"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height
            </Label>
            <Input
              id="height"
              defaultValue="3"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClose}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

