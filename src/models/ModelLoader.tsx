"use client"

import { useGLTF, Html } from "@react-three/drei"
import { useEffect, useContext, useState, Suspense } from "react"
import { AppContext } from "../context/AppContext"
import Placeholder from "./Placeholder"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import type { ThreeEvent } from "@react-three/fiber"
import type React from "react"
import type * as THREE from "three"
import { FurnitureItem } from "types/furniture"

function BadgeButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="w-8 h-8 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
      onClick={onClick}
    >
      <Pencil className="h-4 w-4 text-gray-600" />
      <span className="sr-only">Edit</span>
    </Button>
  )
}

type ModelLoaderProps = {
  itemId: string
  file: string
  nodeNum: number
  reference: React.RefObject<THREE.Mesh>
  occlude?: boolean
}

export default function ModelLoader({ itemId, file, nodeNum, reference, occlude = false }: ModelLoaderProps) {
  const { furniture, setFurniture, setSelected, setActiveAccordion, menuState, setMenuState, setIsDragging } =
    useContext(AppContext)
  const { nodes, materials } = useGLTF(file)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [clickTime, setClickTime] = useState<number | null>(null)
  const [scaledGeometry, setScaledGeometry] = useState(null)
  const [isGeometryReady, setIsGeometryReady] = useState(false)
  
  const item:FurnitureItem = furniture.find((f) => f.id === itemId)
  if (!item) return null // If item not found, don't render anything

  const handlePointerDown = () => {
    setIsDragging(true)
    setClickTime(Date.now())
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    if (clickTime && Date.now() - clickTime <= 200) {
      setIsEditVisible(!isEditVisible)
    }
    setClickTime(null)
  }

  const onEditClick = (id: string) => {
    if (menuState === "closed") {
      setMenuState("open")
      setSelected(id)
      setActiveAccordion(id)
    } else {
      setMenuState("closed")
      setActiveAccordion("")
    }
  }

  // convert the node object to an array
  const nodesArray = Object.keys(nodes).map((key) => nodes[key])
  const materialsArray = Object.keys(materials).map((key) => materials[key])

  const geomUpper = nodesArray[nodeNum].geometry

  function computeAndSetBoundingBox(geomUpper: THREE.BufferGeometry) {
    if (!geomUpper.boundingSphere) {
      geomUpper.computeBoundingSphere()
    }

    if (!geomUpper.boundingBox) {
      geomUpper.computeBoundingBox()
    }

    const scale = item.originalSize * getSizeScale(item.size) / geomUpper.boundingSphere.radius

    geomUpper.scale(scale, scale, scale)
  }

  useEffect(() => {
    if (reference.current) {
      reference.current.rotation.y = item.rotation
    }
  }, [item.rotation, reference])
  
  // useEffect(() => {
    //   computeAndSetBoundingBox(scaledGeometry)
    // }, [item.size, geomUpper, item, reference])
    
    useEffect(() => {
      const scaledGeometry = geomUpper.clone() // Clone the geometry
      computeAndSetBoundingBox(scaledGeometry)
      setScaledGeometry(scaledGeometry)
  }, [item.size, geomUpper, item]) 

  function getSizeScale(size: string): number {
    switch (size) {
      case "small":
        return 0.8
      case "medium":
        return 1
      case "large":
        return 1.2
      default:
        return 1
    }
  }

  return (
    <mesh
      name={item.name}
      ref={reference}
      position={item.position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      rotation={[0, item.rotation, 0]}
      key={`${item.id}-${item.size}-${item.color}`} // This is important to force re-render when size changes
  >
      <Suspense fallback={<Placeholder />}>
        <mesh castShadow={true} name={item.name} geometry={scaledGeometry} material={materialsArray[0]}>
          <meshStandardMaterial color={item.color} />
        </mesh>
      </Suspense>
      {isEditVisible && (
        <Html position={[1, 1, 0]}>
          <BadgeButton
            onClick={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation()
              onEditClick(item.id)
            }}
          />
        </Html>
      )}
    </mesh>
  )
}

