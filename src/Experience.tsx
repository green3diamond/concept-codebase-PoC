import { Suspense, useContext, useMemo, useRef } from "react"
import { Image, Text, OrbitControls, DragControls } from "@react-three/drei"
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

// Inside your component:

import Floor from "./models/Floor"
import Walls from "./models/Walls"
import Carpet from "./models/Carpet"
import Lights from "./models/Lights"
import ModelLoader from "./models/ModelLoader"
import { AppContext } from "./context/AppContext"
import React from "react"


/**
 * The main component for the 3D experience.
 *  Renders the 3D scene with interactive elements, including a bubbly chair, a modern sofa, and various 3D models.
 * @returns {JSX.Element} - The JSX element for the 3D experience.
 */
export default function Experience() {
    // References to the 3D objects
    const bubbly = useRef()
    const modSofa = useRef()
    // Object properties for positioning and scaling
    const props = {
        bubbly_x: -2,
        bubbly_z: 2,
        cube_x: 2,
        cube_z: 2,
        modern_x: 0,
        modern_z: -3
    }
    const texture = useLoader(TextureLoader, '/logoExp.svg')
    const { furniture, setFurniture } = useContext(AppContext)
    const groupRef = useRef<THREE.Group>(null)    
    const meshRefs = useMemo(() => furniture.map(() => React.createRef<THREE.Mesh>()), [furniture])

    return <>
        {/* Controls for the camera */}
        <OrbitControls
            makeDefault
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * (1 / 2 - 1 / 20)}
            // maxAzimuthAngle={0}
            // minAzimuthAngle={-Math.PI / 2}
            enableZoom={false}
        />

        {/* Lights for the 3D scene */}
        <Lights />

        {/* 3D models */}
        <group ref={groupRef}>
        {furniture.map((item, index) => (
            <DragControls
            key={item.id}
            axisLock="y"
            dragLimits={[
                [-3 -item.position[0], 3-item.position[0]],
                undefined,
                [-3-item.position[2], 3-item.position[2]]
            ]}
            >
            <ModelLoader
                itemId={item.id}
                file={item.fileName}
                nodeNum={2}
                reference={meshRefs[index]}
            />
            </DragControls>
        ))}
        </group>

        {/* Walls and floor */}
        <Floor />
        <Walls />
        <Suspense><Carpet /></Suspense>

        {/* Backgorund text */}
        <Image url='/logoExp.svg'
            transparent
            scale={[texture.image.width / 100, texture.image.height / 100, 1]}
            position={[0, 2, -4.9]} />
    </>
}