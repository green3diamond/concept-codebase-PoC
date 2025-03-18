import { useLoader } from "@react-three/fiber"
import { RepeatWrapping, TextureLoader, Vector3 } from "three"
import { MeshReflectorMaterial } from "@react-three/drei";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

/**
* This function creates a floor mesh using React Three Fiber and Drei library.
* It applies textures to the floor mesh and sets up the necessary properties for reflection.
*
* @returns {JSX.Element} A React Three Fiber mesh element representing the floor.
*/
export default function Floor() {

    const {roomDimensions} = useContext(AppContext)
    const width = roomDimensions["width"]
    const length = roomDimensions["length"]
    const height = roomDimensions["height"]

   const name = (type) => `concrete/concrete_1k_${type}.png`;
   /**
    * Load texture maps for the floor using the TextureLoader.
    * The textures are for color, normal, roughness, and metalness.
    */
    const [
        colorMap,
        normalMap,
        roughnessMap,
        metlanessMap
    ] = useLoader(TextureLoader, [
        name("Albedo"),
        name("Normal"),
        name("Roughness"),
        name("Metalness")
    ])
    const repX = 1
    const repY = 1

    //  Color map
    colorMap.repeat.set(repX, repY)
    colorMap.wrapS = RepeatWrapping
    colorMap.wrapT = RepeatWrapping

    // Normal map
    normalMap.repeat.set(repX, repY)
    normalMap.wrapS = RepeatWrapping
    normalMap.wrapT = RepeatWrapping

    // Roughness map
    roughnessMap.repeat.set(repX, repY)
    roughnessMap.wrapS = RepeatWrapping
    roughnessMap.wrapT = RepeatWrapping

    // Ambient occlusion map
    metlanessMap.repeat.set(repX, repY)
    metlanessMap.wrapS = RepeatWrapping
    metlanessMap.wrapT = RepeatWrapping


    return <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={new Vector3(width, length, 0)} receiveShadow={true}>
        <planeGeometry/>

        <MeshReflectorMaterial
            map={colorMap}
            // normalMap={normalMap}
            roughnessMap={roughnessMap}
            metalnessMap={metlanessMap}
            mixStrength={0.4}
            mixContrast={0.2}
            roughness={1} mirror={0}        />
    </mesh>
}

