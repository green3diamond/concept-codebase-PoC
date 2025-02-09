import { RefObject, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { useGLTF, Html } from "@react-three/drei"
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { AppContext } from "../context/AppContext"
import Placeholder from "./Placeholder"
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import type { ThreeEvent } from "@react-three/fiber"
import type { FurnitureItem } from "types/furniture"

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
  reference: RefObject<THREE.Mesh>
  occlude?: boolean
}

export default function ModelLoader({ itemId, file, nodeNum, reference, occlude = false }: ModelLoaderProps) {
  const { furniture, setFurniture, setSelected, setActiveAccordion, menuState, setMenuState, setIsDragging } = useContext(AppContext)
  const { nodes, materials } = useGLTF(file)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [clickTime, setClickTime] = useState<number | null>(null)
  const [scaledGeometry, setScaledGeometry] = useState<THREE.BufferGeometry | null>(null)
  const [isGeometryReady, setIsGeometryReady] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  const item: FurnitureItem | undefined = furniture.find((f) => f.id === itemId)
  if (!item) return null

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

  const nodesArray = Object.keys(nodes).map((key) => nodes[key])
  const materialsArray = Object.keys(materials).map((key) => materials[key])
  const geomUpper = nodesArray[nodeNum].geometry

  function getSizeScale(size: string): number {
    switch (size) {
      case "small": return 0.8
      case "medium": return 1
      case "large": return 1.2
      default: return 1
    }
  }

  const initializeGeometry = useCallback(() => {
    if (!geomUpper) return

    const newGeometry = geomUpper.clone()
    if (!newGeometry.boundingSphere) {
      newGeometry.computeBoundingSphere()
    }
    if (!newGeometry.boundingBox) {
      newGeometry.computeBoundingBox()
    }

    if (newGeometry.boundingSphere) {
      const scale = item.originalSize * getSizeScale(item.size) / newGeometry.boundingSphere.radius
      newGeometry.scale(scale, scale, scale)
      setScaledGeometry(newGeometry)
      setIsGeometryReady(true)
    } else {
      console.warn('Failed to compute bounding sphere for', item.name)
    }
  }, [geomUpper, item.originalSize, item.size, item.name])

  useEffect(() => {
    initializeGeometry()
  }, [initializeGeometry])

  useEffect(() => {
    if (reference.current) {
      reference.current.rotation.y = item.rotation
    }
  }, [item.rotation, reference])

  useFrame(() => {
    if (meshRef.current && !isGeometryReady) {
      initializeGeometry()
    }
  })

  if (!isGeometryReady || !scaledGeometry) {
    return <Placeholder />
  }

  return (
    <mesh
      name={item.name}
      ref={reference}
      position={item.position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      rotation={[0, item.rotation, 0]}
      key={`${item.id}-${item.size}-${item.color}`}
    >
      <mesh 
        ref={meshRef}
        castShadow={true} 
        name={item.name} 
        geometry={scaledGeometry} 
        material={materialsArray[0]}
      >
        <meshStandardMaterial color={item.color} />
      </mesh>
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