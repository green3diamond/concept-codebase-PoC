import { Suspense, useRef } from "react"
import { Text, OrbitControls, DragControls } from "@react-three/drei"

import Floor from "./models/Floor.tsx"
import Walls from "./models/Walls.tsx"
import Carpet from "./models/Carpet.tsx"
import Lights from "./models/Lights.tsx"
import ModelLoader from "./models/ModelLoader.tsx"


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
        bubbly_x: 3,
        bubbly_z: 2,
        cube_x: 2,
        cube_z: 2,
        modern_x: 0,
        modern_z: -3
    }

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
            dragLimits={[[-props.bubbly_x - 4, -props.bubbly_x + 4], , [-props.bubbly_z - 4, -props.bubbly_z + 4]]}
        >
            <ModelLoader
                file={'./bubbly2c.glb'}
                html={true}
                name={'bubbly'}
                nodeNum={2}
                occlude={[bubbly, modSofa]}
                pos={[props.bubbly_x, -1, props.bubbly_z]}
                reference={bubbly}
                rot={[- Math.PI * 1 / 2, 0, -Math.PI * 1 / 2]}
                size={1.4}
            />
        </DragControls>

        {/* Modern sofa model */}
        <DragControls
            axisLock="y"
            dragLimits={[[-2.5 - props.modern_x, 2.5 - props.modern_x], , [-4 - props.modern_z, 4 - props.modern_z]]}

        >
            <ModelLoader
                file={'./modernSofa.glb'}
                html={false}
                name={'modSofa'}
                nodeNum={3}
                pos={[props.modern_x, -1, props.modern_z]}
                reference={modSofa}
                rot={[0, 0, 0]}
                size={2.5}
            />
        </DragControls>

        {/* Walls and floor */}
        <Floor />
        <Walls />
        <Suspense><Carpet /></Suspense>

        {/* Backgorund text */}
        <Text
            fontSize={1}
            color="black"
            position={[0, 2, -4.9]}
            maxWidth={2}
            textAlign="center"
        >
            Concept 🪑
        </Text>


    </>
}