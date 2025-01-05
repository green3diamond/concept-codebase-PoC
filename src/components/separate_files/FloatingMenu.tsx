import React, { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCw, Trash2 } from "lucide-react"
import { Button } from "@/components/separate_files/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/separate_files/ui/radio-group"
import { Label } from "@/components/separate_files/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/separate_files/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/separate_files/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/separate_files/ui/accordion"

interface FloatingMenuProps {
  couchName: string
  couchColor: string
  onRotate: () => void
  onColorChange: (color: string) => void
  onRemove: () => void
  onSizeChange: (size: string) => void
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
  couchName, 
  couchColor, 
  onRotate, 
  onColorChange, 
  onRemove, 
  onSizeChange, 
  menuState, 
  onToggleMenu, 
  activeAccordion, 
  setActiveAccordion 
}: FloatingMenuProps) {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)

  const colorOptions = [
    { label: "Sage", color: "bg-[#8A9A5B]", value: "#8A9A5B", name: "Herbal Sage" },
    { label: "Taupe", color: "bg-[#8B7E66]", value: "#8B7E66", name: "Earthy Taupe" },
    { label: "Slate", color: "bg-[#708090]", value: "#708090", name: "Stormy Slate" },
  ];

  const sizeOptions = [
    { label: "Small", measurement: "160 cm", value: "small" },
    { label: "Medium", measurement: "200 cm", value: "medium" },
    { label: "Large", measurement: "240 cm", value: "large" },
    { label: "XL", measurement: "280 cm", value: "xl" },
  ]

  const handleRemove = () => {
    onRemove()
    setIsRemoveDialogOpen(false)
  }

  return (
    <div className={`fixed top-4 right-4 z-50 transition-transform duration-300 ${menuState === "'open'" ? "'translate-x-0'" : "'translate-x-full'"}`}>
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-12 top-0"
        onClick={onToggleMenu}
      >
        {menuState === "'open'" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      <Card className="w-[90vw] max-w-[320px] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Living Room
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible value={activeAccordion} onValueChange={setActiveAccordion}>
            <AccordionItem value="comfy-couch">
              <AccordionTrigger>{couchName}</AccordionTrigger>
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
                              borderColor: couchColor === option.value ? "'black'" : "'transparent'",
                            }}
                            onClick={() => onColorChange(option.value)}
                          />
                          <span className="text-xs text-center w-16 break-words">{option.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Size</h4>
                    <RadioGroup onValueChange={onSizeChange} defaultValue="medium" className="space-y-2">
                      {sizeOptions.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="text-sm">
                            {option.label} - {option.measurement}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={onRotate}
                  >
                    <RotateCw className="mr-2 h-4 w-4" />
                    Rotate
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsRemoveDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
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
    </div>
  )
}

