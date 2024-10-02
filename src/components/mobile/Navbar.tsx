import { useState, useContext } from "react"
import { PaintBucket, RotateCw, Replace, Trash2, MoreHorizontal, Ruler } from "lucide-react"
import { Button } from "@/components/mobile/ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/mobile/ui/dropdown-menu.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/mobile/ui/tooltip.tsx"
import { AppContext } from '../../context/AppContext.tsx'

/**
 * The main render function for the Navbar component.
 * 
 * @returns {JSX.Element} - The rendered JSX for the Navbar component.
 */
export default function MobileNavbar() {

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
    { label: "Red", color: "bg-red-500" },
    { label: "Green", color: "bg-green-500" }
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
    if (color === 'Red')
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
    setSharedState(sharedState => {
      const updateObject = sharedState[selected]
      updateObject["color"] = newColor
      return ({
        ...sharedState,
        [selected]: { ["color"]: newColor }
      })
    })
  }

  const handleRotate = () => {

    setSharedState(sharedState => {
      const updateObject = sharedState[selected]
      updateObject["rotation"][2] = ( updateObject["rotation"][2] + Math.PI + Math.PI / 2 ) % (Math.PI *2  ) - Math.PI
      return ({
        ...sharedState,
        [selected]: updateObject
      })
    })
  }

  const handleResize = (size: string) => {
    console.log(`Couch resized to ${size}`)
    setIsResizeMenuOpen(false)
  }

  const navItems = [
    {
      icon: PaintBucket,
      label: "Change Color",
      action: () => setIsColorMenuOpen(true),
      dropdown: (
        <DropdownMenu open={isColorMenuOpen} onOpenChange={setIsColorMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Change Color"
            >
              <PaintBucket className="h-5 w-5" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {colorOptions.map((option, index) => (
              <DropdownMenuItem key={index} onSelect={() => handleColorChange(option.label)}>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${option.color}`} />
                  <span>{option.label}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    {
      icon: Ruler,
      label: "Size",
      action: () => setIsResizeMenuOpen(true),
      dropdown: (
        <DropdownMenu open={isResizeMenuOpen} onOpenChange={setIsResizeMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Resize"
            >
              <Ruler className="h-5 w-5" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sizeOptions.map((option, index) => (
              <DropdownMenuItem key={index} onSelect={() => handleResize(option.size)}>
                <span>{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    { icon: RotateCw, label: "Rotate", action: () => handleRotate() },
    { icon: Replace, label: "Replace", action: () => console.log("Replace clicked") },
    { icon: Trash2, label: "Remove", action: () => console.log("Remove clicked") },
  ]

  
  const moreOptions = [
    { label: "Change room size", action: () => console.log("Change room size clicked") },
    { label: "Edit room layout", action: () => console.log("Edit room layout clicked") },
    { label: "Edit room lighting", action: () => console.log("Edit room lighting clicked") },
  ]

  if (selected !== "")
    return (
      <TooltipProvider>
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <nav className="bg-white border border-zinc-200 rounded-full shadow-lg p-2 dark:bg-zinc-950 dark:border-zinc-800" aria-label="Image Editing Tools">
            <ul className="flex items-center space-x-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.dropdown ? (
                    item.dropdown
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={item.action}
                          aria-label={item.label}
                        >
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </li>
              ))}
              <li>
                <DropdownMenu open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          aria-label="More options"
                        >
                          <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More options</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end">
                    {moreOptions.map((option, optionIndex) => (
                      <DropdownMenuItem key={optionIndex} onSelect={option.action}>
                        <span>{option.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
        </div>
      </TooltipProvider>
    )
  else return null
}