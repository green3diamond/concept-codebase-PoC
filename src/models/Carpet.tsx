import { useGLTF } from "@react-three/drei"
import { DragControls } from "@react-three/drei"
/**
 * This function represents a 3D carpet model loaded from a GLB file.
 * It uses the useGLTF hook from the @react-three/drei library to load the model.
 * The carpet is then rendered as a mesh with specific properties.
 *
 * @returns {JSX.Element} A 3D carpet mesh element.
 */
export default function Carpet() {
    const { nodes, materials } = useGLTF('./carpet.glb')

    // Carpet_white, Carpet_patterned
    return <mesh
        name="carpet"
        geometry={nodes.Carpet1_low_Carpet_white_0.geometry}
        material={materials.Carpet_white}
        material-color='#B89FF5'
        scale={[3, 4.5, 1]}
        rotation={[- Math.PI * 1 / 2, 0, - Math.PI * 0 / 8]}
        position-y={-1}
        receiveShadow={true}
    />
}
