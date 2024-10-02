import React, { Suspense, useState, useRef } from "'react'"
import { PaintBucket, RotateCw, Replace, Trash2, Menu, Maximize, LayoutGrid, Lightbulb, Ruler } from "lucide-react"
import { Button } from "@/components/desktop/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/desktop/ui/radio-group"
import { Label } from "@/components/desktop/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/desktop/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/desktop/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/desktop/ui/dialog"

export default function DesktopNavBar({ onRotate, onColorChange, onRemove, onSizeChange }) {
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false)
  const [isSizeMenuOpen, setIsSizeMenuOpen] = useState(false)
  const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [selectedCouch, setSelectedCouch] = useState("")

  const navItems = [
    { icon: PaintBucket, label: "Color" },
    { icon: Ruler, label: "Size" },
    { icon: RotateCw, label: "Rotate" },
    { icon: Replace, label: "Replace" },
    { icon: Trash2, label: "Remove" },
    { icon: Menu, label: "More" },
  ]

  const colorOptions = [
    { label: "Red", color: "bg-red-500", value: "#FF0000" },
    { label: "Green", color: "bg-green-500", value: "#00FF00" },
    { label: "Blue", color: "bg-blue-500", value: "#0000FF" },
  ]

  const sizeOptions = [
    { label: "Small", measurement: "152 x 89 cm", value: "small" },
    { label: "Medium", measurement: "183 x 97 cm", value: "medium" },
    { label: "Large", measurement: "213 x 102 cm", value: "large" },
    { label: "XL", measurement: "244 x 107 cm", value: "xl" },
  ]

  const couchModels = [
    { id: "bjorn", name: "Björn" },
    { id: "freya", name: "Freya" },
    { id: "odin", name: "Odin" },
    { id: "astrid", name: "Astrid" },
  ]

  const handleRemove = () => {
    onRemove()
    setIsRemoveDialogOpen(false)
  }

  const handleReplace = () => {
    console.log(`Replacing with ${selectedCouch} model`)
    setIsReplaceDialogOpen(false)
    setSelectedCouch("")
  }

  const handleChangeRoomSize = () => {
    console.log("Change room size")
    setIsMoreMenuOpen(false)
  }

  const handleEditRoomLayout = () => {
    console.log("Edit room layout")
    setIsMoreMenuOpen(false)
  }

  const handleEditRoomLighting = () => {
    console.log("Edit room lighting")
    setIsMoreMenuOpen(false)
  }

  const buttonClasses = `
    flex items-center justify-center h-10 px-3 rounded-md
    transition-all duration-200 ease-in-out
    hover:bg-primary/10 focus-visible:bg-primary/10
    active:bg-primary/20
    focus:outline-none
  `

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-white border border-zinc-200 rounded-md shadow-lg dark:bg-zinc-950 dark:border-zinc-800" aria-label="Main Navigation">
        <ul className="flex items-center h-12 px-2">
          {navItems.map((item, index) => (
            <li key={index} className="mx-1">
              {index === 0 ? (
                <DropdownMenu open={isColorMenuOpen} onOpenChange={setIsColorMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-28">
                    {colorOptions.map((option, optionIndex) => (
                      <DropdownMenuItem 
                        key={optionIndex} 
                        className="flex items-center space-x-2"
                        onClick={() => onColorChange(option.value)}
                      >
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className={option.color}></AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{option.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : index === 1 ? (
                <DropdownMenu open={isSizeMenuOpen} onOpenChange={setIsSizeMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    {sizeOptions.map((option, optionIndex) => (
                      <DropdownMenuItem 
                        key={optionIndex} 
                        className="flex flex-col items-start"
                        onClick={() => onSizeChange(option.value)}
                      >
                        <span className="text-sm font-medium">{option.label}</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{option.measurement}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : index === 2 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className={buttonClasses}
                  onClick={onRotate}
                >
                  <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ) : index === 3 ? (
                <Dialog open={isReplaceDialogOpen} onOpenChange={setIsReplaceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Replace Furniture</DialogTitle>
                      <DialogDescription>
                        Select a couch model to replace the current furniture piece.
                      </DialogDescription>
                    </DialogHeader>
                    <RadioGroup value={selectedCouch} onValueChange={setSelectedCouch} className="grid gap-4 mt-4">
                      {couchModels.map((model) => (
                        <div key={model.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={model.id} id={model.id} />
                          <Label htmlFor={model.id}>{model.name}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <DialogFooter className="mt-6">
                      <Button variant="outline" onClick={() => setIsReplaceDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleReplace} disabled={!selectedCouch}>
                        Replace
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : index === 4 ? (
                <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Remove Model</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to remove this model? This action cannot be undone.
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
              ) : index === 5 ? (
                <DropdownMenu open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={buttonClasses}
                    >
                      <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44">
                    <DropdownMenuItem onClick={handleChangeRoomSize} className="flex items-center space-x-2">
                      <Maximize className="h-4 w-4" />
                      <span className="text-sm">Change room size</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEditRoomLayout} className="flex items-center space-x-2">
                      <LayoutGrid className="h-4 w-4" />
                      <span className="text-sm">Edit room layout</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEditRoomLighting} className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4" />
                      <span className="text-sm">Edit room lighting</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className={buttonClasses}
                >
                  <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

