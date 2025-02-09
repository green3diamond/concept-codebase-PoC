import React, { useRef, useCallback, useState, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import { sizeToLength } from './utils/furnitureOptions'
import { FurnitureItem as FurnitureItemType } from './types/furniture'

interface FurnitureItemProps extends FurnitureItemType {
  onDrag: (newPosition: [number, number, number]) => void
  onDragStart: () => void
  onDragEnd: () => void
  onModelClick: () => void
  onEditClick: () => void
  isEditVisible: boolean
  setIsEditVisible: (isVisible: boolean) => void
  isDialogOpen?: boolean
  roomDimensions: { width: number; length: number }
}

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

export function FurnitureItem({
  id,
  color,
  rotation,
  size,
  position,
  type,
  onDrag,
  onDragStart,
  onDragEnd,
  onModelClick,
  onEditClick,
  isEditVisible,
  setIsEditVisible,
  isDialogOpen,
  roomDimensions,
}: FurnitureItemProps) {
  const group = useRef<THREE.Group>(null)
  const { camera, raycaster, gl } = useThree()
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(new THREE.Vector3())
  const dragOffset = useRef(new THREE.Vector3())
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const intersectionPoint = useMemo(() => new THREE.Vector3(), [])

  const length = sizeToLength[size]
  const itemWidth = type === "table" ? 1.2 : length
  const itemDepth = type === "table" ? 0.8 : 1.5

  const boundaryConstraints = useMemo(() => {
    const halfRoomWidth = roomDimensions.width / 2
    const halfRoomLength = roomDimensions.length / 2
    const halfItemWidth = itemWidth / 2
    const halfItemDepth = itemDepth / 2

    return {
      minX: -halfRoomWidth + halfItemWidth,
      maxX: halfRoomWidth - halfItemWidth,
      minZ: -halfRoomLength + halfItemDepth,
      maxZ: halfRoomLength - halfItemDepth,
    }
  }, [roomDimensions, itemWidth, itemDepth])

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotation, 0.1)
    }
  })

  const handlePointerDown = useCallback(
    (e: THREE.Event) => {
      e.stopPropagation()
      setIsDragging(true)
      gl.domElement.style.cursor = "grabbing"

      raycaster.setFromCamera(e.pointer, camera)
      raycaster.ray.intersectPlane(plane, intersectionPoint)
      dragStart.current.copy(intersectionPoint)
      dragOffset.current.subVectors(group.current!.position, intersectionPoint)
      onDragStart()
    },
    [camera, gl, raycaster, onDragStart],
  )

  const handlePointerUp = useCallback(
    (e: THREE.Event) => {
      setIsDragging(false)
      gl.domElement.style.cursor = "grab"
      onDragEnd()
    },
    [gl, onDragEnd],
  )

  const handlePointerMove = useCallback(
    (e: THREE.Event) => {
      if (isDragging) {
        raycaster.setFromCamera(e.pointer, camera)
        raycaster.ray.intersectPlane(plane, intersectionPoint)
        const newPosition = intersectionPoint.add(dragOffset.current)

        // Apply boundary constraints
        newPosition.x = Math.max(boundaryConstraints.minX, Math.min(boundaryConstraints.maxX, newPosition.x))
        newPosition.z = Math.max(boundaryConstraints.minZ, Math.min(boundaryConstraints.maxZ, newPosition.z))

        // Update position immediately without waiting for React state update
        if (group.current) {
          group.current.position.set(newPosition.x, 0, newPosition.z)
        }

        // Update parent component state less frequently
        onDrag([newPosition.x, 0, newPosition.z])
      }
    },
    [isDragging, camera, raycaster, onDrag, boundaryConstraints, plane, intersectionPoint, dragOffset],
  )

  const hideButton = useCallback(() => {
    setIsEditVisible(false)
  }, [setIsEditVisible])

  const renderFurniture = useMemo(() => {
    switch (type) {
      case "chair":
        return (
          <group>
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[0.6, 0.1, 0.6]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, 1, -0.25]} castShadow>
              <boxGeometry args={[0.6, 1, 0.1]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        )
      case "table":
        return (
          <group>
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.05, 0.8]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-0.55, 0.35, -0.35]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.7]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.55, 0.35, -0.35]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.7]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-0.55, 0.35, 0.35]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.7]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.55, 0.35, 0.35]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.7]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        )
      case "lamp":
        return (
          <group>
            <mesh position={[0, 0.75, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.3, 0.5, 32]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        )
      default: // Couch
        return (
          <group>
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[length, 0.6, 1.2]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, 0.9, -0.48]} castShadow>
              <boxGeometry args={[length, 0.9, 0.24]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-length / 2 + 0.12, 0.54, 0]} castShadow>
              <boxGeometry args={[0.24, 0.48, 1.2]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[length / 2 - 0.12, 0.54, 0]} castShadow>
              <boxGeometry args={[0.24, 0.48, 1.2]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        )
    }
  }, [type, color, length])

  return (
    <group ref={group} position={position} onClick={(e) => e.stopPropagation()} onPointerMissed={hideButton}>
      <mesh
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerOver={() => {
          gl.domElement.style.cursor = "grab"
        }}
        onPointerOut={() => {
          gl.domElement.style.cursor = "auto"
          setIsDragging(false)
        }}
      >
        <boxGeometry args={[itemWidth, 1.5, itemDepth]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {renderFurniture}
      <Html
        position={[length / 2 - 0.3, 1.8, 0]}
        style={{
          transition: "all 0.2s",
          opacity: isDialogOpen ? 0 : 1,
          pointerEvents: isDialogOpen ? "none" : "auto",
          zIndex: isDialogOpen ? -1 : "auto",
        }}
      >
        <BadgeButton
          onClick={(e) => {
            e.stopPropagation()
            onEditClick()
          }}
        />
      </Html>
    </group>
  )
}

