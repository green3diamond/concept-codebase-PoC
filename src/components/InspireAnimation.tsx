import React from 'react'
import { motion } from 'framer-motion'
import { Sofa, Lamp, Table, RockingChairIcon as ChairRecline, Sparkles, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface InspireAnimationProps {
  onStart: () => void
  onClose: () => void
}

export function InspireAnimation({ onStart, onClose }: InspireAnimationProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Get ready for a furniture frenzy!
        </motion.h2>
        <motion.p
          className="text-lg mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Concept is about to turn your room into a design playground!
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              transition: { repeat: Infinity, duration: 2 }
            }}
          >
            <Sofa size={48} />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -10, 0],
              transition: { repeat: Infinity, duration: 1.5, delay: 0.2 }
            }}
          >
            <Lamp size={48} />
          </motion.div>
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
              transition: { repeat: Infinity, duration: 2, delay: 0.4 }
            }}
          >
            <Table size={48} />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              transition: { repeat: Infinity, duration: 1.5, delay: 0.6 }
            }}
          >
            <ChairRecline size={48} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            onClick={onStart}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-200"
          >
            <Sparkles className="mr-2" /> Start the Magic!
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

