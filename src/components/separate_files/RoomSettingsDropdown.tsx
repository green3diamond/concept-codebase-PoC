import React, { useState } from "react"
import { Settings, Maximize } from "lucide-react"
import { Button } from "@/components/separate_files/ui/button"
import { Input } from "@/components/separate_files/ui/input"
import { Label } from "@/components/separate_files/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/separate_files/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/separate_files/ui/dropdown-menu"

/**
 * RoomSettingsDropdown Component - A dropdown menu for accessing room settings
 * 
 * Features:
 * - Dropdown trigger button with icon
 * - Settings menu with room configuration option
 * - Embedded room settings dialog
 * - Responsive design
 * 
 * State:
 * - Manages dialog visibility state
 * 
 * Implementation:
 * - Uses Radix UI Dropdown and Dialog components
 * - Icon integration with Lucide React
 * - Responsive button styling
 * - Grid-based form layout
 * - Input fields for room dimensions:
 *   - Width (default: 5)
 *   - Length (default: 5)
 *   - Height (default: 3)
 * - Save functionality with form submission
 */
export function RoomSettingsDropdown() {
  const [isRoomSettingsDialogOpen, setIsRoomSettingsDialogOpen] = useState(false)

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
          <DropdownMenuItem onSelect={() => setIsRoomSettingsDialogOpen(true)}>
            <Maximize className="mr-2 h-4 w-4" />
            <span>Room Settings</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isRoomSettingsDialogOpen} onOpenChange={setIsRoomSettingsDialogOpen}>
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
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

