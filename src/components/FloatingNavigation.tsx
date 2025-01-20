import React from "react"
import { Sofa, Sparkles, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface FloatingNavigationProps {
  isFurnitureBrowserOpen: boolean
  setIsFurnitureBrowserOpen: (isOpen: boolean) => void
  isInspireDialogOpen: boolean
  setIsInspireDialogOpen: (isOpen: boolean) => void
  isRoomSettingsOpen: boolean
  setIsRoomSettingsOpen: (isOpen: boolean) => void
  setIsCouchEditVisible: (isVisible: boolean) => void
}

/**
 * FloatingNavigation Component - A bottom navigation bar for room designer controls
 * 
 * Features:
 * - Fixed position at bottom of screen
 * - Responsive design with mobile-first approach
 * - Three main actions: Browse, Inspire, and Room Settings
 * 
 * Props:
 * @param {boolean} isFurnitureBrowserOpen - Controls furniture browser visibility
 * @param {function} setIsFurnitureBrowserOpen - Toggle furniture browser
 * @param {boolean} isInspireDialogOpen - Controls inspire dialog visibility
 * @param {function} setIsInspireDialogOpen - Toggle inspire dialog
 * @param {boolean} isRoomSettingsOpen - Controls room settings visibility
 * @param {function} setIsRoomSettingsOpen - Toggle room settings
 * @param {function} setIsCouchEditVisible - Toggle couch edit controls
 * 
 * Implementation:
 * - Uses Radix UI Card component for container
 * - Lucide React icons for visual elements
 * - Tailwind CSS for styling and responsiveness
 * - Centered layout with max-width for larger screens
 * - Handles button clicks with couch edit state management
 */

export function FloatingNavigation({ 
  isFurnitureBrowserOpen, 
  setIsFurnitureBrowserOpen, 
  isInspireDialogOpen, 
  setIsInspireDialogOpen,
  isRoomSettingsOpen,
  setIsRoomSettingsOpen,
  setIsCouchEditVisible
}: FloatingNavigationProps) {
  const handleButtonClick = (action: () => void) => {
    setIsCouchEditVisible(false)
    action()
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] max-w-md">
      <Card className="shadow-lg">
        <CardContent className="p-2">
          <div className="flex justify-between space-x-2">
            <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center" onClick={() => handleButtonClick(() => setIsFurnitureBrowserOpen(true))}>
              <Sofa className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Browse</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center" onClick={() => handleButtonClick(() => setIsInspireDialogOpen(true))}>
              <Sparkles className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Inspire</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center" onClick={() => handleButtonClick(() => setIsRoomSettingsOpen(true))}>
              <Home className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Room Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

