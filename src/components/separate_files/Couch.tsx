import React, { useRef, useCallback, useState, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { Button } from "@/components/separate_files/ui/button"
import { Pencil } from "lucide-react"

interface CouchProps {
  color: string
  rotation: number
  size: string
  position: [number, number, number]
  onDrag: (newPosition: [number, number, number]) => void
  onDragStart: () => void
  onDragEnd: () => void
  onModelClick: () => void
  onEditClick: () => void
  isEditVisible: boolean
  setIsEditVisible: (isVisible: boolean) => void
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

/**
 * Couch Component - A 3D couch model with interactive features
 * 
 * Features:
 * - Draggable in 3D space
 * - Customizable color and size
 * - Rotatable
 * - Edit button that appears on selection
 * - Shadow casting and receiving
 * 
 * Props:
 * @param {string} color - The color of the couch
 * @param {number} rotation - Rotation angle in radians
 * @param {string} size - Size of the couch ('small'|'medium'|'large'|'xl')
 * @param {[number, number, number]} position - 3D position coordinates [x,y,z]
 * @param {function} onDrag - Callback when couch is dragged
 * @param {function} onDragStart - Callback when drag starts
 * @param {function} onDragEnd - Callback when drag ends
 * @param {function} onModelClick - Callback when couch is clicked
 * @param {function} onEditClick - Callback when edit button is clicked
 * @param {boolean} isEditVisible - Controls edit button visibility
 * @param {function} setIsEditVisible - Sets edit button visibility
 * 
 * Sub-components:
 * - BadgeButton: A floating edit button that appears above the couch
 * 
 * Implementation:
 * - Uses Three.js for 3D rendering
 * - Uses React Three Fiber for React integration
 * - Implements drag and drop using raycasting
 * - Smooth rotation transitions using lerp
 */
export function Couch({ color, rotation, size, position, onDrag, onDragStart, onDragEnd, onModelClick, onEditClick, isEditVisible, setIsEditVisible }: CouchProps) {
  const group = useRef<THREE.Group>(null)
  const { camera, raycaster, gl } = useThree()
  const [isDragging, setIsDragging] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const dragStart = useRef(new THREE.Vector3())
  const dragOffset = useRef(new THREE.Vector3())
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  const intersectionPoint = new THREE.Vector3()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotation, 0.1)
    }
  })

  const handlePointerDown = useCallback((e: THREE.Event) => {
    e.stopPropagation()
    setIsDragging(true)
    gl.domElement.style.cursor = "'grabbing'"

    raycaster.setFromCamera(e.pointer, camera)
    raycaster.ray.intersectPlane(plane, intersectionPoint)
    dragStart.current.copy(intersectionPoint)
    dragOffset.current.subVectors(group.current!.position, intersectionPoint)
    onDragStart()
  }, [camera, gl, raycaster, onDragStart])

  const handlePointerUp = useCallback((e: THREE.Event) => {
    setIsDragging(false)
    gl.domElement.style.cursor = "'grab'"
    onDragEnd()

    if (e.delta <= 2) {
      setIsEditVisible(true)
      onModelClick()
    }
  }, [gl, onDragEnd, onModelClick, setIsEditVisible])

  const handlePointerMove = useCallback((e: THREE.Event) => {
    if (isDragging) {
      raycaster.setFromCamera(e.pointer, camera)
      raycaster.ray.intersectPlane(plane, intersectionPoint)
      const newPosition = intersectionPoint.add(dragOffset.current)
      onDrag([newPosition.x, 0, newPosition.z])
    }
  }, [isDragging, camera, raycaster, onDrag])

  const hideButton = useCallback(() => {
    setIsEditVisible(false)
  }, [])

  const length = {
    small: 2.4,
    medium: 3,
    large: 3.6,
    xl: 4.2
  }[size]

  return (
    <group 
      ref={group} 
      position={position}
      onClick={(e) => e.stopPropagation()}
      onPointerMissed={hideButton}
    >
      <mesh
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerOver={() => { gl.domElement.style.cursor = "'grab'" }}
        onPointerOut={() => { gl.domElement.style.cursor = "'auto'" }}
      >
        <boxGeometry args={[length, 1.5, 1.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh position={[0, 0.375, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 0.75, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.125, -0.6]} castShadow>
        <boxGeometry args={[length, 1.2, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-length/2 + 0.15, 0.675, 0]} castShadow>
        <boxGeometry args={[0.3, 0.6, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[length/2 - 0.15, 0.675, 0]} castShadow>
        <boxGeometry args={[0.3, 0.6, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html
        position={[length/2 - 0.3, 1.8, 0]}
        style={{
          transition: "'all 0.2s'",
          transform: `scale(${isEditVisible ? 1 : 0.5})`,
          opacity: isEditVisible ? 1 : 0,
          pointerEvents: isEditVisible ? "'auto'" : "'none'",
        }}
      >
        <BadgeButton onClick={(e) => { e.stopPropagation(); onEditClick(); }} />
      </Html>
    </group>
  )
}

