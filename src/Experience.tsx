import { Suspense, useRef } from "react"
import { Image, Text, OrbitControls, DragControls } from "@react-three/drei"
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

// Inside your component:

import Floor from "./models/Floor"
import Walls from "./models/Walls"
import Carpet from "./models/Carpet"
import Lights from "./models/Lights"
import ModelLoader from "./models/ModelLoader"


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


    return <>
        {/* Controls for the camera */}
        <OrbitControls
            makeDefault
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * (1 / 2 - 1 / 20)}
            maxAzimuthAngle={0}
            minAzimuthAngle={-Math.PI / 2}
            enableZoom={false}
        />

        {/* Lights for the 3D scene */}
        <Lights />

        {/* Bubbly chair model */}
        <DragControls
            axisLock="y"
            dragLimits={[[-props.bubbly_x - 4, -props.bubbly_x + 3], , [-props.bubbly_z - 4, -props.bubbly_z + 3]]}
        >
            <ModelLoader
                file={'./bubblyRot2.glb'}
                html={false}
                name={'bubbly'}
                nodeNum={2}
                occlude={[bubbly, modSofa]}
                pos={[props.bubbly_x, -0.25, props.bubbly_z]}
                reference={bubbly}
                size={1.4}
            />
        </DragControls>

        {/* Modern sofa model */}
        <DragControls
            axisLock="y"
            dragLimits={[[-2.5 - props.modern_x, 2.5 - props.modern_x], , [-4 - props.modern_z, 4 - props.modern_z]]}

        >
            <ModelLoader
                file={'./modernSofa2.glb'}
                html={false}
                name={'modSofa'}
                nodeNum={2}
                pos={[props.modern_x, -1, props.modern_z]}
                reference={modSofa}
                size={2.5}
            />
        </DragControls>

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