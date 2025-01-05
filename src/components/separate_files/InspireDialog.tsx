import React, { useState, useEffect } from "react"
import { Button } from "@/components/separate_files/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/separate_files/ui/dialog"

interface InspireDialogProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * InspireDialog Component - An animated welcome dialog for the inspiration feature
 * 
 * Features:
 * - Animated text reveal effect
 * - Color-gradient text styling
 * - Fade-in animations for subtitle and button
 * - Responsive design
 * 
 * Props:
 * @param {boolean} isOpen - Controls dialog visibility
 * @param {function} onClose - Callback for closing the dialog
 * 
 * Animations:
 * - Text typing effect with character-by-character reveal
 * - Color gradient applied to each character
 * - Fade-in effect for subtitle
 * - Bounce-in effect for start button
 * 
 * Implementation:
 * - Uses Radix UI Dialog for accessibility
 * - useEffect for managing typing animation
 * - Dynamic text coloring using HSL
 * - CSS animations for visual effects
 * - Responsive text sizing with Tailwind
 * - Cleanup on component unmount
 */
export function InspireDialog({ isOpen, onClose }: InspireDialogProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const fullText = "Concept is here to help you get inspired."
  const subtitle = "Let's find out what you are looking for together."

  useEffect(() => {
    if (isOpen) {
      setDisplayedText("")
      setShowSubtitle(false)
      let index = 0
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText((prev) => prev + fullText[index])
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowSubtitle(true), 500)
        }
      }, 1000 / fullText.length)

      return () => clearInterval(interval)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[90vw]">
        <DialogHeader>
          <DialogTitle className="sr-only">Get Inspired</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <p className="text-xl sm:text-2xl font-bold text-center" style={{ textShadow: "0 10px rgba(255,255,255,0.5)" }}>
            {displayedText.split("''").map((char, index) => (
              <span
                key={index}
                style={{
                  color: `hsl(${index * (360 / fullText.length)}, 70%, 50%)`,
                }}
              >
                {char}
              </span>
            ))}
          </p>
          {showSubtitle && (
            <p
              className="text-base sm:text-lg text-center"
              style={{
                animation: "fadeIn 0.5s ease-out",
              }}
            >
              {subtitle}
            </p>
          )}
          {showSubtitle && (
            <Button
              className="mt-4"
              style={{
                animation: "bounceIn 0.5s ease-out",
              }}
            >
              Start
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

