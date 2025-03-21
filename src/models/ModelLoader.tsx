import { RefObject, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useGLTF, Html } from "@react-three/drei"
import { useFrame } from '@react-three/fiber'
import { Mesh, BufferGeometry, Material, Color, DoubleSide, MeshStandardMaterial } from 'three'
import { AppContext } from "../context/AppContext"
import Placeholder from "./Placeholder"
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import type { FurnitureItem } from "types/furniture"

function BadgeButton({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
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
  url: string // Changed from file to url
  nodeNum: number
  reference: RefObject<Mesh>
  occlude?: boolean
}

export default function ModelLoader({ itemId, url, nodeNum, reference }: ModelLoaderProps) {
  const { furniture, selected, setSelected, setActiveAccordion, menuState, setMenuState, setIsDragging } = useContext(AppContext)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [clickTime, setClickTime] = useState<number | null>(null)
  const [scaledGeometry, setScaledGeometry] = useState<BufferGeometry | null>(null)
  const [isGeometryReady, setIsGeometryReady] = useState(false)
  const meshRef = useRef<Mesh>(null)

  // Use the useGLTF hook with the URL directly
  // This hook handles caching automatically
  const { nodes, materials } = useGLTF(url, true) // true enables the loading manager

  const item: FurnitureItem | undefined = useMemo(() => 
    furniture.find((f) => f.id === itemId), 
    [furniture, itemId]
  )
  
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
    } else if (selected === id) {
      setMenuState("closed")
      setActiveAccordion("")
    } else {
      setSelected(id)
      setActiveAccordion(id)
    }
  }

  const nodesArray = Object.keys(nodes).map((key) => nodes[key])
  const materialsArray = Object.keys(materials).map((key) => materials[key])

  // Check if the node exists at the specified index
  const nodeExists = nodesArray.length > nodeNum && nodesArray[nodeNum]
  const geomUpper = nodeExists ? (nodesArray[nodeNum] as Mesh).geometry : null

  function getSizeScale(size: string): number {
    switch (size) {
      case "small": return 0.8
      case "medium": return 1
      case "large": return 1.2
      default: return 1
    }
  }
  
  const materialRef = useMemo(() => {
    if (materialsArray[0]) {
      const baseMaterial = materialsArray[0] as MeshStandardMaterial
      const clonedMaterial = baseMaterial.clone()

      // Preserve original material properties
      Object.keys(baseMaterial).forEach(key => {
        if (key !== 'color' && key !== 'id' && baseMaterial[key] !== undefined) {
          clonedMaterial[key] = baseMaterial[key]
        }
      })

      // Apply the item's color while preserving material properties
      clonedMaterial.color = new Color(item.color)

      // Ensure proper material settings
      clonedMaterial.needsUpdate = true
      clonedMaterial.side = DoubleSide
      
      return clonedMaterial
    }
    return null
  }, [materialsArray, item.color])

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
    if (geomUpper && !isGeometryReady) {
      initializeGeometry()
    }
  }, [geomUpper, isGeometryReady, initializeGeometry])

  useEffect(() => {
    if (reference.current) {
      reference.current.rotation.y = item.rotation
    }
  }, [item.rotation, reference])

  useFrame(() => {
    if (meshRef.current && !isGeometryReady && geomUpper) {
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
        material={materialRef}
      />
      {isEditVisible && (
        <Html position={[1, 1, 0]}>
          <BadgeButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              onEditClick(item.id)
            }}
          />
        </Html>
      )}
    </mesh>
  )
}
