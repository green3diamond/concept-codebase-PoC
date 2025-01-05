import { Avatar, AvatarFallback } from "@/components/desktop/ui/avatar"
import { Button } from "@/components/mobile/ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/mobile/ui/dropdown-menu.tsx"
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/mobile/ui/tooltip.tsx"
import { LayoutGrid, Lightbulb, Maximize, PaintBucket, RotateCw } from "lucide-react"
import { useContext, useState } from "react"
import { AppContext } from '../../context/AppContext.tsx'

/**
 * The main render function for the Navbar component.
 * 
 * @returns {JSX.Element} - The rendered JSX for the Navbar component.
 */
export default function DesktopNavbar() {

  /**
   * Deconstructs the necessary properties from the AppContext.
   * 
   * @type {{ selected: string, sharedState: object, setSharedState: SetStateAction<object> }}
   */
  const { selected, sharedState, setSharedState } = useContext(AppContext)


  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false)
  const [isResizeMenuOpen, setIsResizeMenuOpen] = useState(false)

  const colorOptions = [
    { label: "Dark", color: "bg-gray-500" },
    { label: "Colorfull", color: "bg-gradient-to-l from-yellow-500 to-pink-500" }
  ]

  const sizeOptions = [
    { label: "Small (2-seater)", size: "Small" },
    { label: "Medium (3-seater)", size: "Medium" },
    { label: "Large (4-seater)", size: "Large" },
  ]

  /**
   * A function that handles the click of a button for color change.
   * 
   * @param {string} color - The seelected color.
   */
  const handleColorChange = (color: string) => {
    if (color === 'Colorfull')
      handleColorClick(1, selected)
    else
      handleColorClick(2, selected)
    setIsColorMenuOpen(false)
  }

  /**
   * A function that updates the shared state with the selected button label.
   * 
   * @param {number} buttonLabel - The label of the selected button.
   * @param {string} selected - The selected object.
   */
  const handleColorClick = (newColor, selected) => {
    setSharedState(prevState => {
      if (!selected || !prevState[selected]) {
        return prevState; // Return unchanged state if no valid selection
      }
  
      return {
        ...prevState,
        [selected]: {
          ...prevState[selected], // Preserve other properties like rotation
          color: newColor
        }
      };
    });
  };

  const handleRotate = () => {
    setSharedState(prevState => {
      if (!selected || !prevState[selected]) {
        return prevState; // Return unchanged state if no valid selection
      }
  
      const selectedObject = { ...prevState[selected] };
      const newRotation = [...selectedObject.rotation];
      newRotation[1] = (newRotation[1] + Math.PI + Math.PI / 2) % (Math.PI * 2) - Math.PI;
  
      return {
        ...prevState,
        [selected]: {
          ...selectedObject,
          rotation: newRotation
        }
      };
    });
  };


  const handleResize = (size: string) => {
    console.log(`Couch resized to ${size}`)
    setIsResizeMenuOpen(false)
  }

  const navItems = [
    {
      icon: PaintBucket,
      label: "Color",
      action: () => setIsColorMenuOpen(true),
      dropdown: (
        <DropdownMenu open={isColorMenuOpen} onOpenChange={setIsColorMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="rect-full"
              aria-label="Change Color"
            >
              <PaintBucket className="h-5 w-5 mr-2" aria-hidden="true" />
              <span className="text-sm">{"Color"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-28">
            {colorOptions.map((option, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-center space-x-2"
                onSelect={() => handleColorChange(option.label)}>
                <Avatar className="h-4 w-4">
                  <AvatarFallback className={option.color}></AvatarFallback>
                </Avatar>
                <span className="text-sm">{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    { icon: RotateCw, label: "Rotate", action: () => handleRotate() },
  ]

  const moreOptions = [
    { icon: Maximize, label: "Change room size", action: () => console.log("Change room size clicked") },
    { icon: LayoutGrid, label: "Edit room layout", action: () => console.log("Edit room layout clicked") },
    { icon: Lightbulb, label: "Edit room lighting", action: () => console.log("Edit room lighting clicked") },
  ]

  if (selected !== "")
    return (
      <TooltipProvider>
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <nav className="bg-white border border-zinc-200 rounded-md shadow-lg dark:bg-zinc-950 dark:border-zinc-800" aria-label="Main Navigation">
            <ul className="flex items-center h-12 px-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.dropdown ? (
                    item.dropdown
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rect-full"
                          onClick={item.action}
                          aria-label={item.label}
                        >
                          <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                          <span className="text-sm">{item.label}</span>
                        </Button>
                      </TooltipTrigger>
                    </Tooltip>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </TooltipProvider>
    )
  else return null
}